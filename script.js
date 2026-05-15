const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const root = document.body;
const topbar = document.querySelector(".topbar");
const savedTheme = localStorage.getItem("portfolio-theme");
const revealElements = document.querySelectorAll(".reveal");
const contactForm = document.getElementById("contactForm");

if (savedTheme === "dark") {
  root.classList.add("dark-mode");
}

themeToggle?.addEventListener("click", () => {
  root.classList.toggle("dark-mode");
  const theme = root.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("portfolio-theme", theme);
});

menuToggle?.addEventListener("click", () => {
  const isOpen = topbar?.classList.toggle("menu-open");
  menuToggle.classList.toggle("is-open", Boolean(isOpen));
  menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -40px 0px"
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const senderEmail = document.getElementById("senderEmail")?.value?.trim() || "";
  const contactType = document.getElementById("contactType")?.value || "General";
  const contactMessage = document.getElementById("contactMessage")?.value?.trim() || "";

  const subject = `${contactType} inquiry from portfolio`;
  const body = [
    "Hello Pranathi,",
    "",
    `Type: ${contactType}`,
    `My email: ${senderEmail}`,
    "",
    contactMessage || "I would like to connect with you.",
    "",
    "Best regards,"
  ].join("\n");

  window.location.href = `mailto:pranatikotra@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
