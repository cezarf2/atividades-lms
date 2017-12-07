let btnSubmitLogin = $("#submit-login");
let usernameLogin = $("#form-login #username-login");
let passwordLogin = $("#form-login #senha-login");
let statusLogin = false;
let linkLogin = $("#linkLogin");
let linkLogout = $("#linkLogout");
let linkCadastro = $("#linkCadastro");
let linkCestaCompras = $("#linkCestaCompras");
let linkSuasCompras = $("#linkSuasCompras");
let listButtonAdicionarProduto = $(".panel-body .adicionar-produto");

// Função implementada no arquivo usuariocontroller.js
getUsers();

updateInfoLogin();

let errorUsernameLogin = true;
let errorPasswordLogin = true;
updateButtonLoginSubmit();

function updateButtonLoginSubmit(){
    if(errorUsernameLogin == true || errorPasswordLogin == true){
        btnSubmitLogin.addClass("disabled");
    }
    else{
        btnSubmitLogin.removeClass("disabled");
    }
}

usernameLogin.keyup(validateUsernameLogin);
passwordLogin.keyup(validatePasswordLogin);

function validateUsernameLogin(){
    if(usernameLogin.val() == ""){
        usernameLogin.parent().addClass("has-error");
        errorUsernameLogin = true;
    }
    else{
        usernameLogin.parent().removeClass("has-error");
        errorUsernameLogin = false;
    }
    updateButtonLoginSubmit();
}

function validatePasswordLogin(){
    if(passwordLogin.val() == ""){
        passwordLogin.parent().addClass("has-error");
        errorPasswordLogin = true;
    }
    else{
        passwordLogin.parent().removeClass("has-error");
        errorPasswordLogin = false;
    }
    updateButtonLoginSubmit();
}

btnSubmitLogin.click(validateLogin);
linkLogout.click(logout);

function validateLogin(){
    event.preventDefault();
    if(listUsers != null){
        for(let i = 0; i < listUsers.length; i++){
            if(listUsers[i].username == usernameLogin.val() && listUsers[i].password == passwordLogin.val()){
                statusLogin = true;
            }    
        }

        if(statusLogin == false){
            // Função implementada no arquivo alert.js
            createAlert("danger", "Username ou senha inválida");       
        }
        else{
            sessionStorage.setItem("userLogado", usernameLogin.val());
            updateInfoLogin();
        }

        usernameLogin.val("");
        passwordLogin.val("");
    }
}

function updateInfoLogin(){
    if(sessionStorage.getItem("userLogado") != null){
        linkLogin.hide();
        linkCadastro.hide();
        linkLogout.show();
        linkCestaCompras.show();
        linkSuasCompras.show();
        listButtonAdicionarProduto.show();
    }
    else{
        linkLogout.hide();
        linkCestaCompras.hide();
        linkSuasCompras.hide();
        listButtonAdicionarProduto.hide();
        linkLogin.show();
        linkCadastro.show();
    }
}

function logout(){
    sessionStorage.removeItem("userLogado");
    sessionStorage.removeItem("listProdutos");
    updateInfoLogin();
}