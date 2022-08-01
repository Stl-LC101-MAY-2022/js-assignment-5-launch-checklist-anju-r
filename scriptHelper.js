// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.

    let jshtml = `<h2>Mission Destination</h2>
    <ol>
        <li>Name: ${name}</li>
        <li>Diameter: ${diameter}</li>
        <li>Star: ${star}</li>
        <li>Distance from Earth: ${distance}</li>
        <li>Number of Moons: ${moons}</li>
    </ol>
    <img src="${imageUrl}">`
    let planetElement = document.getElementById('missionTarget');
    planetElement.innerHTML = jshtml;
}

function validateInput(testInput) {
    if (testInput === "") {
        return "Empty";
    } else if (isNaN(testInput)) { return "Not a Number" }
    else return "Is a Number";

}


function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {

    let pilotStatus = document.getElementById('pilotStatus');
    let copilotStatus = document.getElementById('copilotStatus');
    let fuelStatus = document.getElementById('fuelStatus');
    let cargoStatus = document.getElementById('cargoStatus');
    let faultyItems = document.getElementById('faultyItems');
    let launchStatus = document.getElementById('launchStatus');
    faultyItems.style.visibility = "visible";


    if (validateInput(pilot) === "Empty") {
        alert("All fields are required!")
    } else if (validateInput(pilot) === "Is a Number") {
        alert("Make sure to enter valid information for each field!")
    }
    else if (validateInput(copilot) === "Empty") {
        alert("All fields are required!")
    } else if (validateInput(copilot) === "Is a Number") {
        alert("Make sure to enter valid information for each field!")
    }
    else if (validateInput(fuelLevel) === "Empty") {
        alert("All fields are required!")
    } else if (validateInput(fuelLevel) === "Not a Number") {
        alert("Make sure to enter valid information for each field!")
    }
    else if (validateInput(cargoLevel) === "Empty") {
        alert("All fields are required!")
    } else if (validateInput(cargoLevel) === "Not a Number") {
        alert("Make sure to enter valid information for each field!")
    } else {
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
    }


    if (parseInt(fuelLevel) < 10000) {
        fuelStatus.innerHTML = "Fuel level is too low for launch";
        launchStatus.innerHTML = 'Shuttle not ready for launch';
        launchStatus.style.color = 'red';
    } else {
        fuelStatus.innerHTML = "Fuel level is enough for launch";
    }
    if (parseInt(cargoLevel) > 10000) {
        cargoStatus.innerHTML = "There is too much mass for the shuttle to take off";
        launchStatus.innerHTML = 'Shuttle not ready for launch';
        launchStatus.style.color = 'red';
    } else {
        cargoStatus.innerHTML = "Cargo mass is low enough for launch";
    }

    if (validateInput(pilot) === "Not a Number" && validateInput(copilot) === "Not a Number" &&
        validateInput(fuelLevel) === "Is a Number" && validateInput(cargoLevel) === "Is a Number" &&
        parseInt(fuelLevel) >= 10000 && parseInt(cargoLevel) <= 10000) {
        launchStatus.innerHTML = "Shuttle is ready for launch";
        launchStatus.style.color = 'green';




    }



}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch('https://handlers.education.launchcode.org/static/planets.json').then(function (response) {
        return response.json();
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    let planetIndex = Math.floor(Math.random() * 6);
    return planets[planetIndex];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
