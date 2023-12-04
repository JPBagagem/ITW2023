document.getElementById('btnSwitch').addEventListener('click',()=>{
    let navbar = document.getElementById("navtop");
    if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
        document.documentElement.setAttribute('data-bs-theme','light')
        document.documentElement.setAttribute('data-bs-theme','light')
        navbar.classList.add("bluenav");
        navbar.classList.remove("rednav");
    }
    else {
        document.documentElement.setAttribute('data-bs-theme','dark')
        navbar.classList.add("rednav");
        navbar.classList.remove("bluenav");
    }
})