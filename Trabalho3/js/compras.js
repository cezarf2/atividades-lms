let mediaList = $(".container .panel-body .media-list");
let precoTotalSpan = $(".container .panel-body #preco-total span");
let precoTotalElement =  $(".container .panel-body #preco-total");
let buttonFinalizar = $(".container .panel-body #btn-finalizar");
let messageDefault = $(".container .panel-body #message-default");
let tabelaComprasFeitas = $(".container .panel-body table");
let precoTotal = 0;
let dataAtual;

atualizarInfoSuasCompras();
getComprasFeitas();

function atualizarInfoSuasCompras() {
    if(sessionStorage.getItem("listProdutos") != null){
        messageDefault.hide();
        let listProdutosStorage = JSON.parse(sessionStorage.getItem("listProdutos"));
        for (let i = 0; i < listProdutosStorage.length; i++) {
            inserirProduto(listProdutosStorage[i]);
        }
        precoTotalElement.show();
        buttonFinalizar.show();
        atualizarPrecoTotal(listProdutosStorage);
    }
    else{
        messageDefault.show();
        precoTotalElement.hide();
        buttonFinalizar.hide();
    }
}

function inserirProduto(itemProduto) {
    let itemList = $("<li></li>");
    let mediaLeft = $("<div></div>");
    let mediaBody = $("<div></div>");
    let imageMedia = $("<img></img>");
    let nomeProduto = $("<h4></h4>");
    let quantidadeProduto = $("<p></p>");
    let precoProduto = $("<p></p>");

    itemList.addClass("media");
    mediaLeft.addClass("media-left");
    mediaBody.addClass("media-body");
    imageMedia.addClass("media-object");

    imageMedia.attr("src", itemProduto.caminhoImagem);
    nomeProduto.text(itemProduto.nome);
    quantidadeProduto.text("Quantidade: " + itemProduto.quantidade);
    precoProduto.text("Preço Unitário: " + itemProduto.preco);

    mediaLeft.append(imageMedia);
    mediaBody.append(nomeProduto);
    mediaBody.append(quantidadeProduto);
    mediaBody.append(precoProduto);
    itemList.append(mediaLeft);
    itemList.append(mediaBody);

    mediaList.append(itemList);
}

function atualizarPrecoTotal(listProdutos){
    for(let i = 0; i < listProdutos.length; i++){
        let precoProduto = listProdutos[i].preco;
        precoProduto = precoProduto.replace(",", ".");
        precoTotal += precoProduto * listProdutos[i].quantidade;
    }
    if(precoTotal > 0){
        precoTotal = precoTotal.toFixed(2).replace(".", ",");
        precoTotalSpan.text("R$ " + precoTotal);
    }
}

function finalizarCompra(){
    let username = sessionStorage.getItem("userLogado");
    let precoCompra = precoTotal.replace(",", ".");
    atualizarDataAtual();

    if(username != null && precoCompra > 0){
        let compra = {valorTotal: precoCompra, dataAtual: dataAtual, username: username};
        postCompra(compra);
    }
}

buttonFinalizar.click(finalizarCompra);

function atualizarDataAtual(){
    let date = new Date;
    let dia = date.getDate();
    let mes = (date.getMonth() + 1);
    let ano = date.getFullYear();
    let hora = date.getHours();
    let minutos = date.getMinutes();
    
    if(dia.toString().length == 1){
        dia = "0" + dia;
    }
    if(mes.toString().length == 1){
        mes = "0" + mes;
    }
    if(hora.toString().length == 1){
        hora = "0" + hora;
    }
    if(minutos.toString().length == 1){
        minutos = "0" + minutos;
    }
    dataAtual = dia + "/" + mes + "/" + ano + " - " + hora + ":" + minutos; 
}

function postCompra(compra){
    $.ajax({
        type: "POST",
        url: "http://rest.learncode.academy/api/mirrorfashion1/purchases",
        data: compra,
        success: function () {
            sessionStorage.removeItem("listProdutos");
            
            // Função implementada no arquivo alert.js
            createAlert("success", "Compra finalizada com sucesso");
            
            buttonFinalizar.addClass("disabled");
            getComprasFeitas();
        }
    });
}

function atualizarComprasFeitas(listCompras){
    let tableRow = $("<tr></tr>");
    let tableHeaderValue = $("<th></th>");
    let tableHeaderDate = $("<th></th>");

    tableHeaderValue.text("Valor Total");
    tableHeaderDate.text("Data - Hora");

    tableRow.append(tableHeaderValue);
    tableRow.append(tableHeaderDate);
    tabelaComprasFeitas.append(tableRow);

    for(let i = 0; i < listCompras.length; i++){
        insertCompra(listCompras[i]);
    }
}

function insertCompra(itemCompra){
    let tableRow = $("<tr></tr>");
    let tableDataValue = $("<td></td>");
    let tableDataDate = $("<td></td>");

    tableDataValue.text(itemCompra.valorTotal.toString().replace(".",","));
    tableDataDate.text(itemCompra.dataAtual);

    tableRow.append(tableDataValue);
    tableRow.append(tableDataDate);
    tabelaComprasFeitas.append(tableRow);
}

function getComprasFeitas(){
    $.ajax({
        type: "GET",
        url: "http://rest.learncode.academy/api/mirrorfashion1/purchases",
        success: function (data) {
            if(data.length != null && sessionStorage.getItem("userLogado") != null){
                let userLogado = sessionStorage.getItem("userLogado");
                let listComprasStorage = data;
                let listCompras = [];
                for(let i = 0; i < listComprasStorage.length; i++){
                    if(listComprasStorage[i].username == userLogado){
                        listCompras.push(listComprasStorage[i]);
                    }
                }

                if(listCompras.length > 0){
                    tabelaComprasFeitas.empty();
                    atualizarComprasFeitas(listCompras);
                }
            }
        }
    });
}