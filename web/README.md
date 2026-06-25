# Music Web App – Next.js + TypeScript

App nghe nhạc đã được chuyển từ project cũ (HTML + vanilla JS) sang **Next.js + TypeScript**. App mới chạy trong thư mục **`web/`** này.

---

## 1. Đã chuyển hết chưa? Cái cũ đã xóa chưa?

### Đã chuyển đầy đủ
- **Layout:** TopBar, Sidebar, MainContent, PlayerBar (giống `index.html`).
- **Player:** phát/tạm dòng, next/prev, seek, volume, repeat, shuffle (logic từ `js/logic/player.js`, `js/state/playerState.js`, `js/audio/audioController.js`).
- **Danh sách bài:** grid bài, click để phát, highlight bài đang phát (từ `js/ui/renderSongs.js`, `js/handlers/songClickHandler.js`).
- **Fullscreen:** overlay full màn hình, điều khiển giống player bar (từ `js/ui/fullscreen.js`).
- **Data:** danh sách track (từ `js/data/data.js`).
- **CSS:** progress bar, `.song-card`, scroll, sticky header (từ `input.css` / `output.css`).

### Cái cũ **chưa** bị xóa
- Ở **thư mục gốc** repo vẫn còn:
  - `index.html` / `index.HTML` – app cũ
  - `js/` – toàn bộ logic/UI cũ
  - `assets/` – ảnh, nhạc (đã **copy** sang `web/public/assets/`, bản gốc vẫn để đó)
  - `input.css`, `output.css`, `tailwind.config.js`, `package.json` (Tailwind cho app cũ)

**Lý do giữ:** Để bạn so sánh, đọc lại code cũ khi cần, hoặc rollback nếu có sự cố. Khi đã dùng ổn app Next, bạn có thể **tự xóa** các file/thư mục cũ (xem mục 3 bên dưới).

---

## 2. Ý nghĩa từng file trong `web/`

### Gốc project Next (`web/`)

