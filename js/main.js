var users = []
var userList = document.querySelector("#users")
var form = document.querySelector("#signUp")
var userName = document.querySelector("#userName")
var userEmail = document.querySelector("#userEmail")
var nameHelper = document.querySelector("#nameHelper")
var emailHelper = document.querySelector("#emailHelper")
var isName = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
var isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
var userList = document.querySelector(".users-list")

userName.addEventListener("input", validateName)
userEmail.addEventListener("input", validateEmail)
form.addEventListener("submit", validateName)
form.addEventListener("submit", validateEmail)
form.addEventListener("submit", signUp)

function validateName(e) {
    e.preventDefault()
    if (userName.value.length < 2 || userName.value.length > 24) {
        nameHelper.classList.remove("green")
        nameHelper.classList.add("red", "lighten-1")
        nameHelper.innerHTML = ""
        nameHelper.innerHTML = `Campo obrigatório!`
    }
    else if (
        userName.value.match(isName)
    ) {
        nameHelper.classList.remove("red")
        nameHelper.classList.add("green")
        nameHelper.innerHTML = ""
        nameHelper.innerHTML = `Nome valido!`
    }
    else {
        nameHelper.classList.remove("green")
        nameHelper.classList.add("red", "lighten-1")
        nameHelper.innerHTML = ""
        nameHelper.innerHTML = `Nome invalido!`
    }
}
function validateEmail(e) {
    e.preventDefault()
    if (userEmail.value === '') {
        emailHelper.classList.remove("green")
        emailHelper.classList.add("red", "lighten-1")
        emailHelper.innerHTML = ""
        emailHelper.innerHTML = `Campo obrigatório!`
    }
    else if (
        userEmail.value.match(isEmail)
    ) {
        emailHelper.classList.remove("red")
        emailHelper.classList.add("green")
        emailHelper.innerHTML = ""
        emailHelper.innerHTML = `E-mail valido!`
    }
    else {
        emailHelper.classList.remove("green")
        emailHelper.classList.add("red", "lighten-1")
        emailHelper.innerHTML = ""
        emailHelper.innerHTML = `E-mail invalido!`
    }
}
function signUp() {
    if (userName.value.match(isName) && userEmail.value.match(isEmail)) {
        let name = userName.value
        let email = userEmail.value
        createUser(name, email)
    }
}
function createUser(name, email) {
    var user = {
        name: name,
        email: email,
    }
    users.push(user)
    readUser()
    countUsers()
    form.reset()
}
function readUser() {
    userList.innerHTML = ''
    for (i = 0; i < users.length; i++) {
        userList.innerHTML +=
            `
            <li class="user">
                <div class="row">
                    <div class="col s12">
                        <div class="card blue-grey darken-1">
                            <div class="card-content ">
                                <span class="helper-span">${i + 1}</span>
                                <p>Nome: ${users[i].name}</p>
                                <p>E-mail: <u>${users[i].email}</u></p>
                            </div>
                            <div class="card-action">
                                <button class="btn-small light-blue lighten-2" id="editUser" onclick="editUser('${i}')">Editar</button>
                                <button class="btn-small red darken-2" onclick="removeUser('${i}')">Apagar</button>
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
                                    <input type="text" id="updateName">
                                    <span class="helper-text right nameHelper">
                                        Campo Obrigatório!
                                    </span>
                                </div>
                                <div class="input-field col s12 m6">
                                    <label for="updateEmail">E-mail:</label>
                                    <input type="email" id="updateEmail">
                                    <span class="helper-text right emailHelper">
                                        Campo Obrigatorio!
                                    </span>
                                </div>
                            </div>
                            <div class="card-action">
                                <button class="btn light-blue lighten-2" onClick="updateUser('${i}')">Atualizar</button>
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
    if (updateName.value.match(isName) && updateEmail.value.match(isEmail)) {
        let name = document.getElementById("updateName").value
        let email = document.getElementById("updateEmail").value
        users[index].name = name
        users[index].email = email
        readUser()
    } else {
        console.log("Campo Invalido!")
    }
}
function removeUser(i) {
    users.splice(i, 1)
    countUsers()
    readUser()
}
function countUsers() {
    userCount.innerHTML = ""
    userCount.innerHTML = `Usuarios Cadastrados: ${users.length}`
}
