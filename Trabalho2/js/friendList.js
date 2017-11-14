let friendList = document.querySelector(".contacts");
let headerTalkMenu = document.querySelector(".talk-menu header label");
let objectListGroups;

updateListGroup();
let divMessages = document.querySelector(".messages");
let usernameLogado = "Cezar";

function updateListGroup() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && this.status == 200) {
            objectListGroups = JSON.parse(this.responseText);
            if (objectListGroups != null) {
                loadGroupList(objectListGroups);
            }
        }
    };
    xhttp.open("GET", "http://rest.learncode.academy/api/techtalk/groups", true);
    xhttp.send();
}

function loadGroupList(objectListGroups) {
    for (let i = 0; i < objectListGroups.length; i++) {
        let item = document.createElement("li");
        let photo = document.createElement("img");
        let paragraph = document.createElement("p");
        let contentParagraph = document.createTextNode(objectListGroups[i].groupName);

        photo.src = "img/contact.png"
        paragraph.appendChild(contentParagraph);
        item.appendChild(photo);
        item.appendChild(paragraph);
        friendList.appendChild(item);
    }
    let groupListItens = document.querySelectorAll(".contacts li");
    addClickListGroups(groupListItens);
}

function addClickListGroups(groupListItens) {
    for (let i = 0; i < groupListItens.length; i++) {
        groupListItens[i].addEventListener("click", function () {
            if (document.querySelector(".contacts li.active")) {
                document.querySelector(".contacts li.active").classList.remove("active");
            }
            groupListItens[i].classList.add("active");
            headerTalkMenu.innerText = objectListGroups[i].groupName;
            getMessagesGroup(objectListGroups[i].groupId);
        });
    }
}

function getMessagesGroup(groupId){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && this.status == 200) {
            let messages = JSON.parse(this.responseText);
            if (messages != null) {
                loadMessages(messages);
            }
        }
    };
    xhttp.open("GET", "http://rest.learncode.academy/api/techtalk/" + groupId, true);
    xhttp.send();
}

function loadMessages(messagesGroup) {
    divMessages.innerHTML = " ";
    for (let i = 0; i < messagesGroup.length; i++) {
        let panel = document.createElement("div");
        let panelHeading = document.createElement("div");
        let textUsername = document.createElement("h3");
        let panelBody = document.createElement("div");
        let textMessage = document.createElement("p");

        panel.classList.add("panel");
        panelHeading.classList.add("panel-heading");
        panelBody.classList.add("panel-body");
        
        textUsername.innerText = messagesGroup[i].userName;
        panelHeading.appendChild(textUsername);
        textMessage.innerText = messagesGroup[i].message;
        panelBody.appendChild(textMessage);
        panel.appendChild(panelHeading);
        panel.appendChild(panelBody);
        setStylePanel(panel, messagesGroup[i].userName);
        divMessages.appendChild(panel);
    }
}

let messageInput = document.querySelector(".form-message #message");
let buttonSubmitMessage = document.querySelector("#btn-submit-message");

function sendMessage(){
    let groupActiveId;
    for(let i = 0; i < objectListGroups.length; i++){
        if(objectListGroups[i].groupName == document.querySelector(".contacts li.active p").textContent){
            groupActiveId = objectListGroups[i].groupId;
        }
    }

    let userId;
    if(typeof(Storage) !== "undefined"){
        userId = localStorage.getItem("userid");
    }

    let message = messageInput.value;

    let objectContent = {
        "userName": userId,
        "message": message
    };

    console.log(groupActiveId);
    console.log(userId);
    console.log(objectContent);

    postMessage(groupActiveId, objectContent);
}

function postMessage(groupId, content){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && this.status == 200) {
            getMessagesGroup(groupId);
        }
    };
    xhttp.open("POST", "http://rest.learncode.academy/api/techtalk/" + groupId, true);
    xhttp.setRequestHeader("content-type", "application/json");
    xhttp.send(JSON.stringify(content));
}

buttonSubmitMessage.addEventListener("click", function(){
    event.preventDefault();
    sendMessage();
});

function setStylePanel(panel, usernamePanel) {
    if (usernamePanel == usernameLogado) {
        setStyleUserLogado(panel);
    }
    else {
        setStyleOtherUser(panel);
    }
}

function setStyleOtherUser(element) {
    element.style.float = "left";
    element.style.clear = "both";
}

function setStyleUserLogado(element) {
    element.style.float = "right";
    element.style.clear = "both";
    element.classList.add("active");
}

