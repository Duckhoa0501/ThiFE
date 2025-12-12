let allshop = [];
let editIdshop = null;

async function loadshop() {
    try {
        allshop = await apiGet(API_SERVICES);
        populateDestinationFilter();
        renderShop(allshop);
    } catch (error) {
        showAlert("Lỗi khi tải dữ liệu cửa hàng.", "danger");
    }
}
//Populate destination filter dropdown
function populateDestinationFilter() {
    const destinations = [...new Set(allshop.map(shop => shop.loai))];
    const select = document.getElementById("destinationFilter");
    
    destinations.forEach(dest => {
        const option = document.createElement("option");
        option.value = dest;
        option.textContent = dest;
        select.appendChild(option);
    });
    updatePageLanguage();
}

// render
function renderShop(shopList) {
    const shopContainer = document.getElementById("shopList");
    shopContainer.innerHTML = "";

    if(shopList.length === 0) {
        shopContainer.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info text-center">
                    <i class="fas fa-info-circle me-2"></i>
                    <span data-i18n="no_tours">Không có sản phẩm nào</span>
                </div>
            </div>
        `;
        updatePageLanguage();
        return;
    }

    shopList.forEach((shop) => {
        const isFavorite = JSON.parse(localStorage.getItem("favorites") || "[]").includes(shop.id);
        shopContainer.innerHTML += `
        <div class="col-md-3 mb-4">
            <div class="product-card p-3 shadow-sm rounded">
              <img src="${shop.img}" class="img-fluid rounded" alt="Product">
                <div class="mt-3">
                    <h6 class="text-muted mb-1">${shop.title}</h6>
                    <h5 class="fw-bold">${shop.loai}</h5>
                    <h5 class="text-dark">$ ${shop.giatien}</h5>
                    <p class="card-text small text-muted flex-grow-1">${shop.mota || 'Không có mô tả'}</p>
                </div>
                <button class="btn btn-outline-danger btn-sm btn-favorite ${isFavorite ? 'active' : ''}" onclick="toggleFavorite('${shop.id}')" title="Thêm yêu thích">
                    <i class="ri-heart-fill"></i>
                </button>
                <button class="btn btn-light border mt-2 w-100"><i class="ri-shopping-cart-2-line"></i></button>
                <button class="btn btn-primary btn-sm" onclick="openEditTour('${shop.id}')" title="Sửa">
                    <i class="ri-pencil-line"></i>
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteTour('${shop.id}')" title="Xóa">
                    <i class="ri-delete-bin-5-line"></i>
                </button>
            </div>
        </div>
        `; 
    });
}

async function openEditShop(id) {
    try {
        const shop = await apiGet(`${API_SERVICES}/${id}`);
        editIdshop = id;

        document.getElementById("shopId").value = id;
        document.getElementById("shopImg").value = shop.img;
        document.getElementById("shopTitle").value = shop.title;
        document.getElementById("shopLoai").value = shop.loai;
        document.getElementById("shopGia").value = shop.giatien;
        document.getElementById("shopMota").value = shop.mota || "";

        document.getElementById("modalTitle").textContent = "Sửa sản phẩm";

        const modal = new bootstrap.Modal(document.getElementById("addShopModal"));
        modal.show();

    } catch (err) {
        showAlert("Lỗi khi tải sản phẩm: " + err.message, "danger");
    }
}
