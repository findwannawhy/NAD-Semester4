import { ASSETS_PATH } from '../../src/constants.js';

export class EditProductModalComponent {
    constructor(parent) {
        this.parent = parent;
        this.modal = null;
    }

    getHTML() {
        return `
            <div class="modal fade" id="editProductModal" tabindex="-1" aria-labelledby="editProductModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="editProductModalLabel">Редактировать товар</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="editProductForm">
                                <div class="mb-3">
                                    <label for="editProductName" class="form-label">Название товара</label>
                                    <input type="text" class="form-control" id="editProductName" required>
                                </div>
                                <div class="mb-3">
                                    <label for="editProductPrice" class="form-label">Цена</label>
                                    <input type="number" class="form-control" id="editProductPrice" required>
                                </div>
                                <div class="mb-3">
                                    <label for="editProductDescription" class="form-label">Описание</label>
                                    <textarea class="form-control" id="editProductDescription" rows="3"></textarea>
                                </div>
                                <div class="mb-3">
                                    <label for="editProductProDescription" class="form-label">Подробное описание</label>
                                    <textarea class="form-control" id="editProductProDescription" rows="5"></textarea>
                                </div>
                                <div class="mb-3">
                                    <label for="editProductImage" class="form-label">Ссылка на изображение</label>
                                    <input type="url" class="form-control" id="editProductImage" required>
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
                            <button type="button" class="btn btn-primary" id="confirmEditProduct" style="
                                background: #ff007a;
                                color: #fff;
                                border: 2px solid #ff007a;
                                border-radius: 12px;
                                padding: 8px 16px;
                                font-weight: 600;
                                transition: all 0.2s ease-in-out;
                            ">Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(productData, onConfirm) {
        // Добавляем модальное окно только если его еще нет
        if (!document.getElementById('editProductModal')) {
            this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        }
        
        // Заполняем форму данными товара
        document.getElementById('editProductName').value = productData.title;
        document.getElementById('editProductPrice').value = productData.price;
        document.getElementById('editProductDescription').value = productData.description;
        document.getElementById('editProductProDescription').value = productData.proDescription;
        document.getElementById('editProductImage').value = productData.src;
        
        // Инициализируем модальное окно
        const modalElement = document.getElementById('editProductModal');
        this.modal = new bootstrap.Modal(modalElement);
        
        // Показываем модальное окно
        this.modal.show();
        
        // Настраиваем обработчик для кнопки подтверждения
        const confirmBtn = document.getElementById('confirmEditProduct');
        confirmBtn.onclick = () => {
            const form = document.getElementById('editProductForm');
            const formData = {
                title: document.getElementById('editProductName').value,
                price: document.getElementById('editProductPrice').value,
                description: document.getElementById('editProductDescription').value,
                proDescription: document.getElementById('editProductProDescription').value,
                src: document.getElementById('editProductImage').value.startsWith('assets/') 
                    ? document.getElementById('editProductImage').value 
                    : `${ASSETS_PATH}${document.getElementById('editProductImage').value}`
            };
            
            onConfirm(formData);
            this.modal.hide();
            form.reset();
        };
    }
} 