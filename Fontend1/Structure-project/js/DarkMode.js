// hàm chuyển đổi chế độ sáng/tối
function toggleDarkMode() {
    const isDarkMode = document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);
    updateThemeButton();
}

// hàm cập nhật biểu tượng nút chuyển đổi chủ đề
function updateThemeButton() {
    const isDarkMode = document.body.classList.contains("dark-mode");
    const btn = document.getElementById("themeBtn");
    if (btn) {
        btn.innerHTML = isDarkMode ? '<i class="ri-sun-fill"></i>' : '<i class="ri-moon-fill"></i>';
    }
}

// khởi tạo trạng thái chế độ tối khi tải trang
document.addEventListener("DOMContentLoaded", () => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    if (isDarkMode) {
        document.body.classList.add("dark-mode");
    }
    updateThemeButton();
});