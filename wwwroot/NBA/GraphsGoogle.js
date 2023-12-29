// Load the Visualization API and the piechart package.
google.charts.load('current', { 'packages': ['bar'] });
google.charts.setOnLoadCallback(drawChart);

var composedUri = "http://192.168.160.58/NBA/api/Statistics/NumPlayersBySeason";
// Set chart options
var options = {
    chart: {
        title: 'Estatísticas Gerais',
        subtitle: 'N.º de Jogadores por Season',
    },
    bars: 'horizontal', // Required for Material Bar Charts.
    legend: { position: 'none' },
    height: 3000,
    hAxis: { textStyle: { fontSize: 11, fontName: 'Open Sans' } },
    vAxis: { textStyle: { fontSize: 11, fontName: 'Open Sans' } },
    animation:{
        duration: 1000,
        easing: 'out',
        startup: true
    },
    series: {
        0: {
            color: 'red'
        },
        1: {
            color: 'maroon'
        },
        2: {
            color: '#338067'
        },
        3: {
            color: '#FC53D2'
        }
    }
};

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {
    // Create our data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Season', ); // Implicit domain label col.
    data.addColumn('number', 'Players in Regular Season'); // Implicit series 1 data col.
    data.addColumn('number', 'Players in Playoffs'); // Implicit domain label col.
    ajaxHelper(composedUri, 'GET').done(function (stats) {
        // Interact with the data returned
        $.each(stats, function (index, item) {

            if (item.SeasonType== "Regular Season"){
                console.log(playoffs)
                data.addRow([item.Season, item.Players, playoffs]);
            }
            else{
                playoffs= item.Players
            }
        })
        // Instantiate and draw our chart, passing in some options.
        var chart = new google.charts.Bar(document.getElementById('chart_div'));
        chart.draw(data, options);
        setTimeout(() => {
            document.getElementById('chart_div').classList.remove('animated-chart-start')
        }, 100)
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