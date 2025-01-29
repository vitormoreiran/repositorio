document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const projectsContainer = document.querySelector('.projects-container');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalDetails = document.getElementById('modal-details');
    const modalLink = document.getElementById('modal-link');
    const closeModalBtn = document.querySelector('.modal-close');

    // Função para ativar seção visível no scroll
    function checkSections() {
        let scrollPos = window.scrollY;
        sections.forEach(section => {
            if (scrollPos >= section.offsetTop - 150 && scrollPos < section.offsetTop + section.offsetHeight - 150) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', checkSections);
    checkSections(); // Inicializa no carregamento

    // Função para abrir modal
    function openModal(imageSrc, link, details) {
        modalImage.src = imageSrc;
        modalLink.href = link;
        modalDetails.innerHTML = details;
        modal.style.display = 'flex';
    }

    // Função para fechar modal
    function closeModal() {
        modal.style.display = 'none';
    }

    closeModalBtn.addEventListener('click', closeModal);

    // Carrega os projetos do JSON e cria os cards dinamicamente
    fetch('assets/json/data.json')
        .then(response => response.json())
        .then(data => {
            data.projects.forEach(project => {
                const card = document.createElement('div');
                card.classList.add('project-card');

                const cardImageDiv = document.createElement('div');
                cardImageDiv.classList.add('card-image');

                const img = document.createElement('img');
                img.src = project.image;
                img.alt = project.title;

                cardImageDiv.appendChild(img);

                const cardTextDiv = document.createElement('div');
                cardTextDiv.classList.add('card-text');

                const textContentDiv = document.createElement('div');
                textContentDiv.classList.add('text-content');

                const title = document.createElement('h2');
                title.classList.add('project-title');
                title.textContent = project.title;

                const subtitle = document.createElement('h3');
                subtitle.classList.add('project-subtitle');
                subtitle.textContent = project.subtitle;

                const description = document.createElement('p');
                description.classList.add('project-description');
                description.textContent = project.description;

                textContentDiv.appendChild(title);
                textContentDiv.appendChild(subtitle);
                textContentDiv.appendChild(description);

                const category = document.createElement('p');
                category.classList.add('project-category');
                category.textContent = project.category;

                const button = document.createElement('button');
                button.classList.add('cta-button-fixed');
                button.textContent = 'DETALHES';
                button.addEventListener('click', () => {
                    openModal(project.image, project.link, project.details);
                });

                cardTextDiv.appendChild(textContentDiv);
                cardTextDiv.appendChild(category);
                cardTextDiv.appendChild(button);

                card.appendChild(cardImageDiv);
                card.appendChild(cardTextDiv);

                projectsContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Erro ao carregar os dados do JSON:', error));
});
