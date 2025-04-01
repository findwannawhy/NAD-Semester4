export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `<button id="back-button" class="btn btn-secondary" type="button">Назад</button>`;
    }

    render(listener) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        document.getElementById("back-button").addEventListener("click", listener);
    }
}