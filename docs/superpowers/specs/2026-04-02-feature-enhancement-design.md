# Feature Enhancement Design

## 1. Sci-Fi UI (Glass-morphism)

### Mô tả
Thiết kế giao diện theo phong cách Sci-Fi với hiệu ứng kính mờ, đường viền phát sáng, và màu sắc không gian.

### Components
- **Glass panels**: backdrop-filter: blur(12px), background rgba với độ trong suốt
- **Neon borders**: border với glow effect (box-shadow)
- **Scan lines**: Background effect tùy chọn
- **HUD elements**: Thông tin hiển thị như HUD spacecraft

## 2. Quiz Mode

### Mô tả
Mini-game kiểm tra kiến thức về hệ mặt trời với câu hỏi trắc nghiệm.

### Cấu trúc
- 10 câu hỏi cơ bản về các hành tinh
- 4 lựa chọn mỗi câu
- Hiển thị điểm số sau khi hoàn thành
- Timer cho mỗi câu hỏi (15 giây)

### UI
- Modal hiển thị câu hỏi
- Progress bar
- Điểm số và streak

## 3. Cross-section (Mặt cắt)

### Mô tả
Hiển thị cấu trúc bên trong hành tinh được chọn.

### Cấu trúc hiển thị
- Lớp vỏ ngoài (crust)
- Lớp mantel
- Lõi (core)
- Màu sắc đại diện cho từng lớp

### Hành tinh có cross-section
- Sao Thủy, Sao Kim, Trái Đất, Sao Hỏa (đá)
- Sao Mộc, Sao Thổ (khí)

## 4. Exoplanets

### Mô tả
Danh sách 30 hành tinh ngoài hệ mặt trời với bộ lọc.

### Dữ liệu
- Tên, khoảng cách từ Trái Đất
- Kích thước (so sánh với Trái Đất)
- Nhiệt độ bề mặt
- Loại hành tinh (Rocky, Gas, Ice)

### Bộ lọc
- Kích thước (nhỏ hơn Trái Đất, bằng, lớn hơn)
- Nhiệt độ (lạnh, ấm, nóng)
- Khoảng cách

## 5. Asteroid Belt

### Mô tả
Vành đai tiểu hành tinh giữa Sao Hoả và Sao Mộc.

### Hiển thị
- 50-100 particles nhỏ quay quanh
- Vị trí: khoảng cách ~18-22 đơn vị
- Kích thước nhỏ, màu xám

---

## Implementation Order

1. **Sci-Fi UI** - CSS updates cho glass-morphism
2. **Quiz** - Quiz component và data
3. **Cross-section** - CrossSectionModal component  
4. **Exoplanets** - Exoplanet data và component
5. **Asteroid Belt** - Asteroid particle system trong 3D

## Thời gian ước tính
- UI: 1-2 giờ
- Quiz: 2-3 giờ
- Cross-section: 2 giờ
- Exoplanets: 3 giờ
- Asteroid Belt: 1-2 giờ

**Tổng: ~9-12 giờ** (có thể triển khai song song)
