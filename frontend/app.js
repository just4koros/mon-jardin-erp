// frontend/app.js
const baseUrl = "http://localhost:5000/api";

// Show section and fetch its data
function showSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  const sec = document.getElementById(id);
  if (sec) sec.classList.add("active");
  // fetch the data for that section
  if (["farmers","buyers","agents","orders"].includes(id)) fetchData(id);
}

// Generic fetch and render
async function fetchData(type) {
  try {
    const res = await fetch(`${baseUrl}/${type}`);
    if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    const data = await res.json();
    renderTable(type, Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("Fetch error:", err);
    const list = document.getElementById(`${type}List`);
    if (list) list.innerHTML = `<p style="color:darkred">Failed to load ${type}: ${err.message}</p>`;
  }
}

// Render table with edit/delete actions
function renderTable(type, data) {
  const list = document.getElementById(`${type}List`);
  list.innerHTML = "";

  if (!data || data.length === 0) {
    list.innerHTML = "<p>No data found.</p>";
    return;
  }

  const table = document.createElement("table");

  // Use keys from first object for columns (exclude createdAt/updatedAt to simplify)
  const headers = Object.keys(data[0]).filter(k => k !== "createdAt" && k !== "updatedAt");

  // Thead
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  headers.concat("Actions").forEach(h => {
    const th = document.createElement("th");
    th.textContent = h;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Tbody
  const tbody = document.createElement("tbody");
  data.forEach(item => {
    const row = document.createElement("tr");
    headers.forEach(h => {
      const td = document.createElement("td");
      // if value is object (relations), stringify small objects
      const val = item[h];
      td.textContent = (val === null || val === undefined) ? "" : (typeof val === "object" ? JSON.stringify(val) : String(val));
      row.appendChild(td);
    });

    const actionsTd = document.createElement("td");

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️ Edit";
    editBtn.classList.add("edit-btn");
    editBtn.onclick = () => editRecord(type, item);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️ Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = () => deleteRecord(type, item.id);

    actionsTd.appendChild(editBtn);
    actionsTd.appendChild(deleteBtn);
    row.appendChild(actionsTd);

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  list.appendChild(table);
}

// Delete record helper
async function deleteRecord(type, id) {
  if (!confirm(`Are you sure you want to delete this ${type.slice(0, -1)}?`)) return;
  try {
    const res = await fetch(`${baseUrl}/${type}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
    fetchData(type);
  } catch (err) {
    console.error("Delete failed:", err);
    alert("Delete failed: " + err.message);
  }
}

// Edit record helper (simple prompt-based editor)
async function editRecord(type, item) {
  const updated = {};
  for (let key in item) {
    if (["id","createdAt","updatedAt"].includes(key)) continue;
    // prompt current value
    const newVal = prompt(`Edit ${key}:`, item[key] ?? "");
    if (newVal === null) {
      // user cancelled — skip editing this field
      continue;
    }
    // Coerce numeric strings to numbers when appropriate
    const numeric = Number(newVal);
    updated[key] = (newVal !== "" && !isNaN(numeric) && String(newVal).trim() !== "") ? numeric : newVal;
  }

  // If no fields changed, do nothing
  if (Object.keys(updated).length === 0) return;

  try {
    const res = await fetch(`${baseUrl}/${type}/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated)
    });
    if (!res.ok) throw new Error(`Edit failed: ${res.status}`);
    fetchData(type);
  } catch (err) {
    console.error("Edit failed:", err);
    alert("Edit failed: " + err.message);
  }
}

// Generic addRecord helper
async function addRecord(type, payload) {
  try {
    const res = await fetch(`${baseUrl}/${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const text = await res.text().catch(()=>"");
      throw new Error(`${res.status} ${res.statusText} ${text}`);
    }
    fetchData(type);
  } catch (err) {
    console.error("Add failed:", err);
    alert("Add failed: " + err.message);
  }
}

/* -------------------------
   Hook up the forms (IDs match your HTML)
   ------------------------- */

// Farmers
const addFarmerForm = document.getElementById("addFarmerForm");
if (addFarmerForm) {
  addFarmerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = {
      name: document.getElementById("farmerName").value,
      email: document.getElementById("farmerEmail").value,
      phone: document.getElementById("farmerPhone").value,
      location: document.getElementById("farmerLocation").value
    };
    await addRecord("farmers", payload);
    e.target.reset();
  });
}

// Buyers
const addBuyerForm = document.getElementById("addBuyerForm");
if (addBuyerForm) {
  addBuyerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = {
      name: document.getElementById("buyerName").value,
      email: document.getElementById("buyerEmail").value,
      phone: document.getElementById("buyerPhone").value,
      location: document.getElementById("buyerLocation").value
    };
    await addRecord("buyers", payload);
    e.target.reset();
  });
}

// Agents
const addAgentForm = document.getElementById("addAgentForm");
if (addAgentForm) {
  addAgentForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = {
      name: document.getElementById("agentName").value,
      email: document.getElementById("agentEmail").value,
      phone: document.getElementById("agentPhone").value,
      region: document.getElementById("agentRegion").value
    };
    await addRecord("agents", payload);
    e.target.reset();
  });
}

// Orders
const addOrderForm = document.getElementById("addOrderForm");
if (addOrderForm) {
  addOrderForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = {
      farmerId: Number(document.getElementById("orderFarmerId").value),
      buyerId: Number(document.getElementById("orderBuyerId").value),
      product: document.getElementById("orderProduct").value,
      quantity: Number(document.getElementById("orderQuantity").value),
      price: Number(document.getElementById("orderPrice").value),
      deliveryLocation: document.getElementById("orderDelivery").value
    };
    await addRecord("orders", payload);
    e.target.reset();
  });
}

/* -------------------------
   Initial load: show farmers by default and load all lists
   ------------------------- */
showSection("farmers");
["farmers","buyers","agents","orders"].forEach(type => fetchData(type));
