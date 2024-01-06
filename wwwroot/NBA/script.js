var darktolight = JSON.parse(localStorage.getItem("darktolight"))
var darkbutton = document.getElementById("btnSwitch")
function darkSetup() {
    let vermelhos = document.querySelectorAll(".rednav");
    let azuis = document.querySelectorAll(".bluenav");
    document.documentElement.setAttribute('data-bs-theme','dark')
    for(i=0; i < vermelhos.length;i++){
        vermelhos[i].classList.remove("rednav");
        vermelhos[i].classList.add("bluenav");
    }
    for(i=0; i < azuis.length;i++){
        azuis[i].classList.remove("bluenav");
        azuis[i].classList.add("rednav");
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
    }
    else {
        darktolight='dark'
        localStorage.setItem("darktolight", JSON.stringify('dark'))
        document.documentElement.setAttribute('data-bs-theme','dark')
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