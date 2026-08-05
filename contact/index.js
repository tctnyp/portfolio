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
let lastSentMessage = null;

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

    function renderSentMessage(submittedMessage) {
        if (!sentMessageContent) {
            return;
        }

        sentMessageContent.replaceChildren();

        const fields = [
            ["Name", submittedMessage.name],
            ["Email", submittedMessage.email],
            ["Phone", submittedMessage.phone],
            ["Subject", submittedMessage.subject],
            ["Message", submittedMessage.message],
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
        const submittedMessage = {
            name: String(formData.get("name") || "").trim(),
            email: String(formData.get("email") || "").trim(),
            phone: String(formData.get("phone") || "").trim(),
            subject: String(formData.get("subject") || "").trim(),
            message: String(formData.get("message") || "").trim(),
        };
        const name = String(formData.get("name") || "").trim();

        lastSentMessage = submittedMessage;
        contactForm.reset();
        formStatus.textContent = name
            ? `Thanks, ${name}. Your message has been saved.`
            : "Thanks. Your message has been saved.";
        formStatus.classList.add("is-visible");

        if (sentMessageContent && sentMessagePanel && viewMessageButton) {
            sentMessagePanel.hidden = true;
            viewMessageButton.textContent = "View Sent Message";
            viewMessageButton.hidden = false;
        }
    });
}

viewMessageButton?.addEventListener("click", () => {
    if (!sentMessagePanel || !lastSentMessage) {
        return;
    }

    const shouldShow = sentMessagePanel.hidden;

    if (shouldShow) {
        renderSentMessage(lastSentMessage);
    }

    sentMessagePanel.hidden = !shouldShow;
    viewMessageButton.textContent = shouldShow ? "Hide Sent Message" : "View Sent Message";
});