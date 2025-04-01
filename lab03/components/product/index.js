export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="product-detail">
                <h3>${data.title}</h3>
                <p>${data.text}</p>
            </div>
        `;
    }

    render(data) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
    }
}
