import { ASSETS_PATH } from '../../src/constants.js';

export class ProductDetailComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        const imageSrc = data.src.startsWith('assets/') ? data.src : `${ASSETS_PATH}${data.src}`;
        return `
            <div class="container-fluid p-0" style="margin-top: 80px;">
                <div class="row g-0">
                    <div class="col-md-6 d-flex align-items-center justify-content-center p-4">
                        <img src="${imageSrc}" class="img-fluid rounded-4 shadow-lg" alt="${data.title}" style="max-height: 70vh; object-fit: contain;">
                    </div>
                    <div class="col-md-6 d-flex flex-column justify-content-center p-4 bg-light">
                        <h1 class="display-5 fw-bold mb-3">${data.title}</h1>
                        <p class="lead mb-3">${data.description}</p>
                        <p class="mb-4">${data.proDescription}</p>
                        <div class="mt-auto">
                            <button id="back-button" class="btn btn-outline-primary" type="button" style="
                                background: #fff;
                                color: #ff007a;
                                border: 2px solid #ff007a;
                                border-radius: 10px;
                                padding: 10px 20px;
                                font-weight: 600;
                                transition: all 0.2s ease-in-out;
                                width: 180px;
                            ">Назад</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(data, backListener) {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
        document.getElementById("back-button").addEventListener("click", backListener);
    }
}
