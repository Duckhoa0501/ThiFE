const API_USERS = "https://693ab8519b80ba7262cb15bb.mockapi.io/users";
const API_SERVICES = "https://693ab8519b80ba7262cb15bb.mockapi.io/services";

// Lấy tất cả API trong hệ thống
async function apiGet(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}

// Thêm mới API vào hệ thống
async function apiPost(url, data) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}

// Cập nhật API trong hệ thống
async function apiPut(url, data) {
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}

// Xoá API khỏi hệ thống
async function apiDelete(url) {
    try {
        const response = await fetch(url, { method: "DELETE" });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}

// Hiển thị thông báo
function showAlert(message, type = "info") {
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
    alertDiv.style.zIndex = "9999";
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// Kiểm tra trạng thái đăng nhập
function checkAuth() {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        window.location.href = "login.html";
    }
}

// Đăng xuất người dùng
function logoutUser() {
    if (confirm("Tài khoản của bạn sẽ đăng xuất. Bạn sẽ được chuyển đến trang đăng nhập.")) {
        localStorage.removeItem("currentUser");
        window.location.href = "login.html";
    }
}

