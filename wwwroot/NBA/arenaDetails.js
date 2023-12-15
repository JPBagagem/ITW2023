﻿// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/NBA/API/Arenas/');
    self.displayName = 'NBA Arena Details';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    //--- Data Record
    self.Id = ko.observable('');
    self.Name = ko.observable('');
    self.StateId = ko.observable('');
    self.StateName = ko.observable('');
    self.TeamId = ko.observable('');
    self.TeamName = ko.observable('');
    self.TeamAcronym = ko.observable('');
    self.Location = ko.observable('');
    self.Capacity = ko.observable('');
    self.Opened = ko.observable('');
    self.Photo = ko.observable('');
    self.Lat = ko.observable('');
    self.Lon = ko.observable('');

    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getArena...');
        var composedUri = self.baseUri() + id;
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            hideLoading();
            self.Id(data.Id);
            self.Name(data.Name);
            self.StateId(data.StateId);
            self.StateName(data.StateName);
            self.TeamId(data.TeamId);
            self.TeamName(data.TeamName);
            self.TeamAcronym(data.TeamAcronym);
            self.Location(data.Location);
            self.Capacity(data.Capacity);
            self.Lon(data.Lon);
            self.Lat(data.Lat);
            self.Capacity(data.Capacity);
            if (data.Opened!=null){
                self.Opened(data.Opened);
            }
            else{
                self.Opened("");
            }
            self.Photo(data.Photo);
            if (data.Photo==null || data.Photo==""){
                self.Photo("https://upload.wikimedia.org/wikipedia/commons/4/4c/Estadio_de_Leiria.jpg");
            };
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