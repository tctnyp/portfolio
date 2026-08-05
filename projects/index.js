const projectsGrid = document.getElementById('projects-grid');

function getProjectData(card) {
    return {
        title: card.dataset.title || '',
        subtitle: card.dataset.subtitle || '',
        desc: card.dataset.desc || '',
        banner: card.dataset.banner || ''
    };
}

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

    const card = btn.closest('.project-card');
    if (!card) return;

    const data = getProjectData(card);

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
