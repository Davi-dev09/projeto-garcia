document.addEventListener("DOMContentLoaded", () => {
  // Menu mobile
  const navToggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
      });
    });
  }

  // Scroll suave para âncoras
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Slider de depoimentos
  const testimonials = document.querySelectorAll(".testimonial");
  const dots = document.querySelectorAll(".dot");
  let currentTestimonial = 0;
  let sliderInterval;

  const showTestimonial = (index) => {
    testimonials.forEach((t, i) => {
      t.classList.toggle("active", i === index);
    });
    dots.forEach((d, i) => {
      d.classList.toggle("active", i === index);
    });
    currentTestimonial = index;
  };

  const startSlider = () => {
    sliderInterval = setInterval(() => {
      const nextIndex = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(nextIndex);
    }, 7000);
  };

  if (testimonials.length && dots.length) {
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const index = Number(dot.dataset.index);
        showTestimonial(index);
        if (sliderInterval) {
          clearInterval(sliderInterval);
        }
        startSlider();
      });
    });

    startSlider();
  }

  // Filtro do portfólio
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      portfolioItems.forEach((item) => {
        const category = item.dataset.category;
        if (filter === "all" || filter === category) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
    });
  });
});

