// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.displayName = 'NBA Players List';
    self.updateLocalStorage = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data))
    }
    self.SetFavourites = ko.observableArray(JSON.parse(localStorage.getItem("playerFavorites")));
    self.favButton = (_data,_event) =>{
        console.log(_event);
        if (_data.target.classList.contains('fa-heart-o')){
            self.SetFavourites.push(_event)
            self.updateLocalStorage("playerFavorites", self.SetFavourites())
            _data.target.classList.remove('fa-heart-o');
            _data.target.classList.add('fa-heart');
        }
        else{
            for (let i = 0; i < self.SetFavourites().length; i++) {
                console.log(i)
                if (self.SetFavourites()[i].Id== _event.Id){
                    console.log(i)
                    self.SetFavourites.splice(i,1)
                    self.updateLocalStorage("playerFavorites", self.SetFavourites())
                    _data.target.classList.remove('fa-heart');
                    _data.target.classList.add('fa-heart-o');
                }
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
    }
    else {
        tfotos.classList.remove("d-none");
        tinicial.classList.add("d-none");
        button.classList.remove("fa-picture-o");
        button.classList.add("fa-table");
    }
}