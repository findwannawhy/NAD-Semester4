import { MainPage } from "../main/index.js";
import { ProductDetailComponent } from "../../components/product-detail/index.js";
import { stocksApi } from "../../src/api/index.js";

export class ProductDetailPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
        this.productDetailComponent = new ProductDetailComponent(parent);
    }

    async getData() {
        try {
            const data = await stocksApi.getStockById(this.id);
            return data;
        } catch (error) {
            console.error('Ошибка при получении данных о продукте:', error);
            return null;
        }
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    async render() {
        const data = await this.getData();
        if (data) {
            this.productDetailComponent.render(data, this.clickBack.bind(this));
        } else {
            // Обработка случая, когда данные не удалось получить
            console.error('Не удалось загрузить данные о продукте');
        }
    }
}