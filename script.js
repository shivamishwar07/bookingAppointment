
// let totalPrice = 0;
// let totalProductPrice=0
// function saveOnLocal(event) {
//     event.preventDefault();
//     const productName = event.target.productName.value;
//     const price = parseFloat(event.target.price.value);
//     totalProductPrice += price
//     const obj = {
//         productName,
//         price,
//     };
//     totalPrice += price;
//     const data = axios.post("https://crudcrud.com/api/77b2f45a2f6842fcb8e672781490f644/userData", obj)
//         .then((response) => {
//             showOnDisplay(response.data)
//             updateTotalPrice();
//         })
//         .catch((err) => console.log(err))

// }
// function updateTotalPrice() {
//     const totalPriceElement = document.getElementById('totalPrice');
//     totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
// }
// window.addEventListener("DOMContentLoaded", () => {
//     const data = axios.get("https://crudcrud.com/api/77b2f45a2f6842fcb8e672781490f644/userData")
//         .then((response) => {
//             for (var i = 0; i < response.data.length; i++) {
//                 showOnDisplay(response.data[i]);
//             }
//             updateTotalPrice()
//         })
// })

// function clearFormData() {
//     document.getElementById("productName").value = "";
//     document.getElementById("price").value = "";
// }
// function showOnDisplay(obj) {
//     clearFormData()
//     const users = document.getElementById('users');
//     const li = document.createElement('li');

//     li.textContent = `${obj.productName} ${obj.price}`;

//     const button = document.createElement('button');
//     button.textContent = "Delete";
//     li.appendChild(button);
//     users.appendChild(li);
//     users.appendChild(li);

//     button.onclick = () => {
//         const id = obj._id;
//         let deletedPrice = obj.price;
//         console.log(id);
//         axios.delete(`https://crudcrud.com/api/77b2f45a2f6842fcb8e672781490f644/userData/${id}`)
//             .then((response) => {
//                 totalPrice -= deletedPrice
//                if(totalPrice<0)
//                totalPrice=0
//                updateTotalPrice();
//             })

//             .catch((err) => console.log(err))

//         users.removeChild(li);
//     }


// }

// Check if the totalPrice is already stored in localStorage and retrieve it
let totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;
let totalProductPrice = 0;

function saveOnLocal(event) {
    event.preventDefault();
    const productName = event.target.productName.value;
    const price = parseFloat(event.target.price.value);
    totalProductPrice += price;

    const obj = {
        productName,
        price,
    };

    totalPrice += price;

    // Save the updated totalPrice in localStorage
    localStorage.setItem('totalPrice', totalPrice.toString());

    const data = axios.post("https://crudcrud.com/api/77b2f45a2f6842fcb8e672781490f644/userData", obj)
        .then((response) => {
            showOnDisplay(response.data);
            updateTotalPrice();
        })
        .catch((err) => console.log(err))
}

function updateTotalPrice() {
    const totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
}

window.addEventListener("DOMContentLoaded", () => {
    const data = axios.get("https://crudcrud.com/api/77b2f45a2f6842fcb8e672781490f644/userData")
        .then((response) => {
            for (var i = 0; i < response.data.length; i++) {
                showOnDisplay(response.data[i]);
            }
            updateTotalPrice();
        })
})

function clearFormData() {
    document.getElementById("productName").value = "";
    document.getElementById("price").value = "";
}

function showOnDisplay(obj) {
    clearFormData();
    const users = document.getElementById('users');
    const li = document.createElement('li');

    li.textContent = `${obj.productName} ${obj.price}`;

    const button = document.createElement('button');
    button.textContent = "Delete";
    li.appendChild(button);
    users.appendChild(li);

    button.onclick = () => {
        const id = obj._id;
        let deletedPrice = obj.price;
        axios.delete(`https://crudcrud.com/api/77b2f45a2f6842fcb8e672781490f644/userData/${id}`)
            .then((response) => {
                totalPrice -= deletedPrice;
                if (totalPrice < 0) {
                    totalPrice = 0;
                }
                updateTotalPrice();
                // Save the updated totalPrice in localStorage after deletion
                localStorage.setItem('totalPrice', totalPrice.toString());
            })
            .catch((err) => console.log(err))

        users.removeChild(li);
    }
}
