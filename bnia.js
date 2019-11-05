// all of our JS goes here
$(document).ready(function() {
    // Inital load
    showLoadingPage();

    // Change to onboarding
    setTimeout(function() {
        showOnboardingPage();
    }, 2000)

    addIndicatorOptions();
    addNeighborhoodOptions();

    setupMap();
    setupTable();
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

function setupMap() {
    var mymap = L.map('mapid').setView([51.505, -0.09], 13);
    mymap.removeControl(mymap.zoomControl);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    	maxZoom: 18,
    	id: 'mapbox.streets',
    	accessToken: 'pk.eyJ1Ijoiam1oYXRmaWVsZCIsImEiOiJjazJnbjlpbjUwMHg1M2JxZWR2aHQ2cjkyIn0.hI5VG7I0cGyKhFN_yBUhiQ'
    }).addTo(mymap);
}

function setupTable() {
    let html = "";
    neighborhoods.forEach(function(ele) {
        html += "<tr><td>" + ele + "</td><td>temp</td></tr>";
    });
    $("#tableBody").html(html);
}
