var darktolight = JSON.parse(localStorage.getItem("darktolight"))
var darkbutton = document.getElementById("btnSwitch")
function darkSetup() {
    let vermelhos = document.querySelectorAll(".rednav");
    let azuis = document.querySelectorAll(".bluenav");
    let letra_preta = document.querySelectorAll(".black-text")
    document.documentElement.setAttribute('data-bs-theme','dark')
    for(i=0; i < vermelhos.length;i++){
        vermelhos[i].classList.remove("rednav");
        vermelhos[i].classList.add("bluenav");
    }
    for(i=0; i < azuis.length;i++){
        azuis[i].classList.remove("bluenav");
        azuis[i].classList.add("rednav");
    }
    for(i=0; i < letra_preta.length;i++){
        letra_preta[i].classList.remove("black-text");
        letra_preta[i].classList.add("white-text");
    }
}

if (darktolight == 'dark') darkSetup()

darkbutton.addEventListener("click", function(){
    let vermelhos = document.querySelectorAll(".rednav");
    let azuis = document.querySelectorAll(".bluenav");
    if (darktolight == 'dark') {
        darktolight='light'
        localStorage.setItem("darktolight", JSON.stringify('light'))
        document.documentElement.setAttribute('data-bs-theme','light')
        let letra_branca = document.querySelectorAll(".white-text")
        for(i=0; i < letra_branca.length;i++){
            letra_branca[i].classList.remove("white-text");
            letra_branca[i].classList.add("black-text");
        }
    }
    else {
        darktolight='dark'
        localStorage.setItem("darktolight", JSON.stringify('dark'))
        document.documentElement.setAttribute('data-bs-theme','dark')
        let letra_preta = document.querySelectorAll(".black-text")
        for(i=0; i < letra_preta.length;i++){
            letra_preta[i].classList.remove("black-text");
            letra_preta[i].classList.add("white-text");
        }

    }
    for(i=0; i < vermelhos.length;i++){
        vermelhos[i].classList.remove("rednav");
        vermelhos[i].classList.add("bluenav");
    }
    for(i=0; i < azuis.length;i++){
        azuis[i].classList.remove("bluenav");
        azuis[i].classList.add("rednav");
    }
})