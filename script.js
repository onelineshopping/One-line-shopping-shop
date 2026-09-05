<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Online Shopping Shop</title>

  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: Arial, sans-serif;
      background: #f5f7f9;
      color: #222;
    }

    header {
      background: #087f5b;
      color: white;
      padding: 15px;
      text-align: center;
      position: sticky;
      top: 0;
      z-index: 10;
    }

    header h1 {
      font-size: 24px;
      margin-bottom: 10px;
    }

    .search-box {
      max-width: 600px;
      margin: auto;
    }

    .search-box input {
      width: 100%;
      padding: 12px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      outline: none;
    }

    .container {
      max-width: 1100px;
      margin: 25px auto;
      padding: 0 15px;
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 20px;
    }

    .product-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 3px 12px rgba(0,0,0,0.1);
      padding-bottom: 15px;
    }

    .product-images {
      display: flex;
      overflow-x: auto;
      gap: 5px;
      padding: 5px;
    }

    .product-images img {
      width: 100%;
      min-width: 100%;
      height: 300px;
      object-fit: cover;
      border-radius: 8px;
    }

    .product-info {
      padding: 15px;
    }

    .product-info h2 {
      font-size: 19px;
      margin-bottom: 10px;
    }

    .old-price {
      text-decoration: line-through;
      color: #888;
      margin-right: 8px;
    }

    .price {
      color: #e63946;
      font-size: 22px;
      font-weight: bold;
    }

    .weight {
      color: #666;
      margin: 10px 0;
    }

    button {
      border: none;
      cursor: pointer;
      border-radius: 7px;
      padding: 11px 16px;
      font-size: 16px;
    }

    .order-btn {
      width: 100%;
      background: #087f5b;
      color: white;
      font-weight: bold;
    }

    .order-btn:hover {
      background: #066b4d;
    }

    .cart-button {
      position: fixed;
      right: 15px;
      bottom: 15px;
      background: #e63946;
      color: white;
      border-radius: 50px;
      padding: 14px 20px;
      z-index: 20;
      font-weight: bold;
    }

    .modal {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.6);
      z-index: 100;
      overflow-y: auto;
      padding: 20px;
    }

    .modal-content {
      background: white;
      max-width: 600px;
      margin: 30px auto;
      border-radius: 12px;
      padding: 20px;
      position: relative;
    }

    .close {
      position: absolute;
      right: 15px;
      top: 10px;
      font-size: 28px;
      cursor: pointer;
      color: #555;
    }

    .modal-content h2 {
      margin-bottom: 18px;
      color: #087f5b;
    }

    .cart-item {
      border-bottom: 1px solid #ddd;
      padding: 12px 0;
    }

    .cart-item-name {
      font-weight: bold;
      margin-bottom: 8px;
    }

    .quantity-control {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 8px 0;
    }

    .quantity-control button {
      width: 35px;
      height: 35px;
      padding: 0;
      background: #087f5b;
      color: white;
      font-size: 20px;
    }

    .remove-btn {
      background: #e63946;
      color: white;
      padding: 7px 12px;
      font-size: 14px;
    }

    .summary {
      margin-top: 15px;
      padding-top: 15px;
      border-top: 2px solid #087f5b;
    }

    .summary p {
      display: flex;
      justify-content: space-between;
      margin: 7px 0;
    }

    .grand-total {
      font-size: 21px;
      font-weight: bold;
      color: #e63946;
    }

    .form-group {
      margin-bottom: 12px;
    }

    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }

    .form-group input,
    .form-group textarea,
    .form-group select {
      width: 100%;
      padding: 11px;
      border: 1px solid #ccc;
      border-radius: 7px;
      font-size: 16px;
      outline: none;
    }

    textarea {
      min-height: 80px;
      resize: vertical;
    }

    .confirm-btn {
      width: 100%;
      background: #087f5b;
      color: white;
      font-weight: bold;
      margin-top: 10px;
    }

    .success-box {
      text-align: center;
      padding: 15px;
    }

    .success-icon {
      font-size: 55px;
      margin-bottom: 10px;
    }

    .success-box h2 {
      color: #087f5b;
    }

    .order-id {
      background: #f1f3f5;
      padding: 12px;
      border-radius: 8px;
      margin: 15px 0;
      font-size: 18px;
      font-weight: bold;
    }

    .whatsapp-btn {
      display: block;
      width: 100%;
      background: #25D366;
      color: white;
      text-decoration: none;
      padding: 13px;
      border-radius: 7px;
      font-size: 17px;
      font-weight: bold;
      margin-top: 10px;
    }

    .empty-cart {
      text-align: center;
      padding: 30px 10px;
      color: #777;
    }

    @media (max-width: 600px) {
      header h1 {
        font-size: 20px;
      }

      .product-images img {
        height: 270px;
      }

      .modal {
        padding: 10px;
      }

      .modal-content {
        margin: 15px auto;
      }
    }
  </style>
