function loadThemeBasedOnURL (){
    var pathArray = window.location.pathname.split('/');
    var calendar = "calendar";
  
    var grabCalendar = pathArray.indexOf(calendar);
    var grabCommunity = pathArray[grabCalendar+1];

    var capitalizeCommunity = grabCommunity.charAt(0).toUpperCase() + grabCommunity.slice(1);
  
    if(grabCommunity !== ""){
      document.body.className = "";
      document.body.classList.add(capitalizeCommunity);
    }
}

exports.onRouteUpdate = () => { 
    loadThemeBasedOnURL()
};

exports.onClientEntry = () => { 
    loadThemeBasedOnURL()
};
  
