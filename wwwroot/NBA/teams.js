﻿// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/NBA/API/Teams');
    self.displayName = 'NBA Teams List';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    self.records = ko.observableArray([]);
    self.updateLocalStorage = (key, data) => {
        localStorage.setItem(key, JSON.stringify(data))
    };
    self.SetFavourites = ko.observableArray(JSON.parse(localStorage.getItem("teamFavorites")));
    self.favButton = (_event,_data) =>{
        console.log(_data);
        if (_event.target.classList.contains('fa-heart-o')){
            self.SetFavourites.push(_data)
            self.updateLocalStorage("teamFavorites", self.SetFavourites())
            $("#fav" + _data.Id + _data.Acronym).removeClass('fa-heart-o');
            $("#fav" + _data.Id + _data.Acronym).addClass('fa-heart');
            $("#favimg" + _data.Id + _data.Acronym).removeClass('fa-heart-o');
            $("#favimg" + _data.Id + _data.Acronym).addClass('fa-heart');
        }
        else{
            for (let i = 0; i < self.SetFavourites().length; i++) {
                if (self.SetFavourites()[i].Id== _data.Id){
                    self.SetFavourites.splice(i,1)
                    self.updateLocalStorage("teamFavorites", self.SetFavourites())
                    $("#fav" + _data.Id + _data.Acronym).addClass('fa-heart-o');
                    $("#fav" + _data.Id + _data.Acronym).removeClass('fa-heart');
                    $("#favimg" + _data.Id + _data.Acronym).addClass('fa-heart-o');
                    $("#favimg" + _data.Id + _data.Acronym).removeClass('fa-heart');
                }
            }
        }
        console.log(self.SetFavourites());
    }
    self.SetupFavourites = function(){
        var gostos = self.SetFavourites();
        for (let i = 0; i < gostos.length; i++) {
            $('#fav'+ gostos[i].Id + gostos[i].Acronym).addClass('fa-heart');
            $('#fav'+ gostos[i].Id + gostos[i].Acronym).removeClass('fa-heart-o');
            $('#favimg'+ gostos[i].Id + gostos[i].Acronym).addClass('fa-heart');
            $('#favimg'+ gostos[i].Id + gostos[i].Acronym).removeClass('fa-heart-o');
        }
    }
    self.currentPage = ko.observable(1);
    self.pagesize = ko.observable(20);
    self.totalRecords = ko.observable(50);
    self.hasPrevious = ko.observable(false);
    self.hasNext = ko.observable(false);
    self.previousPage = ko.computed(function () {
        return self.currentPage() * 1 - 1;
    }, self);
    self.nextPage = ko.computed(function () {
        return self.currentPage() * 1 + 1;
    }, self);
    self.fromRecord = ko.computed(function () {
        return self.previousPage() * self.pagesize() + 1;
    }, self);
    self.toRecord = ko.computed(function () {
        return Math.min(self.currentPage() * self.pagesize(), self.totalRecords());
    }, self);
    self.totalPages = ko.observable(0);
    self.pageArray = function () {
        var list = [];
        var size = Math.min(self.totalPages(), 9);
        var step;
        if (size < 9 || self.currentPage() === 1)
            step = 0;
        else if (self.currentPage() >= self.totalPages() - 4)
            step = self.totalPages() - 9;
        else
            step = Math.max(self.currentPage() - 5, 0);

        for (var i = 1; i <= size; i++)
            list.push(i + step);
        return list;
    };

    self.search = function() { 
        console.log("searching")
        if ($("#searchbar").val() === "") {
            showLoading();
            var pg = getUrlParameter('page');
            console.log(pg);
            if (pg == undefined)
                self.activate(1);
            else {
                self.activate(pg);
            }
        } 
        else {
            var changeUrl = 'http://192.168.160.58/NBA/api/Teams/Search?q=' + $("#searchbar").val();
            self.Teamslist = [];
            ajaxHelper(changeUrl, 'GET').done(function(data) {
                console.log(data.length)
                if (data.length == 0) {
                    return alert('No results found')
                }
                self.totalPages(1)
                console.log(data);
                showLoading();
                self.records(data);
                self.totalRecords(data.length);
                hideLoading();
                for (var i in data) {
                    self.Teamslist.push(data[i]);
                }
            });
        };
    };

    $("#searchbar").autocomplete({
        minLength: 3,
        autoFill: true,
        source: function (request, response) {
            $.ajax({
                type: 'GET',
                url: 'http://192.168.160.58/NBA/API/Teams/Search?q='+ $("#searchbar").val(),
                success: function (data) {
                    response($.map(data, function (item) {
                        return item.Name;
                    }));
                },
                error: function(result) {
                    alert(result.statusText);
                },
            });
        },
        select: function (e, ui) {
            $.ajax({
                type: 'GET',
                url: 'http://192.168.160.58/NBA/API/Teams/Search?q=' + ui.item.label,
                success: function (data) {
                    window.location = 'teamsDetails.html?id=' + data[0].Id + '&acronimo=' + data[0].Acronym;
                }
            })
        },
    });

    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getTeams...');
        var composedUri = self.baseUri() + "?page=" + id + "&pageSize=" + self.pagesize();
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            hideLoading();
            self.records(data.Records);
            self.currentPage(data.CurrentPage);
            self.hasNext(data.HasNext);
            self.hasPrevious(data.HasPrevious);
            self.pagesize(data.PageSize)
            self.totalPages(data.TotalPages);
            self.totalRecords(data.TotalRecords);
            self.SetupFavourites();
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

    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
        console.log("sPageURL=", sPageURL);
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };

    //--- start ....
    showLoading();
    if (JSON.parse(localStorage.getItem("tabela?"))== "yes") tabelas()
    var pg = getUrlParameter('page');
    console.log(pg);
    if (pg == undefined)
        self.activate(1);
    else {
        self.activate(pg);
    }
    console.log("VM initialized!");
};

$(document).ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());
});

$(document).ajaxComplete(function (event, xhr, options) {
    $("#myModal").modal('hide');
})

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