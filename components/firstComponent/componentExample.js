import getData from "../../json.js";


class firstComponent extends HTMLElement {
    static get observedAttributes() {
        return ['class']
    }
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        })
        this.list = [];
        this.filters = {};
    }
    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./components/firstComponent/componentExample.css">
        <div class="container">
            <aside class="filters">
                <button id="price-asc">Precio ascendente</button>
                <button id="price-desc">Precio descendente</button>
                <input type="checkbox" id="filter-pants">
                <label for="filter-pants">Pantalones</label>
                <h1>categorias</h1>
                <h1>precio</h1>
                <h1>color</h1>
            </aside>   
            <div class="card-wrapper" id="cards">
            </div>
        </div>
        `
        let priceAscButton = this.shadowRoot.getElementById("price-asc");
        let priceDescButton = this.shadowRoot.getElementById("price-desc");
        priceAscButton.addEventListener('click', this.sortItemsList("price", true).bind(this));
        priceDescButton.addEventListener('click', this.sortItemsList("price", false).bind(this));

        let pantsFilter = this.shadowRoot.getElementById("filter-pants");
        pantsFilter.addEventListener('click', (e) => {
            if (e.target.checked)
                this.filters = {...this.filters, category: "Pants"};
            else delete this.filters.category;
            this.render();
        });

        this.printData();
    }
    attributeChangeCallback(propName, oldValue, newValue) {
        this[propName] = newValue;
        this.printData();
    }

    render() {
        let card = this.shadowRoot.getElementById("cards");
        card.innerHTML = '';
        this.filterItemsArray(this.filters).forEach((item) => {
            card.innerHTML += `            
                <app-card 
                    name="${item.name}" 
                    type="${item.type}" 
                    url="${item.url}" 
                    description="${item.description}" 
                    price="${item.price}">
                </app-card>      
            `
        })


    }

    filterItemsArray(filters) {
        return this.list.filter((item) => {
            let include = true;
            console.log(filters);

            for (const attr in filters) {
                console.log(item[attr], filters[attr], attr);
                if (item[attr] !== filters[attr])
                    include = false;
            }

            return include;
        });
    }

    sortItemsList(attr, asc) {
        return () => {
            console.log(this.list);
            console.log("------ SORTING ------");
            
            this.list.sort((a, b) => {
                switch(attr) {
                    case "price": 
                        if(asc) return a.price - b.price;
                        else b.price - a.price;
                        break;
                }
            });

            console.log(this.list);

            this.render();
        }
    }

    printData() {
        getData().then((a) => {
            this.list = a
            this.render()
        })

    }


}
customElements.define("app-header", firstComponent);
export default firstComponent;