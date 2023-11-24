var retVal = true;
function validatename() {
    var _name = document.getElementById("nome")
    if (_name.value.trim().length < 3) {
        retVal = false;
        alert("Escreve um nome a sério");
    }
    return retVal
}

function validatecurso() {
    var _curso = document.getElementById("curso").selectedIndex;
    if (_curso.value == 0) {
        retVal = false;
        alert("Escolhe um curso");
    }
    console.log(retVal)
    return retVal
}

function validatecor() {
    var cor = document.querySelectorAll('input[name="cor"]:checked').length;
    if (cor.value == 0) {
        retVal = false
        alert("Escolhe uma cor")

    }
    ret
}