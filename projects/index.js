const projects = [
    {
        id: 'zenix',
        title: 'Zenix.SG',
        subtitle: 'Server Hosting',
        tags: ['Hosting', 'Deployment', 'Infrastructure'],
        banner: '../Files/Images/placeholder.png',
        icon: '../Files/Images/placeholder.png',
        desc: 'Server hosting setup, deployment, and maintenance for reliable multiplayer experiences. Includes backups, monitoring, and automated deployments.'
    },
    {
        id: 'hyper',
        title: 'Hyper Studios',
        subtitle: 'Minecraft Server',
        tags: ['Minecraft', 'Hosting', 'Community'],
        banner: '../Files/Images/placeholder.png',
        icon: '../Files/Images/placeholder.png',
        desc: 'Minecraft server development: plugins, features, and community tooling for custom gameplay, moderation systems, and performance optimizations.'
    }
];

const projectsGrid = document.getElementById('projects-grid');

if (projectsGrid) {
    projectsGrid.innerHTML = projects.map((project) => `
        <article class="info-card project-card" data-project-id="${project.id}">
            <div class="project-banner">
                <img src="${project.banner}" alt="${project.title} banner">
            </div>

            <div class="project-body">
                <div class="project-meta">
                    <div class="project-icon"><img src="${project.icon}" alt="${project.title} icon"></div>
                    <div class="project-heading">
                        <div class="project-title">${project.title}</div>
                        <div class="project-subtitle">${project.subtitle}</div>
                        <div class="project-tags">
                            ${project.tags.map((tag) => `<span class="project-tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                </div>

                <p class="project-desc">${project.desc}</p>

                <div class="project-footer">
                    <button class="view-project" data-project="${project.id}">View Project →</button>
                </div>
            </div>
        </article>
    `).join('');
}

const projectMap = projects.reduce((map, project) => {
    map[project.id] = project;
    return map;
}, {});

const modal = document.getElementById('project-modal');
const modalTitle = modal && modal.querySelector('.modal-title');
const modalSubtitle = modal && modal.querySelector('.modal-subtitle');
const modalDesc = modal && modal.querySelector('.modal-desc');
const modalBanner = modal && modal.querySelector('.modal-banner img');
const modalPanel = modal && modal.querySelector('.modal-panel');
const modalClose = modal && modal.querySelector('.modal-close');

function openModal() {
    if (!modal || !modalPanel) return;
    modal.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(() => {
        modalPanel.classList.add('expanded');
    });
}

function closeModal() {
    if (!modal || !modalPanel) return;
    modalPanel.classList.remove('expanded');

    const onEnd = () => {
        modal.setAttribute('aria-hidden', 'true');
        modalPanel.removeEventListener('transitionend', onEnd);
    };

    modalPanel.addEventListener('transitionend', onEnd);
}

projectsGrid && projectsGrid.addEventListener('click', (event) => {
    const btn = event.target.closest('.view-project');
    if (!btn) return;

    const id = btn.dataset.project;
    const data = projectMap[id];
    if (!data) return;

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalSubtitle) modalSubtitle.textContent = data.subtitle;
    if (modalDesc) modalDesc.textContent = data.desc;
    if (modalBanner) modalBanner.src = data.banner;
    openModal();
});

// Close handlers
modalClose && modalClose.addEventListener('click', closeModal);

modal && modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.getAttribute('aria-hidden') === 'false') {
        closeModal();
    }
});
