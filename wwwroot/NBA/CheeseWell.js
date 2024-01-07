// Load the Visualization API and the piechart package.
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

var composedUri = "http://192.168.160.58/nba/api/Positions";
// Set chart options
var options = {
    title: 'Número de Jogadores por posições'
};

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {
    // Create our data table.
    ajaxHelper(composedUri, 'GET').done(function (stats) {
        // Interact with the data returned
        var positions = []
        positions.push(['Position', 'NumberofPlayers'])
        console.log(typeof positions)
        console.log(stats)
        for (i=0; i < stats.Records.length; i++) {
            let item = stats.Records[i]
            console.log(item)
            p = ajaxHelper(composedUri + "/" + item.Id, 'GET').done(function (position) {
                    console.log(position)
                    let p=positions[0]
                    console.log(positions)
                    if(positions[0] == 'Position')p = positions
                    console.log(p)
                    p.push([String(position.Name), parseInt(position.Players.length)])
                    return p
                })
            sleep(200)
        }
        console.log(p)
        positions = positions[0]
        console.log(positions)
        var data = google.visualization.arrayToDataTable(positions)
        console.log(data)
        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    });
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