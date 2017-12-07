let listNomeProdutos = $(".panel-heading p");
let listImagemProdutos = $(".panel-body img");
let listQuantidadeProdutoInput = $(".panel-body .quantidade-produto input");
let listButtonsAdicionarProduto = $(".panel-body .adicionar-produto input");
let listPrecosProdutoSpan = $(".panel-body .preco-produto p span");
let listPrecosProduto = [89.90, 44.90, 119.90, 89.90, 59.90, 119.90];
let listProdutos = [];

for (let i = 0; i < listQuantidadeProdutoInput.length; i++) {
    listQuantidadeProdutoInput.eq(i).change(function () {
        atualizarPrecoProduto(i);
    });
}

function atualizarPrecoProduto(item) {
    if (listQuantidadeProdutoInput.eq(item).val() > 0) {
        let novoPreco = listQuantidadeProdutoInput.eq(item).val() * listPrecosProduto[item];
        novoPreco = novoPreco.toFixed(2).replace(".", ",");
        listPrecosProdutoSpan.eq(item).text(novoPreco);
    }
}

listButtonsAdicionarProduto.click(function () {
    adicionarProduto($(this).attr("data-id"));
});

function adicionarProduto(indiceProduto) {
    let nomeProduto = listNomeProdutos.eq(indiceProduto).text();
    let caminhoImagemProduto = listImagemProdutos.eq(indiceProduto).attr("src");
    let quantidadeProduto = listQuantidadeProdutoInput.eq(indiceProduto).val();
    let precoUnitario = listPrecosProduto[indiceProduto];
    precoUnitario = precoUnitario.toFixed(2).replace(".", ",");
    let precoProduto = precoUnitario;

    let produto = {
        nome: nomeProduto, caminhoImagem: caminhoImagemProduto,
        quantidade: quantidadeProduto, preco: precoProduto
    };
    if (sessionStorage.getItem("listProdutos") != null) {
        listProdutos = JSON.parse(sessionStorage.getItem("listProdutos"));
    }
    listProdutos.push(produto);
    sessionStorage.setItem("listProdutos", JSON.stringify(listProdutos));

    atualizarCestaCompras();

    listQuantidadeProdutoInput.eq(indiceProduto).val("");
    listPrecosProdutoSpan.eq(indiceProduto).text(precoUnitario);
}

$("#linkCestaCompras").click(atualizarCestaCompras);

function atualizarCestaCompras() {
    $("#linkCestaCompras .media-list").empty();
    if (sessionStorage.getItem("listProdutos") != null) {
        listProdutos = JSON.parse(sessionStorage.getItem("listProdutos"));
        for (let i = 0; i < listProdutos.length; i++) {
            carregarProdutoCesta(listProdutos[i]);
        }
        inserirButtonFinalizar();
    }
    else {
        inserirMessageDefault();
    }
}

function carregarProdutoCesta(itemProduto) {
    let itemList = $("<li></li>");
    let mediaLeft = $("<div></div>");
    let mediaBody = $("<div></div>");
    let itemLink = $("<a></a>");
    let imageMedia = $("<img></img>");
    let nomeProduto = $("<p></p>");
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
    itemLink.append(mediaLeft);
    itemLink.append(mediaBody);
    itemList.append(itemLink);

    $("#linkCestaCompras .media-list").append(itemList);
}

function inserirButtonFinalizar() {
    let itemList = $("<li></li>");
    let link = $("<a></a>");

    itemList.attr("id", "btn-finalizar");
    link.attr("href", "usuario_compras.html");
    link.addClass("btn");
    link.addClass("btn-primary");
    link.attr("role", "button");

    link.text("Finalizar");

    itemList.append(link);

    $("#linkCestaCompras .media-list").append(itemList);
}

function inserirMessageDefault() {
    let itemList = $("<li></li>");
    let textLink = $("<a></a>");

    itemList.attr("id", "message-default");
    textLink.text("Você ainda não adicionou nenhum produto");

    itemList.append(textLink);

    $("#linkCestaCompras .media-list").append(itemList);
}