export class OrderProductComponent {
    constructor(parent) {
        this.parent = parent;
        this.data = {
            src: "assets/telephone.png",
            title: `Оформление заказа`,
            text: "Оформить заказ временно можно только по телефону:",
            phone: "+7 (999) 111-11-11"
        };
    }

    getHTML() {
        return `
            <div id="product-page" class="container my-5">
                <div class="card mx-auto" style="max-width: 500px;">
                    <div class="card-body text-center">
                        <h2 class="card-title mb-4">${this.data.title}</h2>
                        <img src="${this.data.src}" class="img-fluid mb-4" alt="Телефон" style="max-width: 150px;">
                        <p class="card-text">${this.data.text}</p>
                        <h4 class="mb-4">${this.data.phone}</h4>
                        <div class="text-center mt-4">
                            <button id="back-button" class="btn btn-outline-primary" type="button" style="
                                background: #fff;
                                color: #ff007a;
                                border: 2px solid #ff007a;
                                border-radius: 12px;
                                padding: 8px 16px;
                                font-weight: 600;
                                transition: all 0.2s ease-in-out;
                            ">Назад</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(backListener) {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        document.getElementById("back-button").addEventListener("click", backListener);
    }
}
