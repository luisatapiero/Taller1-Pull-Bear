class ProductComponent extends HTMLElement {
  static get observedAttributes() {
    return ['url_1', 'url_2', 'url_3', 'url_4', 'url_5', 'type', 'name', 'description', 'category', 'price', 'color1', 'color2', 'color3'];
  }
  constructor() {
    super();
    this.url_1 = this.getAttribute('url_1');
    this.url_2 = this.getAttribute('url_2');
    this.url_3 = this.getAttribute('url_3');
    this.url_4 = this.getAttribute('url_4');
    this.url_5 = this.getAttribute('url_5');
    this.type = this.getAttribute('type');
    this.name = this.getAttribute('name');
    this.description = this.getAttribute('description');
    this.category = this.getAttribute('category');
    this.price = this.getAttribute('price');
    this.color1 = this.getAttribute('color1');
    this.color2 = this.getAttribute('color2');
    this.color3 = this.getAttribute('color3');

    this.attachShadow({
      mode: 'open'
    })
  }
  connectedCallback() {
    this.render();


    const carousel = this.shadowRoot.querySelector(".carousel"),
      firstImg = carousel.querySelectorAll("img")[0],
      arrowIcons = this.shadowRoot.querySelectorAll(".wrapper i");

    let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

    const showHideIcons = () => {
      // mostrar y ocultar el icono anterior/siguiente según el valor de desplazamiento izquierdo del carrusel
      let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // obtener el ancho máximo de desplazamiento
      arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
      arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
    }

    arrowIcons.forEach(icon => {
      icon.addEventListener("click", () => {
        const mobileBreakpoint = 550;

        if (window.innerWidth < mobileBreakpoint) {
          // Card margin is the horizontal margin of the carousel's cards
          const cardMargin = 14;
          let firstImgWidth = firstImg.clientWidth + cardMargin;

          carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
          setTimeout(() => showHideIcons(), 100); // llamar a showHideIcons después de 60ms
        } else {

          let firstImgWidth = firstImg.clientWidth + 1400; // obteniendo el ancho del primer img y añadiendo el valor del margen 
          // si el icono pulsado está a la izquierda, reduzca el valor de anchura del desplazamiento del carrusel a la izquierda, si no, añádalo a él

          carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
          setTimeout(() => showHideIcons(), 60); // llamar a showHideIcons después de 60ms
        }
      });
    });

    const autoSlide = () => {
      // si no queda ninguna imagen por desplazar, vuelva desde aquí
      if (carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

      positionDiff = Math.abs(positionDiff); // hacer que el valor de positionDiff sea positivo
      let firstImgWidth = firstImg.clientWidth + 14;
      // obtener el valor de diferencia que hay que añadir o reducir del carrusel de la izquierda para tomar el centro img medio
      let valDifference = firstImgWidth - positionDiff;

      if (carousel.scrollLeft > prevScrollLeft) { // si el usuario se desplaza hacia la derecha
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
      }
      // isi el usuario se desplaza hacia la izquierda
      carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }

    const dragStart = (e) => {
      // actualización del valor de las variables globales al pulsar el ratón
      isDragStart = true;
      prevPageX = e.pageX || e.touches[0].pageX;
      prevScrollLeft = carousel.scrollLeft;
    }

    const dragging = (e) => {
      // desplazamiento de imágenes/carrusel a la izquierda según el puntero del ratón
      if (!isDragStart) return;
      e.preventDefault();
      isDragging = true;
      carousel.classList.add("dragging");
      positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
      carousel.scrollLeft = prevScrollLeft - positionDiff;
      showHideIcons();
    }

    const dragStop = () => {
      isDragStart = false;
      carousel.classList.remove("dragging");

      if (!isDragging) return;
      isDragging = false;
      autoSlide();
    }

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("touchstart", dragStart);

    this.shadowRoot.addEventListener("mousemove", dragging);
    carousel.addEventListener("touchmove", dragging);

    this.shadowRoot.addEventListener("mouseup", dragStop);
    carousel.addEventListener("touchend", dragStop);

    const inputQuantity = this.shadowRoot.querySelector('.input-quantity');
    const btnIncrement = this.shadowRoot.querySelector('#increment');
    const btnDecrement = this.shadowRoot.querySelector('#decrement');

    let valueByDefault = parseInt(inputQuantity.value);

    btnIncrement.addEventListener('click', () => {
      valueByDefault += 1;
      inputQuantity.value = valueByDefault;
    });

    btnDecrement.addEventListener('click', () => {
      if (valueByDefault === 1) {
        return
      }
      valueByDefault -= 1;
      inputQuantity.value = valueByDefault;
    });

    const toggleDescription = this.shadowRoot.querySelector('.title-description');
    const toggleAdditionalInformation = this.shadowRoot.querySelector('.title-additional-information');
    const toggleReviews = this.shadowRoot.querySelector('.title-reviews');

    const contentDescription = this.shadowRoot.querySelector('.text-description');
    const contentAdditionalInformation = this.shadowRoot.querySelector('.text-additional-information');
    const contentReviews = this.shadowRoot.querySelector('.text-reviews');

    toggleDescription.addEventListener('click', () => {
      contentDescription.classList.toggle('hidden');
    });

    toggleAdditionalInformation.addEventListener('click', () => {
      contentAdditionalInformation.classList.toggle('hidden');
    });

    toggleReviews.addEventListener('click', () => {
      contentReviews.classList.toggle('hidden');
    });



    const imgs = this.shadowRoot.querySelectorAll('.img-select a');
  const imgBtns = [...imgs];
  let imgId = 1;

  imgBtns.forEach((imgItem) => {
    imgItem.addEventListener('click', (event) => {
      event.preventDefault();
      imgId = imgItem.dataset.id;
      slideImage.call(this); // Pasar el `this` del componente a la función
    });
  });

  const slideImage = () => { // Usar una función flecha para tener acceso al `this` del componente
    const displayWidth = this.shadowRoot.querySelector('.img-showcase img:first-child').clientWidth;
    this.shadowRoot.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
  }

  window.addEventListener('resize', slideImage);


  }
  attributeChangeCallback(propName, oldValue, newValue) {
    this[propName] = newValue;
    this.render();

  }

  render() {
    this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./components/productComponent/productComponent.css">
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" />
        <!-- <div class="card">
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
        </div> -->

        <div class="container-back-button" href="Secondpage.html">
            
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="angle-left"><path fill="#0a0a0a" d="M11.29,12l3.54-3.54a1,1,0,0,0,0-1.41,1,1,0,0,0-1.42,0L9.17,11.29a1,1,0,0,0,0,1.42L13.41,17a1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41Z"></path></svg>
            <a href="Secondpage.html"+this.name>Back</a>

        </div>


        <main>
            

        <div class = "card-wrapper">
  <div class = "card-principal">
    <!-- card left -->
    <div class = "product-imgs">
      <div class = "img-display">

        <div class = "img-showcase">
          <img src = "${this.url_1}" alt = "">
        </div>
        

        
      </div>
      <div class = "img-select">
        <div class = "img-item">
          <a href = "#" data-id = "1">
            <img src = "${this.url_2}" alt = "">
          </a>
        </div>
        <div class = "img-item">
          <a href = "#" data-id = "2">
            <img src = "${this.url_3}" alt = "">
          </a>
        </div>
        <div class = "img-item">
          <a href = "#" data-id = "3">
            <img src = "${this.url_4}" alt = "">
          </a>
        </div>
        <div class = "img-item">
          <a href = "#" data-id = "4">
            <img src = "${this.url_5}" alt = "">
          </a>
        </div>
      </div>
    </div>

        <div class="container-info-product">
            <div class="container-price">
            <h2>${this.name}</h2>
            <span>$${this.price}</span>
            </div>

            <div class="container-details-product">
            <div class="form-group">
                <label for="colour">Color</label>
                <select name="colour" id="colour">
                <option disabled selected value="">Choose an option</option>
                <option value="color1">${this.color1}</option>
                <option value="color2">${this.color2}</option>
                <option value="color3">${this.color3}</option>
                </select>
            </div>

            <div class="form-group">
                <label for="size">Size</label>
                <select name="size" id="size">
                <option disabled selected value="">Choose an option</option>
                <option value="S">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                </select>
            </div>
            </div>

            <div class="container-add-cart">
            <div class="container-quantity">
                <input
                type="number"
                name=""
                id=""
                placeholder="1"
                value="1"
                min="1"
                class="input-quantity"
                />

                <div class="btn-increment-decrement">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="increment"><path fill="#0a0a0a" d="M17,13.41,12.71,9.17a1,1,0,0,0-1.42,0L7.05,13.41a1,1,0,0,0,0,1.42,1,1,0,0,0,1.41,0L12,11.29l3.54,3.54a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29A1,1,0,0,0,17,13.41Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="decrement"><path fill="#0a0a0a" d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z"></path></svg>
                </div>
            </div>

            <button class="btn-add-to-cart">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="shopping-bag"><path fill="#0a0a0a" d="M19,7H16V6A4,4,0,0,0,8,6V7H5A1,1,0,0,0,4,8V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V8A1,1,0,0,0,19,7ZM10,6a2,2,0,0,1,4,0V7H10Zm8,13a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V9H8v1a1,1,0,0,0,2,0V9h4v1a1,1,0,0,0,2,0V9h2Z"></path></svg>
                ADD TO BAG
            </button>
            </div>

            <div class="container-description">
            <div class="title-description">
                <h4>Description</h4>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="angle-down"><path fill="#0a0a0a" d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z"></path></svg>
            </div>
            
            <div class="text-description"><p>${this.description}</p></div>
            </div>

            <div class="container-additional-information">
            <div class="title-additional-information">
                <h4>Addtional information</h4>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="angle-down"><path fill="#0a0a0a" d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z"></path></svg>
            </div>
            <div class="text-additional-information hidden">
                <p>Category: ${this.category} <br> Type: ${this.type} </p>
            </div>
            </div>

            <div class="container-reviews">
                <div class="title-reviews">
                <h4>Reviews</h4>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="angle-down"><path fill="#0a0a0a" d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z"></path></svg>
                </div>
                <div class="text-reviews hidden">
              <p>There are no reviews yet.</p>
              <form class="review-form">
                  <div class="form-group-review">
                    
                    <div class="reviews-counter">
                  <div class="rate">
                      <input type="radio" id="star5" name="rate" value="5" />
                      <label for="star5" title="text">5 stars</label>
                      <input type="radio" id="star4" name="rate" value="4" />
                      <label for="star4" title="text">4 stars</label>
                      <input type="radio" id="star3" name="rate" value="3" />
                      <label for="star3" title="text">3 stars</label>
                      <input type="radio" id="star2" name="rate" value="2" />
                      <label for="star2" title="text">2 stars</label>
                      <input type="radio" id="star1" name="rate" value="1" />
                      <label for="star1" title="text">1 star</label>
                  </div>
                </div>
                <label>Your rating</label>
              </div>
                </div>
            </div>

            <div class="container-social">
                <span>Compartir</span>
                <div class="container-buttons-social">
                    <a href="#"><svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="facebook-f"><path fill="#0a0a0a" d="M15.12,5.32H17V2.14A26.11,26.11,0,0,0,14.26,2C11.54,2,9.68,3.66,9.68,6.7V9.32H6.61v3.56H9.68V22h3.68V12.88h3.06l.46-3.56H13.36V7.05C13.36,6,13.64,5.32,15.12,5.32Z"></path></svg></a>
                    <a href="#"><svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="twitter"><path fill="#0a0a0a" d="M22,5.8a8.49,8.49,0,0,1-2.36.64,4.13,4.13,0,0,0,1.81-2.27,8.21,8.21,0,0,1-2.61,1,4.1,4.1,0,0,0-7,3.74A11.64,11.64,0,0,1,3.39,4.62a4.16,4.16,0,0,0-.55,2.07A4.09,4.09,0,0,0,4.66,10.1,4.05,4.05,0,0,1,2.8,9.59v.05a4.1,4.1,0,0,0,3.3,4A3.93,3.93,0,0,1,5,13.81a4.9,4.9,0,0,1-.77-.07,4.11,4.11,0,0,0,3.83,2.84A8.22,8.22,0,0,1,3,18.34a7.93,7.93,0,0,1-1-.06,11.57,11.57,0,0,0,6.29,1.85A11.59,11.59,0,0,0,20,8.45c0-.17,0-.35,0-.53A8.43,8.43,0,0,0,22,5.8Z"></path></svg></a>
                    <a href="#"><svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="instagram"><path fill="#0a0a0a" d="M17.34,5.46h0a1.2,1.2,0,1,0,1.2,1.2A1.2,1.2,0,0,0,17.34,5.46Zm4.6,2.42a7.59,7.59,0,0,0-.46-2.43,4.94,4.94,0,0,0-1.16-1.77,4.7,4.7,0,0,0-1.77-1.15,7.3,7.3,0,0,0-2.43-.47C15.06,2,14.72,2,12,2s-3.06,0-4.12.06a7.3,7.3,0,0,0-2.43.47A4.78,4.78,0,0,0,3.68,3.68,4.7,4.7,0,0,0,2.53,5.45a7.3,7.3,0,0,0-.47,2.43C2,8.94,2,9.28,2,12s0,3.06.06,4.12a7.3,7.3,0,0,0,.47,2.43,4.7,4.7,0,0,0,1.15,1.77,4.78,4.78,0,0,0,1.77,1.15,7.3,7.3,0,0,0,2.43.47C8.94,22,9.28,22,12,22s3.06,0,4.12-.06a7.3,7.3,0,0,0,2.43-.47,4.7,4.7,0,0,0,1.77-1.15,4.85,4.85,0,0,0,1.16-1.77,7.59,7.59,0,0,0,.46-2.43c0-1.06.06-1.4.06-4.12S22,8.94,21.94,7.88ZM20.14,16a5.61,5.61,0,0,1-.34,1.86,3.06,3.06,0,0,1-.75,1.15,3.19,3.19,0,0,1-1.15.75,5.61,5.61,0,0,1-1.86.34c-1,.05-1.37.06-4,.06s-3,0-4-.06A5.73,5.73,0,0,1,6.1,19.8,3.27,3.27,0,0,1,5,19.05a3,3,0,0,1-.74-1.15A5.54,5.54,0,0,1,3.86,16c0-1-.06-1.37-.06-4s0-3,.06-4A5.54,5.54,0,0,1,4.21,6.1,3,3,0,0,1,5,5,3.14,3.14,0,0,1,6.1,4.2,5.73,5.73,0,0,1,8,3.86c1,0,1.37-.06,4-.06s3,0,4,.06a5.61,5.61,0,0,1,1.86.34A3.06,3.06,0,0,1,19.05,5,3.06,3.06,0,0,1,19.8,6.1,5.61,5.61,0,0,1,20.14,8c.05,1,.06,1.37.06,4S20.19,15,20.14,16ZM12,6.87A5.13,5.13,0,1,0,17.14,12,5.12,5.12,0,0,0,12,6.87Zm0,8.46A3.33,3.33,0,1,1,15.33,12,3.33,3.33,0,0,1,12,15.33Z"></path></svg></a>
                </div>
            </div>
        </div>


        
        </main>

        

        <section class="container-related-products">
        <h2>You might also like</h2>
        
        <section id="carrusel">

    <div class="wrapper">
      <i id="left" class="fa-solid fa-angle-left"></i>
      <div class="carousel">

        <a target="_blank" href="./Thirdpage.html?id=VARSITY-FLEECE-SWEATPANTS">
          <img src="R-viewed/1.jpg" alt="img" draggable="false" />
          <div class="overlay">
            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 0C7.28417 0 6.94362 0.0119481 5.877 0.0623956C4.81262 0.11275 4.08569 0.288082 3.4496 0.544394C2.79201 0.809413 2.23434 1.16403 1.67842 1.74053C1.12247 2.31703 0.780514 2.89542 0.524987 3.57736C0.277766 4.23697 0.108755 4.99081 0.060138 6.0946C0.0114917 7.20071 0 7.55388 0 10.3703C0 13.1866 0.0114917 13.5398 0.060138 14.6459C0.108755 15.7497 0.277766 16.5035 0.524987 17.1632C0.780544 17.8451 1.1225 18.4234 1.67842 19C2.23437 19.5765 2.79201 19.9311 3.4496 20.1961C4.08569 20.4524 4.81262 20.6277 5.877 20.6781C6.94362 20.7286 7.28417 20.7405 10 20.7405C12.7158 20.7405 13.0564 20.7286 14.123 20.6781C15.1874 20.6278 15.9143 20.4524 16.5504 20.1961C17.208 19.9311 17.7656 19.5765 18.3216 19C18.8775 18.4234 19.2195 17.8451 19.475 17.1632C19.7222 16.5035 19.8913 15.7497 19.9398 14.6459C19.9885 13.5398 20 13.1866 20 10.3703C20 7.55388 19.9885 7.20071 19.9398 6.0946C19.8913 4.99081 19.7222 4.23697 19.475 3.57736C19.2195 2.89542 18.8775 2.31703 18.3216 1.74053C17.7656 1.16403 17.208 0.809413 16.5504 0.544394C15.9143 0.288082 15.1874 0.11275 14.123 0.0623956C13.0564 0.0119481 12.7158 0 10 0ZM10 1.8685C12.6701 1.8685 12.9864 1.87909 14.0409 1.92898C15.0159 1.97508 15.5454 2.14402 15.8977 2.28604C16.3645 2.47418 16.6976 2.69888 17.0475 3.06177C17.3975 3.42466 17.6142 3.77013 17.7956 4.25417C17.9325 4.61959 18.0954 5.16871 18.1399 6.17979C18.188 7.2733 18.1982 7.6013 18.1982 10.3703C18.1982 13.1392 18.188 13.4672 18.1399 14.5607C18.0954 15.5718 17.9325 16.1209 17.7956 16.4863C17.6142 16.9704 17.3975 17.3159 17.0475 17.6787C16.6976 18.0416 16.3645 18.2663 15.8977 18.4545C15.5454 18.5965 15.0158 18.7654 14.0409 18.8115C12.9866 18.8614 12.6703 18.872 10 18.872C7.32969 18.872 7.01349 18.8614 5.95914 18.8115C4.98413 18.7654 4.45465 18.5965 4.10231 18.4545C3.63549 18.2663 3.30238 18.0416 2.95248 17.6787C2.60255 17.3159 2.38584 16.9704 2.20442 16.4864C2.06747 16.1209 1.90459 15.5718 1.86011 14.5607C1.812 13.4672 1.80179 13.1392 1.80179 10.3703C1.80179 7.6013 1.812 7.2733 1.86011 6.17979C1.90459 5.16867 2.06747 4.61959 2.20442 4.2542C2.38584 3.7701 2.60255 3.42466 2.95245 3.0618C3.30238 2.69888 3.63552 2.47418 4.10228 2.28604C4.45465 2.14402 4.98416 1.97508 5.95914 1.92898C7.01361 1.87909 7.3299 1.8685 10 1.8685"
                fill="white" />
              <path
                d="M10.0004 13.8267C8.1594 13.8267 6.66702 12.2791 6.66702 10.37C6.66702 8.46083 8.1594 6.9132 10.0004 6.9132C11.8413 6.9132 13.3337 8.46083 13.3337 10.37C13.3337 12.2791 11.8413 13.8267 10.0004 13.8267ZM10.0004 5.0447C7.16429 5.0447 4.86523 7.42888 4.86523 10.37C4.86523 13.311 7.16429 15.6952 10.0004 15.6952C12.8364 15.6952 15.1355 13.311 15.1355 10.37C15.1355 7.42888 12.8364 5.0447 10.0004 5.0447ZM16.5384 4.8343C16.5384 5.52161 16.0011 6.07872 15.3384 6.07872C14.6757 6.07872 14.1384 5.52161 14.1384 4.8343C14.1384 4.14702 14.6757 3.58984 15.3384 3.58984C16.0011 3.58984 16.5384 4.14702 16.5384 4.8343Z"
                fill="white" />
            </svg>

          </div>

        </a>

        <a target="_blank" href="https://www.instagram.com/p/CplunC5JGed/">
          <img src="R-viewed/2.jpg" alt="img" draggable="false" />
          <div class="overlay">
            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 0C7.28417 0 6.94362 0.0119481 5.877 0.0623956C4.81262 0.11275 4.08569 0.288082 3.4496 0.544394C2.79201 0.809413 2.23434 1.16403 1.67842 1.74053C1.12247 2.31703 0.780514 2.89542 0.524987 3.57736C0.277766 4.23697 0.108755 4.99081 0.060138 6.0946C0.0114917 7.20071 0 7.55388 0 10.3703C0 13.1866 0.0114917 13.5398 0.060138 14.6459C0.108755 15.7497 0.277766 16.5035 0.524987 17.1632C0.780544 17.8451 1.1225 18.4234 1.67842 19C2.23437 19.5765 2.79201 19.9311 3.4496 20.1961C4.08569 20.4524 4.81262 20.6277 5.877 20.6781C6.94362 20.7286 7.28417 20.7405 10 20.7405C12.7158 20.7405 13.0564 20.7286 14.123 20.6781C15.1874 20.6278 15.9143 20.4524 16.5504 20.1961C17.208 19.9311 17.7656 19.5765 18.3216 19C18.8775 18.4234 19.2195 17.8451 19.475 17.1632C19.7222 16.5035 19.8913 15.7497 19.9398 14.6459C19.9885 13.5398 20 13.1866 20 10.3703C20 7.55388 19.9885 7.20071 19.9398 6.0946C19.8913 4.99081 19.7222 4.23697 19.475 3.57736C19.2195 2.89542 18.8775 2.31703 18.3216 1.74053C17.7656 1.16403 17.208 0.809413 16.5504 0.544394C15.9143 0.288082 15.1874 0.11275 14.123 0.0623956C13.0564 0.0119481 12.7158 0 10 0ZM10 1.8685C12.6701 1.8685 12.9864 1.87909 14.0409 1.92898C15.0159 1.97508 15.5454 2.14402 15.8977 2.28604C16.3645 2.47418 16.6976 2.69888 17.0475 3.06177C17.3975 3.42466 17.6142 3.77013 17.7956 4.25417C17.9325 4.61959 18.0954 5.16871 18.1399 6.17979C18.188 7.2733 18.1982 7.6013 18.1982 10.3703C18.1982 13.1392 18.188 13.4672 18.1399 14.5607C18.0954 15.5718 17.9325 16.1209 17.7956 16.4863C17.6142 16.9704 17.3975 17.3159 17.0475 17.6787C16.6976 18.0416 16.3645 18.2663 15.8977 18.4545C15.5454 18.5965 15.0158 18.7654 14.0409 18.8115C12.9866 18.8614 12.6703 18.872 10 18.872C7.32969 18.872 7.01349 18.8614 5.95914 18.8115C4.98413 18.7654 4.45465 18.5965 4.10231 18.4545C3.63549 18.2663 3.30238 18.0416 2.95248 17.6787C2.60255 17.3159 2.38584 16.9704 2.20442 16.4864C2.06747 16.1209 1.90459 15.5718 1.86011 14.5607C1.812 13.4672 1.80179 13.1392 1.80179 10.3703C1.80179 7.6013 1.812 7.2733 1.86011 6.17979C1.90459 5.16867 2.06747 4.61959 2.20442 4.2542C2.38584 3.7701 2.60255 3.42466 2.95245 3.0618C3.30238 2.69888 3.63552 2.47418 4.10228 2.28604C4.45465 2.14402 4.98416 1.97508 5.95914 1.92898C7.01361 1.87909 7.3299 1.8685 10 1.8685"
                fill="white" />
              <path
                d="M10.0004 13.8267C8.1594 13.8267 6.66702 12.2791 6.66702 10.37C6.66702 8.46083 8.1594 6.9132 10.0004 6.9132C11.8413 6.9132 13.3337 8.46083 13.3337 10.37C13.3337 12.2791 11.8413 13.8267 10.0004 13.8267ZM10.0004 5.0447C7.16429 5.0447 4.86523 7.42888 4.86523 10.37C4.86523 13.311 7.16429 15.6952 10.0004 15.6952C12.8364 15.6952 15.1355 13.311 15.1355 10.37C15.1355 7.42888 12.8364 5.0447 10.0004 5.0447ZM16.5384 4.8343C16.5384 5.52161 16.0011 6.07872 15.3384 6.07872C14.6757 6.07872 14.1384 5.52161 14.1384 4.8343C14.1384 4.14702 14.6757 3.58984 15.3384 3.58984C16.0011 3.58984 16.5384 4.14702 16.5384 4.8343Z"
                fill="white" />
            </svg>
          </div>
        </a>

        <a target="_blank" href="https://www.instagram.com/p/Cnw8NZ7oDcC/">
          <img src="R-viewed/3.jpg" alt="img" draggable="false" />
          <div class="overlay">
            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 0C7.28417 0 6.94362 0.0119481 5.877 0.0623956C4.81262 0.11275 4.08569 0.288082 3.4496 0.544394C2.79201 0.809413 2.23434 1.16403 1.67842 1.74053C1.12247 2.31703 0.780514 2.89542 0.524987 3.57736C0.277766 4.23697 0.108755 4.99081 0.060138 6.0946C0.0114917 7.20071 0 7.55388 0 10.3703C0 13.1866 0.0114917 13.5398 0.060138 14.6459C0.108755 15.7497 0.277766 16.5035 0.524987 17.1632C0.780544 17.8451 1.1225 18.4234 1.67842 19C2.23437 19.5765 2.79201 19.9311 3.4496 20.1961C4.08569 20.4524 4.81262 20.6277 5.877 20.6781C6.94362 20.7286 7.28417 20.7405 10 20.7405C12.7158 20.7405 13.0564 20.7286 14.123 20.6781C15.1874 20.6278 15.9143 20.4524 16.5504 20.1961C17.208 19.9311 17.7656 19.5765 18.3216 19C18.8775 18.4234 19.2195 17.8451 19.475 17.1632C19.7222 16.5035 19.8913 15.7497 19.9398 14.6459C19.9885 13.5398 20 13.1866 20 10.3703C20 7.55388 19.9885 7.20071 19.9398 6.0946C19.8913 4.99081 19.7222 4.23697 19.475 3.57736C19.2195 2.89542 18.8775 2.31703 18.3216 1.74053C17.7656 1.16403 17.208 0.809413 16.5504 0.544394C15.9143 0.288082 15.1874 0.11275 14.123 0.0623956C13.0564 0.0119481 12.7158 0 10 0ZM10 1.8685C12.6701 1.8685 12.9864 1.87909 14.0409 1.92898C15.0159 1.97508 15.5454 2.14402 15.8977 2.28604C16.3645 2.47418 16.6976 2.69888 17.0475 3.06177C17.3975 3.42466 17.6142 3.77013 17.7956 4.25417C17.9325 4.61959 18.0954 5.16871 18.1399 6.17979C18.188 7.2733 18.1982 7.6013 18.1982 10.3703C18.1982 13.1392 18.188 13.4672 18.1399 14.5607C18.0954 15.5718 17.9325 16.1209 17.7956 16.4863C17.6142 16.9704 17.3975 17.3159 17.0475 17.6787C16.6976 18.0416 16.3645 18.2663 15.8977 18.4545C15.5454 18.5965 15.0158 18.7654 14.0409 18.8115C12.9866 18.8614 12.6703 18.872 10 18.872C7.32969 18.872 7.01349 18.8614 5.95914 18.8115C4.98413 18.7654 4.45465 18.5965 4.10231 18.4545C3.63549 18.2663 3.30238 18.0416 2.95248 17.6787C2.60255 17.3159 2.38584 16.9704 2.20442 16.4864C2.06747 16.1209 1.90459 15.5718 1.86011 14.5607C1.812 13.4672 1.80179 13.1392 1.80179 10.3703C1.80179 7.6013 1.812 7.2733 1.86011 6.17979C1.90459 5.16867 2.06747 4.61959 2.20442 4.2542C2.38584 3.7701 2.60255 3.42466 2.95245 3.0618C3.30238 2.69888 3.63552 2.47418 4.10228 2.28604C4.45465 2.14402 4.98416 1.97508 5.95914 1.92898C7.01361 1.87909 7.3299 1.8685 10 1.8685"
                fill="white" />
              <path
                d="M10.0004 13.8267C8.1594 13.8267 6.66702 12.2791 6.66702 10.37C6.66702 8.46083 8.1594 6.9132 10.0004 6.9132C11.8413 6.9132 13.3337 8.46083 13.3337 10.37C13.3337 12.2791 11.8413 13.8267 10.0004 13.8267ZM10.0004 5.0447C7.16429 5.0447 4.86523 7.42888 4.86523 10.37C4.86523 13.311 7.16429 15.6952 10.0004 15.6952C12.8364 15.6952 15.1355 13.311 15.1355 10.37C15.1355 7.42888 12.8364 5.0447 10.0004 5.0447ZM16.5384 4.8343C16.5384 5.52161 16.0011 6.07872 15.3384 6.07872C14.6757 6.07872 14.1384 5.52161 14.1384 4.8343C14.1384 4.14702 14.6757 3.58984 15.3384 3.58984C16.0011 3.58984 16.5384 4.14702 16.5384 4.8343Z"
                fill="white" />
            </svg>
          </div>
        </a>
        <a target="_blank" href="https://www.instagram.com/p/CplLFVzjphb/">
          <img src="R-viewed/4.jpg" alt="img" draggable="false" />
          <div class="overlay">
            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 0C7.28417 0 6.94362 0.0119481 5.877 0.0623956C4.81262 0.11275 4.08569 0.288082 3.4496 0.544394C2.79201 0.809413 2.23434 1.16403 1.67842 1.74053C1.12247 2.31703 0.780514 2.89542 0.524987 3.57736C0.277766 4.23697 0.108755 4.99081 0.060138 6.0946C0.0114917 7.20071 0 7.55388 0 10.3703C0 13.1866 0.0114917 13.5398 0.060138 14.6459C0.108755 15.7497 0.277766 16.5035 0.524987 17.1632C0.780544 17.8451 1.1225 18.4234 1.67842 19C2.23437 19.5765 2.79201 19.9311 3.4496 20.1961C4.08569 20.4524 4.81262 20.6277 5.877 20.6781C6.94362 20.7286 7.28417 20.7405 10 20.7405C12.7158 20.7405 13.0564 20.7286 14.123 20.6781C15.1874 20.6278 15.9143 20.4524 16.5504 20.1961C17.208 19.9311 17.7656 19.5765 18.3216 19C18.8775 18.4234 19.2195 17.8451 19.475 17.1632C19.7222 16.5035 19.8913 15.7497 19.9398 14.6459C19.9885 13.5398 20 13.1866 20 10.3703C20 7.55388 19.9885 7.20071 19.9398 6.0946C19.8913 4.99081 19.7222 4.23697 19.475 3.57736C19.2195 2.89542 18.8775 2.31703 18.3216 1.74053C17.7656 1.16403 17.208 0.809413 16.5504 0.544394C15.9143 0.288082 15.1874 0.11275 14.123 0.0623956C13.0564 0.0119481 12.7158 0 10 0ZM10 1.8685C12.6701 1.8685 12.9864 1.87909 14.0409 1.92898C15.0159 1.97508 15.5454 2.14402 15.8977 2.28604C16.3645 2.47418 16.6976 2.69888 17.0475 3.06177C17.3975 3.42466 17.6142 3.77013 17.7956 4.25417C17.9325 4.61959 18.0954 5.16871 18.1399 6.17979C18.188 7.2733 18.1982 7.6013 18.1982 10.3703C18.1982 13.1392 18.188 13.4672 18.1399 14.5607C18.0954 15.5718 17.9325 16.1209 17.7956 16.4863C17.6142 16.9704 17.3975 17.3159 17.0475 17.6787C16.6976 18.0416 16.3645 18.2663 15.8977 18.4545C15.5454 18.5965 15.0158 18.7654 14.0409 18.8115C12.9866 18.8614 12.6703 18.872 10 18.872C7.32969 18.872 7.01349 18.8614 5.95914 18.8115C4.98413 18.7654 4.45465 18.5965 4.10231 18.4545C3.63549 18.2663 3.30238 18.0416 2.95248 17.6787C2.60255 17.3159 2.38584 16.9704 2.20442 16.4864C2.06747 16.1209 1.90459 15.5718 1.86011 14.5607C1.812 13.4672 1.80179 13.1392 1.80179 10.3703C1.80179 7.6013 1.812 7.2733 1.86011 6.17979C1.90459 5.16867 2.06747 4.61959 2.20442 4.2542C2.38584 3.7701 2.60255 3.42466 2.95245 3.0618C3.30238 2.69888 3.63552 2.47418 4.10228 2.28604C4.45465 2.14402 4.98416 1.97508 5.95914 1.92898C7.01361 1.87909 7.3299 1.8685 10 1.8685"
                fill="white" />
              <path
                d="M10.0004 13.8267C8.1594 13.8267 6.66702 12.2791 6.66702 10.37C6.66702 8.46083 8.1594 6.9132 10.0004 6.9132C11.8413 6.9132 13.3337 8.46083 13.3337 10.37C13.3337 12.2791 11.8413 13.8267 10.0004 13.8267ZM10.0004 5.0447C7.16429 5.0447 4.86523 7.42888 4.86523 10.37C4.86523 13.311 7.16429 15.6952 10.0004 15.6952C12.8364 15.6952 15.1355 13.311 15.1355 10.37C15.1355 7.42888 12.8364 5.0447 10.0004 5.0447ZM16.5384 4.8343C16.5384 5.52161 16.0011 6.07872 15.3384 6.07872C14.6757 6.07872 14.1384 5.52161 14.1384 4.8343C14.1384 4.14702 14.6757 3.58984 15.3384 3.58984C16.0011 3.58984 16.5384 4.14702 16.5384 4.8343Z"
                fill="white" />
            </svg>
          </div>
        </a>
        <a target="_blank" href="https://www.instagram.com/p/ChknYknq3An/">
          <img src="R-viewed/5.jpg" alt="img" draggable="false" />
          <div class="overlay">
            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 0C7.28417 0 6.94362 0.0119481 5.877 0.0623956C4.81262 0.11275 4.08569 0.288082 3.4496 0.544394C2.79201 0.809413 2.23434 1.16403 1.67842 1.74053C1.12247 2.31703 0.780514 2.89542 0.524987 3.57736C0.277766 4.23697 0.108755 4.99081 0.060138 6.0946C0.0114917 7.20071 0 7.55388 0 10.3703C0 13.1866 0.0114917 13.5398 0.060138 14.6459C0.108755 15.7497 0.277766 16.5035 0.524987 17.1632C0.780544 17.8451 1.1225 18.4234 1.67842 19C2.23437 19.5765 2.79201 19.9311 3.4496 20.1961C4.08569 20.4524 4.81262 20.6277 5.877 20.6781C6.94362 20.7286 7.28417 20.7405 10 20.7405C12.7158 20.7405 13.0564 20.7286 14.123 20.6781C15.1874 20.6278 15.9143 20.4524 16.5504 20.1961C17.208 19.9311 17.7656 19.5765 18.3216 19C18.8775 18.4234 19.2195 17.8451 19.475 17.1632C19.7222 16.5035 19.8913 15.7497 19.9398 14.6459C19.9885 13.5398 20 13.1866 20 10.3703C20 7.55388 19.9885 7.20071 19.9398 6.0946C19.8913 4.99081 19.7222 4.23697 19.475 3.57736C19.2195 2.89542 18.8775 2.31703 18.3216 1.74053C17.7656 1.16403 17.208 0.809413 16.5504 0.544394C15.9143 0.288082 15.1874 0.11275 14.123 0.0623956C13.0564 0.0119481 12.7158 0 10 0ZM10 1.8685C12.6701 1.8685 12.9864 1.87909 14.0409 1.92898C15.0159 1.97508 15.5454 2.14402 15.8977 2.28604C16.3645 2.47418 16.6976 2.69888 17.0475 3.06177C17.3975 3.42466 17.6142 3.77013 17.7956 4.25417C17.9325 4.61959 18.0954 5.16871 18.1399 6.17979C18.188 7.2733 18.1982 7.6013 18.1982 10.3703C18.1982 13.1392 18.188 13.4672 18.1399 14.5607C18.0954 15.5718 17.9325 16.1209 17.7956 16.4863C17.6142 16.9704 17.3975 17.3159 17.0475 17.6787C16.6976 18.0416 16.3645 18.2663 15.8977 18.4545C15.5454 18.5965 15.0158 18.7654 14.0409 18.8115C12.9866 18.8614 12.6703 18.872 10 18.872C7.32969 18.872 7.01349 18.8614 5.95914 18.8115C4.98413 18.7654 4.45465 18.5965 4.10231 18.4545C3.63549 18.2663 3.30238 18.0416 2.95248 17.6787C2.60255 17.3159 2.38584 16.9704 2.20442 16.4864C2.06747 16.1209 1.90459 15.5718 1.86011 14.5607C1.812 13.4672 1.80179 13.1392 1.80179 10.3703C1.80179 7.6013 1.812 7.2733 1.86011 6.17979C1.90459 5.16867 2.06747 4.61959 2.20442 4.2542C2.38584 3.7701 2.60255 3.42466 2.95245 3.0618C3.30238 2.69888 3.63552 2.47418 4.10228 2.28604C4.45465 2.14402 4.98416 1.97508 5.95914 1.92898C7.01361 1.87909 7.3299 1.8685 10 1.8685"
                fill="white" />
              <path
                d="M10.0004 13.8267C8.1594 13.8267 6.66702 12.2791 6.66702 10.37C6.66702 8.46083 8.1594 6.9132 10.0004 6.9132C11.8413 6.9132 13.3337 8.46083 13.3337 10.37C13.3337 12.2791 11.8413 13.8267 10.0004 13.8267ZM10.0004 5.0447C7.16429 5.0447 4.86523 7.42888 4.86523 10.37C4.86523 13.311 7.16429 15.6952 10.0004 15.6952C12.8364 15.6952 15.1355 13.311 15.1355 10.37C15.1355 7.42888 12.8364 5.0447 10.0004 5.0447ZM16.5384 4.8343C16.5384 5.52161 16.0011 6.07872 15.3384 6.07872C14.6757 6.07872 14.1384 5.52161 14.1384 4.8343C14.1384 4.14702 14.6757 3.58984 15.3384 3.58984C16.0011 3.58984 16.5384 4.14702 16.5384 4.8343Z"
                fill="white" />
            </svg>
          </div>
        </a>
        
      </div>
      <i id="right" class="fa-solid fa-angle-right"></i>
    </div>

    <a href="Secondpage.html">Discover more</a>
  </section>

    
        </div>
    </section>


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
