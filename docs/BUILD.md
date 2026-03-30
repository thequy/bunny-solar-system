# Build và Chạy Local

## Yêu cầu

- Node.js 18+
- npm hoặc yarn

## Cài đặt

```bash
npm install
```

## Chạy Development Server

```bash
npm run dev
```

Truy cập: http://localhost:3000

## Build cho Production

```bash
npm run build
```

## Chạy Production Server

```bash
npm start
```

## Lint

```bash
npm run lint
```

## Cấu trúc dự án Next.js

```
src/
├── app/                 # Next.js App Router
│   ├── page.tsx        # Trang chính
│   ├── layout.tsx      # Root layout
│   └── globals.css     # Global styles
├── components/
│   ├── layout/        # Layout components
│   ├── three/         # Three.js 3D components
│   └── ui/            # UI components
├── data/              # Dữ liệu hành tinh
└── types/             # TypeScript types
```
