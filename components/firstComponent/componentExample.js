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
            <button class="filter">Filters</button>
        </div>
        <div class="container">
            <aside class="filters hidden">
            <div class="menu">
            <h3 class="heading">Price</h3>
            <div class = "price-div">
                <button class="menu-item menu-item-button" id="price-asc">Ascending price</button>
                <button class="menu-item menu-item-button menu-item-button-margin" id="price-desc">Declining price</button>
                </div>

                <h3 class="heading">Price Range</h3>
                <div class = "price-div">
                <button data-min="10" data-max="40" class="filter-by-price menu-item menu-item-button">10-40</button>
                <button data-min="40" data-max="70" class="filter-by-price menu-item menu-item-button menu-item-button-margin">40-70</button>
                <button data-min="70" data-max="200" class="filter-by-price menu-item menu-item-button menu-item-button-margin">70-200</button>
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
                <input class="menu-item menu-item-checkbox" type="checkbox" id="filter-dress">
                <label class="menu-item" for="filter-Dress">Dress</label>
                </div>
                <div class="menu-inner">
                <input class="menu-item menu-item-checkbox" type="checkbox" id="filter-skirt">
                <label class="menu-item" for="filter-Skirt">Skirt</label>
                </div>
                <div class="menu-inner">
                <input class="menu-item menu-item-checkbox" type="checkbox" id="filter-shirt">
                <label class="menu-item" for="filter-Shirt">Shirt</label>
                </div>
                <div class="menu-inner">
                <input class="menu-item menu-item-checkbox" type="checkbox" id="filter-shorts">
                <label class="menu-item" for="filter-Shorts">Shorts</label>
                </div>
                <div class="menu-inner">
                <input class="menu-item menu-item-checkbox" type="checkbox" id="filter-jacket">
                <label class="menu-item" for="filter-Jacket">Jacket</label>
                </div>
                <div class="container-fluid">

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
                        <button class="color-filter" data-value="Ecru" style="--bg-color: #383E42;"></button>
                    </li>
                    <li>
                        <button class="color-filter" data-value="Khaki" style="--bg-color: #614051;"></button>
                    </li>
                    <li>
                        <button class="color-filter" data-value="Faded Black" style="--bg-color: #4F3D3D;"></button>
                    </li>
                    <li>
                        <button class="color-filter" data-value="Greenish" style="--bg-color: #39402D;"></button>
                    </li>
                    <li>
                        <button class="color-filter" data-value="White" style="--bg-color: #ECEAEA;"></button>
                    </li>
                    <li>
                        <button class="color-filter" data-value="Beige" style="--bg-color: #F5EEC5;"></button>
                    </li>
                    <li>
                        <button class="color-filter" data-value="Blue" style="--bg-color: #213247;"></button>
                    </li>
                    <li>
                        <button class="color-filter" data-value="Medium Blue" style="--bg-color: #304363;"></button>
                    </li>
                    <li>
                        <button class="color-filter" data-value="Brown" style="--bg-color: #582C01;"></button>
                    </li> 
                    <li>
                        <button class="color-filter" data-value="Brown" style="--bg-color: #582C01;"></button>
                    </li> 
                </ul>
            </div>

