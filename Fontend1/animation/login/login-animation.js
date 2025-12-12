// Xử lý hiệu ứng cho div login/signup
const inputs = document.querySelectorAll(".input-field");
inputs.forEach(inp => {
    inp.addEventListener("focus", () => {
        inp.classList.add("active");
    });
    inp.addEventListener("blur", () => {
        if (inp.value != "") return;
        inp.classList.remove("active");
    });
});

// Hàm di chuyển qua lại giữa login và sign up
function switchLoginSignup() {
    const main = document.querySelector(".container");
    main.classList.toggle("sign-up-mode");
}
// Gán sự kiện cho nút chuyển đổi giữa 2 form login và sign up
const toggle_btn = document.querySelectorAll(".toggle");
toggle_btn.forEach(btn => {
    btn.addEventListener("click", switchLoginSignup);
});

// Slider tự động chuyển ảnh
const bullets = document.querySelectorAll(".bullets  span");
const images = document.querySelectorAll(".image");
let currentIndex = 1;

function moveSliderAuto(index) {
    let currentImage = document.querySelector(`.img-${index}`);
    images.forEach(img => img.classList.remove("show"));
    currentImage.classList.add("show");

    bullets.forEach(bull => bull.classList.remove("active"));
    document.querySelector(`.bullets span[data-value="${index}"]`).classList.add("active");
}

setInterval(() => {
    currentIndex++;
    if (currentIndex > images.length) currentIndex = 1;
    moveSliderAuto(currentIndex);
}, 3000);

bullets.forEach(bullet => {
    bullet.addEventListener("click", function () {
        currentIndex = parseInt(this.dataset.value);
        moveSliderAuto(currentIndex);
    });
});

