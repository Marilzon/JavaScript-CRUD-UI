var users = []
var userList = document.getElementById('users')

document.getElementById('register').addEventListener('submit', (e) => {
    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    createUser(name, email)
    e.preventDefault()
})
function createUser(name, email) {
    var user = {
        name: name,
        email: email,
    }
    users.push(user)
    readUser()
    document.getElementById('register').reset()
}
function readUser() {
    userList.innerHTML = ''
    for (i = 0; i < users.length; i++) {
        userList.innerHTML +=
            `<li class="user">
            <p>Nome: ${users[i].name}</p>
            <p>E-mail: ${users[i].email}</p>
        </li>
        <button class="editUser" onClick="editUser('${i}')">Editar</button>
        <button class="removeUser" onClick="removeUser('${i}')">Apagar</button>`
    }
}
function editUser(index) {
    userList.innerHTML = ''
    for (i = 0; i < users.length; i++) {
        if (i == index) {
            userList.innerHTML +=
                `<li class="user">
                    <p>Nome: <input type="text" id="updateName"></p>
                    <p>E-mail: <input type="email" id="updateEmail"></p>
                    <button class="" onClick="updateUser('${i}')">Atualizar</button>
                    <button class="" onClick="readUser()">Cancelar</button>
                </li>`
        } else {
            userList.innerHTML +=
                `<li class="user">
                    <p>Nome: ${users[i].name}</p>
                    <p>E-mail: ${users[i].email}</p>
                </li>
        <button class="editUser" onClick="editUser('${i}')" disabled>Editar</button>
        <button class="removeUser" onClick="removeUser('${i}')" disabled>Apagar</button>`


        }
    }
}
function updateUser(index) {
    var updateName = document.getElementById('updateName').value
    var updateEmail = document.getElementById('updateEmail').value
    if (updateName == '' || updateEmail == '') { 
        alert("Atualização incompleta, verifique os campos!")
    } else { 
        users[index].name = updateName
        users[index].email = updateEmail
        readUser()
    }
}
function removeUser(i) {
    users.splice(i, 1)
    readUser()
}
