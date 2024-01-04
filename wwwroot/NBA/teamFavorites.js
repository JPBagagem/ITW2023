// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.displayName = 'NBA Teams List';
    self.updateLocalStorage = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data))
    }
    self.SetFavourites = ko.observableArray(JSON.parse(localStorage.getItem("teamFavorites")));
    self.favButton = (_event,_data) =>{
        console.log(_data);
        for (let i = 0; i < self.SetFavourites().length; i++) {
            if (self.SetFavourites()[i].Id== _data.Id){
                self.SetFavourites.splice(i,1)
                self.updateLocalStorage("teamFavorites", self.SetFavourites())
            }
        }
        console.log(self.SetFavourites());
    }

    function sleep(milliseconds) {
        const start = Date.now();
        while (Date.now() - start < milliseconds);
    }

    function showLoading() {
        $("#myModal").modal('show', {
            backdrop: 'static',
            keyboard: false
        });
    }
    function hideLoading() {
        $('#myModal').on('shown.bs.modal', function (e) {
            $("#myModal").modal('hide');
        })
    }

    //--- start ....
    showLoading();
    if (JSON.parse(localStorage.getItem("tabela?")) == "yes") tabelas()
    console.log("VM initialized!");
    hideLoading();
};

$(document).ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());
});

function tabelas(){
    let tinicial=document.getElementById("inicial");
    let tfotos=document.getElementById("foto");
    let button=document.getElementById("btn-table");
    if (tinicial.classList.contains("d-none")) {
        tfotos.classList.add("d-none");
        tinicial.classList.remove("d-none");
        button.classList.add("fa-picture-o");
        button.classList.remove("fa-table");
        localStorage.setItem("tabela?", JSON.stringify('yes'))
    }
    else {
        tfotos.classList.remove("d-none");
        tinicial.classList.add("d-none");
        button.classList.remove("fa-picture-o");
        button.classList.add("fa-table");
        localStorage.setItem("tabela?", JSON.stringify('no'))
    }
}