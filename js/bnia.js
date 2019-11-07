/*
 * Some functions adapted from https://leafletjs.com/examples/choropleth/
 */

var fakeData;
var indicatorIsSelected = false;
var yearIsSelected = false;
var map;
var geojson;

$(document).ready(function() {
    showLoadingPage();

    setTimeout(function() {
        showOnboardingPage();
    }, 2000)

    addIndicatorOptions();
    addNeighborhoodOptions();

    showMapContent();

    setupMap();
    setupTable();

    $("#indicatorSelect").on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        indicatorIsSelected = true;
        if (yearIsSelected) {
            populateData();
        }
    });
    $("#yearSelect").on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        yearIsSelected = true;
        if (indicatorIsSelected) {
            populateData();
        }
    });
    $("#neighborhoodSelect1").on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        focusMap(clickedIndex);
    });
    $("#neighborhoodSelect2").on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        filterTable(clickedIndex);
    });
});

function showLoadingPage() {
    $("#loading").removeClass("hide");
    $("#onboarding").addClass("hide");
    $("#content").addClass("hide");
}

function showOnboardingPage() {
    $("#loading").addClass("hide");
    $("#onboarding").removeClass("hide");
    $("#content").addClass("hide");
}

function showContentPage() {
    $("#loading").addClass("hide");
    $("#onboarding").addClass("hide");
    $("#content").removeClass("hide");
}

function addIndicatorOptions() {
    let censusIndicators = indicatorData.filter(function(ele) {
        return ele.topic === "Census Demographics";
    });
    let housingIndicators = indicatorData.filter(function(ele) {
        return ele.topic === "Housing And Community Development";
    });
    let childrenIndicators = indicatorData.filter(function(ele) {
        return ele.topic === "Children And Family Health";
    });
    let crimeIndicators = indicatorData.filter(function(ele) {
        return ele.topic === "Crime and Safety";
    });
    let workforceIndicators = indicatorData.filter(function(ele) {
        return ele.topic === "Workforce And Economic Development";
    });
    let sustainabilityIndicators = indicatorData.filter(function(ele) {
        return ele.topic === "Sustainability";
    });
    let educationIndicators = indicatorData.filter(function(ele) {
        return ele.topic === "Education And Youth";
    });
    let artsIndicators = indicatorData.filter(function(ele) {
        return ele.topic === "Arts and Culture";
    });

    let optionsHTML = "";

    optionsHTML += '<optgroup label="Census Demographics">';
    censusIndicators.forEach(function(ele) {
        optionsHTML += "<option>" + ele.name + "</option>";
    });
    optionsHTML += '</optgroup>';

    optionsHTML += '<optgroup label="Housing And Community Development">';
    housingIndicators.forEach(function(ele) {
        optionsHTML += "<option>" + ele.name + "</option>";
    });
    optionsHTML += '</optgroup>';

    optionsHTML += '<optgroup label="Children And Family Health">';
    childrenIndicators.forEach(function(ele) {
        optionsHTML += "<option>" + ele.name + "</option>";
    });
    optionsHTML += '</optgroup>';

    optionsHTML += '<optgroup label="Crime and Safety">';
    crimeIndicators.forEach(function(ele) {
        optionsHTML += "<option>" + ele.name + "</option>";
    });
    optionsHTML += '</optgroup>';

    optionsHTML += '<optgroup label="Workforce And Economic Development">';
    workforceIndicators.forEach(function(ele) {
        optionsHTML += "<option>" + ele.name + "</option>";
    });
    optionsHTML += '</optgroup>';

    optionsHTML += '<optgroup label="Sustainability">';
    sustainabilityIndicators.forEach(function(ele) {
        optionsHTML += "<option>" + ele.name + "</option>";
    });
    optionsHTML += '</optgroup>';

    optionsHTML += '<optgroup label="Education And Youth">';
    educationIndicators.forEach(function(ele) {
        optionsHTML += "<option>" + ele.name + "</option>";
    });
    optionsHTML += '</optgroup>';

    optionsHTML += '<optgroup label="Arts and Culture">';
    artsIndicators.forEach(function(ele) {
        optionsHTML += "<option>" + ele.name + "</option>";
    });
    optionsHTML += '</optgroup>';

    $("#indicatorSelect").html(optionsHTML);
}

function addNeighborhoodOptions() {
    let optionsHTML = "";
    neighborhoods.forEach(function(ele) {
        optionsHTML += "<option>" + ele + "</option>";
    });
    $("#neighborhoodSelect1").html(optionsHTML);
    $("#neighborhoodSelect2").html(optionsHTML);
}

function showMapContent() {
    $("#mapContent").removeClass("hide");
    $("#listContent").addClass("hide");
}