</head>

<body>

<header>
  <h1>🛍️ Online Shopping Shop</h1>

  <div class="search-box">
    <input
      type="text"
      id="searchInput"
      placeholder="পণ্য খুঁজুন..."
      oninput="searchProducts()"
    >
  </div>
</header>

<div class="container">
  <div id="productGrid" class="product-grid"></div>
</div>

<button class="cart-button" onclick="openCart()">
  🛒 কার্ট (<span id="cartCount">0</span>)
</button>


<!-- CART MODAL -->
<div id="cartModal" class="modal">
  <div class="modal-content">

    <span class="close" onclick="closeCart()">×</span>

    <h2>🛒 আপনার কার্ট</h2>

    <div id="cartItems"></div>

    <div id="cartSummary"></div>

    <button
      class="confirm-btn"
      onclick="openOrderForm()"
    >
      অর্ডার কনফার্ম করুন
    </button>

  </div>
</div>


<!-- ORDER FORM MODAL -->
<div id="orderModal" class="modal">
  <div class="modal-content">

    <span class="close" onclick="closeOrderForm()">×</span>

    <h2>📦 অর্ডারের তথ্য</h2>

    <form id="orderForm">

      <div class="form-group">
        <label>আপনার নাম *</label>
        <input
          type="text"
          id="customerName"
          required
          placeholder="আপনার পূর্ণ নাম"
        >
      </div>

      <div class="form-group">
        <label>মোবাইল নম্বর *</label>
        <input
          type="tel"
          id="customerPhone"
          required
          placeholder="01XXXXXXXXX"
        >
      </div>

      <div class="form-group">
        <label>সম্পূর্ণ ঠিকানা *</label>
        <textarea
          id="customerAddress"
          required
          placeholder="বাড়ি/রোড/এলাকার ঠিকানা"
        ></textarea>
      </div>

      <div class="form-group">
        <label>গ্রাম/এলাকা</label>
        <input
          type="text"
          id="customerVillage"
          placeholder="গ্রাম বা এলাকা"
        >
      </div>

      <div class="form-group">
        <label>থানা/উপজেলা *</label>
        <input
          type="text"
          id="customerThana"
          required
          placeholder="থানা/উপজেলা"
        >
      </div>

      <div class="form-group">
        <label>জেলা *</label>
        <input
          type="text"
          id="customerDistrict"
          required
          placeholder="জেলার নাম"
        >
      </div>

      <div class="form-group">
        <label>পোস্ট অফিস</label>
        <input
          type="text"
          id="customerPost"
          placeholder="পোস্ট অফিস"
        >
      </div>

      <div class="form-group">
        <label>ডেলিভারি এলাকা *</label>

        <select id="deliveryLocation" required onchange="updateOrderSummary()">
          <option value="">নির্বাচন করুন</option>
          <option value="dhaka">ঢাকার ভিতরে — ৳80</option>
          <option value="outside">ঢাকার বাইরে — ৳180</option>
        </select>
      </div>

      <div class="form-group">
        <label>অতিরিক্ত নোট</label>

        <textarea
          id="customerNote"
          placeholder="কোনো বিশেষ নির্দেশনা থাকলে লিখুন"
        ></textarea>
      </div>

      <div id="orderSummary"></div>

      <button
        type="submit"
        class="confirm-btn"
      >
        ✅ অর্ডার কনফার্ম করুন
      </button>

    </form>

  </div>
</div>


<!-- SUCCESS MODAL -->
<div id="successModal" class="modal">
  <div class="modal-content">

    <span class="close" onclick="closeSuccess()">×</span>

    <div class="success-box">

      <div class="success-icon">✅</div>

      <h2>অর্ডার সফলভাবে কনফার্ম হয়েছে!</h2>

      <div class="order-id">
        অর্ডার ID:
        <span id="successOrderId"></span>
      </div>

      <p>
        আপনার অর্ডারটি আমরা পেয়েছি।
      </p>

      <p style="margin-top:10px;">
        অর্ডারের বিস্তারিত WhatsApp-এ পাঠানো হয়েছে।
      </p>

      <p style="margin-top:10px;">
        📱 SMS কনফার্মেশনও পাঠানোর ব্যবস্থা রাখা হয়েছে।
      </p>

      <a
        id="whatsappLink"
        class="whatsapp-btn"
        href="#"
        target="_blank"
      >
        💬 WhatsApp-এ অর্ডার দেখুন
      </a>

    </div>

  </div>