<h3 class="heading">Gender</h3>
            <div class="menu-inner">
            <input class="menu-item menu-item-checkbox" type="checkbox" id="filter-women">
            <label class="menu-item" for="filter-women">Women</label>
            </div>

            <div class="menu-inner">
            <input class="menu-item menu-item-checkbox" type="checkbox" id="filter-men">
            <label class="menu-item" for="filter-men">Men</label>
            </div>

            <div class="menu-inner">
            <input class="menu-item menu-item-checkbox" type="checkbox" id="filter-unisex">
            <label class="menu-item" for="filter-unisex">Unisex</label>
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
        const priceRangeBtns = this.shadowRoot.querySelectorAll(".filter-by-price");
        let priceAscButton = this.shadowRoot.getElementById("price-asc");
        let priceDescButton = this.shadowRoot.getElementById("price-desc");
        priceAscButton.addEventListener('click', this.sortItemsList("price", true).bind(this));
        priceDescButton.addEventListener('click', this.sortItemsList("price", false).bind(this));

        let pantsFilter = this.shadowRoot.getElementById("filter-pants");
        let hoodieFilter = this.shadowRoot.getElementById("filter-hoodie");
        let skirtFilter = this.shadowRoot.getElementById("filter-skirt");
        let tshirtFilter = this.shadowRoot.getElementById("filter-t-shirt");
        let botoncolor = this.shadowRoot.querySelectorAll(".color-filter");
        let shirtFilter = this.shadowRoot.getElementById("filter-shirt");
        let dressFilter = this.shadowRoot.getElementById("filter-dress");
        let shortsFilter = this.shadowRoot.getElementById("filter-shorts");
        let jacketFilter = this.shadowRoot.getElementById("filter-jacket");
        let womanFilter = this.shadowRoot.getElementById("filter-women");
        let menFilter = this.shadowRoot.getElementById("filter-men");
        let unisexFilter = this.shadowRoot.getElementById("filter-unisex");

        priceRangeBtns.forEach(btn => btn.addEventListener('click', (e) => {
            const min = parseInt(e.target.dataset.min);
            const max = parseInt(e.target.dataset.max);

            priceRangeBtns.forEach(priceBtn => priceBtn.classList.remove('active'));

            if (this.filters['price-range']) {
                const {
                    min: filMin,
                    max: filMax
                } = this.filters['price-range'];

                if (min === filMin && max === filMax) {
                    delete this.filters['price-range'];
                    this.render();
                    return;
                }
            }

            e.target.classList.add('active');
            this.filters['price-range'] = {
                min,
                max
            };
            this.render();
        }));

        botoncolor.forEach(btn => btn.addEventListener("click", () => {
            if (btn.classList.contains("active")) {
                btn.classList.remove("active");
                delete this.filters.color1;
            } else {
                this.filters.color1 = btn.dataset.value;
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

        dressFilter.addEventListener('click', (e) => {
            if (e.target.checked)
                this.filters = {
                    ...this.filters,
                    category: "Dress"
                };
            else delete this.filters.category;
            this.render();
        });


        jacketFilter.addEventListener('click', (e) => {
            if (e.target.checked)
                this.filters = {
                    ...this.filters,
                    category: "Jacket"
                };
            else delete this.filters.category;
            this.render();
        });


        shirtFilter.addEventListener('click', (e) => {
            if (e.target.checked)
                this.filters = {
                    ...this.filters,
                    category: "Shirt"
                };
            else delete this.filters.category;
            this.render();
        });


        shortsFilter.addEventListener('click', (e) => {
            if (e.target.checked)
                this.filters = {
                    ...this.filters,
                    category: "Shorts"
                };
            else delete this.filters.category;
            this.render();
        });

        womanFilter.addEventListener('click', (e) => {
            if (e.target.checked)
                this.filters = {
                    ...this.filters,
                    gender: "Women"
                };
            else delete this.filters.gender;
            this.render();
        });

        menFilter.addEventListener('click', (e) => {
            if (e.target.checked)
                this.filters = {
                    ...this.filters,
                    gender: "Men"
                };
            else delete this.filters.gender;
            this.render();
        });

        unisexFilter.addEventListener('click', (e) => {
            if (e.target.checked)
                this.filters = {
                    ...this.filters,
                    gender: "Unisex"
                };
            else delete this.filters.gender;
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
                switch (attr) {
                    case 'price-range':
                        const {
                            min, max
                        } = filters[attr];
                        if (item.price < min || item.price > max)
                            include = false;
                        break;
                    default:
                        if (item[attr] !== filters[attr])
                            include = false;
                }
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