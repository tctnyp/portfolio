function highlightCurrentPage() {
    const currentPath = new URL(window.location.href).pathname.replace(/index\.html$/, "").replace(/\/+$/, "/");

    document.querySelectorAll(".nav-links a").forEach((link) => {
        const linkPath = new URL(link.href, window.location.href).pathname.replace(/index\.html$/, "").replace(/\/+$/, "/");
        link.classList.toggle("active", linkPath === currentPath);
    });
}

highlightCurrentPage();

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = String(formData.get("name") || "").trim();

        contactForm.reset();
        formStatus.textContent = name
            ? `Thanks, ${name}. Your message is ready to be sent.`
            : "Thanks. Your message is ready to be sent.";
        formStatus.classList.add("is-visible");
    });
}