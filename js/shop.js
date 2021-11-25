// If you have time, you can move this variable "products" to a json file and load the data in this js. It will look more professional
var products = [
    {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery',
        img: 'images/oli.png'
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery',
        img: 'images/pasta.png'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        img: 'images/muffin.png'
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty',
        img: 'images/makeup1.png'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty',
        img: 'images/makeup2.png'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty',
        img: 'images/makeup3.png'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes',
        img: 'images/oli.png'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes',
        img: 'images/pasta.png'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes',
        img: 'images/muffin.png'
    }
]
// Array with products (objects) added directly with push(). Products in this array are repeated.
var cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var subtotal = {
    grocery: {
        value: 0, 
        discount: 0
    },
    beauty: {
        value: 0, 
        discount: 0
    },
    clothes: {
        value: 0, 
        discount: 0
    },
};
var total = 0;

// Exercise 1
function buy(id) {
    // 1. Loop for to the array products to get the item to add to cart
    let quin;
    for(let item in products) {
        if(products[item].id === id) {
            quin = products[item];
        }
    }
    // 2. Add found product to the cartList array
    cartList.push(quin);
    calculateSubtotals();
}

// Exercise 2
function cleanCart() {
    cartList = [];
    cart = [];
    subtotal.grocery.value = 0;
    subtotal.beauty.value = 0;
    subtotal.clothes.value = 0;
    total = 0;
}

// Exercise 3
function calculateSubtotals() {
    // 1. Create a for loop on the "cartList" array 
    // 2. Implement inside the loop an if...else or switch...case to add the quantities of each type of product, obtaining the subtotals: subtotalGrocery, subtotalBeauty and subtotalClothes
    subtotal.grocery.value = 0;
    subtotal.beauty.value = 0;
    subtotal.clothes.value = 0;

    /* 
    // Before Refactor
    for (let index = 0; index < cartList.length; index++) {
        switch (cartList[index].type) {
            case 'grocery':
                subtotal.grocery.value += cartList[index].price;
                break;
            
            case 'beauty':
                subtotal.beauty.value += cartList[index].price;
                break;

            case 'clothes':
                subtotal.clothes.value += cartList[index].price;
                break;

            default:
                break;
        }
    }
    */

    // After Refactor
    for(let index in cart) {
        switch (cart[index].type) {
            case 'grocery':
                subtotal.grocery.value += cart[index].subtotal;
                break;
            
            case 'beauty':
                subtotal.beauty.value += cart[index].subtotal;
                break;

            case 'clothes':
                subtotal.clothes.value += cart[index].subtotal;
                break;

            default:
                break;
        }
    }
    calculateTotal();
}

// Exercise 4
function calculateTotal() {
    // Calculate total price of the cart either using the "cartList" array
    total = 0;    

    for (let key in subtotal) {
        //console.log(subtotal[key].value);
        total += subtotal[key].value;
    }
    //console.log('TOTAL: ' + total);
    //generateCart();
    applyPromotionsCart();
}

// Exercise 5
function generateCart() {
    // Using the "cartlist" array that contains all the items in the shopping cart, 
    // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.
    cart = [];

    for (let prop in cartList) {
        if (cart.some(e => e.name === cartList[prop].name)) {
            let index = cart.findIndex(quin => quin.name === cartList[prop].name);
            cart[index].quantity += 1;
            cart[index].subtotal += cartList[prop].price;
        } else {
            cart.push({name: cartList[prop].name, price: cartList[prop].price, type: cartList[prop].type, quantity: 1, subtotal: cartList[prop].price, subtotalWithDiscount: 0});
        }
    }
    applyPromotionsCart();
}

// Exercise 6
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"
    for (let prop in cart) {
        if ((cart[prop].name === 'cooking oil') && (cart[prop].quantity >= 3)) {
            console.log('OFERTA oli');
            let ofertaOli = 10;
            cart[prop].subtotalWithDiscount = ofertaOli * cart[prop].quantity;
        } else if ((cart[prop].name === 'Instant cupcake mixture') && (cart[prop].quantity >= 10)) {
            let ofertaMixSub = (cart[prop].subtotal / 3) * 2;
            cart[prop].subtotalWithDiscount = ofertaMixSub.toFixed(2);
        } else {
            cart[prop].subtotalWithDiscount = cart[prop].subtotal;
        }
    }
    console.log(cart);
}

// Exercise 7
function addToCart(id) {
    // Refactor previous code in order to simplify it 
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cart array or update its quantity in case it has been added previously.
    for(let item in products) {
        if(products[item].id === id) {
            if (cart.some(e => e.name === products[item].name)) {
                let index = cart.findIndex(quin => quin.name === products[item].name);
                let updatedQuantity = cart[index].quantity + 1;
                cart[index].quantity = updatedQuantity;
                cart[index].subtotal = cart[index].price * updatedQuantity;
            } else {
                cart.push({name: products[item].name, price: products[item].price, type: products[item].type, quantity: 1, subtotal: products[item].price, subtotalWithDiscount: 0});
            }
        }
    }
    calculateSubtotals();
}

