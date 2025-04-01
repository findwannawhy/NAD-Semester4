export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card" style="width: 18rem;">
                <img src="${data.src}" class="card-img-top" alt="картинка">
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text">${data.text}</p>
                    <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">
                        Нажми на меня
                    </button>
                </div>
            </div>
        `;
    }

    render(data, listener) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
        document.getElementById(`click-card-${data.id}`).addEventListener("click", listener);
    }
}
