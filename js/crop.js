document.addEventListener("DOMContentLoaded", () => {
  // Realistic states, districts, markets
  const statesData = [
    {
      state: "Uttar Pradesh",
      districts: ["Lucknow", "Agra", "Kanpur"],
      markets: ["Chowk Market", "Sadar Market", "GPO Market"],
    },
    {
      state: "Punjab",
      districts: ["Ludhiana", "Amritsar", "Patiala"],
      markets: ["Fazilka Market", "Hall Bazaar", "Rail Bazaar"],
    },
    {
      state: "Maharashtra",
      districts: ["Nagpur", "Pune", "Mumbai"],
      markets: ["Sitabuldi Market", "Shivaji Market", "Masjid Market"],
    },
    {
      state: "Bihar",
      districts: ["Patna", "Gaya", "Bhagalpur"],
      markets: ["Kankarbagh", "Kant Market", "Sadar Market"],
    },
    {
      state: "Karnataka",
      districts: ["Bangalore", "Mysore", "Hubli"],
      markets: ["KR Market", "Devaraja Market", "Gandhinagar"],
    },
    {
      state: "Rajasthan",
      districts: ["Jaipur", "Udaipur", "Jodhpur"],
      markets: ["Chandpole Market", "Hathi Pol", "Clock Tower"],
    },
    {
      state: "Madhya Pradesh",
      districts: ["Indore", "Bhopal", "Gwalior"],
      markets: ["Sarafa Market", "Chowk Bazaar", "Laxmi Bazaar"],
    },
    {
      state: "Gujarat",
      districts: ["Ahmedabad", "Surat", "Rajkot"],
      markets: ["Manek Chowk", "Varachha Market", "Moti Bazaar"],
    },
    {
      state: "Haryana",
      districts: ["Hisar", "Karnal", "Panipat"],
      markets: ["Ferozepur Road", "Karnal Market", "Sadar Market"],
    },
    {
      state: "West Bengal",
      districts: ["Kolkata", "Howrah", "Durgapur"],
      markets: ["Sealdah Market", "Golabari Market", "Bidhan Market"],
    },
  ];

  const crops = [
    "Wheat",
    "Rice",
    "Maize",
    "Tomato",
    "Onion",
    "Potato",
    "Gram",
    "Sugarcane",
    "Chili",
    "Apple",
  ];

  // Helper functions
  function randomPrice(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function randomQty(min, max) {
    return Math.floor(Math.random() * (max - min + 1));
  }
  function formatDate(date) {
    return date.toISOString().split("T")[0];
  }

  // Generate allData dynamically
  let allData = [];
  statesData.forEach((stateObj) => {
    stateObj.districts.forEach((district) => {
      stateObj.markets.forEach((market) => {
        crops.forEach((crop) => {
          const minPrice = randomPrice(500, 1500);
          const maxPrice = minPrice + randomPrice(50, 300);
          const modalPrice = Math.floor((minPrice + maxPrice) / 2);
          const arrivalQty = randomQty(50, 200);
          allData.push({
            state: stateObj.state,
            district: district,
            market: market,
            crop: crop,
            min_price: minPrice,
            max_price: maxPrice,
            modal_price: modalPrice,
            arrival_qty: arrivalQty,
            unit: "Quintal",
            price_date: formatDate(new Date()),
          });
        });
      });
    });
  });

  // DOM Elements
  const stateSelect = document.getElementById("stateSelect");
  const districtSelect = document.getElementById("districtSelect");
  const marketSelect = document.getElementById("marketSelect");
  const cropSelect = document.getElementById("cropSelect");
  const filterBtn = document.getElementById("filterBtn");
  const priceTable = document.getElementById("priceTable");

  // Populate Stats
  function fillStats() {
    const states = new Set(allData.map((i) => i.state));
    const districts = new Set(allData.map((i) => i.district));
    const markets = new Set(allData.map((i) => i.market));
    const cropsSet = new Set(allData.map((i) => i.crop));
    document.getElementById("totalStates").textContent = states.size;
    document.getElementById("totalDistricts").textContent = districts.size;
    document.getElementById("totalMarkets").textContent = markets.size;
    document.getElementById("totalCrops").textContent = cropsSet.size;
  }

  // Populate State Dropdown
  function fillStates() {
    const uniqueStates = [...new Set(allData.map((i) => i.state))];
    stateSelect.innerHTML = "<option value=''>-- Select State --</option>";
    uniqueStates.forEach((state) => {
      const opt = document.createElement("option");
      opt.value = state;
      opt.textContent = state;
      stateSelect.appendChild(opt);
    });
  }

  // Event listeners for filters
  stateSelect.addEventListener("change", () => {
    const filtered = allData.filter((i) => i.state === stateSelect.value);
    const districts = [...new Set(filtered.map((i) => i.district))];
    districtSelect.innerHTML =
      "<option value=''>-- Select District --</option>";
    districts.forEach((d) => {
      const opt = document.createElement("option");
      opt.value = d;
      opt.textContent = d;
      districtSelect.appendChild(opt);
    });
    marketSelect.innerHTML = "<option value=''>-- Select Market --</option>";
    cropSelect.innerHTML = "<option value=''>-- Select Crop --</option>";
  });

  districtSelect.addEventListener("change", () => {
    const filtered = allData.filter(
      (i) =>
        i.state === stateSelect.value && i.district === districtSelect.value,
    );
    const markets = [...new Set(filtered.map((i) => i.market))];
    marketSelect.innerHTML = "<option value=''>-- Select Market --</option>";
    markets.forEach((m) => {
      const opt = document.createElement("option");
      opt.value = m;
      opt.textContent = m;
      marketSelect.appendChild(opt);
    });
    cropSelect.innerHTML = "<option value=''>-- Select Crop --</option>";
  });

  marketSelect.addEventListener("change", () => {
    const filtered = allData.filter(
      (i) =>
        i.state === stateSelect.value &&
        i.district === districtSelect.value &&
        i.market === marketSelect.value,
    );
    const cropsUnique = [...new Set(filtered.map((i) => i.crop))];
    cropSelect.innerHTML = "<option value=''>-- Select Crop --</option>";
    cropsUnique.forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      cropSelect.appendChild(opt);
    });
  });

  // Filter Button
  filterBtn.addEventListener("click", () => {
    priceTable.innerHTML = "";
    let filtered = allData;
    if (stateSelect.value)
      filtered = filtered.filter((i) => i.state === stateSelect.value);
    if (districtSelect.value)
      filtered = filtered.filter((i) => i.district === districtSelect.value);
    if (marketSelect.value)
      filtered = filtered.filter((i) => i.market === marketSelect.value);
    if (cropSelect.value)
      filtered = filtered.filter((i) => i.crop === cropSelect.value);
    filtered.forEach((item) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
      <td class="border px-2 py-1">${item.state}</td>
      <td class="border px-2 py-1">${item.district}</td>
      <td class="border px-2 py-1">${item.market}</td>
      <td class="border px-2 py-1">${item.crop}</td>
      <td class="border px-2 py-1">₹${item.min_price}</td>
      <td class="border px-2 py-1">₹${item.max_price}</td>
      <td class="border px-2 py-1">₹${item.modal_price}</td>
      <td class="border px-2 py-1">${item.arrival_qty} ${item.unit}</td>
      <td class="border px-2 py-1">${item.price_date}</td>
    `;
      priceTable.appendChild(tr);
    });
  });

  // Initialize
  fillStats();
  fillStates();
});
