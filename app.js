// Array of animals
var animalList = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "whale", "shark", "monkey", "snake", "tiger",
    "turtle", "sheep", "donkey", "teacup pig", "chicken", "chinchilla", "bird", "frog", "pygmy goat", "ostrich", "giraffe"];

// This code will run as soon as the page loads
window.onload = function () {
    addBtns();
};

// function to create buttons
function addBtns() {
    for (var i = 0; i < animalList.length; i++) {
        var buttons = $('<button>');
        buttons.html("<input type='button' class='btn btn-primary' value='" + animalList[i] + "'/>");
        buttons.attr("value", animalList[i]);
        $("#animalButtons").append(buttons);
    }
}

////////////////////
// OnClick events //
////////////////////

$('#animalButtons').on('click', 'button', function () {
    var animal = $(this).attr("value");
    console.log(animal);
    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=animal+" +
        animal + "&api_key=LQeS3hfkxSIHzqq11SgwYC5R0ZgTKF8C&limit=10";

    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After the data comes back from the API
        .then(function (response) {
            // Storing an array of results in the results variable
            var results = response.data;

            // Looping over every result item
            for (var i = 0; i < results.length; i++) {
                // Creating and storing a div tag
                var animalDiv = $("<div class='gifs'>");

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);

                // Creating and storing an image tag
                var animalImage = $("<img>");
                // Setting the attributes of the image to a property pulled off the result item
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                animalImage.attr("data-animate", results[i].images.fixed_height.url);
                animalImage.attr("data-state", "still");
                animalImage.attr("class", "gif");
                // Appending the paragraph and image tag to the animalDiv
                animalDiv.append(p);
                animalDiv.append(animalImage);
                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                $("#gifs").prepend(animalDiv);
            }
            $('.gif').on('click', function () {
                console.log("click");

                var state = $(this).attr("data-state");
                // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                // Then, set the image's data-state to animate
                // Else set src to the data-still value
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        });
});

// Adding an animal
$('#submitButton').on('click', function () {
    event.preventDefault();

    var toAdd = $('#inputAnimal').val();

    // clear the text in the form
    $('#inputAnimal').val('');

    // add new animal to the array
    animalList.push(toAdd);

    // add a button for added animal
    var buttons = $('<button>');
    buttons.html("<input type='button' class='btn btn-primary' value='" + toAdd + "'/>");
    buttons.attr("value", toAdd);
    $("#animalButtons").append(buttons);
});
