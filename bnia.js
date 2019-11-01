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
    $("#neighborhoodSelect").html(optionsHTML);
}
