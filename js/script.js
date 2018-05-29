$(document).ready(function() {
    console.log("Created by Bart?omiej Tuchowski") //Signature.
    $(".container").removeClass("hidden"); //Fades in intro - container.
    var commonStreamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "noobs2ninjas", "ninja", "izakooo"]; //Common streamers nicks array.
    
    var newContent =""; //Varible to add content(with JSONP) to  #content and #popup-box.
    
    //Function that gets online sreamers.
    function getOnline(arr) {
        arr.forEach(function (item) {
            var streamsJSONP = "https://wind-bow.gomix.me/twitch-api/streams/" + item +"?callback=?";
            $.getJSON(streamsJSONP, function(sjsonp) {
                if (sjsonp.stream) {
                    newContent += "<div class='container__status--online visible'>";
                    newContent += "<a href='#popup' class='" + item + "'>";
                    newContent += "<div class='container__twitch-user'>";
                    newContent += "<div class='logo-box'>";
                    newContent += "<img class='img-streamer-logo' src='" + sjsonp.stream.channel.logo + "' alt='user_logo'>";
                    newContent += "</div>";
                    newContent += "<div class='row'>"
                    newContent += "<div><h1>" + sjsonp.stream.channel.name+ "</h1></div>";
                    newContent += "<div class='marker marker--online'></div>";
                    newContent += "</div>";
                    newContent += "<p>" + sjsonp.stream.game + "</p>";
                    newContent += "<div class='row'>";
                    newContent += "<div class='col-1-of-3'><i class='fa fa-eye'> " + sjsonp.stream.viewers + "</i></div>";
                    newContent += "<div class='col-1-of-3--violet'><i class='fa fa-user'> " + sjsonp.stream.channel.views + "</i></div>";
                    newContent += "<div class='col-1-of-3--red'><i class='fa fa-heart'> " + sjsonp.stream.channel.followers + "</i></div>";
                    newContent += "</div></div></a></div>";
                    document.getElementById("content").innerHTML = newContent;
                }
            });
        });
    }
    
    //Funtion that gets offline streamers.
    function getOffline(arr) {
        arr.forEach(function (item) {
            var streamsJSONP = "https://wind-bow.gomix.me/twitch-api/streams/" + item +"?callback=?";
            $.getJSON(streamsJSONP, function(sjsonp) {
                if (sjsonp.stream) {
                    //Do nothing.
                }
                //if the sjsonp.stream is null(so streamer is offline and we have no jsonp) gets another jsonp. 
                else {
                    var channelJSONP = "https://wind-bow.gomix.me/twitch-api/channels/" + item +"?callback=?";
                    $.getJSON(channelJSONP, function(cjsonp) {
                        if (cjsonp.error) {
                            alert(cjsonp.message); //Displays error message if the streamer is not found and avoid adding undefined streamer.
                        }
                        else {
                            newContent += "<div class='container__status--offline visible'>";
                            newContent += "<a href='#popup' class='" + item + "'>";
                            newContent += "<div class='container__twitch-user'>";
                            newContent += "<div class='logo-box'>";
                            newContent += "<img class='img-streamer-logo' src='" + cjsonp.logo + "' alt='user_logo'>";
                            newContent += "</div>";
                            newContent += "<div class='row'>"
                            newContent += "<div><h1>" + cjsonp.name+ "</h1></div>";
                            newContent += "<div class='marker marker--offline'></div>";
                            newContent += "</div>";
                            newContent += "<p>Offline</p>";
                            newContent += "<div class='row'>";
                            newContent += "<div class='col-1-of-3'><i class='fa fa-eye'> 0 </i></div>";
                            newContent += "<div class='col-1-of-3--violet'><i class='fa fa-user'> " + cjsonp.views + "</i></div>";
                            newContent += "<div class='col-1-of-3--red'><i class='fa fa-heart'> " + cjsonp.followers + "</i></div>";
                            newContent += "</div></div></a></div>";
                            document.getElementById("content").innerHTML = newContent;
                        }
                    });
                }
            });
        });
    }
    
    //Function that gets user input as a query to find streamer.
    function userInput () {
        newContent = ""; //Resets content to show only chosen streamer.
        var entredName = []; //New array to let getOnline() and getOffline() functions work on new data.
        var input = document.getElementsByClassName('container__input')[0].value; 
        entredName.push(input);
        console.log(input);
        if (input == "") {
            //This part is to avoid adding undefinded streamer after reseting the input content.
            getOnline(commonStreamers);
            getOffline(commonStreamers);//Triggers updatePopup() function with the new data(entred by user).
        }
        else {
            getOnline(entredName); //Calling getOnline() function with new data. Won't work if streamer is offline.
            getOffline(entredName); //Calling getOffline() function with new data. Won't work if streamer is online.
            //Triggers updatePopup() function with the new data(entred by user).
            updatePopup(document.getElementsByClassName('container__input')[0].value);
        }
    }
  
    //Status buttons below.
    $(".container__buttons--online").click(function () {
        $(".container__status--online").addClass("visible");
        $(".container__status--offline").removeClass("visible");
    });
    
    $(".container__buttons--offline").click(function () {
        $(".container__status--offline").addClass("visible");
        $(".container__status--online").removeClass("visible");
    });
    
    $(".container__buttons--all").click(function () {
        $(".container__status--online").addClass("visible");
        $(".container__status--offline").addClass("visible");
    }); 
    
    getOnline(commonStreamers); //Calling getOnline() function when page is rendered.
    getOffline(commonStreamers); //Calling getOffline() function when page is rendered.
    $('.container__input').change(userInput); //Watch for changes in input.
});
  
