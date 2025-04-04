import { OrderProductPage } from "../order-product/index.js";
import { ProductDetailPage } from "../product-detail/index.js";
import { stocksApi } from "../../src/api/index.js";
import { SearchComponent } from "../../components/search/index.js";
import { ProductListComponent } from "../../components/product-list/index.js";
import { EditProductModalComponent } from "../../components/edit-product-modal/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.searchQuery = '';
        this.searchComponent = new SearchComponent(parent, this.handleSearch.bind(this));
        this.productListComponent = new ProductListComponent(parent);
        this.editProductModalComponent = new EditProductModalComponent(parent);
    }

    async getData() {
        try {
            console.log('Запрос данных с сервера...');
            const data = await stocksApi.getAllStocks();
            console.log('Получены данные:', data);
            return data;
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
            return [];
        }
    }

    filterData(data) {
        if (!this.searchQuery) return data;
        
        const query = this.searchQuery.toLowerCase();
        return data.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.description.toLowerCase().includes(query)
        );
    }

    handleSearch(e) {
        this.searchQuery = e.target.value.trim();
        this.searchComponent.setSearchQuery(this.searchQuery);
        this.updateContent();
    }

    async handleDeleteProduct(e) {
        console.log('handleDeleteProduct called with event:', e);
        const productId = e.target.dataset.id;
        console.log('Deleting product with ID:', productId);
        try {
            console.log('Calling deleteStock API...');
            await stocksApi.deleteStock(productId);
            console.log('Product deleted successfully');
            await this.updateContent();
        } catch (error) {
            console.error('Ошибка при удалении товара:', error);
        }
    }

    async handleEditProduct(e) {
        const productId = e.target.dataset.id;
        console.log('Editing product with ID:', productId);
        try {
            const productData = await stocksApi.getStockById(productId);
            this.editProductModalComponent.render(productData, async (formData) => {
                try {
                    console.log('Updating product with data:', formData);
                    const result = await stocksApi.updateStock(productId, formData);
                    console.log('Product updated successfully:', result);
                    const modal = bootstrap.Modal.getInstance(document.getElementById('editProductModal'));
                    if (modal) {
                        modal.hide();
                    }
                    await this.updateContent();
                } catch (error) {
                    console.error('Ошибка при обновлении товара:', error);
                    alert('Произошла ошибка при обновлении товара. Пожалуйста, попробуйте еще раз.');
                }
            });
        } catch (error) {
            console.error('Ошибка при получении данных товара:', error);
            alert('Произошла ошибка при получении данных товара. Пожалуйста, попробуйте еще раз.');
        }
    }

    // отправка данных на сервер
    async handleAddProduct(formData) {
        try {
            const productData = {
                title: formData.title,
                price: formData.price,
                description: formData.description,
                proDescription: formData.proDescription,
                src: formData.src
            };
            
            const result = await stocksApi.createStock(productData);
            this.searchQuery = '';
            this.searchComponent.setSearchQuery('');
            await this.updateContent();
        } catch (error) {
            console.error('Ошибка при добавлении товара:', error);
            alert('Произошла ошибка при добавлении товара. Пожалуйста, попробуйте еще раз.');
        }
    }

    async updateContent() {
        console.log('Обновление содержимого...');
        const data = await this.getData();
        console.log('Данные для отображения:', data);
        const filteredData = this.filterData(data);

        // Находим контейнер аккордеона
        let accordionContainer = this.parent.querySelector('#myAccordion');
        
        // Если контейнер не существует, создаем его
        if (!accordionContainer) {
            const accordionHTML = `<div class="accordion" id="myAccordion"></div>`;
            this.parent.insertAdjacentHTML('beforeend', accordionHTML);
            accordionContainer = this.parent.querySelector('#myAccordion');
        }

        // Полностью очищаем контейнер аккордеона
        accordionContainer.innerHTML = '';

        // Создаем новый контейнер для списка продуктов
        const productListContainer = document.createElement('div');
        productListContainer.id = 'productListContainer';
        accordionContainer.appendChild(productListContainer);

        // Используем существующий экземпляр ProductListComponent
        this.productListComponent.parent = productListContainer;
        this.productListComponent.render(
            filteredData,
            this.clickOrder.bind(this),
            this.clickDetails.bind(this),
            this.handleDeleteProduct.bind(this),
            this.handleEditProduct.bind(this),
            this.handleAddProduct.bind(this)
        );
    }

    clickOrder(e) {
        const cardId = e.target.dataset.id;
        const orderProductPage = new OrderProductPage(this.parent, cardId);
        orderProductPage.render();
    }

    clickDetails(e) {
        const cardId = e.target.dataset.id;
        const productDetailPage = new ProductDetailPage(this.parent, cardId);
        productDetailPage.render();
    }

    async render() {
        this.parent.innerHTML = '';
        this.searchComponent.render();
        await this.updateContent();
    }
}
