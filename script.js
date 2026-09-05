
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
  cart.push(products[index]);
  updateCart();
  alert("পণ্যটি কার্টে যোগ হয়েছে");
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const total = document.getElementById("total");
  const count = document.getElementById("count");

  cartItems.innerHTML = "";
  let sum = 0;

  cart.forEach((item, index) => {
    sum += item.price;

    cartItems.innerHTML += `
      <p>
        ${item.name} — ৳${item.price}
        <button onclick="removeFromCart(${index})">×</button>
      </p>
    `;
  });

  total.textContent = sum;
  count.textContent = cart.length;
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

  if (!name) {
    alert("দয়া করে আপনার নাম লিখুন");
    return;
  }

  const address = prompt("আপনার সম্পূর্ণ ডেলিভারি ঠিকানা লিখুন:");

  if (!address) {
    alert("দয়া করে আপনার ডেলিভারি ঠিকানা লিখুন");
    return;
  }

  const location = prompt(
    "ডেলিভারি এলাকা লিখুন:\n\nঢাকার ভিতরে হলে লিখুন: ঢাকা\nঢাকার বাইরে হলে লিখুন: বাইরে"
  );

  if (!location) {
    alert("দয়া করে ডেলিভারি এলাকা লিখুন");
    return;
  }

  let productTotal = 0;
  let totalWeight = 0;

  cart.forEach((item) => {
    productTotal += item.price;
    totalWeight += item.weight;
  });

  let deliveryCharge;

  if (location.trim().toLowerCase() === "ঢাকা") {
    deliveryCharge = 80;
  } else {
    deliveryCharge = 180;
  }

  // ১ কেজির বেশি হলে প্রতি অতিরিক্ত কেজিতে ৳30
  if (totalWeight > 1) {
    const extraWeight = Math.ceil(totalWeight - 1);
    deliveryCharge += extraWeight * 30;
  }

  const grandTotal = productTotal + deliveryCharge;

  let message = "🛍️ Online Shopping Shop - নতুন অর্ডার\n\n";
  message += "👤 নাম: " + name + "\n";
  message += "🏠 ঠিকানা: " + address + "\n";
  message += "📍 এলাকা: " + location + "\n";
  message += "⚖️ মোট ওজন: " + totalWeight.toFixed(2) + " কেজি\n\n";

  message += "📦 অর্ডারের বিবরণ:\n";

  cart.forEach((item, index) => {
    message +=
      (index + 1) +
      ". " +
      item.name +
      " - ৳" +
      item.price +
      " (" +
      item.weight +
      " কেজি)\n";
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