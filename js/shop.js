// If you have time, you can move this variable "products" to a json file and load the data in this js. It will look more professional
var products = [
    {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery'
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery'
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
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
}

// Exercise 3
function calculateSubtotals() {
    // 1. Create a for loop on the "cartList" array 
    // 2. Implement inside the loop an if...else or switch...case to add the quantities of each type of product, obtaining the subtotals: subtotalGrocery, subtotalBeauty and subtotalClothes
    
    /* 
    // Before Refactor
    subtotal.grocery.value = 0;
    subtotal.beauty.value = 0;
    subtotal.clothes.value = 0;

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
    console.log('subtotalGrocery: ' + subtotal.grocery.value);
    console.log('subtotalBeauty: ' + subtotal.beauty.value);
    console.log('subtotalClothes: ' + subtotal.clothes.value); 
    */

    // After Refactor
    for (let index = 0; index < cart.length; index++) {
        switch (cart[index].type) {
            case 'grocery':
                subtotal.grocery.value += cart[index].price;
                break;
            
            case 'beauty':
                subtotal.beauty.value += cart[index].price;
                break;

            case 'clothes':
                subtotal.clothes.value += cart[index].price;
                break;

            default:
                break;
        }
    }
    console.log('subtotalGrocery: ' + subtotal.grocery.value);
    console.log('subtotalBeauty: ' + subtotal.beauty.value);
    console.log('subtotalClothes: ' + subtotal.clothes.value);
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
    //console.log(cart);
    applyPromotionsCart();
}

// Exercise 6
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"
    for (let prop in cart) {
        if ((cart[prop].name === 'cooking oil') && (cart[prop].quantity >= 3)) {
            //console.log('OFERTA oli');
            let ofertaOli = 10;
            cart[prop].price = ofertaOli;
            cart[prop].subtotalWithDiscount = ofertaOli * cart[prop].quantity;
        } else if ((cart[prop].name === 'Instant cupcake mixture') && (cart[prop].quantity >= 10)) {
            let ofertaMixSub = (cart[prop].subtotal / 3) * 2;
            cart[prop].subtotalWithDiscount = ofertaMixSub;
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
    //console.log(cart);
    calculateSubtotals();
}

// Exercise 9
function removeFromCart(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array
}

// Exercise 10
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom
}
