var op1 = ""
var op2 = ""
var operacao = ""
var res = document.getElementById("res")

function addOperation() {
    var tecla = event.target.value;
    console.log(tecla);
    operacao = tecla;
    res.innerText = op1 + operacao + op2;
}

function addNumber() {
    var tecla = event.target.value;
    console.log(tecla);
    if (operacao == "") {
        op1 += tecla;
    }
    else {
        op2 += tecla;
    }
    res.innerText = op1 + operacao + op2;
} 

function calcular() {
    switch (operacao) {
        case "+":
            res.innerText = parseFloat(op1) + parseFloat(op2);
            break;
        case "-":
            res.innerText = parseFloat(op1) - parseFloat(op2);
            break;
        case "*":
            res.innerText = parseFloat(op1) * parseFloat(op2);
            break;
        case "/":
            if (op2 != 0) {
                res.innerText = parseFloat(op1) / parseFloat(op2);
            }
            else {
                alert("Erro: operação inválida")
            }
            break;
    }
    op1 = res.innerText
    operacao = ""
    op2 = ""
}

function limpa() {
    op1 = ""
    operacao = ""
    op2 = ""
    res.innerText = "0"
}