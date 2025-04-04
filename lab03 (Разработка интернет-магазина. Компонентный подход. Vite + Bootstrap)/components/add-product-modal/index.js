import { ASSETS_PATH } from '../../src/constants.js';

export class AddProductModalComponent {
    constructor(parent) {
        this.parent = parent;
        this.modal = null;
    }

    getHTML() {
        return `
            <div class="modal fade" id="addProductModal" tabindex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="addProductModalLabel">Добавить новый товар</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="addProductForm">
                                <div class="mb-3">
                                    <label for="productName" class="form-label">Название товара</label>
                                    <input type="text" class="form-control" id="productName" required>
                                </div>
                                <div class="mb-3">
                                    <label for="productPrice" class="form-label">Цена</label>
                                    <input type="number" class="form-control" id="productPrice" required>
                                </div>
                                <div class="mb-3">
                                    <label for="productDescription" class="form-label">Описание</label>
                                    <textarea class="form-control" id="productDescription" rows="3"></textarea>
                                </div>
                                <div class="mb-3">
                                    <label for="productProDescription" class="form-label">Подробное описание</label>
                                    <textarea class="form-control" id="productProDescription" rows="5"></textarea>
                                </div>
                                <div class="mb-3">
                                    <label for="productImage" class="form-label">Ссылка на изображение</label>
                                    <input type="url" class="form-control" id="productImage" required>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" style="
                                background: #fff;
                                color: #ff007a;
                                border: 2px solid #ff007a;
                                border-radius: 12px;
                                padding: 8px 16px;
                                font-weight: 600;
                                transition: all 0.2s ease-in-out;
                            ">Отмена</button>
                            <button type="button" class="btn btn-primary" id="confirmAddProduct" style="
                                background: #ff007a;
                                color: #fff;
                                border: 2px solid #ff007a;
                                border-radius: 12px;
                                padding: 8px 16px;
                                font-weight: 600;
                                transition: all 0.2s ease-in-out;
                            ">Добавить</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(onConfirm) {
        // Добавляем модальное окно только если его еще нет
        if (!document.getElementById('addProductModal')) {
            this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        }
        
        // Инициализируем модальное окно
        const modalElement = document.getElementById('addProductModal');
        this.modal = new bootstrap.Modal(modalElement);
        
        // Показываем модальное окно
        this.modal.show();
        
        // Настраиваем обработчик для кнопки подтверждения
        const confirmBtn = document.getElementById('confirmAddProduct');
        confirmBtn.onclick = () => {
            const form = document.getElementById('addProductForm');
            const formData = {
                title: document.getElementById('productName').value,
                price: document.getElementById('productPrice').value,
                description: document.getElementById('productDescription').value,
                proDescription: document.getElementById('productProDescription').value,
                src: document.getElementById('productImage').value.startsWith('assets/') 
                    ? document.getElementById('productImage').value 
                    : `${ASSETS_PATH}${document.getElementById('productImage').value}`
            };
            
            onConfirm(formData);
            this.modal.hide();
            form.reset();
        };
    }
} 