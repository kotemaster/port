setTimeout( function() {
    //load the visualization api and the piechart package.
    google.load('visualization', '1.0', {'packages':['corechart']});

    // Set a callback to run when the Google Visualization API is loaded.
    google.setOnLoadCallback(drawChart);

    // Callback that creates and populates a data table,
    // instantiates the pie chart, passes in the data and
    // draws it.
    function drawChart() {

    // Create the data table.
    var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
            ['Mushrooms', 4],
            ['Onions', 0.5],
            ['Zucchini', 1],
            ['Olives', 1],
            ['Garlic', 1],
            ['Pepperoni', 2]
    ]);

    // Set chart options
    var options = {'title':'How Much Pizza I Ate Last Night',
        'width':500,
        'height':400,
         };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, {
        is3D : true, 
        colors: ['#111', '#333', '#555', '#777', '#999', '#bbb']
        });
    }
}, 400);

setTimeout( function() {
    google.setOnLoadCallback(drawChartTwo);

    function drawChartTwo() {
        var data = new google.visualization.DataTable();
            data.addColumn('string', 'Topping');
            data.addColumn('number', 'Breeds');
            data.addRows([
                ['Rotties', 10],
                ['Pitties', 9],
                ['Labs', 5],
                ['Golden Retrievers', 7],
                ['Huskies', 9],
                ['Border Collies', 7]
            ]);

            var options = {
                'title':'Coolest Dog Breeds on Scale of 1-10',
                'width':500,
                'height':400
            };

            var chart = new google.visualization.BarChart(document.getElementById('chart_div2'));
                        chart.draw(data, options);
    }
}, 400);

setTimeout( function() {
    google.setOnLoadCallback(drawChartThree);

    function drawChartThree() {
        var data = google.visualization.arrayToDataTable([
            ['Month', '2014', '2013'],
            ['Jan', -10, -15],
            ['Feb', -20, -12],
            ['March', -18, -14],
            ['April', -16, -20]
        ]);

        var options = {
            'title':'Temperature in C',
            hAxis: { title: 'month' },
            vAxis: { title: 'city' },
            curveType: 'function',
            'width':500,
            'height':400,
            'strokeWidth': 4,
            colors: ['orange', 'purple']
        };

        var chart = new google.visualization.LineChart(document.getElementById('chart_div3'));
                    chart.draw(data, options);
    }
}, 400);

function getData() {
    $.ajax( {
        type: "GET",
        url: "Controllers/index.php",
        dataType: "html",
        success: function(data) {
            $("#serverData").html(data);
            console.log(data);
       } 
    });
}

var gl;

function initWebGL(canvas) {
  gl = null;
    
    try {
        //Try to grab the standard context. If it fails, fallback to experimental.
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    }
    catch(e) {}

    // If we don't have a GL context, give up now
    if (!gl) {
        alert("Unable to initialize WebGL. Your browser may not support it.");
        gl = null;
    }

    return gl;
}

var camera, scene, renderer;
var geometry, material, mesh;

init();
animate();

function init() {

camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 1000;

scene = new THREE.Scene();

geometry = new THREE.BoxGeometry(200, 200, 200);
material = new THREE.MeshBasicMaterial({
color: 0xff0000,
wireframe: true
});

mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

}

function animate() {

requestAnimationFrame(animate);

mesh.rotation.x += 0.01;
mesh.rotation.y += 0.02;

renderer.render(scene, camera);

}
