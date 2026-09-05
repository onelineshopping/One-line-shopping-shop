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

let cart = [];

const list = document.getElementById("productsList");
const search = document.getElementById("search");

function displayProducts(items = products) {
  list.innerHTML = "";

  items.forEach((product) => {
    const index = products.indexOf(product);

    list.innerHTML += `
      <div class="product">
        ${product.images.map(image => `
          <img src="${image}" alt="${product.name}"
               style="width:100%; max-width:300px; display:block; margin:10px auto; border-radius:10px;">
        `).join("")}

        <h3>${product.name}</h3>

        <p style="text-decoration:line-through;">
          মূল্য: ৳${product.oldPrice}
        </p>

        <p style="font-size:20px; font-weight:bold;">
          🔥 ডিসকাউন্ট মূল্য: ৳${product.price}
        </p>

        <button onclick="addToCart(${index})">
          কার্টে যোগ করুন
        </button>
      </div>
    `;
  });
}

function addToCart(index) {
  const existingItem = cart.find(item => item.productIndex === index);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      productIndex: index,
      quantity: 1
    });
  }

  updateCart();
  alert("পণ্যটি কার্টে যোগ হয়েছে");
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const total = document.getElementById("total");
  const count = document.getElementById("count");

  cartItems.innerHTML = "";

  let sum = 0;
  let totalQuantity = 0;

  cart.forEach((cartItem, index) => {
    const item = products[cartItem.productIndex];
    const subtotal = item.price * cartItem.quantity;

    sum += subtotal;
    totalQuantity += cartItem.quantity;

    cartItems.innerHTML += `
      <div style="border-bottom:1px solid #ddd; padding:10px 0;">

        <p style="font-weight:bold;">
          ${item.name}
        </p>

        <p>
          ৳${item.price} × ${cartItem.quantity} পিস
          = <strong>৳${subtotal}</strong>
        </p>

        <div style="display:flex; align-items:center; gap:10px;">

          <button
            onclick="decreaseQuantity(${index})"
            style="padding:5px 12px; font-size:18px;">
            −
          </button>

          <span style="font-size:18px; font-weight:bold;">
            ${cartItem.quantity}
          </span>

          <button
            onclick="increaseQuantity(${index})"
            style="padding:5px 12px; font-size:18px;">
            +
          </button>

          <button
            onclick="removeFromCart(${index})"
            style="padding:5px 10px;">
            🗑️
          </button>

        </div>

      </div>
    `;
  });

  total.textContent = sum;
  count.textContent = totalQuantity;
}

function increaseQuantity(index) {
  cart[index].quantity += 1;
  updateCart();
}

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }

  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function showCart() {
  document.getElementById("cart").style.display = "block";
}

function hideCart() {
  document.getElementById("cart").style.display = "none";
}


/* =========================================
   CUSTOMER ORDER FORM
========================================= */