| File | Ý nghĩa |
|------|----------|
| **`package.json`** | Khai báo dependency (Next, React, Prisma, Tailwind, TypeScript) và scripts: `dev`, `build`, `start`, `db:generate`, `db:migrate`, `db:studio`. |
| **`tsconfig.json`** | Cấu hình TypeScript: strict, path `@/*` → `./src/*`, dùng cho Next. |
| **`next.config.js`** | Cấu hình Next.js (reactStrictMode, v.v.). |
| **`next-env.d.ts`** | File type definitions do Next sinh ra, không cần sửa. |
| **`postcss.config.js`** | PostCSS dùng Tailwind + Autoprefixer để build CSS. |
| **`tailwind.config.ts`** | Cấu hình Tailwind: `content` trỏ vào `src/**/*`, theme, plugins. |
| **`.env.example`** | Mẫu biến môi trường: `DATABASE_URL`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`. Copy thành `.env` và điền giá trị thật. |
| **`.gitignore`** | Bỏ qua `node_modules`, `.next`, `.env`, v.v. khi commit. |

### Prisma (database)

| File | Ý nghĩa |
|------|----------|
| **`prisma/schema.prisma`** | Định nghĩa model DB (User, Track, Playlist, PlaylistTrack, PlaybackHistory) và kết nối Postgres. Chạy `npx prisma migrate dev` để tạo bảng. |

### `src/app/` – App Router (trang + layout)

| File | Ý nghĩa |
|------|----------|
| **`layout.tsx`** | Layout gốc: `<html>`, `<body>`, gọi `<AppLayout>{children}</AppLayout>`. Metadata (title, description) cho toàn site. |
| **`page.tsx`** | Trang chủ: render `<MainContent />` (danh sách bài + khu vực scroll). |
| **`globals.css`** | CSS toàn cục: Tailwind base/components/utilities + style progress bar, `.song-card`, scroll, sticky header (port từ project cũ). |

### `src/components/` – Giao diện

| File | Ý nghĩa |
|------|----------|
| **`AppLayout.tsx`** | Khung app: bọc `PlayerProvider`, render TopBar, Sidebar, main (`{children}`), PlayerBar, và **FullscreenPlayer**. Chuẩn bị danh sách bài (random 8 từ `tracks`) làm initial state cho player. |
| **`TopBar.tsx`** | Thanh trên: logo, ô search, nút Explore Premium, avatar. |
| **`Sidebar.tsx`** | Cột trái: Library, nút Playlist/Artist/Podcast, search, Nearly. |
| **`MainContent.tsx`** | Vùng nội dung chính: tab All/Music/Podcasts, **SongList**, block “Made For You”. |
| **`SongList.tsx`** | Grid bài hát: mỗi bài là một card (ảnh + title), click gọi `loadSong(index)` từ context; card đang phát có class `active`. |
| **`PlayerBar.tsx`** | Thanh player dưới: ảnh + tên/artist, shuffle/prev/play/next/repeat, progress (seek), volume + mute, **nút fullscreen**. Dùng `usePlayer()` để đọc state và gọi action. |
| **`FullscreenPlayer.tsx`** | Overlay full màn hình khi bấm fullscreen: nền blur từ cover, ảnh + title/artist, progress + toàn bộ nút điều khiển, volume. Đóng bằng nút Thu nhỏ hoặc phím Escape. Cũng dùng `usePlayer()` nên luôn đồng bộ với PlayerBar. |

### `src/context/` – State toàn app (player)

| File | Ý nghĩa |
|------|----------|
| **`PlayerContext.tsx`** | Context React chứa: state (songs, currentIndex, isPlaying, repeatMode, shuffle, volume, isMuted, currentTime, duration), ref `<audio>`, và các action (loadSong, togglePlay, next, prev, toggleRepeat, toggleShuffle, setVolume, toggleMuted, seek, openFullscreen, closeFullscreen). Sync audio (src, play/pause, volume) khi state đổi; lắng nghe `timeupdate` / `loadedmetadata` / `ended` để cập nhật UI và xử lý repeat. |

### `src/data/` – Dữ liệu tĩnh (sẽ thay bằng API sau)

| File | Ý nghĩa |
|------|----------|
| **`tracks.ts`** | Mảng danh sách bài: id, title, artist, cover, src (URL ảnh/nhạc trong `public/`). Tương đương `js/data/data.js`; đường dẫn dùng `/assets/...` vì file nằm trong `public/assets/`. |

### `src/lib/` – Thư viện / kết nối

| File | Ý nghĩa |
|------|----------|
| **`prisma.ts`** | Tạo singleton Prisma Client để mọi nơi `import { prisma } from '@/lib/prisma'`. Tránh mở quá nhiều kết nối DB khi dev (hot reload). Dùng khi bạn làm API (auth, tracks, playlists). |

### `src/types/` – TypeScript

| File | Ý nghĩa |
|------|----------|
| **`player.ts`** | Định nghĩa type: `Track`, `TrackWithIndex`, `PlayerState`, `RepeatMode`. Dùng trong context, components, data. |

### `src/utils/` – Hàm tiện ích

| File | Ý nghĩa |
|------|----------|
| **`formatTime.ts`** | Đổi số giây thành chuỗi `"m:ss"` (vd. 90 → `"1:30"`). Dùng cho current time / duration. Tương đương `js/utils/formattime.js`. |
| **`random.ts`** | `getRandomItems(arr, count)` – lấy ngẫu nhiên `count` phần tử từ mảng (không trùng). Dùng để chọn 8 bài hiển thị đầu. Tương đương `js/utils/random.js`. |

### `public/`

| Thư mục / file | Ý nghĩa |
|----------------|---------|
| **`public/assets/`** (hoặc `public/image/`, `public/music/`) | Ảnh (cover, icon) và file nhạc. Next serve tĩnh từ `public/`, nên URL là `/assets/image/...`, `/assets/music/...`. Đây là bản **copy** từ `assets/` ở thư mục gốc. |

---

## 3. Có nên xóa code cũ (ngoài `web/`) không?

- **Giữ** nếu bạn muốn: đối chiếu logic, đọc lại cách làm cũ, hoặc chưa chắc dùng hẳn Next.
- **Xóa** khi: đã chạy ổn định app trong `web/`, không cần tham chiếu nữa.

Nếu muốn xóa, có thể xóa (ở thư mục gốc):

- `index.html`, `index.HTML`
- `js/`
- `input.css`, `output.css`, `tailwind.config.js`
- `package.json`, `package-lock.json` (của app cũ – **không** xóa `web/package.json`)

**Nên giữ:** `assets/` gốc hoặc chỉ giữ nếu bạn chưa copy đủ sang `web/public/`; `docker-compose.yml` (cho Postgres); `CHUYEN_SANG_NEXT.md` (hướng dẫn chuyển).

---

## 4. Chạy app

```bash
cd web
cp .env.example .env   # rồi sửa .env nếu dùng DB
npm install
npm run dev
```

Mở http://localhost:3000. Để dùng DB (Prisma): chạy `docker compose up -d` ở thư mục gốc, rồi `npx prisma migrate dev` trong `web/`.
