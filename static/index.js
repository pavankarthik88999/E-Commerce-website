
let admin_access = document.getElementById('adminaccess');
let cartpage=document.getElementById('cart_control');

admin_access.addEventListener('click', function () {
    window.location.href="adminlog.html";
});



function fetch_product(){
    fetch('/products')
    .then(response=>response.json())
    .then(data=>{
    const prdt_container=document.getElementById('products_grid');
    prdt_container.innerHTML='';
    
    if(Object.keys(data).length===0){
        prdt_container.innerHTML="<h2>NO PRODUCTS DATA HAS FOUND</h2>"
    }
    
    for(const[id,details] of Object.entries(data)){
        let name=details[0];
        let price=details[1];
        let img=details[2] || 'https://via.placeholder.com/150';

        prdt_container.innerHTML+=`
        <div class="products">
        <img src="${img}" alt="${name}" class="product-image" >
        <h5>Product_Name :  ${name}</h5>
        <h5>Price : ${price}</h5>
        <button class="addtocart" onclick="addToCart( '${name}', ${price})">Add to Cart</button>
        </div>
        `;
    }
    })

    .catch(error=>{
        console.error('error in fetching the data',error);
        document.getElementById('products_grid').innerHTML='<h2>check your python server is Running</h2>';
    });
}

// window.onload=fetch_product;
window.addEventListener('DOMContentLoaded', fetch_product);


//search functionality
const searchBtn = document.getElementById('search_btn');
const searchInput = document.getElementById('search_input');

searchBtn.addEventListener('click', function() {
    const productId = searchInput.value.trim();
    if (productId) {
        fetch(`search/${productId}`)
            .then(response => {
                    // If Python sends back a 404 (Not Found), throw an error to skip to the catch block
                    if (!response.ok) {
                        throw new Error("Product not found");
                    }
                    return response.json();
                })
            .then(data => {
                // Handle the search results
                const prdt_cartcontainer = document.getElementById('products_grid');
                prdt_cartcontainer.innerHTML = '';

                 if(Object.keys(data).length===0){
                      prdt_cartcontainer.innerHTML="<h2>NO PRODUCTS DATA HAS FOUND</h2>"
                }
                else{

                    
                 for (const [id, details] of Object.entries(data)) {
                let name = details[0];
                 let price = details[1];
            // Grab the image URL, or use a fallback if it doesn't exist
                let image = details[2] || 'https://via.placeholder.com/150'; 
 
                 const productCard = document.createElement('div');
                productCard.className = 'products';

               productCard.innerHTML = `
                <img src="${image}" alt="${name}">
                
                <h5 style="margin: 5px 0;">Product_Name : ${name}</h5>
                <h5 style="margin: 5px 0 15px 0;">Price : ₹${price}</h5>
                
                <div style="margin-top: auto;">
                    <button class="addtocart" onclick="addToCart('${name}', ${price})">Add to Cart</button>
                </div>
            `;

            prdt_cartcontainer.appendChild(productCard);
                 }
              }

            })
            .catch(error => {
                console.error('Error searching for product:', error);
                const prdt_cartcontainer = document.getElementById('products_grid');
                prdt_cartcontainer.innerHTML = '<h2>Product not found</h2>';
            });
            
    }
});




