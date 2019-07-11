// on page load
$(document).ready(function () {
// our topics or teams
    var topics = ["New York Knicks", "Brooklyn Nets", "Utah Jazz", "Golden State Warriors", "Toronto Raptors", "Oklahoma City Thunder", "Los Angeles Lakers", "Philadelphia 76ers", "Miami Heat", "Portland Trailblazers"]
    
// where we will store our gifs
    gifshere = " "

    // this function will make the buttons for each item in the array
    // it will add classes, text, attr and push them to html
    var makeButtons= function() {

        $("#buttons").empty();

        for (var i = 0; i < topics.length; i++) {


            var a = $('<button>');

            a.addClass('team');

            a.attr('data-name', topics[i]);

            a.text(topics[i]);

            $("#buttons").append(a);


        }
        $("#team-input").focus();

    }


    makeButtons();



    // on click we'll empty our gifs, load the new team, then tap into our API
    
    $(document).on('click', 'button', function () {

        $('#gifshere').empty();

        var gifteam = $(this).attr('data-name');

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifteam + "&api_key=JWgyHr2Qwkv09gHZn9tsUdBz3ca18dEA&limit=10";

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (response) {
            // after they get back, we'll create a div img for each,
            // the limit is set to 10 in the apikey
            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var gifDiv = $('<div class="teamgif">');

                var gifPic = $('<img>');

                gifPic.attr('src', results[i].images.fixed_height.url)
                    .attr('data-still', results[i].images.fixed_height_still.url)
                    .attr('data-animate', results[i].images.fixed_height.url)
                    .attr('data-state', "still")
                    .addClass("active");

            
                gifDiv.append(gifPic);

                $('#gifshere').prepend(gifDiv);
            }

        });
    });

    // when addteam is clicked we will push their input to topics
// then run the make button function again to make the newly populated
// array into buttons

$("#add-team").on('click', function () {


    event.preventDefault();

    var team = $("#team-input").val().trim();

    topics.push(team);

    makeButtons();
    //  $('#gifshere').empty();

    //     var gifteam = $(this).attr('data-name');

    //     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifteam + "&api_key=JWgyHr2Qwkv09gHZn9tsUdBz3ca18dEA&limit=10";

    //     $.ajax({
    //         url: queryURL,
    //         method: 'GET'
    //     }).then(function (response) {
    //         // after they get back, we'll create a div img for each,
    //         // the limit is set to 10 in the apikey
    //         var results = response.data;

    //         for (var i = 0; i < results.length; i++) {

    //             var gifDiv = $('<div class="teamgif">');

    //             var gifPic = $('<img>');

    //             gifPic.attr('src', results[i].images.fixed_height.url)
    //                 .attr('data-still', results[i].images.fixed_height_still.url)
    //                 .attr('data-animate', results[i].images.fixed_height.url)
    //                 .attr('data-state', "still")
    //                 .addClass("active");

            
    //             gifDiv.append(gifPic);

    //             $('#gifshere').prepend(gifDiv);
    //         }

    //     });

});
    
    $(document).on('click', '.active', function () {

        var state = $(this).data('state');

        if (state === "still") {


            $(this).attr('src', $(this).data('animate'))
                .data('state', 'animate');
        } else {

            $(this).attr('src', $(this).data('still'))
                .data('state', 'still');
        }

    });

});