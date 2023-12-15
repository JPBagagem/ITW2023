// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/NBA/API/Players/');
    self.displayName = 'NBA Player Details';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    //--- Data Record
    self.Id = ko.observable('');
    self.Name = ko.observable('');
    self.CountryId = ko.observable('');
    self.CountryName = ko.observable('');
    self.School = ko.observable('');
    self.Weight = ko.observable('');
    self.Height = ko.observable('');
    self.Birthdate = ko.observable('');
    self.PositionId = ko.observable('');
    self.PositionName = ko.observable('');
    self.Photo = ko.observable('');
    self.Teams = ko.observable([]);
    self.Seasons = ko.observable([]);
    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getArena...');
        var composedUri = self.baseUri() + id;
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            hideLoading();
            self.Id(data.Id);
            self.Name(data.Name);
            self.CountryId(data.CountryId);
            self.CountryName(data.CountryName);
            self.School(data.School);
            self.Weight(data.Weight);
            self.Height(data.Height);
            self.Birthdate(data.Birthdate);
            self.PositionId(data.PositionId);
            self.PositionName(data.PositionName);
            self.Teams(data.Teams);
            self.Seasons(data.Seasons);
            self.Photo(data.Photo);
            if (data.Photo==null){
                self.Photo("http://192.168.160.58/NBA/Images/fallback.png");
            }
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
});

$('#btnSwitch').click(function(){
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
});

$('#heightconverter').click(function(){
    var _altura = document.getElementById("altura").innerText;
    console.log(_altura.substring(_altura.length-1));
    if (_altura.substring(_altura.length-1)=="t"){
        $("#altura").text((parseFloat(_altura.substring(0,1)) * 0.3048 + parseFloat(_altura.substring(2,4))* 0.0254).toFixed(2) + " m");
    }
    else {
        let altft= parseFloat(_altura.substring(0,4) * 3.2808399)
        $("#altura").text(Math.floor(altft) + "-" + parseFloat(Math.round((altft-Math.floor(altft))* 12)) + " ft");
    }

});
