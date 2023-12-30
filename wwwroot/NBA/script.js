var darktolight = JSON.parse(localStorage.getItem("darktolight"))
var darkbutton = document.getElementById("btnSwitch")
function darkSetup() {
    let cabecalho = document.getElementById("navtop");
    let rodape = document.getElementById("navbutton");
    console.log(darktolight)
    document.documentElement.setAttribute('data-bs-theme','dark')
    cabecalho.classList.remove("bluenav");
    cabecalho.classList.add("rednav");
    rodape.classList.remove("rednav");
    rodape.classList.add("bluenav");
}

if (darktolight == 'dark') darkSetup()

darkbutton.addEventListener("click", function(){
    let cabecalho = document.getElementById("navtop");
    let rodape = document.getElementById("navbutton");
    if (darktolight == 'dark') {
        darktolight='light'
        localStorage.setItem("darktolight", JSON.stringify('light'))
        document.documentElement.setAttribute('data-bs-theme','light')
        cabecalho.classList.add("bluenav");
        cabecalho.classList.remove("rednav");
        rodape.classList.add("rednav");
        rodape.classList.remove("bluenav");
    }
    else {
        darktolight='dark'
        localStorage.setItem("darktolight", JSON.stringify('dark'))
        document.documentElement.setAttribute('data-bs-theme','dark')
        cabecalho.classList.add("rednav");
        cabecalho.classList.remove("bluenav");
        rodape.classList.add("bluenav");
        rodape.classList.remove("rednav");
    }
})