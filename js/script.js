$(document).ready(function() {
    console.log("Created by Bartłomiej Tuchowski");
    $(".container").removeClass("hidden");
    var commonStreamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "noobs2ninjas"]; //Common streamers nicks array.
    
    var newContent =""; //Varible to add content(with json) to  #content and #popup-box.
    
    //Function that gets online sreamers.
    function getOnline(arr) {
        arr.forEach(function (item) {
            var streamsJson = "https://wind-bow.gomix.me/twitch-api/streams/" + item +"?callback=?";
            $.getJSON(streamsJson, function(sjson) {
                if (sjson.stream) {
                    newContent += "<div class='container__status--online visible'>";
                    newContent += "<a href='#popup' class='" + item + "'>";
                    newContent += "<div class='container__twitch-user'>";
                    newContent += "<div class='logo-box'>";
                    newContent += "<img class='img-streamer-logo' src='" + sjson.stream.channel.logo + "' alt='user_logo'>";
                    newContent += "</div>";
                    newContent += "<div class='row'>"
                    newContent += "<div><h1>" + sjson.stream.channel.name+ "</h1></div>";
                    newContent += "<div class='marker marker--online'></div>";
                    newContent += "</div>";
                    newContent += "<p>" + sjson.stream.game + "</p>";
                    newContent += "<div class='row'>";
                    newContent += "<div class='col-1-of-3'><i class='fa fa-eye'> " + sjson.stream.viewers + "</i></div>";
                    newContent += "<div class='col-1-of-3--violet'><i class='fa fa-user'> " + sjson.stream.channel.views + "</i></div>";
                    newContent += "<div class='col-1-of-3--red'><i class='fa fa-heart'> " + sjson.stream.channel.followers + "</i></div>";
                    newContent += "</div></div></a></div>";
                    document.getElementById("content").innerHTML = newContent;
                }
            });
        });
    }
    
    //Funtion that gets offline streamers.
    function getOffline(arr) {
        arr.forEach(function (item) {
            var streamsJson = "https://wind-bow.gomix.me/twitch-api/streams/" + item +"?callback=?";
            $.getJSON(streamsJson, function(sjson) {
                if (sjson.stream) {
                    return
                }
                else {
                    var channeljson = "https://wind-bow.gomix.me/twitch-api/channels/" + item +"?callback=?";
                    console.log(channeljson)
                    $.getJSON(channeljson, function(cjson) {
                        if (cjson.error) {
                            console.log(cjson);
                        }
                        else {
                            newContent += "<div class='container__status--offline visible'>";
                            newContent += "<a href='#popup' class='" + item + "'>";
                            newContent += "<div class='container__twitch-user'>";
                            newContent += "<div class='logo-box'>";
                            newContent += "<img class='img-streamer-logo' src='" + cjson.logo + "' alt='user_logo'>";
                            newContent += "</div>";
                            newContent += "<div class='row'>"
                            newContent += "<div><h1>" + cjson.name+ "</h1></div>";
                            newContent += "<div class='marker marker--offline'></div>";
                            newContent += "</div>";
                            newContent += "<p>Offline</p>";
                            newContent += "<div class='row'>";
                            newContent += "<div class='col-1-of-3'><i class='fa fa-eye'> 0 </i></div>";
                            newContent += "<div class='col-1-of-3--violet'><i class='fa fa-user'> " + cjson.views + "</i></div>";
                            newContent += "<div class='col-1-of-3--red'><i class='fa fa-heart'> " + cjson.followers + "</i></div>";
                            newContent += "</div></div></a></div>";
                            document.getElementById("content").innerHTML = newContent;
                        }
                    });
                }
            });
        });
    }
    
    //Function that gets user input as a query to find streamer.
    //TODO: This is currently not working. API has changed, so I can only make some real requests to Twitch api.
    /* 
    function userInput () {
        newContent = ""; //Resets content to show only chosen streamer.
        var entredName = []; 
        var input = document.getElementsByClassName('container__input')[0].value; 
        entredName.push(input);
        console.log(input);
        if (input == "") {
            //This part is to avoid adding undefinded streamer after reseting the input content.
            getOnline(commonStreamers);
            getOffline(commonStreamers);
        }
        else {
            getOnline(entredName);
            getOffline(entredName);
            updatePopup(document.getElementsByClassName('container__input')[0].value);
        }
    }
    */
  
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
    //$('.container__input').change(userInput); //TODO: This is currently not working. API has changed, so I can only make some real requests to twitch api.
});
  
//Function which adds info about channel to the popup.
function updatePopup (streamer) {
    var newContent= "";
    $.getJSON("https://wind-bow.gomix.me/twitch-api/channels/" + streamer +"?callback=?", function(cjson) {
        newContent += "<div class='popup__left'>";
        newContent += "<img src='" + cjson.logo + "' alt='logo-300x300' class='popup__img'>";
        newContent += "</div>";
        newContent += "<div class='popup__right'>";
        newContent += "<a href='#nothig' class='popup__close'>&times;</a>";
        newContent += "<h2 class='popup__header'>"+ cjson.name + " channel</h2>";
        newContent += "<div class='popup__info'><div class='popup__header--mini'>name:</div><p class='popup__text'>" + cjson.display_name + "</p></div>";
        newContent += "<div class='popup__info'><div class='popup__header--mini'>views:</div><p class='popup__text'>" + cjson.views + "</p><i class='fa fa-user'></i></div>";
        newContent += "<div class='popup__info'><div class='popup__header--mini'>followers:</div><p class='popup__text'>" + cjson.followers + "</p><i class='fa fa-heart'></i></div>";
        newContent += "<div class='popup__info'><div class='popup__header--mini'>language:</div><p class='popup__text'>" + cjson.broadcaster_language + "</p></div>";
        newContent += "<div class='popup__info'><div class='popup__header--mini'>game:</div><p class='popup__text'>" + cjson.game + "</p></i></div>";
        newContent += "<div class='popup__info'><div class='popup__header--mini'>status:</div><p class='popup__text'>" + cjson.status + "</p></div>";
        newContent += "<a href='" + cjson.url + "' class='btn-text' target='_blank'>Visit Channel &rarr;</a>";
        newContent += "</div>"
        
        document.getElementById("popup__box").innerHTML = newContent;
    })
}
  
//Triggers updatePopup() functions on elements that has been load by AJAX
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