// Exercise 9
function removeFromCart(id) {
    // 1. Loop for to the array products to get the item to add to cart << WRONG DESCRIPTION
    for(let item in products) {
        if ((products[item].id === id) && (cart.some(e => e.name === products[item].name))) {
            let index = cart.findIndex(quin => quin.name === products[item].name);
            if (cart[index].quantity >= 1) {
                let updatedQuantity = cart[index].quantity - 1;
                cart[index].quantity = updatedQuantity;
                cart[index].subtotal = cart[index].price * updatedQuantity;  

                // Remove when quantity is 0 from that product in cart
                if (cart[index].quantity == 0) {
                    cart.splice(index, 1);
                }
            }
        }
    }
    calculateSubtotals();
    // 2. Add found product to the cartList array << WRONG DESCRIPTION
}

// Exercise 10
    // Fill the shopping cart modal manipulating the shopping cart dom
function printCart() { 
    if (cart.length !== 0) {

        let thelist = document.getElementById('list');

        let thenodecontent = document.createElement("div");
        thenodecontent.setAttribute("id", "content");
        let thecontent = thelist.appendChild(thenodecontent);

        for (let item in cart) {
            let productname = cart[item].name;

            let node = document.createElement("div");
            node.classList.add("cart-item");
            
            let cartitem = thecontent.appendChild(node);

            // load product image
            let pictnode = document.createElement("img");
            pictnode.classList.add("picture-item");
            
            for(let quin in products) {
                if (products[quin].name === productname) {
                    var imgurl = products[quin].img;
                    
                }
            }
            console.log(imgurl);
            pictnode.setAttribute('src', imgurl);
            cartitem.append(pictnode);
            
            // content structure
            let contentitem = document.createElement("div");
            contentitem.classList.add("content-item");
            cartitem.append(contentitem);

            // show name
            let cartname = document.createElement("div");
            cartname.classList.add("cart-name");
            
            contentitem.append(cartname); 
            cartname.append(productname);

            // extra info div
            let infonode = document.createElement("div");
            infonode.classList.add("cart-info");
            contentitem.append(infonode);

            let smallinfonode = document.createElement("div");
            smallinfonode.classList.add("cart-smallinfo");
            infonode.append(smallinfonode);

            // show price
            let cartprice = document.createElement("div");
            cartprice.classList.add("cart-price");
            smallinfonode.append(cartprice);
            cartprice.append("$" + cart[item].price);

            // add less
            let addless = document.createElement("button");
            addless.classList.add("small-button-card");
            smallinfonode.append(addless);
            addless.append("-");
            addless.onclick = function() { 
                for(let item in products) {
                    if (products[item].name === productname) {
                        removeFromCart(products[item].id);
                    }
                }
                removePrintCart();
                printCart();
            };

            // show quantity
            let cartquantity = document.createElement("div");
            cartquantity.classList.add("cart-quantity");
            
            smallinfonode.append(cartquantity);
            cartquantity.append("x" + cart[item].quantity);

            // add more
            let addmore = document.createElement("button");
            addmore.classList.add("small-button-card");
            smallinfonode.append(addmore);
            addmore.append("+");
            addmore.onclick = function() { 
                for(let item in products) {
                    if (products[item].name === productname) {
                        addToCart(products[item].id);
                    }
                }
                removePrintCart();
                printCart();
            };

            // create subtotal structure
            let subtotalnode = document.createElement("div");
            subtotalnode.classList.add("subtotal");
            infonode.append(subtotalnode);

            // create subtotal
            let cartsubtotal = document.createElement("div");
            // show subtotal
            subtotalnode.append(cartsubtotal);
            cartsubtotal.append("$" + cart[item].subtotal);

            // show subtotal with discount
            if (cart[item].subtotal !== cart[item].subtotalWithDiscount) {
                // add striked class to subtotal
                cartsubtotal.classList.add("striked");
                
                let cartdiscount = document.createElement("div");
                cartdiscount.classList.add("cart-discount");
                
                subtotalnode.append(cartdiscount);
                cartdiscount.append("$" + cart[item].subtotalWithDiscount);
            } else {        
                // add subtotal without discount
                cartsubtotal.classList.add("cart-subtotal");
            }        
        }

        // show total
        var nodetotal = document.createElement("div");
        nodetotal.classList.add("cart-item");
        let cartitem = thecontent.appendChild(nodetotal);
                    
        let totaltittle = document.createElement("div");
        totaltittle.classList.add("total-tittle");
        cartitem.append(totaltittle); 
        totaltittle.append("TOTAL");
                    
        let totalprice = document.createElement("div");
        totalprice.classList.add("total-price");
        cartitem.append(totalprice); 
        totalprice.append(total.toFixed(2));

        // remove empty placeholder text
        let selecttext = document.getElementById("selectsomething");
        if (selecttext !== null) {
            selecttext.remove();
        }
    }
}

function removePrintCart() {
    let thecontent = document.getElementById('content');
    if (thecontent !== null) {
        thecontent.remove();
    }
}