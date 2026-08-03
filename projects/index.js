function highlightCurrentPage() {
    const currentPath = new URL(window.location.href).pathname.replace(/index\.html$/, "").replace(/\/+$/, "/");

    document.querySelectorAll(".nav-links a").forEach((link) => {
        const linkPath = new URL(link.href, window.location.href).pathname.replace(/index\.html$/, "").replace(/\/+$/, "/");
        link.classList.toggle("active", linkPath === currentPath);
    });
}

highlightCurrentPage();

// Modal project view
const projects = {
    zenix: {
        title: 'Zenix.SG',
        subtitle: 'Server Hosting',
        banner: '../Files/Images/placeholder.png',
        icon: '../Files/Images/placeholder.png',
        desc: 'Server hosting setup, deployment, and maintenance for reliable multiplayer experiences. Includes backups, monitoring, and automated deployments.'
    },
    hyper: {
        title: 'Hyper Studios',
        subtitle: 'Minecraft Server',
        banner: '../Files/Images/placeholder.png',
        icon: '../Files/Images/placeholder.png',
        desc: 'Minecraft server development: plugins, features, and community tooling for custom gameplay, moderation systems, and performance optimizations.'
    }
};

const modal = document.getElementById('project-modal');
const modalTitle = modal && modal.querySelector('.modal-title');
const modalSubtitle = modal && modal.querySelector('.modal-subtitle');
const modalDesc = modal && modal.querySelector('.modal-desc');
const modalBanner = modal && modal.querySelector('.modal-banner img');

document.querySelectorAll('.view-project').forEach(btn => {
    btn.addEventListener('click', () => {
        const id = btn.dataset.project;
        const data = projects[id];
        if (!data) return;
        if (modalTitle) modalTitle.textContent = data.title;
        if (modalSubtitle) modalSubtitle.textContent = data.subtitle;
        if (modalDesc) modalDesc.textContent = data.desc;
        if (modalBanner) modalBanner.src = data.banner;
        modal.setAttribute('aria-hidden', 'false');
    });
});

// Close handlers
modal && modal.querySelector('.modal-close').addEventListener('click', () => {
    modal.setAttribute('aria-hidden', 'true');
});

modal && modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
        modal.setAttribute('aria-hidden', 'true');
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.getAttribute('aria-hidden') === 'false') {
        modal.setAttribute('aria-hidden', 'true');
    }
});
