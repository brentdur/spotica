$(document).ready(function() {
    d3.json(file, function(data) {
        MG.data_graphic({
            title: 'User Sentiment',
            data: data,
            width: 900,
            height: 350,
            target: '#user_sentiment_graph',
            x_accessor: 'total',
            y_accessor: 'sentiment'
        });
    });
})
