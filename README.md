# Assignment 01 – Profile & Activity App
**Môn học**: MMA301 – Mobile Multiplatform Application  
**Sinh viên thực hiện**: Tran Thien Khiem (CE182307)  
**Công nghệ**: React Native (Expo SDK 52, JavaScript thuần), React Navigation, Context API, Formik + Yup, FlatList, AsyncStorage.

---

## 1. Tổng quan dự án (Overview)
Ứng dụng di động "Profile & Activity App" được xây dựng nhằm quản lý thông tin hồ sơ cá nhân, tuỳ biến giao diện sáng/tối (Light/Dark Mode) và theo dõi các hoạt động/sở thích yêu thích. Ứng dụng đáp ứng các tiêu chuẩn khắt khe về kiến trúc sạch: không mutate state, lưu trữ cục bộ bền vững, chống crash khi dữ liệu hỏng, và ngăn chặn triệt để hiện tượng nháy sai theme (Theme Flash).

---

## 2. Hướng dẫn cài đặt & Chạy ứng dụng (Installation & Running)

### Yêu cầu môi trường:
- Node.js version 18 trở lên (khuyến nghị v20.x hoặc v22.x)
- Thiết bị di động đã cài ứng dụng **Expo Go** (tải từ Google Play Store hoặc Apple App Store)

### Các bước khởi chạy:
```bash
# 1. Cài đặt các gói dependencies (nếu chưa cài)
npm install

# 2. Khởi động máy chủ phát triển Expo (xóa cache để đảm bảo ổn định)
npx expo start -c
```
- **Trên điện thoại**: Dùng camera quét mã QR (iOS) hoặc dùng tính năng quét QR bên trong app Expo Go (Android).
- **Trên máy tính**: Bấm phím `w` để mở giao diện Web, hoặc `a` để mở Android Emulator nếu có sẵn.

---

## 3. Sơ đồ màn hình & Luồng hoạt động (Screen & Workflow Map)

```
[HomeScreen]
  ├── (1) ──> [ProfileScreen] ── (Edit) ──> [EditProfileScreen] (Save / Cancel)
  ├── (2) ──> [ActivityScreen] (Filter, Toggle Favorite, Empty State)
  └── (3) ──> [SettingsScreen] (Toggle Light/Dark, Test Tools)
```

1. **Khởi động ứng dụng**: `App.js` kích hoạt Loading Gate, các Provider hydrate dữ liệu từ `AsyncStorage`. Sau khi nạp xong theme và profile, màn hình chính xuất hiện với đúng theme đã lưu.
2. **Luồng Profile**: `HomeScreen` và `ProfileScreen` hiển thị thông tin người dùng từ `ProfileContext`. Khi bấm "Edit Profile", màn hình `EditProfileScreen` mở ra:
   - Nếu bấm **Save** (và dữ liệu hợp lệ): `updateProfile()` cập nhật Context và lưu `AsyncStorage`. Quay lại màn hình trước, thông tin cập nhật tức thì.
   - Nếu bấm **Cancel**: Thoát ra mà không lưu gì. Lỗi validation cũ bị hủy hoàn toàn.
3. **Luồng Activity**: `ActivityScreen` hiển thị danh sách hoạt động dạng `FlatList`. Hỗ trợ bấm ngôi sao để thêm vào yêu thích, chọn chip để lọc theo danh mục, bấm "Clear List" để kiểm tra giao diện Empty State.
4. **Luồng Settings**: Cho phép bật/tắt Dark Mode áp dụng toàn bộ 5 màn hình và Navigation Header. Cung cấp bộ công cụ giả lập kiểm tra dữ liệu hỏng.

---

## 4. Chiến lược Quản lý State & Lưu trữ Bền vững (State & Persistence Strategy)

- **State Management**:
  - `ThemeContext`: Quản lý chế độ giao diện (`'light'` | `'dark'`), bảng mã màu tương ứng và hàm `toggleTheme`.
  - `ProfileContext`: Quản lý thông tin hồ sơ (`name`, `bio`, `avatar`), hàm `updateProfile`.
  - `ActivityScreen Local State`: Quản lý danh sách hoạt động, trạng thái lọc và yêu thích.
  - **Nguyên tắc bất biến (Immutability)**: 100% state được cập nhật thông qua Spread operator (`{ ...prev }`) hoặc mảng mới (`.map()`, `.filter()`).
- **Persistence & Fallback**:
  - Tầng trừu tượng `src/storage/storage.js` bọc quanh `@react-native-async-storage/async-storage`.
  - Toàn bộ thao tác đọc/ghi đều bọc `try/catch`. Nếu `key` bị thiếu (`null`) hoặc chuỗi JSON bị hỏng cú pháp, hàm tự động trả về giá trị mặc định (`DEFAULT_PROFILE`, `'light'`), đảm bảo ứng dụng không bao giờ bị crash.
  - **Loading Gate**: Chặn render khi đang hydrate bất đồng bộ để chống lỗi giật/nháy giao diện (Theme Flash).

---

## 5. Giới hạn của ứng dụng (Limitations)
- Ứng dụng hoạt động độc lập Offline, dữ liệu lưu cục bộ trong bộ nhớ Flash của thiết bị (AsyncStorage), chưa đồng bộ lên Cloud Database/REST API.
- Avatar sử dụng hình ảnh URL trực tuyến hoặc ảnh placeholder mặc định, chưa tích hợp chọn ảnh từ thư viện/camera thiết bị (`expo-image-picker`).

---

## 6. Nhật ký sử dụng AI (AI Usage Disclosure)
- Trí tuệ nhân tạo (AI Assistant) được sử dụng với vai trò là Mentor lập trình cặp (Pair-Programming Mentor) hỗ trợ sinh viên:
  - Hướng dẫn thiết lập Expo SDK 52 và cấu trúc thư mục chuẩn.
  - Tư vấn kiến trúc Context API và bọc Provider an toàn.
  - Đề xuất kịch bản kiểm thử (Test Matrix) và câu hỏi ôn tập phỏng vấn.
- Toàn bộ code đã được sinh viên trực tiếp chạy kiểm chứng trên thiết bị thật, hiểu rõ luồng dữ liệu và sẵn sàng giải thích/debug trực tiếp trước giảng viên.
