// Smooth scrolling para navegación
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Contact form handling
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
      nombre: document.getElementById("nombre").value,
      email: document.getElementById("email").value,
      telefono: document.getElementById("telefono").value,
      mensaje: document.getElementById("mensaje").value,
    };

    console.log("Formulario enviado:", formData);

    // Aquí se podría hacer un POST al backend
    // const response = await fetch('http://localhost:3000/api/contacto', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData)
    // });

    alert("¡Gracias por tu mensaje! Te contactaremos pronto.");
    contactForm.reset();
  });
}

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    header.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
  } else {
    header.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
  }

  lastScroll = currentScroll;
});

// Animate stats on scroll
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all cards for animation
document
  .querySelectorAll(".card, .news-card, .benefit-card")
  .forEach((card) => {
    observer.observe(card);
  });

console.log("ANFUTRANS Portal Web cargado correctamente");
