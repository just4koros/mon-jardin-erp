// script.js

const BASE_URL = "http://localhost:5000/api";

// Switch sections
function showSection(id) {
  document.querySelectorAll(".tab").forEach((tab) => tab.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

// 🧩 Farmers
document.getElementById("farmerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const farmer = {
    name: farmerName.value,
    email: farmerEmail.value,
    phone: farmerPhone.value,
    location: farmerLocation.value,
  };
  await fetch(`${BASE_URL}/farmers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(farmer),
  });
  loadFarmers();
  e.target.reset();
});

async function loadFarmers() {
  const res = await fetch(`${BASE_URL}/farmers`);
  const farmers = await res.json();
  const list = document.getElementById("farmersList");
  list.innerHTML = farmers.map((f) => `<li>${f.id}. ${f.name} - ${f.location}</li>`).join("");
}

// 🧩 Buyers
document.getElementById("buyerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const buyer = {
    name: buyerName.value,
    email: buyerEmail.value,
    phone: buyerPhone.value,
    location: buyerLocation.value,
  };
  await fetch(`${BASE_URL}/buyers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buyer),
  });
  loadBuyers();
  e.target.reset();
});

async function loadBuyers() {
  const res = await fetch(`${BASE_URL}/buyers`);
  const buyers = await res.json();
  const list = document.getElementById("buyersList");
  list.innerHTML = buyers.map((b) => `<li>${b.id}. ${b.name} - ${b.location}</li>`).join("");
}

// 🧩 Agents
document.getElementById("agentForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const agent = {
    name: agentName.value,
    email: agentEmail.value,
    phone: agentPhone.value,
    region: agentRegion.value,
  };
  await fetch(`${BASE_URL}/agents`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(agent),
  });
  loadAgents();
  e.target.reset();
});

async function loadAgents() {
  const res = await fetch(`${BASE_URL}/agents`);
  const agents = await res.json();
  const list = document.getElementById("agentsList");
  list.innerHTML = agents.map((a) => `<li>${a.id}. ${a.name} - ${a.region}</li>`).join("");
}

// 🧩 Orders
document.getElementById("orderForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const order = {
    farmerId: Number(farmerId.value),
    buyerId: Number(buyerId.value),
    product: product.value,
    quantity: Number(quantity.value),
    price: Number(price.value),
    deliveryLocation: deliveryLocation.value,
  };
  await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  loadOrders();
  e.target.reset();
});

async function loadOrders() {
  const res = await fetch(`${BASE_URL}/orders`);
  const orders = await res.json();
  const list = document.getElementById("ordersList");
  list.innerHTML = orders
    .map(
      (o) =>
        `<li>Order ${o.id}: ${o.product} (${o.quantity}) - KSh ${o.price} | ${o.status}</li>`
    )
    .join("");
}

// Load initial data
loadFarmers();
loadBuyers();
loadAgents();
loadOrders();
