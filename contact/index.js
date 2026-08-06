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

const phoneInput = contactForm?.querySelector('input[name="phone"]');
const phonePattern = /^[\+]?[0-9]{0,3}\W?[\(]?[0-9]{3}[\)]?[-\s\. ]?[0-9]{3}[-\s\. ]?[0-9]{4,6}$/im;

function isValidPhoneNumber(value) {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
        return true;
    }

    return phonePattern.test(trimmedValue);
}

if (contactForm && formStatus) {
    phoneInput?.addEventListener("input", () => {
        phoneInput.setCustomValidity("");
    });

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const phoneValue = String(phoneInput?.value || "");

        if (phoneInput && !isValidPhoneNumber(phoneValue)) {
            phoneInput.setCustomValidity("Enter a valid phone number using 7 to 15 digits.");
            phoneInput.reportValidity();
            return;
        }

        const formData = new FormData(contactForm);
        const name = String(formData.get("name") || "").trim();

        contactForm.reset();
        formStatus.textContent = name
            ? `Thanks, ${name}. Your message has been sent.`
            : "Thanks. Your message has been sent.";
        formStatus.classList.add("is-visible");
    });
}