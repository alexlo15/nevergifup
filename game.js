
$(document).ready(function () {

    var topics = ["New York Knicks", "Brooklyn Nets", "Utah Jazz", "Golden State Warriors", "Toronto Raptors", "Oklahoma City Thunder", "Los Angeles Lakers", "Philadelphia 76ers", "Miami Heat", "Portland Trailblazers"]
    
    gifshere = " "

    function makeButtons() {

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


    $("#add-team").on('click', function () {


        event.preventDefault();

        var team = $("#team-input").val().trim();

        topics.push(team);

        makeButtons();

    });

    $(document).on('click', 'button', function () {

        $('#gifshere').empty();

        var b = $(this).attr('data-name');

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + b + "&api_key=JWgyHr2Qwkv09gHZn9tsUdBz3ca18dEA&limit=10";

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function (response) {

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var gifDiv = $('<div class="item">');

                var gifPic = $('<img>');

                gifPic.attr('src', results[i].images.fixed_height_still.url)
                    .attr('data-still', results[i].images.fixed_height_still.url)
                    .attr('data-animate', results[i].images.fixed_height.url)
                    .attr('data-state', "still")
                    .addClass("showImage");

            
                gifDiv.append(gifPic);

                $('#gifshere').prepend(gifDiv);
            }

        });
    });


    $(document).on('click', '.showImage', function () {

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