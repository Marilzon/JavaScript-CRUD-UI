var users = []
var userList = document.querySelector("#users")
var form = document.querySelector("#signUp")
var nameHelper = document.querySelector("#nameHelper")
var emailHelper = document.querySelector("#emailHelper")
var isName = /^[a-zA-Z-áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+(([',. -][a-zA-Z-áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ])?[a-zA-Z]*)*$/
var isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

userName.addEventListener("input", validateName)
userEmail.addEventListener("input", validateEmail)

form.setAttribute("novalidate", true)
form.addEventListener("submit", validateName)
form.addEventListener("submit", validateEmail)
form.addEventListener("submit", signUp)

function signUp(e) {
    e.preventDefault()
    if (userName.value.match(isName) &&
        userEmail.value.match(isEmail)) {
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
    M.toast({ html: 'Usuario cadastrado!', classes: 'green' })
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
            <li class="user col s12 m6">
                <div class="card blue-grey darken-1">
                    <div class="card-content ">
                        <span class="helper-span">${i + 1}</span>
                        <p>Nome: ${users[i].name}</p>
                        <p>E-mail: <u>${users[i].email}</u></p>
                    </div>
                    <div class="card-action">
                        <button class="btn-small light-blue" id="editUser" onclick="editUser('${i}')">Editar</button>
                        <button class="btn-small red darken-2" onclick="removeUser('${i}')">Apagar</button>
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
            <li class="user col s12 m6">
                <div class="card blue-grey darken-1">
                    <div class="card-content">
                    <div class="row">
                        <div class="input-field col s12 m6">
                            <label for="updateName">Nome:</label>
                            <input type="text" id="updateName" onkeypress="editName()">
                            <span class="helper-text center-align" id="upNameHelper">
                                Campo Obrigatório!
                            </span>
                        </div>
                        <div class="input-field col s12 m6">
                            <label for="updateEmail">E-mail:</label>
                            <input type="email" id="updateEmail" onkeypress="editEmail()">
                            <span class="helper-text center-align" id="upEmailHelper">
                                Campo Obrigatório!
                            </span>
                        </div>
                    </div>
                    <div class="card-action">
                        <button class="btn light-blue" id="submitUpdate" onClick="updateUser('${i}')">Atualizar</button>
                        <button class="btn red darken-2" onClick="readUser()">Cancelar</button>
                    </div>
                </div>
            </li>
                `
        } else {
            userList.innerHTML +=
                `
            <li class="user col s12 m6">
                <div class="card blue-grey darken-1">
                    <div class="card-content">
                        <p>Nome: ${users[i].name}</p>
                        <p>E-mail: <u>${users[i].email}</u></p>
                    </div>
                    <div class="card-action">
                        <button class="btn-small light-blue editUser" onClick="editUser('${i}')" disabled>Editar</button>
                        <button class="btn-small red darken-2 removeUser" onClick="removeUser('${i}')" disabled>Apagar</button>
                    </div>
                </div>
            </li>
            `
        }
    }
}
function validateName() {
    if (userName.value.length < 2 || userName.value.length > 30) {
        nameHelper.classList.remove("green")
        nameHelper.classList.add("red")
        return nameHelper.innerHTML = `Minimo: 2, Maximo: 30 Caractéres`
    }
    else if (
        userName.value.match(isName)
    ) {
        nameHelper.classList.remove("red")
        nameHelper.classList.add("green")
        return nameHelper.innerHTML = `Nome valido!`
    }
    else {
        nameHelper.classList.remove("green")
        nameHelper.classList.add("red")
        return nameHelper.innerHTML = `Nome invalido!`
    }
}
function validateEmail() {
    if (userEmail.value === '') {
        emailHelper.classList.remove("green")
        emailHelper.classList.add("red")
        return emailHelper.innerHTML = `Campo obrigatório!`
    }
    else if (
        userEmail.value.match(isEmail)
    ) {
        users.find(isSigned)
        emailHelper.classList.remove("red")
        emailHelper.classList.add("green")
        return emailHelper.innerHTML = `E-Mail valido!`
    }
    else {
        emailHelper.classList.remove("green")
        emailHelper.classList.add("red")
        return emailHelper.innerHTML = `E-Mail invalido!`
    }
}
function isSigned(user) {
    if (userEmail.value === user.email) {
        submit.classList.add("disabled")
        emailHelper.classList.add("hidden", 3000)
        M.toast({ html: 'Este E-Mail Já esta sendo usado!', classes: 'red' })
        return userEmail.value === user.email
    } else {
        submit.classList.remove("disabled")
        emailHelper.classList.remove("hidden")
    }
}
function hasSigned(user) {
    if (updateEmail.value === user.email) {
        return updateEmail.value === user.email
    }
}
function editName() {
    if (updateName.value.length < 2 || updateName.value.length > 30) {
        upNameHelper.classList.remove("green")
        upNameHelper.classList.add("red")
        return upNameHelper.innerHTML = `2 á 30 Caractéres`
    }
    else if (
        updateName.value.match(isName)
    ) {
        upNameHelper.classList.remove("red")
        upNameHelper.classList.add("green")
        return upNameHelper.innerHTML = `Nome valido!`
    }
    else {
        upNameHelper.classList.remove("green")
        upNameHelper.classList.add("red")
        return upNameHelper.innerHTML = `Nome invalido!`
    }
}
function editEmail() {
    if (updateEmail.value === "") {
        upEmailHelper.classList.remove("green")
        upEmailHelper.classList.add("red")
        return upEmailHelper.innerHTML = `Campo obrigatório`
    }
    else if (
        updateEmail.value.match(isEmail)
    ) {
        users.find(hasSigned)
        upEmailHelper.classList.remove("red")
        upEmailHelper.classList.add("green")
        return upEmailHelper.innerHTML = `E-Mail valido!`
    }
    else {
        upEmailHelper.classList.remove("green")
        upEmailHelper.classList.add("red")
        return upEmailHelper.innerHTML = `E-Mail invalido!`
    }
}
function updateUser(index) {
    editName()
    editEmail()
    if (updateName.value.match(isName) && updateEmail.value.match(isEmail)) {
        if (users.find(hasSigned) === undefined) {
            let name = document.getElementById("updateName").value
            let email = document.getElementById("updateEmail").value
            users[index].name = name
            users[index].email = email
            readUser()
        } else {
            M.toast({ html: 'Este E-Mail Já esta sendo usado!', classes: 'red' })
        }
    }
}
function removeUser(i) {
    users.splice(i, 1)
    countUsers()
    readUser()
}
function countUsers() {
    return userCount.innerHTML = `Usuarios Cadastrados: ${users.length}`
}
