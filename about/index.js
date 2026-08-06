function highlightCurrentPage() {
    const currentPath = new URL(window.location.href).pathname.replace(/index\.html$/, "").replace(/\/+$/, "/");

    document.querySelectorAll(".nav-links a").forEach((link) => {
        const linkPath = new URL(link.href, window.location.href).pathname.replace(/index\.html$/, "").replace(/\/+$/, "/");
        link.classList.toggle("active", linkPath === currentPath);
    });
}

highlightCurrentPage();

/* Highlights the chapter currently in view within the contents bar. */
function setupChapterSpy() {
    const links = Array.from(document.querySelectorAll(".chapter-links a"));
    if (links.length === 0) return;

    const sections = links
        .map((link) => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    if (sections.length === 0) return;

    const setActive = (id) => {
        links.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
        });
    };

    const observer = new IntersectionObserver(
        (entries) => {
            const visible = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

            if (visible) setActive(visible.target.id);
        },
        { rootMargin: "-120px 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    setActive(sections[0].id);
}

setupChapterSpy();