$(document).ready(function() {
    d3.json(file, function(data) {
        data = MG.convert.date(data, 'time', "%Y-%m-%dT%H:%M:%S");
        MG.data_graphic({
            title: 'Global Sentiment',
            data: data,
            width: 900,
            height: 350,
            target: '#ufo-sightings',
            x_accessor: 'time',
            y_accessor: 'sentiment'
        });
    });
})
