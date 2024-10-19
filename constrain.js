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

function int_to_tring (a){
    let b = String(a);
    let j = 0;
    for(let i=b.length; i >= 0; i--){
        if(j === 3 && i!==0){
            b = b.substr(0, i) + '.' + b.substr(i);
            j = 0;
        }
        j++;
    }
    return b;
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
    let total = 0;
    for (let key in localStorage){
        console.log(key);
        item = itemList[key];
        photo = item.photo;
        name = item.name;
        price = item.price;
        orderNumber = localStorage.getItem(key);

        let tbody = document.getElementById("tbdy");

        let tr = document.createElement("tr", id=`tr_${key}`);

        let td_check = document.createElement("td");
        td_check.innerHTML=`<input type="checkbox" id="box_${key}" class="checkbox" onclick="update_total1('${key}')">`;
        tr.appendChild(td_check);

        let td_img = document.createElement("td");
        td_img.innerHTML=`<img src=${photo} width = '100px'>`
        tr.appendChild(td_img);

        let td_name = document.createElement("td");
        td_name.innerHTML = name;
        tr.appendChild(td_name);

        let td_price = document.createElement("td");
        td_price.innerHTML = `${int_to_tring(price)}/chậu`;
        tr.appendChild(td_price);

        let td_orderNumber = document.createElement("td");
        td_orderNumber.innerHTML =`<input type="number" id="${key}_new" class="input_number" onchange="change_number('${key}')" name="soluong" max="100" min="0" size="3" value="${orderNumber}">` ;
        tr.appendChild(td_orderNumber);

        let td_count = document.createElement("td");
        td_count.innerHTML = int_to_tring (count_price(key));
        tr.appendChild(td_count);

        let td_delete = document.createElement("td");
        td_delete.innerHTML = `<a class="icon_trash" onclick="removeCart('${key}')"><i class="fa-solid fa-trash-can"></i></a>`;
        tr.appendChild(td_delete);

        tbody.append(tr);
    }
}

function change_number (key){
    let div_count = document.getElementById("count");
    div_count.innerHTML = `<p>Vui lòng chọn sản phẩm trong giỏ hàng!</p>`;
    let check = document.getElementById("check_all");
    check.checked = false;
    number = parseInt(document.getElementById(`${key}_new`).value);
    if (number > 100){
        window.localStorage.setItem(key, 100);
        alert(`Sản phẩm ${itemList[key].name} đã đặt quá 100 sản phẩm!`);
    }
    else{
        window.localStorage.setItem(key, number);
    }
    let tbody = document.getElementById("tbdy");
    tbody.innerHTML ="";
    update_total2()
    show_cart();
}


let total = 0;
function update_total1(key){
    checkBox = document.getElementById(`box_${key}`);
    if(checkBox.checked === true){
        total += count_price(key);
    }
    else if(total > 0){
        total -= count_price(key);
    }
    let discount = total*get_discount_rate();
    let tax = (total - discount)*0.1;
    let fee = total - discount + tax;
    let div_count = document.getElementById("count");
    if(fee !==0 ){
        div_count.innerHTML = `<p class="count_fee">Tổng giá trị đơn hàng: <span>${int_to_tring(total)}đ</span> </p>
                        <p class="count_fee">Giá trị khuyến mãi: <span>${int_to_tring(discount)}đ</span> </p>
                        <p class="count_fee">Thuế giá trị gia tăng: <span>${int_to_tring(tax)}đ</span> </p>
                        <p class="Buy">Thành tiền: <span class="fee">${int_to_tring(fee)}đ</span> </p>
                        <button class="buy">Mua</button>`;   
    }
    else if(localStorage.length !== 0) {
        div_count.innerHTML = `<p>Vui lòng chọn sản phẩm trong giỏ hàng!</p>`;
    }

}

function check_all(){    
    let check = document.getElementById("check_all");    
    if (check.checked === true){  
        update_total2();      
        let checkbox = document.getElementsByClassName("checkbox");
        for(let i in checkbox){
            checkbox[i].checked = true;
        }
        for (let key in localStorage){
            update_total1(key);
        }
    }
    else {
        let checkbox = document.getElementsByClassName("checkbox");
        for(let i in checkbox){
            checkbox[i].checked = false;
        }
        
    }
    update_total2();
    let div_count = document.getElementById("count");
    div_count.innerHTML = `<p>Vui lòng chọn sản phẩm trong giỏ hàng!</p>`;

}


function update_total2(){
    total = 0;
    // let div_count = document.getElementById("count");
    // div_count.innerHTML = `<p>Vui lòng chọn sản phẩm trong giỏ hàng!</p>`;
}

function count_price(key){
    item = itemList[key];
    price = item.price;
    orderNumber = localStorage.getItem(key);
    return orderNumber*price;
}

function get_discount_rate(){
    let d = new Date();
    let weekday = d.getDay();
    let totalMins = d.getHours()*60+d.getMinutes();
    if(weekday >= 1  && weekday<=3 &&((totalMins >= 420 && totalMins <= 660) || (totalMins >= 780 && totalMins <= 1020))){
        return 0.1;
    }
    return 0;
}

function display_cart() {
    if (localStorage.length === 0){        
        let a = document.getElementById("cart");
        a.style.display = "none";
        let div_count = document.getElementById("count");
        div_count.innerHTML = `<p>Hiện tại chưa có sản phẩm nào trong giỏ hàng!</p>`;        
    }
    else{
        let a = document.getElementById("cart");
        a.style.display = "block";
        show_cart();
    }
}

display_cart();

function removeCart (code){
    update_total2();
    if(typeof window.localStorage[code] !== "undefined"){
        window.localStorage.removeItem(code);      
        document.getElementById("CartDetail").getElementsByTagName('tbody')[0].innerHTML = "";
        display_cart();        
    }    
}
