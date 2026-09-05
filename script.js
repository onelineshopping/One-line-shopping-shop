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

function order() {
  if (cart.length === 0) {
    alert("আপনার কার্ট খালি");
    return;
  }

  const name = prompt("আপনার নাম লিখুন:");

  if (!name || !name.trim()) {
    alert("দয়া করে আপনার নাম লিখুন");
    return;
  }

  const fullAddress = prompt("আপনার সম্পূর্ণ ঠিকানা লিখুন:");

  if (!fullAddress || !fullAddress.trim()) {
    alert("দয়া করে আপনার সম্পূর্ণ ঠিকানা লিখুন");
    return;
  }

  const village = prompt("আপনার গ্রামের নাম লিখুন:");

  if (!village || !village.trim()) {
    alert("দয়া করে আপনার গ্রামের নাম লিখুন");
    return;
  }

  const thana = prompt("আপনার থানার নাম লিখুন:");

  if (!thana || !thana.trim()) {
    alert("দয়া করে আপনার থানার নাম লিখুন");
    return;
  }

  const district = prompt("আপনার জেলার নাম লিখুন:");

  if (!district || !district.trim()) {
    alert("দয়া করে আপনার জেলার নাম লিখুন");
    return;
  }

  const post = prompt("আপনার পোস্ট/পোস্ট অফিসের নাম লিখুন:");

  if (!post || !post.trim()) {
    alert("দয়া করে আপনার পোস্ট/পোস্ট অফিসের নাম লিখুন");
    return;
  }

  const phone = prompt("আপনার যোগাযোগ নাম্বার লিখুন:");

  if (!phone || !phone.trim()) {
    alert("দয়া করে আপনার যোগাযোগ নাম্বার লিখুন");
    return;
  }

  let productTotal = 0;
  let totalWeight = 0;
  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    const item = products[cartItem.productIndex];

    productTotal += item.price * cartItem.quantity;
    totalWeight += item.weight * cartItem.quantity;
    totalQuantity += cartItem.quantity;
  });

  const location = prompt(
    "ডেলিভারি এলাকা লিখুন:\n\n" +
    "ঢাকার ভিতরে হলে লিখুন: ঢাকা\n" +
    "ঢাকার বাইরে হলে লিখুন: বাইরে"
  );

  if (!location || !location.trim()) {
    alert("দয়া করে ডেলিভারি এলাকা লিখুন");
    return;
  }

  let deliveryCharge;

  if (location.trim() === "ঢাকা") {
    deliveryCharge = 80;
  } else {
    deliveryCharge = 180;
  }

  // ১ কেজির বেশি হলে প্রতি অতিরিক্ত কেজিতে ৳৩০
  if (totalWeight > 1) {
    const extraWeight = Math.ceil(totalWeight - 1);
    deliveryCharge += extraWeight * 30;
  }

  const grandTotal = productTotal + deliveryCharge;

  let message =
    "🛍️ Online Shopping Shop - নতুন অর্ডার\n\n";

  message += "👤 নাম: " + name.trim() + "\n";
  message += "🏠 সম্পূর্ণ ঠিকানা: " + fullAddress.trim() + "\n";
  message += "🏡 গ্রাম: " + village.trim() + "\n";
  message += "🏢 থানা: " + thana.trim() + "\n";
  message += "📍 জেলা: " + district.trim() + "\n";
  message += "📮 পোস্ট: " + post.trim() + "\n";
  message += "📞 যোগাযোগ নাম্বার: " + phone.trim() + "\n";
  message += "📍 ডেলিভারি এলাকা: " + location.trim() + "\n";
  message += "📦 মোট পিস: " + totalQuantity + "\n";
  message += "⚖️ মোট ওজন: " + totalWeight.toFixed(2) + " কেজি\n\n";

  message += "📦 অর্ডারের বিবরণ:\n";

  cart.forEach((cartItem, index) => {
    const item = products[cartItem.productIndex];
    const subtotal = item.price * cartItem.quantity;

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

  message += "\n💵 পণ্যের মোট মূল্য: ৳" + productTotal;
  message += "\n🚚 ডেলিভারি চার্জ: ৳" + deliveryCharge;
  message += "\n💰 সর্বমোট: ৳" + grandTotal;

  const whatsappNumber = "8801410153135";

  const whatsappURL =
    "https://wa.me/" +
    whatsappNumber +
    "?text=" +
    encodeURIComponent(message);

  window.open(whatsappURL, "_blank");
}

if (search) {
  search.addEventListener("input", function () {
    const text = this.value.toLowerCase();

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(text)
    );

    displayProducts(filtered);
  });
}

displayProducts();