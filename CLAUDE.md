# CLAUDE.md

Guidance for AI assistants working in this repository.

## Project overview

`smart-house-v3` is a small client-side React SPA that lets a user register/login, then create rooms in a "smart house" and add toggleable devices to each room. There is no backend — everything is persisted to `localStorage` in the browser.

Stack:
- React 18.3 with JSX (no TypeScript)
- Vite 5.4 (build + dev server)
- React Router DOM 6.26 (client-side routing)
- Tailwind CSS 3.4 (utility classes for styling)
- ESLint 9 flat config with `eslint-plugin-react`, `react-hooks`, `react-refresh`

Entry: `index.html` → `src/main.jsx` → `<BrowserRouter><App/></BrowserRouter>`.

## Commands

```bash
npm install        # install deps
npm run dev        # start Vite dev server (default: http://localhost:5173)
npm run build      # production build to dist/
npm run preview    # serve the production build locally
npm run lint       # run ESLint over the repo
```

There is **no test script and no test framework** wired up. Do not invent `npm test`.

## Directory layout

```
src/
  main.jsx              # ReactDOM root, wraps App in <BrowserRouter>
  App.jsx               # Owns the rooms[] state + all mutators; declares routes
  App.css, index.css    # Global styles + Tailwind directives (in index.css)
  components/           # Presentational/reusable pieces
    Login.jsx           # Login form (reads user from localStorage)
    Register.jsx        # Register form (writes user to localStorage)
    Sidebar.jsx         # Left nav on HomePage; also owns Logout
    Rooms.jsx           # Grid of room cards on the home page
  views/                # Route-level pages
    AuthPage.jsx        # "/" — shows Login or Register
    HomePage.jsx        # "/homepage" — sidebar + room grid
    AddRoom.jsx         # "/add-room" — form to create a room
    RoomPage.jsx        # "/room/:roomName" — devices in a room
    SearchRoom.jsx      # "/search-room" — filter rooms by name
public/                 # Static assets served as-is by Vite
index.html              # Vite entry HTML
vite.config.js          # Vite + @vitejs/plugin-react
tailwind.config.js      # Tailwind content globs (index.html + src/**)
postcss.config.js       # Tailwind + autoprefixer
eslint.config.js        # Flat ESLint config
```

## Routes

Declared in `src/App.jsx`:

| Path                  | Component     | Purpose                                |
|-----------------------|---------------|----------------------------------------|
| `/`                   | `AuthPage`    | Login / Register entry                 |
| `/homepage`           | `HomePage`    | Sidebar + list of rooms                |
| `/add-room`           | `AddRoom`     | Create a new room                      |
| `/room/:roomName`     | `RoomPage`    | Add/toggle devices in one room         |
| `/search-room`        | `SearchRoom`  | Filter rooms by name                   |

There is no route guard — `/homepage` is reachable directly. Login just checks credentials against `localStorage.user` and navigates.

## State model

All app state lives in `App.jsx` and is passed down via props. There is no Context, Redux, or Zustand.

`rooms` is an array of:
```js
{
  id: string,         // `${Date.now()}-${Math.random()}`
  name: string,       // user-entered, max 9 chars (enforced in AddRoom)
  color: string,      // CSS color string, used as card background
  type: "Bedroom" | "Bathroom" | "Kitchen",
  devices: Array<{ name: string, on: boolean }>
}
```

Mutators defined in `App.jsx` (each one also writes to `localStorage`):
- `addRoom(newRoom)` — appends; assigns `id` and ensures `devices: []`.
- `updateRooms(newRooms)` — full replace (used by `removeRoom` in `HomePage`).
- `addDevice(roomName, deviceName)` — pushes `{ name, on: false }` to that room.
- `toggleDeviceState(roomName, deviceIndex)` — flips `device.on`.

`localStorage` keys:
- `"rooms"` — JSON of the rooms array. Read at App init with try/catch fallback to `[]`.
- `"user"` — JSON `{ username, password }` written by `Register`, read by `Login`. Cleared (along with `"rooms"`) by `Sidebar`'s Logout.

When adding new room mutators, follow the existing pattern: update React state **and** write the new value to `localStorage` in the same function.

## Device rules (RoomPage)

Enforced in `views/RoomPage.jsx` inside `handleAddDevice`:
- Max 5 devices per room.
- `"Stereo System"` may only exist once per room.
- `"Boiler"` may only be added to rooms whose `type === "Bathroom"`.
- Available device options: `Air Conditioner`, `Light`, `Stereo System`, `Boiler`.

Violations show a browser `alert()`; there is no toast/notification system.

## Conventions

- **File naming**: PascalCase `.jsx` for components and views. One default export per file.
- **Components**: function components only; hooks (`useState`, `useNavigate`, `useParams`) — no class components.
- **Styling**: Tailwind utility classes inline. A small amount of plain CSS lives in `src/index.css` and `src/App.css`. Prefer Tailwind for new UI; reach for `index.css` only for truly global rules.
- **Routing**: use `react-router-dom` — `<Link to=...>` for navigation, `useNavigate()` for programmatic redirects, `useParams()` to read route params.
- **Forms**: controlled inputs with `useState`. Validation is local to the component and surfaces errors either inline (`Register`) or via `alert()` (`AddRoom`, `RoomPage`).
- **Keys**: use a stable unique value (`room.id`) where one exists. Avoid array index keys for items that can be reordered/removed.
- **No TypeScript**: keep it JSX. Do not introduce `.ts`/`.tsx` files without first agreeing on a migration.

## Known rough edges (do not "fix" silently)

These are present in the current code; flag before changing if a task touches them:
- Passwords are stored in plain text in `localStorage`. This is by design for the demo — do not rewrite auth without being asked.
- `Register.jsx` has a copy-paste bug at lines ~69–71: the password error is rendered inside an `errorMessage.username` conditional. Fix only if the task is to fix it.
- `package.json` lists `"build": "^0.1.4"` as a runtime dependency — almost certainly a stray install, unused by the app. Don't remove it as part of an unrelated change.
- `App.jsx` wraps the `rooms` initial state in a synchronous `localStorage.getItem` inside `useState(() => ...)`. Keep the lazy initializer if you refactor.
- `/homepage` has no auth guard; navigating there without logging in still works.

## Working on this repo

- Run `npm run lint` before claiming a change is done; there is no test suite to fall back on.
- For UI changes, run `npm run dev` and verify in the browser — the build will not catch most behavioral regressions.
- Keep mutations to `rooms` going through the helpers in `App.jsx` so localStorage stays in sync.
- Prefer editing existing files. Do not introduce a state library, backend, or routing redesign unless explicitly requested.
