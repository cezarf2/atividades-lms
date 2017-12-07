let btnSubmitCadastro = $("#submit-cadastro");
let usernameCadastro = $("#form-cadastro #username-cadastro");
let passwordCadastro = $("#form-cadastro #senha-cadastro");
let existUser = false;
let novoId = 0;

let errorUsernameCadastro = true;
let errorPasswordCadastro = true;

updateButtonSubmit();
// Função implementada no arquivo usuariocontroller.js
getUsers();

function updateButtonSubmit() {
    if (errorUsernameCadastro == true || errorPasswordCadastro == true) {
        btnSubmitCadastro.addClass("disabled");
    }
    else {
        btnSubmitCadastro.removeClass("disabled");
    }
}

usernameCadastro.keyup(validateUsername);
passwordCadastro.keyup(validatePassword);
btnSubmitCadastro.click(registerUser);

function validateUsername() {
    if (usernameCadastro.val() == "") {
        usernameCadastro.parent().addClass("has-error");
        errorUsernameCadastro = true;
    }
    else {
        if(listUsers != null){
            for (let i = 0; i < listUsers.length; i++) {
                if (listUsers[i].username == usernameCadastro.val()) {
                    existUser = true;
                    break;
                }
            }
            if (existUser == true) {
                usernameCadastro.parent().addClass("has-error");
            }
            else {
                usernameCadastro.parent().removeClass("has-error");
                errorUsernameCadastro = false;
            }
        }
    }
    updateButtonSubmit();
}

function validatePassword(){
    if(passwordCadastro.val() == ""){
        passwordCadastro.parent().addClass("has-error");
        errorPasswordCadastro = true;
    }
    else{
        passwordCadastro.parent().removeClass("has-error");
        errorPasswordCadastro = false;
    }
    updateButtonSubmit();
}

function registerUser() {
    event.preventDefault();
    if (listUsers[listUsers.length - 1] != null) {
        novoId = parseInt(listUsers[listUsers.length - 1].idUser) + 1;
    }
    else {
        novoId = 1;
    }

    $.ajax({
        type: "POST",
        url: "http://rest.learncode.academy/api/mirrorfashion1/users",
        data: { username: usernameCadastro.val(), password: passwordCadastro.val(), idUser: novoId },
        success: function () {
            // Função implementada no arquivo alert.js
            createAlert("success", "Usuário cadastrado com sucesso");       

            usernameCadastro.val("");
            passwordCadastro.val("");

            // Função implementada no arquivo usuariocontroller.js
            getUsers();
        }
    });
}