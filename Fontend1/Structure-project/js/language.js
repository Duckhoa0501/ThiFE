const translations = { 
    vi: { 
        logout: "Đăng xuất",
        Product: "Sản phẩm",
        favorites: "Yêu thích",
        cart: "Giỏ hàng"

    },
    en: {
        logout: "Logout",
        Product: "Product",
        favorites: "Favorites",
        cart: "Cart"
    }
}

// Hàm lấy ngon ngữ hiện tại
function NgonNGuHienTai() {
    return localStorage.getItem("language") || "vi";
}

// Hàm thay đổi ngôn ngữ
function changeLanguage(lang) {
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
    updatePageLanguage();
}

// Hàm cập nhật ngôn ngữ trên trang
function updatePageLanguage() {
    const lang = NgonNGuHienTai();
    document.querySelectorAll("[data-language]").forEach(el => {
        const key = el.getAttribute("data-language");
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    
    // Cập nhật giá trị của dropdown chọn ngôn ngữ nếu có
    const langSelect = document.getElementById("langSelect");
    if (langSelect) {
        langSelect.value = lang;
    }
}

// Khởi tạo ngôn ngữ khi tải trang
document.addEventListener("DOMContentLoaded", () => {
    const lang = NgonNGuHienTai();
    document.documentElement.lang = lang;
    updatePageLanguage();
});