function order() {

  if (cart.length === 0) {
    alert("আপনার কার্ট খালি");
    return;
  }

  /* মোট হিসাব */

  let productTotal = 0;
  let totalWeight = 0;
  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    const item = products[cartItem.productIndex];

    productTotal += item.price * cartItem.quantity;
    totalWeight += item.weight * cartItem.quantity;
    totalQuantity += cartItem.quantity;
  });


  /* অর্ডার ফর্ম তৈরি */

  const oldForm = document.getElementById("orderFormBox");

  if (oldForm) {
    oldForm.remove();
  }

  const formBox = document.createElement("div");

  formBox.id = "orderFormBox";

  formBox.style.cssText = `
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.65);
    z-index:99999;
    overflow-y:auto;
    padding:20px;
    box-sizing:border-box;
  `;


  /* অর্ডারের পণ্য */

  let productsHTML = "";

  cart.forEach((cartItem, index) => {

    const item = products[cartItem.productIndex];
    const subtotal = item.price * cartItem.quantity;

    productsHTML += `
      <div style="
        background:#f8f8f8;
        border-radius:10px;
        padding:10px;
        margin-bottom:8px;
      ">

        <strong>${index + 1}. ${item.name}</strong>

        <br>

        <span>
          ${cartItem.quantity} পিস × ৳${item.price}
          = <strong>৳${subtotal}</strong>
        </span>

      </div>
    `;
  });


  formBox.innerHTML = `

    <div style="
      max-width:500px;
      margin:20px auto;
      background:white;
      border-radius:15px;
      padding:20px;
      box-sizing:border-box;
      box-shadow:0 5px 25px rgba(0,0,0,0.3);
    ">

      <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:15px;
      ">

        <h2 style="
          margin:0;
          color:#087f23;
        ">
          🛍️ অর্ডার ফর্ম
        </h2>

        <button
          type="button"
          onclick="closeOrderForm()"
          style="
            border:none;
            background:#eee;
            font-size:22px;
            width:40px;
            height:40px;
            border-radius:50%;
            cursor:pointer;
          ">
          ✕
        </button>

      </div>


      <p style="
        background:#eaf8ed;
        padding:10px;
        border-radius:8px;
        margin-top:0;
      ">
        আপনার অর্ডারের তথ্য নিচে পূরণ করুন।
      </p>


      <form id="customerOrderForm">

        <label><strong>👤 আপনার নাম *</strong></label>

        <input
          type="text"
          id="customerName"
          placeholder="আপনার সম্পূর্ণ নাম লিখুন"
          required
          style="
            width:100%;
            padding:12px;
            margin:7px 0 15px;
            border:1px solid #ccc;
            border-radius:8px;
            box-sizing:border-box;
            font-size:16px;
          "
        >


        <label><strong>📱 মোবাইল / WhatsApp নম্বর *</strong></label>

        <input
          type="tel"
          id="customerPhone"
          placeholder="যেমন: 01XXXXXXXXX"
          required
          style="
            width:100%;
            padding:12px;
            margin:7px 0 15px;
            border:1px solid #ccc;
            border-radius:8px;
            box-sizing:border-box;
            font-size:16px;
          "
        >


        <label><strong>🏠 সম্পূর্ণ ডেলিভারি ঠিকানা *</strong></label>

        <textarea
          id="customerAddress"
          placeholder="বাড়ি/রোড/এলাকার ঠিকানা লিখুন"
          required
          rows="3"
          style="
            width:100%;
            padding:12px;
            margin:7px 0 15px;
            border:1px solid #ccc;
            border-radius:8px;
            box-sizing:border-box;
            font-size:16px;
            resize:vertical;
          "
        ></textarea>


        <label><strong>🏡 গ্রাম / মহল্লা *</strong></label>

        <input
          type="text"
          id="customerVillage"
          placeholder="গ্রাম বা মহল্লার নাম"
          required
          style="
            width:100%;
            padding:12px;
            margin:7px 0 15px;
            border:1px solid #ccc;
            border-radius:8px;
            box-sizing:border-box;
            font-size:16px;
          "
        >


        <label><strong>🏢 থানা *</strong></label>

        <input
          type="text"
          id="customerThana"
          placeholder="থানার নাম"
          required
          style="
            width:100%;
            padding:12px;
            margin:7px 0 15px;
            border:1px solid #ccc;
            border-radius:8px;
            box-sizing:border-box;
            font-size:16px;
          "
        >


        <label><strong>📍 জেলা *</strong></label>

        <input
          type="text"
          id="customerDistrict"
          placeholder="জেলার নাম"
          required
          style="
            width:100%;
            padding:12px;
            margin:7px 0 15px;
            border:1px solid #ccc;
            border-radius:8px;
            box-sizing:border-box;
            font-size:16px;
          "
        >


        <label><strong>📮 পোস্ট / পোস্ট অফিস *</strong></label>

        <input
          type="text"
          id="customerPost"
          placeholder="পোস্ট অফিসের নাম"
          required
          style="
            width:100%;
            padding:12px;
            margin:7px 0 15px;
            border:1px solid #ccc;
            border-radius:8px;
            box-sizing:border-box;
            font-size:16px;
          "
        >


        <label><strong>🚚 ডেলিভারি এলাকা *</strong></label>

        <select
          id="deliveryLocation"
          required
          style="
            width:100%;
            padding:12px;
            margin:7px 0 15px;
            border:1px solid #ccc;
            border-radius:8px;
            box-sizing:border-box;
            font-size:16px;
            background:white;
          "
        >

          <option value="">ডেলিভারি এলাকা নির্বাচন করুন</option>
          <option value="ঢাকা">ঢাকার ভিতরে</option>
          <option value="বাইরে">ঢাকার বাইরে</option>

        </select>


        <label><strong>📝 অতিরিক্ত নির্দেশনা</strong> (ঐচ্ছিক)</label>

        <textarea
          id="customerNote"
          placeholder="কোনো বিশেষ নির্দেশনা থাকলে লিখুন"
          rows="2"
          style="
            width:100%;
            padding:12px;
            margin:7px 0 15px;
            border:1px solid #ccc;
            border-radius:8px;
            box-sizing:border-box;
            font-size:16px;
            resize:vertical;
          "
        ></textarea>


        <h3 style="
          margin-bottom:8px;
          color:#333;
        ">
          📦 আপনার অর্ডার
        </h3>

        ${productsHTML}


        <div style="
          background:#f1f1f1;
          padding:12px;
          border-radius:10px;
          margin-top:12px;
        ">

          <p style="margin:5px 0;">
            📦 মোট পিস:
            <strong>${totalQuantity}</strong>
          </p>

          <p style="margin:5px 0;">
            ⚖️ মোট ওজন:
            <strong>${totalWeight.toFixed(2)} কেজি</strong>
          </p>

          <p style="margin:5px 0;">
            💵 পণ্যের মোট মূল্য:
            <strong>৳${productTotal}</strong>
          </p>

          <p style="margin:5px 0;">
            🚚 ডেলিভারি চার্জ:
            <strong id="formDeliveryCharge">এলাকা নির্বাচন করুন</strong>
          </p>

          <p style="
            margin:10px 0 0;
            padding-top:10px;
            border-top:1px solid #ccc;
            font-size:19px;
          ">
            💰 সর্বমোট:
            <strong id="formGrandTotal">এলাকা নির্বাচন করুন</strong>
          </p>

        </div>


        <button
          type="submit"
          style="
            width:100%;
            margin-top:18px;
            padding:14px;
            border:none;
            border-radius:10px;
            background:#25D366;
            color:white;
            font-size:18px;
            font-weight:bold;
            cursor:pointer;
          "
        >
          📲 WhatsApp-এ অর্ডার কনফার্ম করুন
        </button>


        <button
          type="button"
          onclick="closeOrderForm()"
          style="
            width:100%;
            margin-top:10px;
            padding:12px;
            border:1px solid #ccc;
            border-radius:10px;
            background:#f5f5f5;
            font-size:16px;
            cursor:pointer;
          "
        >
          বাতিল
        </button>

      </form>

    </div>
  `;


  document.body.appendChild(formBox);


  /* ডেলিভারি চার্জ ও মোট আপডেট */

  const locationSelect =
    document.getElementById("deliveryLocation");

  const deliveryChargeText =
    document.getElementById("formDeliveryCharge");

  const grandTotalText =
    document.getElementById("formGrandTotal");


  function updateFormTotal() {

    const location = locationSelect.value;

    if (!location) {

      deliveryChargeText.textContent =
        "এলাকা নির্বাচন করুন";

      grandTotalText.textContent =
        "এলাকা নির্বাচন করুন";

      return;
    }


    let deliveryCharge =
      location === "ঢাকা" ? 80 : 180;


    /* ১ কেজির বেশি হলে প্রতি অতিরিক্ত কেজিতে ৳৩০ */

    if (totalWeight > 1) {

      const extraWeight =
        Math.ceil(totalWeight - 1);

      deliveryCharge +=
        extraWeight * 30;
    }


    const grandTotal =
      productTotal + deliveryCharge;


    deliveryChargeText.textContent =
      "৳" + deliveryCharge;

    grandTotalText.textContent =
      "৳" + grandTotal;
  }


  locationSelect.addEventListener(
    "change",
    updateFormTotal
  );


  /* Form Submit */

  document
    .getElementById("customerOrderForm")
    .addEventListener("submit", function(event) {

      event.preventDefault();


      const name =
        document.getElementById("customerName")
          .value.trim();

      const phone =
        document.getElementById("customerPhone")
          .value.trim();

      const address =
        document.getElementById("customerAddress")
          .value.trim();

      const village =
        document.getElementById("customerVillage")
          .value.trim();

      const thana =
        document.getElementById("customerThana")
          .value.trim();

      const district =
        document.getElementById("customerDistrict")
          .value.trim();

      const post =
        document.getElementById("customerPost")
          .value.trim();

      const location =
        document.getElementById("deliveryLocation")
          .value;

      const note =
        document.getElementById("customerNote")
          .value.trim();


      if (!name ||
          !phone ||
          !address ||
          !village ||
          !thana ||
          !district ||
          !post ||
          !location) {

        alert(
          "দয়া করে সব প্রয়োজনীয় তথ্য পূরণ করুন।"
        );

        return;
      }


      /* ডেলিভারি চার্জ */

      let deliveryCharge =
        location === "ঢাকা" ? 80 : 180;


      if (totalWeight > 1) {

        const extraWeight =
          Math.ceil(totalWeight - 1);

        deliveryCharge +=
          extraWeight * 30;
      }


      const grandTotal =
        productTotal + deliveryCharge;


      /* WhatsApp Message */

      let message =
        "🛍️ Online Shopping Shop - নতুন অর্ডার\n\n";


      message +=
        "👤 নাম: " +
        name +
        "\n";

      message +=
        "📞 যোগাযোগ নাম্বার: " +
        phone +
        "\n";

      message +=
        "🏠 সম্পূর্ণ ঠিকানা: " +
        address +
        "\n";

      message +=
        "🏡 গ্রাম/মহল্লা: " +
        village +
        "\n";

      message +=
        "🏢 থানা: " +
        thana +
        "\n";

      message +=
        "📍 জেলা: " +
        district +
        "\n";

      message +=
        "📮 পোস্ট: " +
        post +
        "\n";

      message +=
        "🚚 ডেলিভারি এলাকা: " +
        location +
        "\n\n";


      message +=
        "📦 অর্ডারের বিবরণ:\n";


      cart.forEach((cartItem, index) => {

        const item =
          products[cartItem.productIndex];

        const subtotal =
          item.price *
          cartItem.quantity;


        message +=
          (index + 1) +
          ". " +
          item.name +
          "\n   " +
          cartItem.quantity +
          " পিস × ৳" +
          item.price +
          " = ৳" +
          subtotal +
          "\n";
      });


      message +=
        "\n📦 মোট পিস: " +
        totalQuantity;

      message +=
        "\n⚖️ মোট ওজন: " +
        totalWeight.toFixed(2) +
        " কেজি";

      message +=
        "\n💵 পণ্যের মোট মূল্য: ৳" +
        productTotal;

      message +=
        "\n🚚 ডেলিভারি চার্জ: ৳" +
        deliveryCharge;

      message +=
        "\n💰 সর্বমোট: ৳" +
        grandTotal;


      if (note) {

        message +=
          "\n\n📝 অতিরিক্ত নির্দেশনা: " +
          note;
      }


      /* তোমার WhatsApp নম্বর */

      const whatsappNumber =
        "8801410153135";


      const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);


      window.open(
        whatsappURL,
        "_blank"
      );

    });

}


/* =========================================
   CLOSE ORDER FORM
========================================= */

function closeOrderForm() {

  const form =
    document.getElementById("orderFormBox");

  if (form) {
    form.remove();
  }

}


/* =========================================
   SEARCH
========================================= */

if (search) {

  search.addEventListener(
    "input",
    function() {

      const text =
        this.value.toLowerCase();

      const filtered =
        products.filter(product =>
          product.name
            .toLowerCase()
            .includes(text)
        );

      displayProducts(filtered);

    }
  );

}


/* =========================================
   START
========================================= */

displayProducts();