document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");

  // Load Header
  if (header) {
    fetch("components/header.html")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load header");
        }
        return response.text();
      })
      .then((data) => {
        header.innerHTML = data;

        // Attach menu toggle AFTER header loads
        const menuBtn = document.getElementById("menuBtn");
        const mobileMenu = document.getElementById("mobileMenu");

        if (menuBtn && mobileMenu) {
          menuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
          });
        }
      })
      .catch((error) => console.error("Header load error:", error));
  }

  // Load Footer
  if (footer) {
    fetch("components/footer.html")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load footer");
        }
        return response.text();
      })
      .then((data) => {
        footer.innerHTML = data;
      })
      .catch((error) => console.error("Footer load error:", error));
  }
});
