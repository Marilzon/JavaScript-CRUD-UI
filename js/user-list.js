var users = []
var userList = document.getElementById('users')

document.getElementById('signUp').addEventListener('submit', (e) => {
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
    document.getElementById('signUp').reset()
}
function readUser() {
    userList.innerHTML = ''
    for (i = 0; i < users.length; i++) {
        userList.innerHTML +=
            `<li class="user">
                <div class="row">
                    <div class="col s12">
                        <div class="card blue-grey darken-1">
                            <div class="card-content ">
                                <p>Nome: ${users[i].name}</p>
                                <p>E-mail: <u>${users[i].email}</u></p>
                            </div>
                            <div class="card-action">
                                <button class="btn-small light-blue lighten-2 editUser" onClick="editUser('${i}')">Editar</button>
                                <button class="btn-small red darken-2 removeUser" onClick="removeUser('${i}')">Apagar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            `
    }
}
function editUser(index) {
    userList.innerHTML = ''
    for (i = 0; i < users.length; i++) {
        if (i == index) {
            userList.innerHTML +=
                `
        <li class="user ">
            <div class="row">
                <div class="col s12">
                    <div class="card blue-grey darken-1">
                        <div class="card-content">
                        <div class="row">
                            <div class="input-field col s12 m6">
                                <label for="updateName">Nome:</label>
                                <input  type="text" id="updateName">
                            </div>
                            <div class="input-field col s12 m6">
                                <label for="updateEmail">E-mail:</label>
                                <input type="email" id="updateEmail">
                            </div>
                            </div>
                        </div>
                        <div class="card-action">
                            <button class="btn light-blue lighten-2 " onClick="updateUser('${i}')">Atualizar</button>
                            <button class="btn red darken-2" onClick="readUser()">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </li>
        `
        } else {
            userList.innerHTML +=
                `
            <li class="user">
                <div class="row">
                    <div class="col s12">
                        <div class="card blue-grey darken-1">
                            <div class="card-content ">
                                <p>Nome: ${users[i].name}</p>
                                <p>E-mail: <u>${users[i].email}</u></p>
                            </div>
                            <div class="card-action">
                                <button class="btn-small light-blue lighten-2 editUser" onClick="editUser('${i}')" disabled>Editar</button>
                                <button class="btn-small red darken-2 removeUser" onClick="removeUser('${i}')" disabled>Apagar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            `
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

