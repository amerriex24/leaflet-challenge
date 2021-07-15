//EarthQuake URL
var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

//Request URL Data
d3.json(queryURL, function(response){
   console.log(response)
   createFeatures(response. features);
   console.log(response.features[0]. geometry.coordinates[3])
});

// Functiom to grab data

function createFeatures(quakedata) {

    function onEachFeature(feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr><p><strong>Magnitude: </strong>" + 
      feature.properties.mag + "<br><strong>Depth: </strong>" +
      feature.geometry.coordinates[3] + " m <br> <strong>Time: </strong>" + 
      new Date(feature.properties.time) + "</p>")
  }  
    
    function markerColor(d) {
        return d > 9 ? 'Blue':
        d >= 7 ? 'OrangeRed':
        d >= 5 ? 'Orange':
        d >= 3 ? 'Yellow':
        d >= 2 ? 'Red':
        d >= 1 ? 'Green':

     {}
}
    // Setting marker size based on magnitude
    function markerSize(magnitude) {
        return magnitude *5;
    };

    function createMap() {
   
        var satellite = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>',
            maxZoom: 13,
            id: 'mapbox.satellite',
            accessToken: API_KEY
        });
        var grayscale = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>',
            maxZoom: 13,
            id: 'mapbox.light',
            accessToken: API_KEY
        });
    
        var outdoors = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>',
            maxZoom: 13,
            id: 'mapbox.outdoors',
            accessToken: API_KEY
        });
        var dark = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>',
            maxZoom: 13,
            id: 'mapbox.dark',
            accessToken: API_KEY
        });
    
        var baseLayers = {
            "Satellite": satellite,
            "Grayscale": grayscale,
            "Outdoors": outdoors,
            "Dark": dark       
        };
    
        var overlays = {
            "Fault Lines": faultline,
            "Earthquakes": earthquakeweek,
            
        };
    
        var mymap = L.map('map', {
            center: [29.8968, -110.5828],
            zoom: 3.5,
            layers: [satellite, earthquakeweek, faultline]
        });
    
        L.control.layers(baseLayers, overlays).addTo(mymap);
     
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
    
}    };
    