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
const viewMessageButton = document.querySelector("#view-message-button");
const sentMessagePanel = document.querySelector("#sent-message-panel");
const sentMessageContent = document.querySelector("#sent-message-content");

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

    function renderSentMessage(formData) {
        if (!sentMessageContent) {
            return;
        }

        sentMessageContent.replaceChildren();

        const fields = [
            ["Name", String(formData.get("name") || "").trim()],
            ["Email", String(formData.get("email") || "").trim()],
            ["Phone", String(formData.get("phone") || "").trim()],
            ["Subject", String(formData.get("subject") || "").trim()],
            ["Message", String(formData.get("message") || "").trim()],
        ];

        fields.forEach(([label, value]) => {
            const paragraph = document.createElement("p");
            const strong = document.createElement("strong");
            strong.textContent = `${label}: `;
            paragraph.append(strong, value || "-");
            sentMessageContent.append(paragraph);
        });
    }

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

        renderSentMessage(formData);
        contactForm.reset();
        formStatus.textContent = name
            ? `Thanks, ${name}. Your message has been sent.`
            : "Thanks. Your message has been sent.";
        formStatus.classList.add("is-visible");

        if (viewMessageButton && sentMessagePanel) {
            sentMessagePanel.hidden = true;
            viewMessageButton.hidden = false;
        }
    });
}

viewMessageButton?.addEventListener("click", () => {
    if (!sentMessagePanel) {
        return;
    }

    sentMessagePanel.hidden = false;
});