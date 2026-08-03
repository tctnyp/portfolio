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
        // animate from card -> modal
        const card = btn.closest('.project-card');
        const panel = modal.querySelector('.modal-panel');
        const rect = card.getBoundingClientRect();

        // set initial panel position to card
        panel.style.left = rect.left + 'px';
        panel.style.top = rect.top + 'px';
        panel.style.width = rect.width + 'px';
        panel.style.height = rect.height + 'px';
        panel.classList.remove('expanded');

        modal.setAttribute('aria-hidden', 'false');

        // allow layout then expand to center
        requestAnimationFrame(() => {
            // Force reflow
            void panel.offsetWidth;
            panel.classList.add('expanded');
        });
    });
});

// Close handlers
const panel = modal && modal.querySelector('.modal-panel');
modal && modal.querySelector('.modal-close').addEventListener('click', () => {
    if (!panel) { modal.setAttribute('aria-hidden', 'true'); return; }
    // animate back to original card size/position by removing expanded
    panel.classList.remove('expanded');

    // after transition, hide modal and clear inline styles
    const onEnd = () => {
        modal.setAttribute('aria-hidden', 'true');
        panel.style.left = '';
        panel.style.top = '';
        panel.style.width = '';
        panel.style.height = '';
        panel.removeEventListener('transitionend', onEnd);
    };
    panel.addEventListener('transitionend', onEnd);
});

modal && modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
        if (!panel) { modal.setAttribute('aria-hidden', 'true'); return; }
        panel.classList.remove('expanded');
        const onEnd = () => {
            modal.setAttribute('aria-hidden', 'true');
            panel.style.left = '';
            panel.style.top = '';
            panel.style.width = '';
            panel.style.height = '';
            panel.removeEventListener('transitionend', onEnd);
        };
        panel.addEventListener('transitionend', onEnd);
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.getAttribute('aria-hidden') === 'false') {
        if (!panel) { modal.setAttribute('aria-hidden', 'true'); return; }
        panel.classList.remove('expanded');
        const onEnd = () => {
            modal.setAttribute('aria-hidden', 'true');
            panel.style.left = '';
            panel.style.top = '';
            panel.style.width = '';
            panel.style.height = '';
            panel.removeEventListener('transitionend', onEnd);
        };
        panel.addEventListener('transitionend', onEnd);
    }
});
