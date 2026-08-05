const projectsGrid = document.getElementById('projects-grid');

function getProjectData(card) {
    return {
        title: card.dataset.title || '',
        subtitle: card.dataset.subtitle || '',
        rank: card.dataset.rank || '',
        status: card.dataset.status || 'Online',
        desc: card.dataset.desc || '',
        banner: card.dataset.banner || '',
        links: parseLinks(card.dataset.links || ''),
        stats: parseLinks(card.dataset.stats || '')
    };
}

function parseLinks(rawLinks) {
    if (!rawLinks) return [];

    try {
        const parsed = JSON.parse(rawLinks);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

const modal = document.getElementById('project-modal');
const modalTitle = modal && modal.querySelector('.modal-title');
const modalSubtitle = modal && modal.querySelector('.modal-subtitle');
const modalRank = modal && modal.querySelector('.modal-rank span');
const modalDesc = modal && modal.querySelector('.modal-desc');
const modalStatus = modal && modal.querySelector('.modal-status');
const modalStats = modal && modal.querySelector('.modal-stats');
const modalLinks = modal && modal.querySelector('.modal-links');
const modalBanner = modal && modal.querySelector('.modal-banner img');
const modalPanel = modal && modal.querySelector('.modal-panel');
const modalClose = modal && modal.querySelector('.modal-close');

function getStatusClass(status) {
    const normalized = (status || '').toLowerCase();

    if (normalized.includes('offline')) {
        return 'status-offline';
    }

    if (normalized.includes('maint')) {
        return 'status-maintenance';
    }

    if (normalized.includes('discontinued')) {
        return 'status-discontinued';
    }

    return 'status-online';
}

function renderStats(stats) {
    if (!modalStats) return;

    modalStats.replaceChildren();

    if (!Array.isArray(stats) || stats.length === 0) {
        modalStats.hidden = true;
        return;
    }

    modalStats.hidden = false;

    for (const stat of stats) {
        const item = document.createElement('article');
        item.className = 'modal-stat';

        const label = document.createElement('span');
        label.className = 'modal-stat-label';
        label.textContent = stat?.label || 'Stat';

        const value = document.createElement('strong');
        value.className = 'modal-stat-value';
        value.textContent = stat?.value || '';

        item.append(label, value);
        modalStats.append(item);
    }
}

function renderLinks(links) {
    if (!modalLinks) return;

    modalLinks.replaceChildren();

    if (!Array.isArray(links) || links.length === 0) {
        modalLinks.hidden = true;
        return;
    }

    modalLinks.hidden = false;
    for (const link of links) {
        const label = link?.label || link?.text || 'Link';
        const value = link?.value || link?.href || link?.text || '';
        const href = link?.href || '';
        const row = document.createElement('div');
        row.className = 'modal-link-row';

        const labelSpan = document.createElement('span');
        labelSpan.className = 'modal-link-label';
        labelSpan.textContent = `${label}:`;

        const valueNode = href ? document.createElement('a') : document.createElement('span');
        valueNode.className = 'modal-link-value';
        valueNode.textContent = value;

        if (href) {
            valueNode.href = href;
            valueNode.target = '_blank';
            valueNode.rel = 'noopener noreferrer';
        }

        row.append(labelSpan, valueNode);
        modalLinks.append(row);
    }
}

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
    if (modalRank) modalRank.textContent = data.rank || 'Server role';
    if (modalDesc) modalDesc.textContent = data.desc;
    if (modalBanner) modalBanner.src = data.banner;
    if (modalStatus) {
        modalStatus.textContent = `Status: ${data.status}`;
        modalStatus.className = `modal-status ${getStatusClass(data.status)}`;
    }
    renderStats(data.stats);
    renderLinks(data.links);
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
