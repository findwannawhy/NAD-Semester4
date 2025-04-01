import { MainPage } from "../main/index.js";

export class ProductDetailPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getData() {
        const data = {
            1: {
                src: "vc1.png",
                title: "3060 Ti",
                description: "Видеокарта Nvidia GeForce RTX 3060 Ti - мощная видеокарта для игр и работы с графикой. Оснащена 8 ГБ видеопамяти GDDR6, поддерживает технологию DLSS и трассировку лучей в реальном времени."
            },
            2: {
                src: "vc3.png",
                title: "3080 Ti",
                description: "Видеокарта MSI GeForce RTX 3080 Ti GAMING X TRIO - флагманская модель с премиальным охлаждением. Оснащена 12 ГБ видеопамяти GDDR6X, имеет три вентилятора и RGB-подсветку."
            },
            3: {
                src: "vc2.png",
                title: "4070 Super",
                description: "Новая видеокарта RTX 4070 Super! Превосходная производительность в играх и приложениях для работы с 3D. Оснащена 12 ГБ видеопамяти GDDR6X и новейшей архитектурой Ada Lovelace."
            }
        };
        return data[this.id];
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        const data = this.getData();
        this.parent.innerHTML = `
            <div class="container my-5">
                <div class="row justify-content-center">
                    <div class="col-md-8 text-center">
                        <img src="${data.src}" class="img-fluid mb-4" alt="${data.title}" style="max-width: 500px; border-radius: 12px;">
                        <h1 class="display-4 mb-4">${data.title}</h1>
                        <p class="lead mb-4">${data.description}</p>
                        <button id="back-button" class="btn btn-primary">
                            Вернуться назад
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById("back-button").addEventListener("click", this.clickBack.bind(this));
    }
} 