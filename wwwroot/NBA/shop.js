let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
    body.classList.remove('inactive');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
    body.classList.add('inactive');
})

let products = [
    {
        id: 1,
        name: 'Camisola Lakers',
        image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/d9aa1b6a-4385-4233-96b6-b03f5c83d1a6/los-angeles-lakers-icon-edition-2022-23-dri-fit-nba-swingman-jersey-v5RTGr.png',
        price: 69.99
    },
    {
        id: 2,
        name: 'Camisola Spurs',
        image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/f6610b90-0526-44ca-a727-a9d727df98bd/san-antonio-spurs-icon-edition-2022-23-dri-fit-nba-swingman-jersey-p4XQ6b.png',
        price: 69.99
    },
    {
        id: 3,
        name: 'Camisola Bulls',
        image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/7c624765-1c34-4290-885c-ba692cadaa4e/chicago-bulls-icon-edition-2022-23-dri-fit-nba-swingman-jersey-xVTBkg.png',
        price: 69.99
    },
    {
        id: 4,
        name: 'Camisola Golden State Warriors',
        image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/7ac6733f-1dc1-46ce-ae77-fbd4c73099f9/camisola-nba-swingman-dri-fit-golden-state-warriors-icon-edition-2022-23-pZX5TF.png',
        price: 69.99
    },
    {
        id: 5,
        name: 'Camisola Raptors',
        image: 'https://images.footballfanatics.com/toronto-raptors/toronto-raptors-tracy-mcgrady-hardwood-classics-road-swingman-jerse-by-mitchell-and-ness-mens_ss4_p-11889789+pv-1+u-fr6tfjy873oqy5fne632+v-e39f16f44abd4d6299983220f09b99a8.jpg?_hv=2&w=600',
        price: 69.99
    },
    {
        id: 6,
        name: 'Camisola Rockets',
        image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/6fd252da-f4c6-4378-8523-6ca6e9e66004/houston-rockets-icon-edition-2022-23-dri-fit-nba-swingman-jersey-LQh428.png',
        price: 69.99
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString() + '€'}</div>
            <button onclick="addToCard(${key})">Adicionar ao carrinho</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString() + "€";
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}