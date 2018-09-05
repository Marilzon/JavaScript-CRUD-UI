var users = []
var userList = document.getElementById("users")
var form = document.getElementById("signUp")
var inputName = document.getElementById('name')
var inputEmail = document.getElementById('email')
var isName = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
var isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

inputName.addEventListener("blur", validateName)
inputEmail.addEventListener("blur", validateEmail)
form.addEventListener("submit", validateName)
form.addEventListener("submit", validateEmail)
form.addEventListener("submit", signUp)

function validateName(e) {
    e.preventDefault()
    if (inputName.value === '') {
        nameHelper.classList.remove("green", "black-text")
        nameHelper.classList.add("red", "lighten-1")
        nameHelper.innerHTML = ""
        nameHelper.innerHTML = `Digite seu nome *`
    }
    else if (
        inputName.value.match(isName)
    ) {
        nameHelper.classList.remove("red", "black-text")
        nameHelper.classList.add("green")
        nameHelper.innerHTML = ""
        nameHelper.innerHTML = `Nome valido! *`
    }
    else {
        nameHelper.classList.remove("green", "black-text")
        nameHelper.classList.add("red", "lighten-1")
        nameHelper.innerHTML = ""
        nameHelper.innerHTML = `Nome invalido! *`
    }
}
function validateEmail(e) {
    e.preventDefault()
    if (inputEmail.value === '') {
        emailHelper.classList.remove("green", "black-text")
        emailHelper.classList.add("red", "lighten-1")
        emailHelper.innerHTML = ""
        emailHelper.innerHTML = `Digite o E-mail! *`
    }
    else if (
        inputEmail.value.match(isEmail)
    ) {
        emailHelper.classList.remove("red", "black-text")
        emailHelper.classList.add("green")
        emailHelper.innerHTML = ""
        emailHelper.innerHTML = `E-mail valido! *`
    }
    else {
        emailHelper.classList.remove("green", "black-text")
        emailHelper.classList.add("red", "lighten-1")
        emailHelper.innerHTML = ""
        emailHelper.innerHTML = `E-mail invalido! *`
    }
}
    function signUp() {
        if (
            (inputName.value.match(isName)) &&
            (inputEmail.value.match(isEmail))
        ) {
            let name = inputName.value
            let email = inputEmail.value
            createUser(name, email)
        } else {
            console.log("Valores incorretos!")
        }
    }
function createUser(name, email) {
    var user = {
        name: name,
        email: email,
    }
    users.push(user)
    readUser()
    form.reset()
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
                                <span class="helper-text black-text left" id="updateHelper">
                                    Campos Obrigatórios *
                                </span>
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
    let updateName = document.getElementById("updateName").value
    let updateEmail = document.getElementById("updateEmail").value
    if (
        (updateName.match(isName)) &&
        (updateEmail.match(isEmail))
    ) {
        users[index].name = updateName
        users[index].email = updateEmail
        readUser()
    } else {
        updateHelper.classList.remove("black-text")
        updateHelper.classList.add("red")
        updateHelper.innerHTML = ""
        updateHelper.innerHTML = `O campo Nome ou E-mail esta incorreto!, Verifique para atualizar! *`
    }
}
function removeUser(i) {
    users.splice(i, 1)
    readUser()
}
