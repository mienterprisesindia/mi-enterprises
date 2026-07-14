document.addEventListener("DOMContentLoaded", () => {

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
      const id = this.getAttribute("href");

      if (id.length > 1) {
        e.preventDefault();

        document.querySelector(id)?.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });

  // Reveal animation on scroll
  const revealItems = document.querySelectorAll(".card, .stat, .why-card");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

      }

    });
  }, {
    threshold: 0.15
  });

  revealItems.forEach(item => {

    item.style.opacity = "0";
    item.style.transform = "translateY(40px)";
    item.style.transition = "all .7s ease";

    observer.observe(item);

  });

  // Navbar shadow on scroll
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
      header.style.boxShadow = "0 8px 25px rgba(0,0,0,.25)";
    } else {
      header.style.boxShadow = "none";
    }

  });

  console.log("MI Enterprises website loaded successfully.");

});