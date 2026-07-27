// Highlight current page [NAVBAR]

const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".nav-links a").forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    }
});