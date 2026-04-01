# Solar System Explorer

Ứng dụng web tương tác mô phỏng hệ mặt trời 3D, giúp người dùng khám phá và tìm hiểu thông tin về các hành tinh trong hệ mặt trời.

![Three.js](https://img.shields.io/badge/Three.js-r128-orange)
![Next.js](https://img.shields.io/badge/Next.js-14-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Vercel](https://img.shields.io/badge/Vercel-Ready-black)

## 📱 Demo

> 🚀 **Dự án đang trong quá trình phát triển**

- **Version hiện tại:** Vanilla JS (có thể chạy trực tiếp)
- **Version Next.js:** Đang phát triển - [Xem kế hoạch](./docs/superpowers/plans/2026-03-29-nextjs-migration-implementation.md)

## ✨ Tính năng

### Hiện tại (MVP)
- 🌍 **Mô hình 3D** - Mặt Trời và 8 hành tinh với Three.js
- 🎮 **Tương tác** - Xoay, zoom, click chọn hành tinh
- 👆 **Hiệu ứng cursor** - Con trỏ chuyển thành hình bàn tay khi hover hành tinh
- 📊 **Thông tin hành tinh** - Hiển thị chi tiết (đường kính, nhiệt độ, khoảng cách...)
- 📏 **Công cụ đo lường** - Đo khoảng cách giữa các hành tinh
- 🔄 **So sánh kích thước** - Modal hiển thị so sánh kích thước các hành tinh
- ▶️ **Animation** - Cho phép tạm dừng/tiếp tục quỹ đạo
- 🎨 **Logo & Favicon** - Sử dụng logo-02.png làm biểu tượng trang web
- 🎨 **Sci-Fi UI** - Giao diện glass-morphism hiện đại
- 🌙 **Mặt Trăng** - Mặt Trăng quay quanh Trái Đất
- 🪨 **Vành đai tiểu hành tinh** - Giữa Sao Hoả và Sao Thủy

### Quiz Mode
- ❓ **Quiz** - Mini-game kiểm tra kiến thức về hệ mặt trời (10 câu hỏi, timer, điểm số)

### Tính năng giáo dục
- 🔬 **Cross-section** - Xem mặt cắt bên trong hành tinh (3 lớp: vỏ, mantel, lõi)
- 🪐 **Exoplanets** - Danh sách 30 hành tinh ngoài hệ mặt trời với bộ lọc

## 🛠️ Công nghệ

### Version hiện tại
- HTML5, CSS3, JavaScript (ES6+)
- Three.js (3D rendering)

### Version Next.js (đang phát triển)
- Next.js 14+ (App Router)
- React 18+
- TypeScript
- @react-three/fiber (Three.js for React)
- @react-three/drei (Three.js helpers)
- Vercel Deployment
- GitHub Actions CI/CD

## 📂 Cấu trúc dự án

```
bunny-solar-system/
├── index.html              # Entry point (Vanilla JS)
├── css/
│   └── styles.css
├── js/
│   ├── data/
│   │   └── planets.js     # Dữ liệu hành tinh
│   ├── planets.js          # Three.js scene
│   ├── controls.js        # Camera controls
│   ├── ui.js              # UI handlers
│   └── main.js            # App initialization
├── mockup.html            # Mockup giao diện
├── mockup-3d.html         # Mockup 3D prototype
├── docs/
│   ├── specs/             # Design specifications
│   └── plans/             # Implementation plans
└── README.md
```

## 🚀 Cách chạy

### Chạy version Vanilla JS

```bash
# Cách 1: Mở trực tiếp file
# Chỉ cần mở index.html trong trình duyệt

# Cách 2: Sử dụng HTTP server
python -m http.server 8000
# hoặc
npx serve .
```

Sau đó truy cập: `http://localhost:8000`

### Chạy version Next.js (sau khi migrate)

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build cho production
npm run build

# Chạy production server
npm start
```

## 📋 Dữ liệu hành tinh

| Hành tinh | Loại | Đường kính (km) | Khoảng cách (triệu km) |
|-----------|------|------------------|------------------------|
| Mặt Trời | Ngôi sao | 1,392,700 | 0 |
| Sao Thủy | Hành tinh đá | 4,879 | 57.9 |
| Sao Kim | Hành tinh đá | 12,104 | 108.2 |
| Trái Đất | Hành tinh đá | 12,742 | 149.6 |
| Sao Hỏa | Hành tinh đá | 6,779 | 227.9 |
| Sao Mộc | Khí khổng lồ | 139,820 | 778.5 |
| Sao Thổ | Khí khổng lồ | 116,460 | 1,432 |
| Sao Thiên Vương | Băng khổng lồ | 50,724 | 2,867 |
| Sao Hải Vương | Băng khổng lồ | 49,244 | 4,515 |

## 🔧 Hướng dẫn đóng góp

1. Fork repo
2. Tạo branch mới (`git checkout -b feature/amazing-feature`)
3. Commit thay đổi (`git commit -m 'Add some amazing feature'`)
4. Push lên branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

## 📄 License

MIT License - xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 🙏 Tài liệu tham khảo

- [Three.js Documentation](https://threejs.org/docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [NASA Solar System Exploration](https://solarsystem.nasa.gov/)
- [NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/)

---

<p align="center">🌟 Made with passion for space exploration 🌟</p>
