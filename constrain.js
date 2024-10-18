let itemList = {
    "001": {
        "name": "Sữa Chua Vị Kiwi",
        "price": 21000,
        "photo": "images/sanpham/kiwi.jpg"},
    
    "002": {
        "name": "Sữa Chua Vị Xoài",
        "price": 22000,
        "photo": "images/sanpham/mango.jpg"},     

    "003": {
        "name": "Sữa Chua Vị Dưa lưới",
        "price": 23000,
        "photo": "images/sanpham/cantaloupe.jpg"},

    "004": {
        "name": "Sữa Chua Vị Mâm Xôi",
        "price": 24000,
        "photo": "images/sanpham/blackberry.jpg"},

    "005": {
        "name": "Sữa Chua Vị Dâu Tây",
        "price": 25000,
        "photo": "images/sanpham/strawberry.jpg"},

    "006": {
        "name": "Sữa Chua Vị Việt Quất",
        "price": 26000,
        "photo": "images/sanpham/blueberry.jpg"},

    "007": {
        "name": "Sữa Chua Vị Bưởi",
        "price": 27000,
        "photo": "images/sanpham/grapes.jpg"},

    "008": {
        "name": "Sữa Chua Vị Táo Xanh",
        "price": 28000,
        "photo": "images/sanpham/green-apple.jpg"},

    "009": {
        "name": "Sữa Chua Vị Dứa",
        "price": 29000,
        "photo": "images/sanpham/pineapple.jpg"}
};

function move_donhang(){
    window.location.href="donhang.html";
}

function addcart (e) {
    if(typeof localStorage[e] === "undefined"){
        number = parseInt(document.getElementById(e).value);
        window.localStorage.setItem(e, number);
    }
    else {
        number = parseInt(document.getElementById(e).value);
        current = parseInt(window.localStorage.getItem(e));
        total = number + current;
        if (total > 100){
            window.localStorage.setItem(e, 100);
            alert(`san pham ${e} da dat qua 100 san pham!`);
        }
        else{
            window.localStorage.setItem(e, total);
        }
    }
    for (let key in localStorage){
        console.log(key);
    }
    console.log(localStorage);
}

function show_cart() {
    for (let key in localStorage){
        console.log(localStorage[key]);
        item = itemList[key];
        photo = item.photo;
        name = item.name;
        price = item.price;
        orderNumber = localStorage.getItem(key);

        let tbody = document.getElementById("tbdy");

        let tr = document.createElement("tr");
        let td_img = document.createElement("td");
        td_img.innerHTML=`<img src=${photo} width = '100px'>`
        tr.appendChild(td_img);

        let td_name = document.createElement("td");
        td_name.innerHTML = name;
        tr.appendChild(td_name);

        let td_price = document.createElement("td");
        td_price.innerHTML = price;
        tr.appendChild(td_price);

        let td_orderNumber = document.createElement("td");
        td_orderNumber.innerHTML = orderNumber;
        tr.appendChild(td_orderNumber);

        tbody.append(tr);
    }
}
show_cart();


// console.log(localStorage.length);

