$(document).ready(function() {
    d3.json('/static/micro/js/global_sentiment.json', function(data) {
        data = MG.convert.date(data, 'time', "%Y-%m-%d %H:%M:%S");
        MG.data_graphic({
            title: 'Global Sentiment',
            description: "This is a simple line chart. You can remove the area portion by adding area: false to the arguments list.",
            data: data,
            width: 900,
            height: 350,
            target: '#ufo-sightings',
            x_accessor: 'time',
            y_accessor: 'sentiment'
        });
    });
})
