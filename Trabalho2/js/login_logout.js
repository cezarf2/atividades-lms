let buttonModal = document.querySelector(".btn-modal");
let modal = document.querySelector(".modal");
let buttonCloseModal = document.querySelector(".modal-header .modal-close");
let modalOverlay = document.querySelector(".modal-overlay");

buttonModal.addEventListener("click", checkTextButton);
buttonCloseModal.addEventListener("click", closeModal);

window.addEventListener("click", function () {
    if (event.target == modalOverlay) {
        closeModal();
    }
});

function openModal() {
    modal.style.display = "block";
    modalOverlay.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
    modalOverlay.style.display = "none";
    userIdInput.value = " ";
}

checkAuthentication();

let buttonSubmit = document.querySelector("#btn-submit");
let userIdInput = document.querySelector("#user-id");

function checkAuthentication(){
    if(typeof(Storage) !== "undefined"){
        if(localStorage.getItem("userid") != null){
            buttonModal.textContent = "logout";
        }
        else{
            buttonModal.textContent = "login";
        }
    }
}

function checkTextButton(){
    if(buttonModal.textContent == "login"){
        openModal();
    }
    else{
        logout();
    }
}

function login(userId) {
    if(userId.length >= 3){
        if(typeof(Storage) !== "undefined"){
            localStorage.setItem("userid", userId);
            buttonModal.textContent = "logout";
        }
        else{
            console.log("Sorry! No Web Storage support");
        }
    }
}

function logout(){
    if(typeof(Storage) !== "undefined"){
        localStorage.removeItem("userid");
        buttonModal.textContent = "login";
    }
}

buttonSubmit.addEventListener("click", function () {
    event.preventDefault();
    login(userIdInput.value);
    closeModal();
});

