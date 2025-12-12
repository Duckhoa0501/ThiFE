function KiemTraemail(email){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function KiemTraDulieuForm(name, email, password){
    let KiemTraHopLe = true;
    if(name.length < 3){
        document.getElementById("name-error").innerText = "Tên phải có ít nhất 3 ký tự.";
        document.getElementById("name-error").classList.add("text-danger");
        KiemTraHopLe = false;
    }

    if(!KiemTraemail(email)){
        document.getElementById("email-error").innerText = "Email không hợp lệ.";
        document.getElementById("email-error").classList.add("text-danger");
        KiemTraHopLe = false;
    }

    if(password.length < 6){
        document.getElementById("password-error").innerText = "Mật khẩu phải có ít nhất 6 ký tự.";
        document.getElementById("password-error").classList.add("text-danger");
        KiemTraHopLe = false;
    }

    return KiemTraHopLe;

}

function XoaLoi() {
    const NewLable = {
        "name-error": "Name",
        "email-error": "Email",
        "password-error": "Mật khẩu"
    };

    Object.keys(NewLable).forEach(id => {
        const el = document.getElementById(id);
        el.innerText = NewLable[id];
        el.classList.remove("text-danger"); 
    });
}


async function DangKyTaiKhoan(){
    XoaLoi();
    const name = document.getElementById("reg-name").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;

    if(!KiemTraDulieuForm(name, email, password)){
        return;
    }

    try {
        const users = await apiGet(API_USERS);
        const exists = users.find(u => u.email === email);
        if (exists) {
            document.getElementById("email-error").innerText = "Email đã tồn tại!";
            document.getElementById("email-error").classList.add("text-danger");
            return;
        }
        const newUser = {
            name, email, password,
            createdAt: new Date().toISOString()
        };
        await apiPost(API_USERS, newUser);
        showAlert("Đăng ký thành công!", "success");
        switchLoginSignup();
    } catch (error) {
        showAlert("Lỗi đăng ký: " + error.message, "danger");
    }
}

// LOGIN
async function loginUser() {
    XoaLoi();
    
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (email === " " || password === "") {
        showAlert("Email hoặc mật khẩu không được để trống!", "danger");
        return;
    }

    if (!KiemTraemail(email)) {
        showAlert("Email không hợp lệ", "danger");
        return;
    }

    if (password.length < 6) {
        showAlert("Mật khẩu phải có ít nhất 6 ký tự", "danger");
        return;
    }

    try {
        const users = await apiGet(API_USERS);
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            showAlert("Sai email hoặc mật khẩu!", "danger");
            return;
        }

        localStorage.setItem("currentUser", JSON.stringify(user));
        showAlert("Đăng nhập thành công!", "success");
        setTimeout(() => {
            window.location.href = "shop.html";
        }, 500);
    } catch (error) {
        showAlert("Lỗi đăng nhập: " + error.message, "danger");
    }
}