function showListContent() {
    $("#mapContent").addClass("hide");
    $("#listContent").removeClass("hide");
}

function generateFakeData() {
    let data = {};
    neighborhoods.forEach(function(ele) {
        data[ele] = Math.floor(Math.random() * 100) + 1;
    });
    return data;
}

function getColor(data) {
    return data > 80 ? '#a63603' :
	       data > 60 ? '#e6550d' :
	       data > 40 ? '#fd8d3c' :
	       data > 20 ? '#fdbe85' :
	                   '#feedde';
}

function style(feature) {
    let defaultStyle = {
        fillColor: '#ffffff',
        weight: 3,
        opacity: 1,
        color: 'white',
        fillOpacity: 0
    }
    return defaultStyle;
}

function dataStyle(feature) {
    let dataStyle = {
        fillColor: getColor(fakeData[feature.properties.name]),
        weight: 3,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
    }
    return dataStyle;
}


function highlightNeighborhood(event) {
    if (fakeData) {
        geojson.setStyle(dataStyle);
    } else {
        geojson.setStyle(style);
    }
    let layer = event.target;
    layer.setStyle({
		weight: 5,
		color: '#666',
		fillOpacity: 0.7
	});
	if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		layer.bringToFront();
	}
}

function onEachFeature(feature, layer) {
    layer.on({
        click: highlightNeighborhood
    });
}

function setupMap() {
    map = L.map('mapid').setView([39.290, -76.612], 11);
    map.removeControl(map.zoomControl);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    	maxZoom: 18,
    	id: 'mapbox.streets',
    	accessToken: 'pk.eyJ1Ijoiam1oYXRmaWVsZCIsImEiOiJjazJnbjlpbjUwMHg1M2JxZWR2aHQ2cjkyIn0.hI5VG7I0cGyKhFN_yBUhiQ'
    }).addTo(map);
    geojson = L.geoJson(boundaries, {
        style: style,
        onEachFeature: onEachFeature
    }).bindPopup(function(layer) {
        let neighborhood = layer.feature.properties.name;
        if (fakeData) {
            return "<strong>Neighborhood</strong><br/>" + neighborhood + '<br/><strong>Data</strong><br/>' + fakeData[neighborhood];
        } else {
            return "<strong>Neighborhood</strong><br/>" + neighborhood;
        }
    }).addTo(map);


    var legend = L.control({position: 'bottomleft'});
    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend');
        var grades = [0, 20, 40, 60, 80];
        var labels = [];
        for (let i = 0; i < grades.length; i++) {
            div.innerHTML += '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                             (grades[i]+1) + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
        return div;
    };
    legend.addTo(map);
}

function setupTable() {
    let html = "";
    neighborhoods.forEach(function(ele) {
        html += "<tr><td>" + ele + "</td><td class='text-right'><i id='hashtag' class='fas fa-hashtag'></i></td></tr>";
    });
    $("#tableBody").html(html);
}

function updateMap(fakeData) {
    geojson.setStyle(dataStyle);
}

function updateTable(fakeData) {
    let html = "";
    neighborhoods.forEach(function(ele) {
        html += "<tr><td>" + ele + "</td><td class='text-right'>" + fakeData[ele] + "</td></tr>";
    });
    $("#tableBody").html(html);
}

function focusMap(index) {
    map.closePopup();
    let neighborhood = neighborhoods[index];
    geojson.eachLayer(function(layer) {
        if (layer.feature.properties.name === neighborhood) {
            if (fakeData) {
                geojson.setStyle(dataStyle);
            } else {
                geojson.setStyle(style);
            }
            layer.setStyle({
        		weight: 5,
        		color: '#666',
        		fillOpacity: 0.7
        	});
        	if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        		layer.bringToFront();
        	}
        }
    })
}

function filterTable(index) {
    let neighborhood = neighborhoods[index];
    let html = "";
    if (fakeData) {
        html += "<tr><td>" + neighborhood + "</td><td class='text-right'>" + fakeData[neighborhood] + "</td></tr>";
    } else {
        html += "<tr><td>" + neighborhood + "</td><td class='text-right'><i id='hashtag' class='fas fa-hashtag'></i></td></tr>";
    }
    $("#tableBody").html(html);
}

function unfocusMap() {
    $('#neighborhoodSelect1').selectpicker('deselectAll');
    map.closePopup();
    if (fakeData) {
        geojson.setStyle(dataStyle);
    } else {
        geojson.setStyle(style);
    }
}

function unfilterTable() {
    $('#neighborhoodSelect2').selectpicker('deselectAll');
    if (fakeData) {
        updateTable(fakeData);
    } else {
        setupTable();
    }
}

function populateData() {
    fakeData = generateFakeData();
    updateMap(fakeData);
    updateTable(fakeData);
}
