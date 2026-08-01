/* =========================================================
   MMSTORE — SCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     ELEMENTS
  ========================== */

  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");
  const backTop = document.getElementById("backTop");
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");


  /* =========================
     HEADER SCROLL
  ========================== */

  const handleScroll = () => {

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    if (window.scrollY > 500) {
      backTop.classList.add("show");
    } else {
      backTop.classList.remove("show");
    }

  };

  window.addEventListener("scroll", handleScroll);

  handleScroll();


  /* =========================
     MOBILE MENU
  ========================== */

  menuToggle.addEventListener("click", () => {

    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.classList.toggle("menu-open");

  });


  /* =========================
     CLOSE MENU
  ========================== */

  navLinks.forEach((link) => {

    link.addEventListener("click", () => {

      menuToggle.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.classList.remove("menu-open");

    });

  });


  /* =========================
     ACTIVE NAV LINK
  ========================== */

  const sections = document.querySelectorAll("section[id]");

  const updateActiveLink = () => {

    const scrollPosition = window.scrollY + 150;

    sections.forEach((section) => {

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {

        navLinks.forEach((link) => {
          link.classList.remove("active");
        });

        const activeLink = document.querySelector(
          `.nav-link[href="#${sectionId}"]`
        );

        if (activeLink) {
          activeLink.classList.add("active");
        }

      }

    });

  };

  window.addEventListener("scroll", updateActiveLink);

  updateActiveLink();


  /* =========================
     BACK TO TOP
  ========================== */

  backTop.addEventListener("click", () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });


  /* =========================
     CONTACT FORM
  ========================== */

  contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !phone || !message) {

      formMessage.textContent =
        "Please complete all fields.";

      formMessage.style.color = "#ff3b1f";

      return;

    }

    formMessage.textContent =
      "Thank you. Your request has been received.";

    formMessage.style.color = "#168a42";

    contactForm.reset();

  });


  /* =========================
     PRODUCT BUTTONS
  ========================== */

  const productButtons =
    document.querySelectorAll(".product-view");

  productButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const card = button.closest(".product-card");

      if (!card) return;

      const productName =
        card.querySelector("h3")?.textContent.trim();

      if (productName) {

        alert(
          `${productName}\n\nProduct details will be available soon.`
        );

      }

    });

  });


  /* =========================
     REVEAL ON SCROLL
  ========================== */

  const revealElements = document.querySelectorAll(
    ".product-card, .accessory-card, .feature-item, .contact-item"
  );

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

        observer.unobserve(entry.target);

      });

    },
    {
      threshold: 0.12
    }
  );


  revealElements.forEach((element) => {

    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition =
      "opacity 0.6s ease, transform 0.6s ease";

    revealObserver.observe(element);

  });


  /* =========================
     ESCAPE KEY
  ========================== */

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

      menuToggle.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.classList.remove("menu-open");

    }

  });

});