// document.addEventListener("DOMContentLoaded", () => {
//   const jobContainer = document.getElementById("jobContainer");

//   fetch("https://mocki.io/v1/6c8b0c29-9b7b-4e9b-9f7a-0d3a3f1d1234")
//     .then((response) => response.json())
//     .then((data) => {
//       jobContainer.innerHTML = "";

//       data.forEach((job) => {
//         const jobCard = `
//           <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
//             <h3 class="text-xl font-semibold text-green-700 mb-2">
//               ${job.title}
//             </h3>
//             <p class="text-gray-600 mb-1">📍 ${job.location}</p>
//             <p class="text-gray-800 font-medium mb-3">💰 ${job.salary}</p>
//             <button class="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800">
//               Apply Now
//             </button>
//           </div>
//         `;
//         jobContainer.innerHTML += jobCard;
//       });
//     })
//     .catch((error) => {
//       jobContainer.innerHTML =
//         "<p class='text-red-600 text-center'>Failed to load jobs.</p>";
//       console.error(error);
//     });
// });

document.addEventListener("DOMContentLoaded", async () => {
  const jobContainer = document.getElementById("jobContainer");
  const searchInput = document.getElementById("searchInput");

  if (!searchInput || !jobContainer) {
    console.error("Search input or job container not found");
    return;
  }

  let allJobs = [];

  // Fetch Jobs
  async function fetchJobs() {
    try {
      const res = await fetch("https://www.arbeitnow.com/api/job-board-api");
      const data = await res.json();

      allJobs = data.data.slice(0, 30);
      displayJobs(allJobs);
    } catch (err) {
      jobContainer.innerHTML =
        "<p class='text-red-600 text-center'>Failed to load jobs</p>";
      console.error(err);
    }
  }

  // Display Jobs
  function displayJobs(jobs) {
    jobContainer.innerHTML = "";

    if (jobs.length === 0) {
      jobContainer.innerHTML =
        "<p class='text-center text-gray-600 col-span-3'>No jobs found</p>";
      return;
    }

    jobs.forEach((job) => {
      const card = document.createElement("div");
      card.className =
        "bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition";

      card.innerHTML = `
        <h3 class="text-lg font-semibold text-green-700 mb-2">
          ${job.title}
        </h3>
        <p class="text-gray-600 mb-1">🏢 ${job.company_name}</p>
        <p class="text-gray-600 mb-2">📍 ${job.location}</p>
        <a href="${job.url}" target="_blank"
          class="inline-block bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800">
          View Job
        </a>
      `;

      jobContainer.appendChild(card);
    });
  }

  // 🔥 SEARCH EVENT
  searchInput.addEventListener("keyup", function () {
    const value = this.value.toLowerCase().trim();

    const filtered = allJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(value) ||
        job.company_name.toLowerCase().includes(value) ||
        job.location.toLowerCase().includes(value),
    );

    displayJobs(filtered);
  });

  fetchJobs();
});
