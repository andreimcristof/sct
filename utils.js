Handlebars.registerHelper("readableDate", function(timestamp) {
    return new Date(timestamp).toDateString()
});

Handlebars.registerHelper("readableMomentDate", function(pDate) {
    return moment(pDate).format("dddd, MMMM Do YYYY");
});

Handlebars.registerHelper("toMomentDateAndTime", function(timestamp) {
    var date = moment(timestamp).format("dddd, MMMM Do YYYY, HH:mm a");
	return date;
	;
});


replaceAll = function(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}

Handlebars.registerHelper('ifNotEmpty', function(item, options) {
    if(item){
        if(item instanceof Array){
            if(item.length > 0){
                return options.fn(this);
            }else{
                return options.inverse(this);
            }
        }else{
            if(item.fetch().length > 0){
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        }
    }else{
        return options.inverse(this);
    }
});

Handlebars.registerHelper("toShortened", function(eventTitle) {
    var maxTitleLength = 40;

    if(eventTitle.length > maxTitleLength)
    	return eventTitle.substring(0, maxTitleLength) + "...";
    else
    	return eventTitle;
});

EventPageGlobals =
{
    EventCountdownTimer : null   
};


Handlebars.registerHelper("countDownUntilDate", function(eventStartDate, eventEndDate, containerClientId){

	var endDateTimeOfCounter = moment(eventStartDate).toDate();
	var eventEndsOnDate = moment(eventEndDate).toDate();
    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;

    function showRemaining() {
        var now = new Date();
        var distance = endDateTimeOfCounter - now;
        if (distance < 0) {

            clearInterval(EventPageGlobals.EventCountdownTimer);

            var distanceToEventEnd = eventEndsOnDate - now;
            if(distanceToEventEnd < 0)
				document.getElementById(containerClientId).innerHTML = 'Event has finished.';            	
			else
            	document.getElementById(containerClientId).innerHTML = 'Event is currently running!';

            return;
        }
        var days = Math.floor(distance / _day);
        var hours = Math.floor((distance % _day) / _hour);
        var minutes = Math.floor((distance % _hour) / _minute);
        var seconds = Math.floor((distance % _minute) / _second);

        document.getElementById(containerClientId).innerHTML = days + ' days, ';
        document.getElementById(containerClientId).innerHTML += hours + ' hrs, ';
        document.getElementById(containerClientId).innerHTML += minutes + ' min, ';
        document.getElementById(containerClientId).innerHTML += seconds + ' sec ';
    }

    EventPageGlobals.EventCountdownTimer = setInterval(showRemaining, 1000);
});

Handlebars.registerHelper("convertUTCDateToReadableFormatInUserTimezone", function(utcDate, timezone) {
    
		var userTimezonedDate = moment.tz(utcDate, timezone);
		return userTimezonedDate.format("dddd, MMMM Do YYYY, HH:mm a");
});


ImgUrlHelper = 
{
    InitUploadValidateFile :function(element)
    {
         var file = element.files[0]
         if(!file)
            return;


        var valid_extensions = /(\.jpg|\.jpeg|\.gif|\.png)$/i;
        if (valid_extensions.test(file.name)) {

            ImgUrlHelper.ShowResult("load");
            this.Upload(file);
        } 
        else {
            ImgUrlHelper.ShowResult("err");
        }
    },           

    Upload: function(file) {

        var fd = new FormData(); 
        fd.append("image", file); 
        var xhr = new XMLHttpRequest(); 

        xhr.open("POST", "https://api.imgur.com/3/upload", true); 
        xhr.onload = this.OnLoad;
        xhr.onerror = this.OnNetworkError;
        xhr.onreadystatechange = this.OnReadyStateChange;
        xhr.onprogress= this.OnProgress;
        
        xhr.setRequestHeader('Authorization', 'Client-ID 681172a9413df22');
        xhr.send(fd);
    },

    OnReadyStateChange : function(){
        if(this.readyState == 4 && this.status == 200)
        {
            var link = JSON.parse(this.responseText).data.link;
            $('#bannerUploadResultHidden').val(link);

            ImgUrlHelper.ShowResult("ok");
        }
        if(this.status != 200)
        {
            ImgUrlHelper.ShowResult("err");

            //log error
        }
    },
    
    OnNetworkError : function()
    {
        ImgUrlHelper.ShowResult("err");

        //log error
    },

    OnProgress : function(e)
    {
        if (e.lengthComputable) {
          var percentComplete = (e.loaded / e.total) * 100;
        }
    },

    OnLoad : function() {
    },

    ResizeToLarge :function(imageUrl){
        var indexStartExtension = imageUrl.lastIndexOf('.');
        var linkFirstPart = imageUrl.substring(0, indexStartExtension);

        var linkExtensionPart = imageUrl.substring(indexStartExtension);
        var resizedLink = linkFirstPart + "l" + linkExtensionPart;
        return resizedLink;
    },

    ShowResult:function(type){
        var element;

        if(type ==="load")
            element = "<i class='fa fa-spinner fa-spin' style='font-size:x-large;margin-top:10px;'></i>";

        if(type === "err")
            element = "<i class='fa fa-exclamation-triangle' style='font-size:x-large;margin-top:10px;'></i>";
        if(type === "ok")
            element = "<i class='fa fa-check-square-o' style='font-size:x-large;margin-top:10px;'></i>";


        $('#eventUploadResult').html(element);
    }

}

if ( !Date.prototype.toISOString ) {
  ( function() {
    
    function pad(number) {
      if ( number < 10 ) {
        return '0' + number;
      }
      return number;
    }
 
    Date.prototype.toISOString = function() {
      return this.getUTCFullYear() +
        '-' + pad( this.getUTCMonth() + 1 ) +
        '-' + pad( this.getUTCDate() ) +
        'T' + pad( this.getUTCHours() ) +
        ':' + pad( this.getUTCMinutes() ) +
        ':' + pad( this.getUTCSeconds() ) +
        '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
        'Z';
    };
  
  }() );
}