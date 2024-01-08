// Load the Visualization API and the piechart package.
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
var positions = [['Position', 'NumberofPlayers']]

var composedUri = "http://192.168.160.58/nba/api/Positions";
// Set chart options
var options = {
    title: 'Número de Jogadores por posições',
    is3D: true,
};

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {
    // Create our data table.
    if (JSON.parse(localStorage.getItem("positionsdata"))==null){
        ajaxHelper(composedUri, 'GET').done(function (stats) {
            // Interact with the data returned
            let positions = [['Position', 'NumberofPlayers']]
            console.log(positions)
            console.log(stats)
            for (i=0; i < stats.Records.length; i++) {
                let item = stats.Records[i]
                console.log(item)
                ajaxHelper(composedUri + "/" + item.Id, 'GET').done(function (position) {
                    positions.push([position.Name, position.Players.length])
                    console.log(positions)
                    if (positions.length==8){
                        var data = google.visualization.arrayToDataTable(positions)
                        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
                        chart.draw(data, options);
                        localStorage.setItem("positionsdata", JSON.stringify(positions))
                    }
                })
                sleep(250)
            }
        });
    }
    else{
        var data = google.visualization.arrayToDataTable(JSON.parse(localStorage.getItem("positionsdata")))
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }
    hideLoading()
}

//--- Internal functions
function ajaxHelper(uri, method, data) {
    return $.ajax({
        type: method,
        url: uri,
        dataType: 'json',
        contentType: 'application/json',
        data: data ? JSON.stringify(data) : null,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("AJAX Call[" + uri + "] Fail...");
        }
    });
}

function sleep(miliseconds) {
    var currentTime = new Date().getTime();
 
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
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

$(document).ready(function () {
    showLoading()
});