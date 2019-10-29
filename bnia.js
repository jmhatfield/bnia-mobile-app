// all of our JS goes here
$(document).ready(function() {
    // Inital load
    showLoadingPage();

    // Change to onboarding
    setTimeout(function() {
        showOnboardingPage();
    }, 2000)

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
