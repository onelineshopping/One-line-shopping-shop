const products = [
  { name: "টি-শার্ট", price: 450 },
  { name: "পাঞ্জাবি", price: 850 },
  { name: "জুতা", price: 1200 },
  { name: "ব্যাগ", price: 650 }
];

let cart = [];

const list = document.getElementById("productsList");
const search = document.getElementById("search");

function displayProducts(items = products) {
  list.innerHTML = "";

  items.forEach((product, index) => {
    list.innerHTML += `
      <div class="product">
        <h3>${product.name}</h3>
        <p>মূল্য: ৳${product.price}</p>
        <button onclick="addToCart(${index})">কার্টে যোগ করুন</button>
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

  alert("অর্ডার করার জন্য আমাদের সাথে যোগাযোগ করুন।");
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
