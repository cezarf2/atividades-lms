let articleHeader = document.querySelectorAll(".content article h2");

for(let i = 0; i < articleHeader.length; i++){
    articleHeader[i].addEventListener("click", function(){
        let classList = articleHeader[i].classList.toString();
        if(classList == "active"){
            articleHeader[i].classList.remove("active");    
        }
        else{
            articleHeader[i].classList.add("active");
            collapseOthers(articleHeader[i]);
        }
    });
}

function collapseOthers(itemHeader){
    for(let i = 0; i < articleHeader.length; i++){
        if(articleHeader[i] != itemHeader){
            articleHeader[i].classList.remove("active");
        }
    }
}