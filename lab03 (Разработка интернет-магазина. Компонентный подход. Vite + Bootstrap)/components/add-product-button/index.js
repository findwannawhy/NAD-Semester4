import { AddProductModalComponent } from '../add-product-modal';

export class AddProductButtonComponent {
    constructor(parent) {
        this.parent = parent;
        this.modal = new AddProductModalComponent(parent);
    }

    getHTML() {
        return `
            <div class="text-center mt-4">
                <button
                    class="btn btn-primary"
                    id="add-product-button"
                    style="
                        padding: 0.5rem 1.5rem;
                        font-weight: 500;
                        border-radius: 8px;
                        background-color: #ff007a;
                        border-color: #ff007a;
                        color: white;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    "
                >
                    Добавить товар
                </button>
            </div>
        `;
    }

    render(addCallback) {
        // Удаляем старую кнопку, если она существует
        const oldButton = document.getElementById('add-product-button');
        if (oldButton) {
            oldButton.parentElement.remove();
        }
        
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        const addBtn = document.getElementById('add-product-button');
        
        addBtn.addEventListener('click', () => {
            this.modal.render(addCallback);
        });
    }
} 