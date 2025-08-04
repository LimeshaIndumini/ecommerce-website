document.addEventListener('DOMContentLoaded', requestCategories);
document.addEventListener('DOMContentLoaded', requestBanners);
document.addEventListener('DOMContentLoaded', requestFeatured);
document.addEventListener('DOMContentLoaded', requestNewArrivals);

function requestCategories() {
    fetch("http://localhost:8001/SHOPPING/user/backend/menu.php", {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    })
    .then((res) => res.json())
    .then((data) => {
        //console.log(data);
        const nav = document.querySelector('.navigation')
        if(data.categories){
            const ul = document.createElement('ul');
            data.categories.forEach(cat => {
                const li = document.createElement('li');
                li.className = cat;
                li.textContent = cat;
                li.addEventListener('click' ,getCategoryProducts);
                ul.appendChild(li);
            });
            nav.appendChild(ul);
        }
    })
    .catch((err) => console.log(err));
}
function getCategoryProducts(){
    console.log("cat clicked");
}

function requestBanners() {
    fetch("http://localhost:8001/SHOPPING/user/backend/banner.php", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        if (data.banners) {
            const banners = data.banners;
            const swiperWrapper = document.querySelector('.swiper-wrapper');

            banners.forEach(banner => {
                const slide = document.createElement('div');
                slide.className = "swiper-slide";
                slide.style.backgroundImage = `url('${banner.image}')`;

                slide.style.height = "45vh";
                slide.style.backgroundSize = "cover";
                slide.style.backgroundPosition = "center";

                const h3 = document.createElement('h3');
                h3.textContent = banner.name;

                const p = document.createElement('p');
                p.textContent = banner.description;

                const button = document.createElement('button');
                button.textContent = 'Shop Now';

                slide.appendChild(h3);
                slide.appendChild(p);
                slide.appendChild(button);
                swiperWrapper.appendChild(slide);
            });

            callCarousal();
        }
    })
    .catch((err) => console.log("Banner fetch error:", err));
}

// Request for featured products - Eventlistner
function requestFeatured() {
    fetch("http://localhost:8001/SHOPPING/user/backend/featured.php", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data); 
        const featured = data.featured;
        const featuredSection = document.querySelector(".featured-products");
        populateCatalogue(featured, featuredSection )
    })
    .catch((err) => console.log("Error loading featured products:", err));
}
// End of Request for Featured products - Eventlistner ends
function callCarousal() {
    const swiper = new Swiper(".swiper", {
        //optional parameters
        loop: true,

        //if we need pagination
        pagination: {
            el: ".swiper-pagination",
        },
    })
}

//Request new arrivals - starts
function requestNewArrivals() {
    fetch("http://localhost:8001/SHOPPING/user/backend/newArrivals.php", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        
        const newArrivals = data.newArrivals;
        const newArrivalSection = document.querySelector(".new-arrivals");
        populateCatalogue(newArrivals, newArrivalSection, true); 
    })
    .catch((err) => console.log("Error loading new arrivals:", err));
}
//Request new arrivals - ends

function populateCatalogue(products, catalogueParent, isSwiper = false) {
    if (products && Array.isArray(products)) {
        if (!products.length) {
            catalogueParent.innerHTML = "<p>No products available.</p>";
            return;
        }

        catalogueParent.innerHTML = "";

        const catalogue = document.createElement("div");
        catalogue.className = isSwiper ? "swiper-wrapper" : "catalogue";

        products.forEach(prod => {
            const card = document.createElement("div");
            card.className = isSwiper ? "swiper-slide" : "card";

            const imgDiv = document.createElement("div");
            imgDiv.className = "card-img";

            const img = document.createElement("img");
            img.src = `http://localhost:8001/SHOPPING/${prod.image}`;
            img.alt = prod.name;
            imgDiv.appendChild(img);

            const descDiv = document.createElement("div");
            descDiv.className = "card-description";

            const nameP = document.createElement("p");
            nameP.className = "product-name";
            nameP.textContent = prod.name;

            const priceP = document.createElement("p");
            priceP.className = "product-price";
            priceP.textContent = `$${prod.price}`;

            descDiv.appendChild(nameP);
            descDiv.appendChild(priceP);

            card.appendChild(imgDiv);
            card.appendChild(descDiv);
            catalogue.appendChild(card);
        });

        catalogueParent.appendChild(catalogue);

        if (isSwiper) {
            callCarousal();
        }
    }
}


        // Re-initialize Swiper only if needed
    // fetch request refactoring


