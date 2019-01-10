// Array of animals
var animalList = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
    "frog", "teacup pig", "chicken", "chinchilla", "bird", "turtle", "pygmy goat", "capybara", "serval", "tiger"];

// This code will run as soon as the page loads
window.onload = function () {
    addBtns();
};

// function to create buttons
function addBtns() {
    for (var i = 0; i < animalList.length; i++) {
        var buttons = $('<button>');
        buttons.html("<input type='button' class='btn btn-primary' value='" + animalList[i] + "'/>");
        $("#animalButtons").append(buttons);
    }
}

////////////////////
// OnClick events //
////////////////////

$('#animalButtons').on('click', 'button', function () {
    console.log("click");
});

// Adding an animal
$('#submitButton').on('click', function () {
    event.preventDefault();
    var toAdd = $('#inputAnimal').val();
    console.log(toAdd);
    animalList.push(toAdd);
    var buttons = $('<button>');
    buttons.html("<input type='button' class='btn btn-primary' value='" + toAdd + "'/>");
    $("#animalButtons").append(buttons);
});
