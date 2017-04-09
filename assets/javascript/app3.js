setTimeout(function() {

    $(function() {







        var Page = (function() {
            var $navArrows = $('#nav-arrows').hide(),
                $shadow = $('#shadow').hide(),
                slicebox = $('#sb-slider').slicebox({



                    onReady: function() {
                        // debugger;
                        $navArrows.hide();
                        $shadow.hide();



                        $("#slider").hide();
                        $("#videoModal").hide();
                        $(".inputMovie").hide();

                        $("#footer").hide();
                        $("#findAMovie").hide();


                        $(".button").on('click', function() {

                            $("#slider").show();
                            $("#logIn").hide();
                            $(".button").hide();
                            $(".inputMovie").show();
                            $("#shadow").show();
                            $navArrows.show();
                            $("#footer").show();
                            $("#topbar").hide();
                            $("#findAMovie").show();


                        });

                        $(document).foundation();

                        $('li').on("click", function() {
                            $('.movieContent').empty();
                            $('.videoContent iframe').attr('src', '');
                            $("#videoModal").foundation('open').fadeIn();


                            var id = $(this).attr('id');



                            movieDetails += id + '?api_key=' + apiKey + '&append_to_response=videos';

                            console.log($(this).attr('id'));
                            console.log(movieDetails);




                            $("#footer").fadeOut();
                            $("#slider").fadeOut();
                            $("#logIn").fadeOut();
                            $(".button").fadeOut();
                            $("#shadow").fadeOut();
                            $navArrows.fadeOut();
                            $(".header").fadeOut();
                            $(".inputMovie").hide();



                            $.ajax({
                                url: movieDetails,
                                method: "GET"
                            }).done(function(movieDetails) {
                                console.log(movieDetails);
                                var title = movieDetails.original_title;
                                var date = movieDetails.release_date;
                                var plot = movieDetails.overview;
                                var run = movieDetails.runtime
                                var link = movieDetails.homepage;
                                var genre = [];
                                var video;
                                for (var j = 0; j < movieDetails.genres.length; j++) {
                                    genre.push(movieDetails.genres[j].name);
                                }
                                console.log(genre);

                                for (var i = 0; i < movieDetails.videos.results.length; i++) {

                                    console.log(movieDetails.videos.results[i]);
                                    if (movieDetails.videos.results[i].type === 'Trailer') {
                                        video = movieDetails.videos.results[i].key;
                                        console.log(video);
                                    }


                                }
                                $('.videoContent iframe').attr('src', 'https://www.youtube.com/embed/' + video);
                                var movieTitle = $('<p>');
                                movieTitle.append(title);
                                var releaseDate = $('<p>');
                                releaseDate.append(date);
                                var moviePlot = $('<p>');
                                moviePlot.append(plot);
                                var genres = $('<p>');
                                genres.append(genre);
                                var links = $('<p>');
                                links.append(link);
                                var runtime = $('<p>');
                                runtime.append(run);
                                $('.movieContent').append(movieTitle);
                                $('.movieContent').append('Runtime: ', runtime);
                                $('.movieContent').append('Release Date: ', releaseDate);
                                $('.movieContent').append(moviePlot);
                                $('.movieContent').append(genre.join(' '));
                                $('.movieContent').append(links);
                            });
                            movieDetails = 'https://api.themoviedb.org/3/movie/';
                            return false;
                        });

                        console.log('test');

                        $('.close-button').on('click', function() {
                            $('#videoModal').foundation('close').fadeOut();
                            $(".header").fadeIn();
                            $("#slider").fadeIn();
                            $("#shadow").fadeIn();
                            $navArrows.fadeIn();
                            $(".inputMovie").fadeIn();
                            $("#footer").fadeIn();
                            $("#findAMovie").fadeIn();


                        });
                        //================================MAP=============================================

                        $('#findAMovie').on("click", function() {



                            console.log("HELLO");

                            $("#footer").fadeOut();
                            $("#slider").fadeOut();
                            $("#logIn").fadeOut();
                            $(".button").fadeOut();
                            $("#shadow").fadeOut();
                            $navArrows.fadeOut();
                            $(".header").fadeOut();
                            $(".inputMovie").hide();
                            $('#mapModal').foundation('open').fadeIn();

                            var x = document.getElementById("demo");

                            function getLocation() {
                                if (navigator.geolocation) {
                                    navigator.geolocation.getCurrentPosition(showPosition, showError);
                                } else {
                                    x.innerHTML = "Geolocation is not supported by this browser.";
                                }
                            }

                            function showPosition(position) {
                                var latlon = position.coords.latitude + "," + position.coords.longitude;
                                coord = {
                                    lat: position.coords.latitude,
                                    lng: position.coords.longitude
                                };
                                // initMap(coord);
                                var queryURL = "https://api.foursquare.com/v2/venues/search?client_id=LPUN3IZFVIMWCBJTVKWMBQATLIIJYAKE51SMOVS3SIOIUJOC&client_secret=U5KX2SUOPEZ1XXUZX25WJXB1UA0UBC0ALRCD0BDIKMBGBD2A&v=20130815&ll=" + latlon + "&limit=10&query=movies"
                                $.ajax({
                                        url: queryURL,
                                        method: 'GET'
                                    })
                                    .done(function(response) {
                                        console.log(response);
                                        initMap(coord, response)
                                    })
                                // var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="
                                // +latlon+"&zoom=14&size=400x300&sensor=false&key=AIzaSyBu-916DdpKAjTmJNIgngS6HL_kDIKU0aU";
                                // document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
                            }

                            //To use this code on your website, get a free API key from Google.
                            //Read more at: https://www.w3schools.com/graphics/google_maps_basic.asp
                            function showError(error) {
                                switch (error.code) {
                                    case error.PERMISSION_DENIED:
                                        x.innerHTML = "User denied the request for Geolocation."
                                        break;
                                    case error.POSITION_UNAVAILABLE:
                                        x.innerHTML = "Location information is unavailable."
                                        break;
                                    case error.TIMEOUT:
                                        x.innerHTML = "The request to get user location timed out."
                                        break;
                                    case error.UNKNOWN_ERROR:
                                        x.innerHTML = "An unknown error occurred."
                                        break;
                                }
                            }
                            // The following example creates a marker in Stockholm, Sweden using a DROP
                            // animation. Clicking on the marker will toggle the animation between a BOUNCE
                            // animation and no animation.
                            function initMap(x, y) { //x is the current location and y is the response from Foursquare
                                var myLatLng = {
                                    lat: -25.363,
                                    lng: 131.044
                                };
                                var testLat = {
                                    lat: 40.74712431269095,
                                    lng: -73.99032881455878
                                };
                                console.log(y)
                                var map = new google.maps.Map(document.getElementById('mapholder'), {
                                    zoom: 11,
                                    center: x
                                });
                                for (var i = 0; i < y.response.venues.length; i++) {
                                    // for (var places in y) {
                                    // console.log(y.response.venues[i])
                                    var places = {
                                        lat: y.response.venues[i].location.lat,
                                        lng: y.response.venues[i].location.lng
                                    }
                                    console.log(places)
                                    var marker = new google.maps.Marker({
                                        position: places,
                                        map: map,
                                        title: 'Hello World!'
                                    });
                                    // google.maps.event.trigger(map, "resize");
                                }
                            }




                            getLocation();



                            return false;
                        });
                        //===================================================================================================




                    },
                    orientation: 'r',
                    cuboidsRandom: true,
                    disperseFactor: 30
                }),
                init = function() {
                    initEvents();
                },
                initEvents = function() {

                    // add navigation events
                    $navArrows.children(':first').on('click', function() {
                        slicebox.next();
                        return false;
                    });
                    $navArrows.children(':last').on('click', function() {
                        slicebox.previous();
                        return false;
                    });
                };
            return {
                init: init
            };
        })();
        Page.init();
    });
}, 200);