//Function which adds info about channel to the popup.
function updatePopup (streamer) {
    var newContent= "";
    $.getJSON("https://wind-bow.gomix.me/twitch-api/channels/" + streamer +"?callback=?", function(cjsonp) {
        newContent += "<div class='popup__left'>";
        newContent += "<img src='" + cjsonp.logo + "' alt='logo-300x300' class='popup__img'>";
        newContent += "</div>";
        newContent += "<div class='popup__right'>";
        newContent += "<a href='#nothig' class='popup__close'>&times;</a>";
        newContent += "<h2 class='popup__header'>"+ cjsonp.name + " channel</h2>";
        newContent += "<div class='popup__info'><div class='popup__header--mini'>name:</div><p class='popup__text'>" + cjsonp.display_name + "</p></div>";
        newContent += "<div class='popup__info'><div class='popup__header--mini'>views:</div><p class='popup__text'>" + cjsonp.views + "</p><i class='fa fa-user'></i></div>";
        newContent += "<div class='popup__info'><div class='popup__header--mini'>followers:</div><p class='popup__text'>" + cjsonp.followers + "</p><i class='fa fa-heart'></i></div>";
        newContent += "<div class='popup__info'><div class='popup__header--mini'>language:</div><p class='popup__text'>" + cjsonp.broadcaster_language + "</p></div>";
        newContent += "<div class='popup__info'><div class='popup__header--mini'>game:</div><p class='popup__text'>" + cjsonp.game + "</p></i></div>";
        newContent += "<div class='popup__info'><div class='popup__header--mini'>status:</div><p class='popup__text'>" + cjsonp.status + "</p></div>";
        newContent += "<a href='" + cjsonp.url + "' class='btn-text' target='_blank'>Visit Channel &rarr;</a>";
        newContent += "</div>"
        
        document.getElementById("popup__box").innerHTML = newContent;
    })
}
  
//Triggers updatePopup() functions on elements that has been load by AJAX!
$(document).on("click", ".ESL_SC2", function() {
    updatePopup("ESL_SC2");
});
$(document).on("click", ".OgamingSC2", function() {
    updatePopup("OgamingSC2");
});
$(document).on("click", ".cretetion", function() {
    updatePopup("cretetion");
});
$(document).on("click", ".freecodecamp", function() {
    updatePopup("freecodecamp");
});
$(document).on("click", ".noobs2ninjas", function() {
    updatePopup("noobs2ninjas");
});
$(document).on("click", ".ninja", function() {
    updatePopup("ninja");
});
$(document).on("click", ".izakooo", function() {
   updatePopup("izakooo");
});