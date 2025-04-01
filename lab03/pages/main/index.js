import { ProductPage } from "../product/index.js";
import { ProductDetailPage } from "../product-detail/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.searchQuery = '';
    }

    getData() {
        return [
            {
                id: 1,
                src: "vc1.png",
                title: "3060 Ti",
                text: "Видеокарта Nvidia GeForce RTX 3060 Ti"
            },
            {
                id: 2,
                src: "vc3.png",
                title: "3080 Ti",
                text: "Видеокарта MSI GeForce RTX 3080 Ti GAMING X TRIO"
            },
            {
                id: 3,
                src: "vc2.png",
                title: "4070 Super",
                text: "Новая видеокарта RTX 4070 Super!"
            },
        ];
    }

    filterData(data) {
        if (!this.searchQuery) return data;
        
        const query = this.searchQuery.toLowerCase();
        return data.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.text.toLowerCase().includes(query)
        );
    }

    handleSearch(e) {
        this.searchQuery = e.target.value;
        this.updateAccordionContent();
    }

    updateAccordionContent() {
        const accordionContainer = document.getElementById('myAccordion');
        const data = this.getData();
        const filteredData = this.filterData(data);

        if (filteredData.length === 0) {
            accordionContainer.innerHTML = `
                <div class="text-center py-5">
                    <h3>Товары не найдены</h3>
                    <p class="text-muted">Попробуйте изменить поисковый запрос</p>
                </div>
            `;
            return;
        }

        const currentState = {};
        filteredData.forEach(item => {
            const collapseId = `collapse-${item.id}`;
            const collapseElement = document.getElementById(collapseId);
            if (collapseElement) {
                currentState[item.id] = collapseElement.classList.contains('show');
            }
        });

        accordionContainer.innerHTML = '';
        filteredData.forEach((item, index) => {
            const headingId = `heading-${item.id}`;
            const collapseId = `collapse-${item.id}`;
            const showClass = currentState[item.id] ? 'show' : '';
            const ariaExpanded = currentState[item.id] ? 'true' : 'false';
        
            const accordionItemHTML = `
                <div class="accordion-item" style="border: none; margin-bottom: 1rem;">
                    <h2 class="accordion-header" id="${headingId}">
                        <button
                            class="accordion-button ${showClass ? '' : 'collapsed'}"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#${collapseId}"
                            aria-expanded="${ariaExpanded}"
                            aria-controls="${collapseId}"
                            style="
                                background-color: #f9f9f9;
                                color: #333;
                                border-radius: 8px;
                                border: none;
                                transition: background-color 0.2s ease, color 0.2s ease;
                            "
                        >
                            ${item.title}
                        </button>
                    </h2>
                    <div
                        id="${collapseId}"
                        class="accordion-collapse collapse ${showClass}"
                        aria-labelledby="${headingId}"
                        data-bs-parent="#myAccordion"
                    >
                        <div class="accordion-body" style="background-color: #fff; border-radius: 8px;">
                            <div class="d-flex flex-column align-items-center">
                                <img
                                    src="${item.src}"
                                    alt="картинка"
                                    class="img-fluid"
                                    style="max-width: 200px; border-radius: 8px; margin-bottom: 16px;"
                                >
                                <p>${item.text}</p>
                                <div class="d-flex gap-3">
                                    <button
                                        class="btn btn-primary mt-3"
                                        id="click-accordion-${item.id}"
                                        data-id="${item.id}"
                                    >
                                        Купить
                                    </button>
                                    <button
                                        class="btn btn-outline-primary mt-3"
                                        id="details-accordion-${item.id}"
                                        data-id="${item.id}"
                                    >
                                        Подробнее
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        
            accordionContainer.insertAdjacentHTML('beforeend', accordionItemHTML);
        });

        filteredData.forEach((item) => {
            const buyBtn = document.getElementById(`click-accordion-${item.id}`);
            const detailsBtn = document.getElementById(`details-accordion-${item.id}`);
            buyBtn.addEventListener('click', this.clickCard.bind(this));
            detailsBtn.addEventListener('click', this.clickDetails.bind(this));
        });

        // Обновляем обработчики событий аккордеона
        this.setupAccordionEvents(accordionContainer);
    }

    setupAccordionEvents(accordionContainer) {
        accordionContainer.addEventListener('show.bs.collapse', (e) => {
            const heading = e.target.previousElementSibling;
            const button = heading.querySelector('button');
            if (button) {
                button.style.backgroundColor = '#ff007a';
                button.style.color = '#fff';
            }
        });
        accordionContainer.addEventListener('hide.bs.collapse', (e) => {
            const heading = e.target.previousElementSibling;
            const button = heading.querySelector('button');
            if (button) {
                button.style.backgroundColor = '#f9f9f9';
                button.style.color = '#333';
            }
        });
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    clickDetails(e) {
        const cardId = e.target.dataset.id;
        const productDetailPage = new ProductDetailPage(this.parent, cardId);
        productDetailPage.render();
    }

    render() {
        // Очищаем родительский контейнер
        this.parent.innerHTML = '';

        // Добавляем поисковую строку
        const searchHTML = `
            <div class="search-container">
                <input 
                    type="text" 
                    class="search-input" 
                    placeholder="Поиск товаров..."
                    value="${this.searchQuery}"
                >
            </div>
        `;
        this.parent.insertAdjacentHTML('beforeend', searchHTML);

        // Добавляем обработчик для поиска
        const searchInput = this.parent.querySelector('.search-input');
        searchInput.addEventListener('input', this.handleSearch.bind(this));

        // Создаём корневой контейнер аккордеона
        const accordionContainerId = 'myAccordion';
        const accordionHTML = `<div class="accordion" id="${accordionContainerId}"></div>`;
        this.parent.insertAdjacentHTML('beforeend', accordionHTML);

        // Инициализируем содержимое аккордеона
        this.updateAccordionContent();
    }
}
