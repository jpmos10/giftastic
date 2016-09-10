$('document').ready(function() {
   

    //variables

    var buttonHTML = '';
    var buttonArray = ["Stargate+SG-1", "The+100", "Helix", "Vikings", "Arrow", "Sleepy+Hollow", "Seinfeld", "The+Goldbergs", "Agents+of+Shield", "Gotham", "Star+Trek"];
    var newtvShow;
    var gifArray = [];
    


    //initial buttons
    function renderButtons() {
        for (var i = 0; i < buttonArray.length; i++) {
            buttonHTML += "<button class='btn btn-lrg btn-success tvshowButtons' tvShow=" + buttonArray[i] + ">" + buttonArray[i] + "</button>";
        }
        $('#buttonsDiv').html(buttonHTML);
    }

    //invoke function
    renderButtons();

    //on click of submit button
    $('body').on('click', '#submitUserData', function(event) {
        event.preventDefault(); //stop refresh of page
        newtvShow = $('#userInput').val(); //capture value
        var newTVButton = "<button class='btn btn-lrg btn-success tvshowButtons' tvShow=" + newtvShow + ">" + newtvShow + "</button>";
        $('#buttonsDiv').append(newTVButton); //append scope-limited variable html to #buttonsDiv as new button.
    });

    //on click of body, listen for class of tvshowButtons, if match, run this function.
    $('body').on('click', '.tvshowButtons', function(event) {
        $('.GIFdiv').empty(); //clear div of old GIFs.
        var userTvshow = $(this).attr('tvShow');
        //limit 10.
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userTvshow + "&api_key=dc6zaTOxFJmzC&limit10"; 
        $.ajax({ 

            url: queryURL,

            method: 'GET' })

            .done(function(response)  {
                for (var i = 0; i < response.data.length; i++) {
                    $('.GIFdiv').append("<div class='GIFbox'><p class='title'>Rating: " + response.data[i].rating.toUpperCase() +
                        "</p><div class='image-container'><img class='tvShowIMG img-responsive center-block'" +
                        "data-still='" + response.data[i].images.downsized_still.url + "'" + "data-animate='" +
                        response.data[i].images.downsized.url + "'" + "data-state='still'" + "src='" +
                        response.data[i].images.downsized_still.url + "'></div></div>");
                    gifArray.push(response.data[i].images.downsized.url);
                }
                
            }); 

    }); 

    //animate gifs
    $('body').on('click', function() {
        var state = $(this).attr('data-state');
        
        if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
    }); // 

}); 
