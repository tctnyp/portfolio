// Highlight current page in navbar

const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".nav-links a").forEach(link => {

    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    } else {
        link.classList.remove("active");
    }

});