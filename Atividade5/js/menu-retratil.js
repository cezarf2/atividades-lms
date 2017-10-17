let buttonMenu = document.querySelector(".button-menu");
let menuLateral = document.querySelector(".menu-lateral");
let content = document.querySelector(".content");
let stateClickButton = false;

if(matchMedia){
    const mediaQueries = window.matchMedia("(max-width:479.99px)");
    mediaQueries.addListener(widthChange);
    widthChange(mediaQueries);
}

function widthChange(mediaQueries){
    if(mediaQueries.matches){
        menuLateral.style.transform = "translate(-100%)";
        menuLateral.style.width = "0";
        content.style.width = "100%";
    }
    else{
        menuLateral.style.transform = "translate(0)";
        menuLateral.style.width = "15%";
        content.style.width = "85%";
    }
}

buttonMenu.addEventListener("click", function(){
    if(stateClickButton == false){
        showMenu();
        stateClickButton = true;
    }
    else{
        hiddenMenu();
        stateClickButton = false;
    }
});

function hiddenMenu(){
    menuLateral.style.transform = "translate(-100%)";
    menuLateral.style.width = "0";
    content.style.width = "100%";
}

function showMenu(){
    menuLateral.style.transform = "translate(0)";
    menuLateral.style.width = "50%";
    content.style.width = "50%";
}

