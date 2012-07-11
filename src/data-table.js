dc.dataTable = function(selector) {
    var chart = dc.baseChart({});

    var size = 25;
    var columns = [];

    chart.render = function() {
        chart.selectAll("div.row").remove();

        var div = chart.root()
            .selectAll("div.row")
            .data(chart.dimension().top(Infinity));

        var divEnter = div.enter()
            .append("div")
            .attr("class", "row");

        for (var i = 0; i < columns.length; ++i) {
            var f = columns[i];
            divEnter.append("span")
                .attr("class", "column " + i)
                .text(function(d) {
                    return f(d);
                });
        }

        div.exit().remove();

        return chart;
    };

    chart.redraw = function() {
        return chart.render();
    };

    chart.size = function(s) {
        if (!arguments.length) return size;
        size = s;
        return chart;
    }

    chart.columns = function(_) {
        if (!arguments.length) return columns;
        columns = _;
        return chart;
    }

    dc.registerChart(chart);
    return chart.anchor(selector);
};