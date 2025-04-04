import { ProductItemComponent } from "../product-item/index.js";
import { AddProductButtonComponent } from "../add-product-button/index.js";

export class ProductListComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(items, onBuy, onDetails, onDelete, onEdit, onAddProduct) {
        const container = document.createElement('div');
        container.id = 'products-container';

        if (items.length === 0) {
            container.innerHTML = `
                <div class="text-center py-5">
                    <h3>Товары не найдены</h3>
                    <p class="text-muted">Попробуйте изменить поисковый запрос</p>
                </div>
            `;
        } else {
            items.forEach(item => {
                const productComponent = new ProductItemComponent(
                    item,
                    onBuy,
                    onDetails,
                    onDelete,
                    onEdit
                );
                const productElement = document.createElement('div');
                productElement.innerHTML = productComponent.render();
                container.appendChild(productElement);
                
                // Ждем следующего тика цикла событий, чтобы DOM обновился
                setTimeout(() => {
                    productComponent.setupEvents();
                }, 0);
            });
        }

        this.parent.appendChild(container);

        // Добавляем кнопку добавления товара после списка товаров
        const addButtonContainer = document.createElement('div');
        addButtonContainer.className = 'mt-4 text-center';
        this.parent.appendChild(addButtonContainer);
        
        const addProductButton = new AddProductButtonComponent(addButtonContainer);
        addProductButton.render(onAddProduct);
    }
} 