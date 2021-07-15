//EarthQuake URL
var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

var satellite = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>',        maxZoom: 13,
    id: 'mapbox.satellite',
    accessToken: API_KEY
    
})
var grayscale = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>',
    maxZoom: 13,
    id: 'mapbox.light',
    accessToken: API_KEY

})
    
var outdoors = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>',
    maxZoom: 13,
    id: 'mapbox.outdoors',
    accessToken: API_KEY

})
    
var dark = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>',
    maxZoom: 13,
    id: 'mapbox.dark',
    accessToken: API_KEY
    
})

    
var baseLayers = {
    "Satellite": satellite,
    "Grayscale": grayscale,
    "Outdoors": outdoors,
    "Dark": dark       
}

var overlays = {
    //"Fault Lines": faultline,
    "Earthquakes": earthquakeweek,
    
}

var mymap = L.map('map', {
    center: [29.8968, -110.5828],
    zoom: 3.5,
    layers: [satellite, earthquakeweek, faultline]
})


L.control.layers(baseLayers, overlays).addTo(mymap);

 function setColor(mag){
    switch(true){
        case mag>7:
            return 'Blue'
        case mag>6:
            return 'Orangered'
        case mag >5:
            return 'orange'
        case mag >4:
            return 'yellow'
        case mag >3:
            return 'green'
        case mag >2:
            return 'red'
        case mag >1:
            return 'red'
            
    }
}

// Creating function for request to url 
var earthquakes = d3.json(url).then(data => {
    for (let i = 0; i < data.features.length; i++) {
        var xy = [data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]]
        var z = data.features[i].geometry.coordinates[2]
        var place = data.features[i].properties.place
        var mag = data.features[i].properties.mag
        var time = data.features[i].properties.time

        L.circle(xy,{
            color:setOutline(z),
            fillColor:setColor(mag),
            fillOpacity:.5,
            radius:(5000+(5000*mag)+10**(mag))
        }).bindPopup(`<h1>Location</h1><hr><h3>${place}</h3><hr><h1>Time:</h1><h3>${new Date(time)}</h3><hr><h1>Magnitued ${mag}</h1>`).addTo(myMap)
    
    }
//create legend for map
    var legend = L.control({ position: 'bottomright' });
    
    legend.onAdd = function (map) {
    
        var div = L.DomUtil.create('div', 'info legend'),
        magnitude = [0, 1, 2, 3, 4, 5],
        labels = [];
    
        div.innerHTML += "<h4 style='margin:4px'>Magnitude</h4>"
    
        for (var i = 0; i < magnitude.length; i++) {
             div.innerHTML +=
             '<div class="color-box" style="background-color:' + Color(magnitude[i] + 1) + ';"></div> '+ 
                    magnitude[i] + (magnitude[i + 1] ? '&ndash;' + magnitude[i + 1] + '<br>' : '+');
            }
    
            return div;
        };
        legend.addTo(mymap);
    
})
