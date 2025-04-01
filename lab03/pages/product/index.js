import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getData() {
        return {
            id: this.id,
            src: "telephone.png",
            title: `Оформление заказа`,
            text: "Оформить заказ можно по телефону:",
            phone: "+7 (999) 111-11-11"
        };
    }

    getHTML() {
        return `
            <div id="product-page" class="container my-5">
              <div class="card mx-auto" style="max-width: 500px;">
                <div class="card-body text-center">
                  <h2 class="card-title mb-4">${this.getData().title}</h2>
                  <img src="${this.getData().src}" class="img-fluid mb-4" alt="Телефон" style="max-width: 150px;">
                  <p class="card-text">${this.getData().text}</p>
                  <h4 class="mb-4">${this.getData().phone}</h4>
                  <button id="back-button" class="btn" 
                    style="background-color: #ff007a; color: white; border: none;">
                    Вернуться назад
                    </button>
                </div>
              </div>
            </div>
        `;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        
        // Назначаем обработчик для кнопки "Вернуться назад"
        document.getElementById("back-button").addEventListener("click", this.clickBack.bind(this));
    }
}
