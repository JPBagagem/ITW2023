var retVal = true;
var _nomeError = document.getElementById("NomeError");
var _cursoError = document.getElementById("CursoError");
var _moradaError = document.getElementById("MoradaError");
var _transporteError = document.getElementById("TransporteError");
var _corError = document.getElementById("CorError")


function validate() {
    let truename = validatename();
    let truecurso = validatecurso();
    let corenjoyer = validatecor();
    let transporteuser = validatetransporte();
    let nothomeless = validatemorada();
    if (truename == false || truecurso == false || corenjoyer == false || transporteuser == false || nothomeless == false) {
        retVal = false;
    }  
    return retVal
}
function validatename() {
    var _name = document.getElementById("nome")
    if (_name.value.trim().length < 3) {
        retVal = false;
        _nomeError.classList.add("d-block");
        _nomeError.classList.remove("d-none");
    }
    else {
        retVal = true;
        _nomeError.classList.add("d-none");
        _nomeError.classList.remove("d-block");
    }
    console.log(retVal)
    return retVal
}

function validatecurso() {
    var _curso = document.getElementById("curso");
    if (_curso.value == 0) {
        retVal = false;
        _cursoError.classList.add("d-block");
        _cursoError.classList.remove("d-none");
    }
    else {
        retVal = true;
        _cursoError.classList.add("d-none");
        _cursoError.classList.remove("d-block");
    }
    console.log(retVal)
    return retVal
}

function validatecor() {
    var cor = document.querySelectorAll('input[name="cor"]:checked').length;
    if (cor == 0) {
        retVal = false
        _corError.classList.remove("d-none");
        _corError.classList.add("d-block");
    }
    else {
        retVal = true;
        _corError.classList.add("d-none");
        _corError.classList.remove("d-block");
    }
    console.log(retVal)
    return retVal
}

function validatetransporte() {
    let popo = document.querySelectorAll('input[name="transporte"]:checked').length;
    if (popo == 0) {
        retVal = false
        _transporteError.classList.add("d-block");
        _transporteError.classList.remove("d-none");
    }
    else {
        retVal = true;
        _transporteError.classList.add("d-none");
        _transporteError.classList.remove("d-block");
    }
    console.log(retVal)
    return retVal
}

function validatemorada() {
    let _morada = document.getElementById("morada").value.trim().split(" ");
    if (_morada.length < 3) {
        retVal = false;
        _moradaError.classList.add("d-block");
        _moradaError.classList.remove("d-none");
    }
    else {
        retVal = true;
        _moradaError.classList.add("d-none");
        _moradaError.classList.remove("d-block");
    }
    console.log(retVal)
    return retVal
}