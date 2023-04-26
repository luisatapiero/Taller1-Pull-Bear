class ProductComponent extends HTMLElement {
    static get observedAttributes() {
        return ['url', 'type', 'name', 'description', 'price', 'color'];
    }
    constructor() {
        super();
        this.url = this.getAttribute('url');
        this.type = this.getAttribute('type');
        this.name = this.getAttribute('name');
        this.description = this.getAttribute('description');
        this.price = this.getAttribute('price');
        this.color = this.getAttribute('color');

        this.attachShadow({
            mode: 'open'
        })
    }
    connectedCallback() {
        this.render();
    }
    attributeChangeCallback(propName, oldValue, newValue) {
        this[propName] = newValue;
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./components/productComponent/productComponent.css">
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
        <div class="card">
            <div class="img-container"> 
                <img src="${this.url}" class="image">

            </div>
                
            <div class="content">
                <p class="tag">${this.type}</p>
                <h3 class="title">${this.name}</h3>
                <p class="description">${this.description}</p>
                <p class="price">Price $${this.price}</p>
                <p class="color">${this.color}</p>
                <button class="buy-btn">BUY NOW</button> 
            </div>
        </div>
        `;
    }
 
    set url(val) {
        this.setAttribute('url', val);
    }

    get url() {
        return this.getAttribute('url');
    }
}

customElements.define("app-productinfo", ProductComponent);
export default ProductComponent;
