$(document).ready(function() {
    d3.json(file, function(data) {
        data = MG.convert.date(data, 'time', "%Y-%m-%dT%H:%M:%S");
        MG.data_graphic({
            title: 'User Sentiment',
            data: data,
            width: 900,
            height: 350,
            target: '#user_sentiment_graph',
            x_accessor: 'time',
            y_accessor: 'sentiment'
        });
    });
})
