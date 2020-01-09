function calculate() {
    var file = $('#seq_file');

    if (file.prop('files').length) {
        var formData = new FormData($('form')[0]);
        formData.append('seq', file.prop('files')[0]);
    }
    else {
        alert('Empty file')
        return
    }

    event.preventDefault();

    $.ajax({
        url: "/calc",
        data: formData,
        type: 'POST',
        cache: false,             
        processData: false, 
        contentType: false,
        beforeSend: function() {
            $("#loader").show();
        },
        success: function(response) {
            $("#loader").hide();
            var html = ''
            $.each(JSON.parse(response), function(key, val) {
                if (key == 'ecg') {
                    source_ecg = val
                }
                else if(key == 'pat'){
                    pat_fragments = val
                }
              });

            $('#result').show()
            draw_graph(source_ecg, pat_fragments)
        },
        error: function(response) {
            $("#loader").hide();
            $('#result').show()
            $('#len').html("<p class = 'error'>ERROR!</p>") 
        }
    });
}

function draw_graph(source_ecg, pat_fragments) {
    var margin = {top: 10, right: 40, bottom: 30, left: 30},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    var svG = d3.select("#len")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
  
    var data = source_ecg
  
    var x = d3.scaleLinear()
        .domain([d3.min(data.map(x => x[0])), d3.max(data.map(x => x[0]))])  
        .range([0, width]); 

    svG
        .append('g')
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
  
    var y = d3.scaleLinear()
        .domain([d3.min(data.map(x => x[1])), d3.max(data.map(x => x[1]))])     
        .range([height, 0]);    

    svG
        .append('g')
        .call(d3.axisLeft(y));
  
    console.log(data)
    svG
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function(d) { return x(d[0]) })
            .y(function(d) { return y(d[1]) })
        )
    
    for (var pat in pat_fragments){
        console.log(pat_fragments[pat])
        console.log('---------------')
        svG
            .append("pat")
            .datum(pat_fragments[pat])
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 3.5)
            .attr("d", d3.line()
                .x(function(d) { return x(d[0]) })
                .y(function(d) { return y(d[1]) })
            )
    }
}