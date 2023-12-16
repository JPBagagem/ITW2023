// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/NBA/API/Seasons/');
    self.displayName = 'NBA Season Details';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    //--- Data Record
    self.Id = ko.observable('');
    self.Season = ko.observable('');
    self.Teams = ko.observable([]);
    self.Players = ko.observable([]);
    self.PlayersVisible = ko.observable([]);
    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getArena...');
        var composedUri = self.baseUri() + id;
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            hideLoading();
            self.Id(data.Id);
            self.Season(data.Season);
            self.Teams(data.Teams);
            self.Players(data.Players);
            self.PlayersVisible(self.Players().slice(0,24));
        });
    };

    //--- Internal functions
    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null,
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("AJAX Call[" + uri + "] Fail...");
                hideLoading();
                self.error(errorThrown);
            }
        });
    }
    
    function showLoading() {
        $('#myModal').modal('show', {
            backdrop: 'static',
            keyboard: false
        });
    }
    function hideLoading() {
        $('#myModal').on('shown.bs.modal', function (e) {
            $("#myModal").modal('hide');
        })
    }

    $('#mostrar').click(function(){
        var tamanho = self.PlayersVisible().length
        self.PlayersVisible(self.Players().slice(0,tamanho + 24));
    });

    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };

    //--- start ....
    showLoading();
    var pg = getUrlParameter('id');
    console.log(pg);
    if (pg == undefined)
        self.activate(1);
    else {
        self.activate(pg);
    }
    console.log("VM initialized!");
};

$(document).ready(function () {
    console.log("document.ready!");
    ko.applyBindings(new vm());
});

$(document).ajaxComplete(function (event, xhr, options) {
    $("#myModal").modal('hide');
})

document.getElementById('btnSwitch').addEventListener('click',()=>{
    let cabecalho = document.getElementById("navtop");
    let rodape = document.getElementById("navbutton");
    if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
        document.documentElement.setAttribute('data-bs-theme','light')
        cabecalho.classList.add("bluenav");
        cabecalho.classList.remove("rednav");
        rodape.classList.add("rednav");
        rodape.classList.remove("bluenav");
    }
    else {
        document.documentElement.setAttribute('data-bs-theme','dark')
        cabecalho.classList.add("rednav");
        cabecalho.classList.remove("bluenav");
        rodape.classList.add("bluenav");
        rodape.classList.remove("rednav");
    }
})