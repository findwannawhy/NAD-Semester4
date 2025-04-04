import { ASSETS_PATH } from '../../src/constants.js';

export class ProductItemComponent {
    constructor(item, onBuy, onDetails, onDelete, onEdit) {
        this.item = {
            ...item,
            src: item.src.startsWith('assets/') ? item.src : `${ASSETS_PATH}${item.src}`
        };
        this.onBuy = onBuy;
        this.onDetails = onDetails;
        this.onDelete = onDelete;
        this.onEdit = onEdit;
    }

    render() {
        const headingId = `heading-${this.item.id}`;
        const collapseId = `collapse-${this.item.id}`;

        return `
            <div class="accordion-item" style="border: none; margin-bottom: 1rem;">
                <h2 class="accordion-header" id="${headingId}">
                    <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#${collapseId}"
                        aria-expanded="false"
                        aria-controls="${collapseId}"
                        style="
                            background-color: #f9f9f9;
                            color: #333;
                            border-radius: 8px;
                            border: none;
                            transition: background-color 0.2s ease, color 0.2s ease;
                            font-weight: 500;
                            padding: 1rem;
                        "
                    >
                        ${this.item.title}
                    </button>
                </h2>
                <div
                    id="${collapseId}"
                    class="accordion-collapse collapse"
                    aria-labelledby="${headingId}"
                    data-bs-parent="#myAccordion"
                >
                    <div class="accordion-body" style="background-color: #fff; border-radius: 8px; padding: 1.5rem;">
                        <div class="d-flex flex-column align-items-center">
                            <img
                                src="${this.item.src}"
                                alt="картинка"
                                class="img-fluid"
                                style="max-width: 200px; border-radius: 8px; margin-bottom: 16px;"
                            >
                            <p class="text-center mb-4">${this.item.description}</p>
                            <div class="d-flex justify-content-center mb-4">
                                <span class="badge bg-primary fs-5">${this.item.price} ₽</span>
                            </div>
                            <div class="d-flex flex-column gap-3 w-100">
                                <div class="d-flex gap-3">
                                    <button
                                        class="btn btn-outline-primary flex-grow-1"
                                        id="click-accordion-${this.item.id}"
                                        data-id="${this.item.id}"
                                    >
                                        Купить
                                    </button>
                                    <button
                                        class="btn btn-outline-primary flex-grow-1"
                                        id="details-accordion-${this.item.id}"
                                        data-id="${this.item.id}"
                                    >
                                        Подробнее
                                    </button>
                                </div>
                                <div class="d-flex gap-3">
                                    <button
                                        class="btn btn-outline-danger flex-grow-1"
                                        id="delete-product-${this.item.id}"
                                        data-id="${this.item.id}"
                                    >
                                        Удалить
                                    </button>
                                    <button
                                        class="btn btn-outline-warning flex-grow-1"
                                        id="edit-product-${this.item.id}"
                                        data-id="${this.item.id}"
                                    >
                                        Редактировать
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupEvents() {
        const productElement = document.querySelector(`[data-id="${this.item.id}"]`).closest('.accordion-item');
        const buyBtn = productElement.querySelector(`#click-accordion-${this.item.id}`);
        const detailsBtn = productElement.querySelector(`#details-accordion-${this.item.id}`);
        const deleteBtn = productElement.querySelector(`#delete-product-${this.item.id}`);
        const editBtn = productElement.querySelector(`#edit-product-${this.item.id}`);
        
        console.log('Setting up events for product:', this.item.id);
        console.log('Delete button:', deleteBtn);
        console.log('Edit button:', editBtn);
        console.log('Delete handler:', this.onDelete);
        console.log('Edit handler:', this.onEdit);
        
        if (buyBtn) {
            console.log('Setting up buy button handler');
            buyBtn.addEventListener('click', (e) => {
                console.log('Buy button clicked');
                this.onBuy(e);
            });
        }
        if (detailsBtn) {
            console.log('Setting up details button handler');
            detailsBtn.addEventListener('click', (e) => {
                console.log('Details button clicked');
                this.onDetails(e);
            });
        }
        if (deleteBtn) {
            console.log('Setting up delete button handler');
            deleteBtn.addEventListener('click', (e) => {
                console.log('Delete button clicked');
                this.onDelete(e);
            });
        }
        if (editBtn) {
            console.log('Setting up edit button handler');
            editBtn.addEventListener('click', (e) => {
                console.log('Edit button clicked');
                this.onEdit(e);
            });
        }
    }
} 