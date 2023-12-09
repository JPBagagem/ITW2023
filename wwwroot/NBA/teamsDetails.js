// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/NBA/API/Teams/');
    self.displayName = 'NBA Team Details';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    //--- Data Record
    self.Id = ko.observable('');
    self.Acronym = ko.observable('');
    self.Logo = ko.observable('');

    //--- Page Events
    self.activate = function (Id, acronimo) {
        console.log(acronimo);
        console.log('CALL: getTeams...');
        var composedUri = self.baseUri() + Id + '?acronym=' + acronimo;
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            hideLoading();
            self.Id(data.Id);
            self.Acronym(data.Acronym);
            self.Logo(data.Logo);
            console.log("sus");
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
    var tg = getUrlParameter('acronimo');
    console.log(tg);
    if (pg == undefined)
        self.activate(1);
    else {
        self.activate(pg, tg);
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