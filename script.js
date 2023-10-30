function saveOnLocal(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;

    const obj = {
        name,
        email,
        phone
    };

    const data = axios.post("https://crudcrud.com/api/ee054ef918684164a0f553fd205235f2/userData", obj)
        .then((response) => {
            showOnDisplay(response.data)
            console.log("User Response"+response);

        })
        .catch((err) => console.log(err))

}
window.addEventListener("DOMContentLoaded", () => {
    const data = axios.get("https://crudcrud.com/api/ee054ef918684164a0f553fd205235f2/userData")
        .then((response) => {
            for (var i = 0; i < response.data.length; i++) {
                showOnDisplay(response.data[i]);

            }
        })
})
function clearFormData() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
}
function showOnDisplay(obj) {
    clearFormData()
    const users = document.getElementById('users');
    const li = document.createElement('li');

    li.textContent = `${obj.name} ${obj.email} ${obj.phone}`;

    const button = document.createElement('button');
    // button.appendChild(document.createTextNode('delete'));
    button.textContent = "Delete";
    li.appendChild(button);
    users.appendChild(li);

    const editBtn = document.createElement('button');
    // button.appendChild(document.createTextNode('delete'));
    editBtn.textContent = "Edit";
    li.appendChild(editBtn);
    users.appendChild(li);

    button.onclick = () => {
        const id = obj._id;
        console.log(id);
        axios.delete(`https://crudcrud.com/api/ee054ef918684164a0f553fd205235f2/userData/${id}`)
            .then((response) => {
                // showOnDisplay(response.data)
                console.log(response);

            })
            .catch((err) => console.log(err))

        users.removeChild(li);
    }

    editBtn.onclick = () => {
        const id = obj._id;
        console.log(id);
        document.getElementById('name').value = obj.name;
        document.getElementById('email').value = obj.email;
        document.getElementById('phone').value = obj.phone;
        axios.delete(`https://crudcrud.com/api/ee054ef918684164a0f553fd205235f2/userData/${id}`)
            .then((response) => {
                // showOnDisplay(response.data)
                console.log(response);

            })
            .catch((err) => console.log(err))



        // axios.put(`https://crudcrud.com/api/ee054ef918684164a0f553fd205235f2/userData/${id}`)
        // .then((response) => {
        //     // showOnDisplay(response.data)

        // })
        // .catch((err) => console.log(err))

        users.removeChild(li);

    }


}