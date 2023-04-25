class CardComponent extends HTMLElement {
    static get observedAttributes() {
        return ['url', 'type', 'name', 'description', 'price'];
    }
    constructor() {
        super();
        this.url = this.getAttribute('url');
        this.type = this.getAttribute('type');
        this.name = this.getAttribute('name');
        this.description = this.getAttribute('description');
        this.price = this.getAttribute('price');

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
        <link rel="stylesheet" href="./components/cardComponent/cardComponent.css">
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
        <div class="card">
            <div class="img-container"> 
                <img src="${this.url}" class="image">
                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.354 2.354-6.049-.002-8.416a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595zm6.791 1.61c1.563 1.571 1.564 4.025.002 5.588L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002z"></path></svg>
            </div>
                
            <div class="content">
                <p class="tag">${this.type}</p>
                <h3 class="title">${this.name}</h3>
                <p class="description">${this.description}</p>
                <p class="price">Price $${this.price}</p>
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
customElements.define("app-card", CardComponent);
export default CardComponent;