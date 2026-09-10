// B4UFFEU Shop Fetcher - রিয়েল-টাইমে ডাটাবেজ থেকে দোকানের নাম আনার জন্য
async function fetchShops() {
    const shopGrid = document.querySelector('.product-grid');
    if (!shopGrid) return;

    console.log("Fetching shops from Firestore...");

    // 'shops' কালেকশন থেকে ডাটা আনা
    db.collection("shops").orderBy("priority", "asc").onSnapshot((snapshot) => {
        if (snapshot.empty) {
            console.log("No shops found in Firestore.");
            return;
        }

        // আগে থেকে থাকা হার্ডকোড করা আইটেমগুলো পরিষ্কার করা (ইচ্ছা হলে রাখতে পারেন)
        shopGrid.innerHTML = '';

        snapshot.forEach((doc) => {
            const shop = doc.data();
            if (shop.isActive === false) return; // শুধুমাত্র একটিভ শপগুলো দেখাবে

            const shopCard = `
                <div class="product-card" onclick="loadShopPage('${doc.id}')">
                    <div class="product-image">
                        <img src="${shop.imageUrl || 'assets/images/shop_images/default.png'}" alt="${shop.name}">
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${shop.name}</h3>
                        <button class="buy-btn">
                            <i class="fas fa-cart-shopping btn-icon"></i>
                            <span>Order Now</span>
                        </button>
                    </div>
                </div>
            `;
            shopGrid.innerHTML += shopCard;
        });
    });
}

// পেজ লোড হলে ফাংশনটি কল করা
document.addEventListener('DOMContentLoaded', fetchShops);