</div>


<script>

  /* =========================
     PRODUCT DATA
  ========================= */

  const products = [
    {
      name: "লেডিস ফ্লোরাল ড্রেস সেট",
      oldPrice: 1200,
      price: 850,
      weight: 0.3,

      images: [
        "IMG-20260807-WA0043.jpg",
        "IMG-20260807-WA0045.jpg",
        "IMG-20260807-WA0046.jpg"
      ]
    }
  ];


  /* =========================
     CART
  ========================= */

  let cart = [];


  /* =========================
     SHOW PRODUCTS
  ========================= */

  function displayProducts(list = products) {

    const grid = document.getElementById("productGrid");

    grid.innerHTML = "";

    if (list.length === 0) {

      grid.innerHTML = `
        <p style="text-align:center; grid-column:1/-1;">
          কোনো পণ্য পাওয়া যায়নি।
        </p>
      `;

      return;
    }


    list.forEach((product, index) => {

      const card = document.createElement("div");

      card.className = "product-card";

      card.innerHTML = `

        <div class="product-images">

          ${product.images.map(image => `
            <img
              src="${image}"
              alt="${product.name}"
            >
          `).join("")}

        </div>

        <div class="product-info">

          <h2>${product.name}</h2>

          <div>
            <span class="old-price">
              ৳${product.oldPrice}
            </span>

            <span class="price">
              ৳${product.price}
            </span>
          </div>

          <div class="weight">
            ⚖️ ওজন: ${product.weight} কেজি
          </div>

          <button
            class="order-btn"
            onclick="addToCart(${index})"
          >
            🛒 অর্ডার করুন
          </button>

        </div>
      `;

      grid.appendChild(card);

    });

  }


  /* =========================
     ADD TO CART
  ========================= */

  function addToCart(index) {

    const product = products[index];

    const existing = cart.find(
      item => item.name === product.name
    );


    if (existing) {

      existing.quantity++;

    } else {

      cart.push({
        ...product,
        quantity: 1
      });

    }


    updateCartCount();

    openCart();

  }


  /* =========================
     PLUS
  ========================= */

  function increaseQuantity(index) {

    cart[index].quantity++;

    renderCart();

    updateCartCount();

    updateOrderSummary();

  }


  /* =========================
     MINUS
  ========================= */

  function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

      cart[index].quantity--;

    } else {

      cart.splice(index, 1);

    }


    renderCart();

    updateCartCount();

    updateOrderSummary();

  }


  /* =========================
     REMOVE
  ========================= */

  function removeFromCart(index) {

    cart.splice(index, 1);

    renderCart();

    updateCartCount();

    updateOrderSummary();

  }


  /* =========================
     CART COUNT
  ========================= */

  function updateCartCount() {

    const count = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );

    document.getElementById("cartCount").textContent = count;

  }


  /* =========================
     TOTAL CALCULATION
  ========================= */

  function calculateTotals() {

    let productTotal = 0;

    let totalWeight = 0;

    let totalItems = 0;


    cart.forEach(item => {

      productTotal += item.price * item.quantity;

      totalWeight += item.weight * item.quantity;

      totalItems += item.quantity;

    });


    let deliveryCharge = 0;


    const location =
      document.getElementById("deliveryLocation")?.value;


    if (location === "dhaka") {

      deliveryCharge = 80;

    } else if (location === "outside") {

      deliveryCharge = 180;

    }


    /*
      ১ কেজির বেশি হলে
      প্রতি অতিরিক্ত কেজিতে ৳30
    */

    if (totalWeight > 1) {

      const extraKg = Math.ceil(totalWeight - 1);

      deliveryCharge += extraKg * 30;

    }


    const grandTotal =
      productTotal + deliveryCharge;


    return {
      productTotal,
      totalWeight,
      totalItems,
      deliveryCharge,
      grandTotal
    };

  }


  /* =========================
     RENDER CART
  ========================= */

  function renderCart() {

    const container =
      document.getElementById("cartItems");

    const summary =
      document.getElementById("cartSummary");


    if (cart.length === 0) {

      container.innerHTML = `
        <div class="empty-cart">
          🛒 আপনার কার্ট খালি।
        </div>
      `;

      summary.innerHTML = "";

      return;

    }


    container.innerHTML = "";


    cart.forEach((item, index) => {

      const subtotal =
        item.price * item.quantity;


      const div =
        document.createElement("div");


      div.className = "cart-item";


      div.innerHTML = `

        <div class="cart-item-name">
          ${item.name}
        </div>

        <div>
          প্রতি পিস: ৳${item.price}
        </div>

        <div class="quantity-control">

          <button
            onclick="decreaseQuantity(${index})"
          >
            −
          </button>

          <strong>
            ${item.quantity}
          </strong>

          <button
            onclick="increaseQuantity(${index})"
          >
            +
          </button>

        </div>

        <div>
          পণ্যের মোট:
          <strong>৳${subtotal}</strong>
        </div>

        <button
          class="remove-btn"
          onclick="removeFromCart(${index})"
        >
          🗑️ বাদ দিন
        </button>

      `;


      container.appendChild(div);

    });


    const totals = calculateTotals();


    summary.innerHTML = `

      <div class="summary">

        <p>
          <span>মোট পণ্য:</span>
          <strong>${totals.totalItems} পিস</strong>
        </p>

        <p>
          <span>মোট ওজন:</span>
          <strong>${totals.totalWeight.toFixed(2)} কেজি</strong>
        </p>

        <p>
          <span>পণ্যের মূল্য:</span>
          <strong>৳${totals.productTotal}</strong>
        </p>

        <p>
          <span>ডেলিভারি চার্জ:</span>
          <strong>৳${totals.deliveryCharge}</strong>
        </p>

        <p class="grand-total">
          <span>সর্বমোট:</span>
          <strong>৳${totals.grandTotal}</strong>
        </p>

      </div>

    `;

  }


  /* =========================
     OPEN CART
  ========================= */

  function openCart() {

    document.getElementById("cartModal").style.display =
      "block";

    renderCart();

  }


  function closeCart() {

    document.getElementById("cartModal").style.display =
      "none";

  }


  /* =========================
     ORDER FORM
  ========================= */

  function openOrderForm() {

    if (cart.length === 0) {

      alert("আপনার কার্টে কোনো পণ্য নেই।");

      return;

    }


    closeCart();

    document.getElementById("orderModal").style.display =
      "block";

    updateOrderSummary();

  }


  function closeOrderForm() {

    document.getElementById("orderModal").style.display =
      "none";

  }


  /* =========================
     ORDER SUMMARY
  ========================= */

  function updateOrderSummary() {

    const box =
      document.getElementById("orderSummary");


    if (!box || cart.length === 0) return;


    const totals = calculateTotals();


    box.innerHTML = `

      <div class="summary">

        <p>
          <span>মোট পণ্য:</span>
          <strong>${totals.totalItems} পিস</strong>
        </p>

        <p>
          <span>মোট ওজন:</span>
          <strong>${totals.totalWeight.toFixed(2)} কেজি</strong>
        </p>

        <p>
          <span>পণ্যের মূল্য:</span>
          <strong>৳${totals.productTotal}</strong>
        </p>

        <p>
          <span>ডেলিভারি চার্জ:</span>
          <strong>৳${totals.deliveryCharge}</strong>
        </p>

        <p class="grand-total">
          <span>সর্বমোট:</span>
          <strong>৳${totals.grandTotal}</strong>
        </p>

      </div>

    `;

  }


  /* =========================
     CREATE ORDER ID
  ========================= */

  function createOrderId() {

    const now = new Date();

    const date =
      now.getFullYear().toString().slice(-2) +
      String(now.getMonth() + 1).padStart(2, "0") +
      String(now.getDate()).padStart(2, "0");


    const random =
      Math.floor(1000 + Math.random() * 9000);


    return "OSS-" + date + "-" + random;

  }


  /* =========================
     ORDER FORM SUBMIT
  ========================= */

  document
    .getElementById("orderForm")
    .addEventListener("submit", function(event) {

      event.preventDefault();


      if (cart.length === 0) {

        alert("আপনার কার্ট খালি।");

        return;

      }


      const customerName =
        document.getElementById("customerName").value.trim();


      const customerPhone =
        document.getElementById("customerPhone").value.trim();


      const customerAddress =
        document.getElementById("customerAddress").value.trim();


      const customerVillage =
        document.getElementById("customerVillage").value.trim();


      const customerThana =
        document.getElementById("customerThana").value.trim();


      const customerDistrict =
        document.getElementById("customerDistrict").value.trim();


      const customerPost =
        document.getElementById("customerPost").value.trim();


      const deliveryLocation =
        document.getElementById("deliveryLocation").value;


      const customerNote =
        document.getElementById("customerNote").value.trim();


      if (!deliveryLocation) {

        alert("দয়া করে ডেলিভারি এলাকা নির্বাচন করুন।");

        return;

      }


      const totals = calculateTotals();

      const orderId = createOrderId();


      let itemsText = "";


      cart.forEach(item => {

        const subtotal =
          item.price * item.quantity;


        itemsText +=
          `• ${item.name} × ${item.quantity} = ৳${subtotal}\n`;

      });


      const deliveryText =
        deliveryLocation === "dhaka"
          ? "ঢাকার ভিতরে"
          : "ঢাকার বাইরে";


      /*
        WhatsApp message
      */

      const message =

`🛍️ Online Shopping Shop

✅ নতুন অর্ডার

অর্ডার ID: ${orderId}

👤 কাস্টমারের তথ্য:
নাম: ${customerName}
মোবাইল: ${customerPhone}

📍 ঠিকানা:
${customerAddress}
গ্রাম/এলাকা: ${customerVillage}
থানা/উপজেলা: ${customerThana}
জেলা: ${customerDistrict}
পোস্ট অফিস: ${customerPost}

🚚 ডেলিভারি:
${deliveryText}

🛒 অর্ডারের পণ্য:
${itemsText}

📦 মোট পণ্য: ${totals.totalItems} পিস
⚖️ মোট ওজন: ${totals.totalWeight.toFixed(2)} কেজি

💰 পণ্যের মূল্য: ৳${totals.productTotal}
🚚 ডেলিভারি চার্জ: ৳${totals.deliveryCharge}

💵 সর্বমোট: ৳${totals.grandTotal}

💳 পেমেন্ট: Cash on Delivery

📝 নোট:
${customerNote || "কোনো নোট নেই"}

ধন্যবাদ ❤️`;


      const whatsappNumber =
        "8801410153135";


      const whatsappUrl =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);


      /*
        SMS-ready data
        --------------------------------
        এখানে এখনো SMS API call করা হচ্ছে না।
        Backend যুক্ত হলে এই তথ্য backend-এ
        পাঠানো হবে।
      */

      const smsMessage =
        `আপনার অর্ডার ${orderId} সফলভাবে কনফার্ম হয়েছে। মোট: ৳${totals.grandTotal}. Online Shopping Shop`;


      /*
        সফল অর্ডার
      */

      closeOrderForm();


      document.getElementById("successOrderId").textContent =
        orderId;


      document.getElementById("whatsappLink").href =
        whatsappUrl;


      document.getElementById("successModal").style.display =
        "block";


      /*
        WhatsApp খুলবে
      */

      window.open(
        whatsappUrl,
        "_blank"
      );


      /*
        কার্ট পরিষ্কার
      */

      cart = [];

      updateCartCount();

      renderCart();


      /*
        ভবিষ্যতের SMS backend-এর জন্য
        ডাটা প্রস্তুত রাখা হলো।
      */

      console.log({
        orderId,
        customerName,
        customerPhone,
        smsMessage,
        total: totals.grandTotal
      });

    });


  /* =========================
     SUCCESS MODAL
  ========================= */

  function closeSuccess() {

    document.getElementById("successModal").style.display =
      "none";

  }


  /* =========================
     SEARCH
  ========================= */

  function searchProducts() {

    const search =
      document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();


    const filtered =
      products.filter(product =>
        product.name
          .toLowerCase()
          .includes(search)
      );


    displayProducts(filtered);

  }


  /* =========================
     CLOSE MODAL OUTSIDE
  ========================= */

  window.addEventListener("click", function(event) {

    const cartModal =
      document.getElementById("cartModal");

    const orderModal =
      document.getElementById("orderModal");

    const successModal =
      document.getElementById("successModal");


    if (event.target === cartModal) {

      closeCart();

    }


    if (event.target === orderModal) {

      closeOrderForm();

    }


    if (event.target === successModal) {

      closeSuccess();

    }

  });


  /* =========================
     INITIAL LOAD
  ========================= */

  displayProducts();

  updateCartCount();

</script>

</body>
</html>