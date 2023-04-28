import getData from "../../json.js";

const HIDDEN_CLASS = "hidden";

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
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
        <div class="title">
        <h3 class="title-text">Top Products</h3>
        </div>
        <div class="filter-div">
            <button class="filter">Filtro</button>
        </div>
        <div class="container">
            <aside class="filters hidden">
            <div class="menu">
            <h3 class="heading">Precio</h3>
            <div class = "price-div">
                <button class="menu-item menu-item-button" id="price-asc">Precio ascendente</button>
                <button class="menu-item menu-item-button menu-item-button-margin" id="price-desc">Precio descendente</button>
                </div>
                <h3 class="heading">Items</h3>
                <div class="menu-inner">
                <input class="menu-item menu-item-checkbox" type="checkbox" id="filter-pants">
                <label class="menu-item" for="filter-pants">Pants</label>
                </div>
                <div class="menu-inner">
                <input class="menu-item menu-item-checkbox" type="checkbox" id="filter-hoodie">
                <label class="menu-item" for="filter-hoodie">Hoodie</label>
                </div>
                <div class="menu-inner">
                <input class="menu-item menu-item-checkbox" type="checkbox" id="filter-t-shirt">
                <label class="menu-item" for="filter-T-shirt">T-shirt</label>
                </div>
                <div class="menu-inner">
                <input class="menu-item menu-item-checkbox" type="checkbox" id="filter-skirt">
                <label class="menu-item" for="filter-Skirt">Skirt</label>
                </div>
                
                <div class="container-fluid">
    <div class="row" id="fs_app">
    
      

        <section class="col-12" id="fs_time_body">
            <span class="heading">
               Color
            </span>
            <div class="contents">
                <ul class="color-filters-container">
                    <li>
                        <button class="color-filter" data-value="Black" style="--bg-color: #333333;"></button>
                    </li>
                    <li>
                        <button class="color-filter" data-value="Grey" style="--bg-color: #D3D3D3;"></button>
                    </li>
                    <li>
                        <button class="color-filter" data-value="pink" style="--bg-color: #eba9d7;"></button>
                    </li>
                    <li>
                        <button class="color-filter" data-value="pink" style="--bg-color: #eba9d7;"></button>
                    </li>
                    <li>
                        <button class="color-filter" data-value="pink" style="--bg-color: #eba9d7;"></button>
                    </li>
                    <li>
                        <button class="color-filter" data-value="pink" style="--bg-color: #eba9d7;"></button>
                    </li>
                    <li>
                        <button class="color-filter" data-value="pink" style="--bg-color: #eba9d7;"></button>
                    </li>
                    <li>
                        <button class="color-filter" data-value="pink" style="--bg-color: #eba9d7;"></button>
                    </li>
                    <li>
                        <button class="color-filter" data-value="green" style="--bg-color: #509632;"></button>
                    </li>
                </ul>
            </div>
            <app-slider></app-slider>
        </section>

        
 
     


            </aside>   
            <div class="card-wrapper" id="cards">
            </div>
        </div>
        `

        const filterBtn = this.shadowRoot.querySelector(".filter");
        const filtersContainer = this.shadowRoot.querySelector(".filters");
        let priceAscButton = this.shadowRoot.getElementById("price-asc");
        let priceDescButton = this.shadowRoot.getElementById("price-desc");
        priceAscButton.addEventListener('click', this.sortItemsList("price", true).bind(this));
        priceDescButton.addEventListener('click', this.sortItemsList("price", false).bind(this));

        let pantsFilter = this.shadowRoot.getElementById("filter-pants");
        let hoodieFilter = this.shadowRoot.getElementById("filter-hoodie");
        let skirtFilter = this.shadowRoot.getElementById("filter-skirt");
        let tshirtFilter = this.shadowRoot.getElementById("filter-t-shirt");
        let botoncolor = this.shadowRoot.querySelectorAll(".color-filter");

        botoncolor.forEach(btn => btn.addEventListener("click", () => {
            if (btn.classList.contains("active")) {
                btn.classList.remove("active");
                delete this.filters.color;
            } else {
                this.filters.color = btn.dataset.value;
                botoncolor.forEach(boton => boton.classList.remove("active"));
                btn.classList.add("active");
            }

            this.render();
        }));

        pantsFilter.addEventListener('click', (e) => {
            if (e.target.checked)
                this.filters = {
                    ...this.filters,
                    category: "Pants"
                };
            else delete this.filters.category;
            this.render();
        });

        hoodieFilter.addEventListener('click', (e) => {
            if (e.target.checked)
                this.filters = {
                    ...this.filters,
                    category: "Hoodie"
                };
            else delete this.filters.category;
            this.render();
        });

        skirtFilter.addEventListener('click', (e) => {
            if (e.target.checked)
                this.filters = {
                    ...this.filters,
                    category: "Skirt"
                };
            else delete this.filters.category;
            this.render();
        });

        tshirtFilter.addEventListener('click', (e) => {
            if (e.target.checked)
                this.filters = {
                    ...this.filters,
                    category: "T-shirt"
                };
            else delete this.filters.category;
            this.render();
        });

        filterBtn.addEventListener('click', () => {
            filtersContainer.classList.toggle(HIDDEN_CLASS);
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
                    url_1="${item.url_1}" 
                    description="${item.description}" 
                    price="${item.price}">
                </app-card>      
            `
        })


    }

    filterItemsArray(filters) {
        return this.list.filter((item) => {
            let include = true;

            for (const attr in filters) {
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
                switch (attr) {
                    case "price":
                        return a.price - b.price;
                        break;
                }
            });

            if (!asc) this.list.reverse();

            console.log(this.list);

            this.render();
        }
    }

    printData() {
        getData().then((a) => {
            this.list = a;
            console.log(a);
            this.render();
        })

    }


}
customElements.define("app-header", firstComponent);
export default firstComponent;