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
    self.Seasontype = ko.observable('Playoff');
    self.Season = ko.observable('');
    self.Team = ko.observable('');
    self.Logo = ko.observable('');
    self.Rank = ko.observable('');
    self.GamesPlayed = ko.observable('');
    self.Teams = ko.observable([]);
    self.Seasons = ko.observable([]);
    self.updateLocalStorage = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data))
    }
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
            self.PositionId(data.PositionId);
            self.PositionName(data.PositionName);
            self.Teams(data.Teams);
            self.Seasons(data.Seasons);
            self.Photo(data.Photo);
            if (data.Photo==null){
                self.Photo("http://192.168.160.58/NBA/Images/fallback.png");
            }
            if (data.Birthdate==null){
                self.Birthdate("");
            }
            else{
                self.Birthdate(data.Birthdate);
            }
        });
    };

    self.detailsButton = (_event,_data) =>{
        showLoading();
        console.log(_data);
        
        ajaxHelper("http://192.168.160.58/NBA/API/Players/Statistics?id="+ self.Id()+"&seasonId=" + _data.Id, 'GET').done(function (data) {
            console.log(data)
            if (self.Seasontype()==='Playoff'){
                stats = data.Playoff
                console.log(stats); 
            }
            self.Season(_data.Season);
            self.Rank(stats.Rank);
            self.GamesPlayed(stats.GamesPlayed);
            if (data.TeamId != null && data.Acronym != null){
                ajaxHelper("http://192.168.160.58/NBA/API/Teams?id="+ data.TeamId + "&Acronym=" + data.Acronym, 'GET').done(function (data) {
                    self.Team(data.Name);
                    if (data.Logo==null){
                        self.Logo("https://images.gamebanana.com/img/ss/tuts/100-90_619fe17d4ff4c.jpg");
                    }
                    else{self.Logo(data.Logo)}
                });
            }
            hideLoading();
            $('#statisticsModal').modal('show', {
                backdrop: 'static',
                keyboard: false
            });
        });
    }

    function sleep(milliseconds) {
        const start = Date.now();
        while (Date.now() - start < milliseconds);
    }
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

$('#heightconverter').click(function(){
    var _altura = $("#altura").text();
    console.log(_altura)
    console.log(_altura.substring(_altura.length-1));
    if (_altura.substring(_altura.length-1)=="t"){
        $("#altura").text((parseFloat(_altura.substring(0,1)) * 0.3048 + parseFloat(_altura.substring(2,4))* 0.0254).toFixed(2) + " m");
        $('#heightconverter').text("Conververter para pés");
    }
    else {
        let altft= parseFloat(_altura.substring(0,4) * 3.2808399)
        $("#altura").text(Math.floor(altft) + "-" + parseFloat(Math.round((altft-Math.floor(altft))* 12)) + " ft");
        $('#heightconverter').text("Conververter para metros");
    }

});

$('#weightconverter').click(function(){
    var _peso = $("#peso").text();
    console.log(_peso.substring(_peso.length-1));
    if (_peso.substring(_peso.length-1)=="b"){
        $("#peso").text((parseFloat(_peso.substring(0,_peso.length-3)) * 0.45359237 ).toFixed(1) + " kg");
        $('#weightconverter').text("Conververter para libras");
    }
    else {
        $("#peso").text(Math.round(parseFloat(_peso.substring(0,_peso.length-3)) * 2.20462262 )  + " lb");
        $('#weightconverter').text("Conververter para quilos");
    }

});