import { OrderProductComponent } from "../../components/order-product/index.js";
import { MainPage } from "../main/index.js";

export class OrderProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
        this.orderProductComponent = new OrderProductComponent(parent);
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.orderProductComponent.render(this.clickBack.bind(this));
    }
}
