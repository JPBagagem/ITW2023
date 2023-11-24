var x = document.getElementById("op1");
var y = document.getElementById("op2");
var operacao = "+";

function obterOperacao() {
    var e = document.getElementById("operacao");
    operacao = e.options[e.selectedIndex].value;
}

function calculadora() {
    switch (operacao) { 
        case "+":
            res.value = parseFloat(x.value) + parseFloat(y.value);
            break;
        case "-":
            res.value = parseFloat(x.value) - parseFloat(y.value);
            break;
        case "*":
            res.value = parseFloat(x.value) * parseFloat(y.value);
            break;
        case ":":
            if (op2.value != 0) {
                res.value = parseFloat(x.value) / parseFloat(y.value);
            }
            else {
                alert("Erro: operação inválida")
            }
            break;
        case "%":
            if (op2.value != 0) {
                res.value = parseFloat(x.value) % parseFloat(y.value);
            }
            else {
                alert("Erro: operação inválida")
            }
            break;
}
}  
