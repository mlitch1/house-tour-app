// Wait for Apache Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);
 geocoder = new google.maps.Geocoder();



   function showAlert(message, subject, button) {
         message = message;
         subject = subject;
         button = button;
         navigator.notification.alert(
            message,  // message
            alertDismissed,         // callback
            subject,            // title
            button
    );
        }



  // alert dialog dismissed
        function alertDismissed() {
            // do something
        } 

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


   
// PhoneGap is ready
function onDeviceReady() {
	navigator.splashscreen.hide();
    captureApp = new captureApp();
    captureApp.run();
  
}


function captureApp() {
  
}

function loadMapScript() {
setTimeout(function(){
       $.mobile.loading('show', { theme: 'a', textVisible: true, text:"Loading Properties Near Your Current Location" });
       initializeMap();},1);    
   
}







function initializeMap(mapOptions) {
 if(navigator.geolocation){
    
    var map, mapOptions, currentLocation, currentLocationMarker;
   
     navigator.geolocation.getCurrentPosition(buildMap, onError, {maximumAge:600000, timeout:5000, enableHighAccuracy: true});
      }
  function buildMap(pos) {
	//alert('test2');
    var latitude  = pos.coords.latitude;
    var longitude = pos.coords.longitude;
    var myLatlng = new google.maps.LatLng(latitude, longitude);
     
     $.post("http://www.beyondtheballot.com/find.php", {latitude: latitude, longitude: longitude})
    .done(function( data ) {
   // alert( "Data Loaded: " + data );
         points = data.split("; "); 
  //  alert(points[0]);
var arrayLength = points.length;
        // alert(arrayLength);
for (var i = 0; i < arrayLength; i++) {
   populateHouse(points[i], i);
    //alert('test');
}
     });
  

     
  
    //  var aberdeen_point = points[0];
     // alert(aberdeen_point);
    var mapOptions = {
    center : myLatlng,
    zoom : 12,
    mapTypeId : google.maps.MapTypeId.ROADMAP
  };
  
       currentwindow = null;

  
      
      var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
      var myLatlng = new google.maps.LatLng(latitude, longitude);
     google.maps.event.addListenerOnce(map, 'idle', function(){
   $.mobile.loading('hide');
});
      
      

      var currentIcon = 'http://www.beyondtheballot.com/images/currentlocation.png';
      
      var tourIcon = 'http://www.beyondtheballot.com/images/homeicon.png';
       
       
      
      var contentString1 = '<div id="content" class="popup">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Your Location</h1>'+
      '<div id="bodyContent">'+
      '<p><a href="#createTourPage" >Create a Tour</a></</p>'+
      '</div>'+
      '</div>';

  var infowindow1 = new google.maps.InfoWindow({
      content: contentString1
  });



    
     var mymarker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      animation: google.maps.Animation.DROP,
       icon: currentIcon,
      title: 'Your Location'
  });
      
      
      mymarker.setMap(map);
  google.maps.event.addListener(mymarker, 'click', function() {
    infowindow1.open(map,mymarker);
  });
    
      
       function populateHouse (coord, i){
         var coords = coord.split(',');
      var loc = new google.maps.LatLng(coords[0], coords[1]);
      var address = coords[2];
      var video_link = coords[3];
           
      var marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      position: loc,
      map: map,
      icon: tourIcon,
      title: 'House Tour Available'
  });

    
    marker.setMap(map);  
   google.maps.event.addListener(marker, 'click', function() {
   var  contentString = generateInfo(address, video_link);
   
   var infowindow1 = new google.maps.InfoWindow({
      content: contentString
  });
          
       infowindow1.open(map,marker);
      
  });
   function generateInfo (address, video_link) {

       var content= '<div id="content" class="popup">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">'+address+'</h1>'+
      '<div id="bodyContent">'+
      '<ul><li><li><i class="fa fa-video-camera"></i> &nbsp; <a href="http://www.beyondtheballot.com/tourVideo.html" target="_blank">Tour This Property</a></li></ul>'+
      '</div>'+
      '</div>';
    return content;
}
       }

     
}
 
}




function onError(error) {
 // alert('''code: ' + error.code + '\n' + 'message: ' + error.message + '\n''');
   alert("There was an error obtaining your GPS coordinates.  Please check your phone to make sure location services is turned on.");
    // alert(error);
     $.mobile.loading('hide');// I added this because   
        $.alert({
        title: 'Alert!',
        content: 'Simple alert!',
        confirm: function(){
            alert('Confirmed!');
        }
    });
}









function createTour(project_id, tourTitle, latitude, longitude)
{
 //alert('lat '+latitude);   
   // var e = id("stringselect");
   // var roomType = e.options[e.selectedIndex].text;
    var description = id("desc").value;
    var room_video_url =  id("room_video_url").value;
    //var email = localStorage.getItem("user_id");
   
  
  $.post("http://www.beyondtheballot.com/createTour.php", {project_id: project_id, room_type: 'test', room_desc: description, room_video_url: room_video_url, email: email, tourTitle: tourTitle, latitude: latitude, longitude: longitude});
 
    // $.mobile.navigate("#home", {transition: "flip", info: "info about the #bar hash"});
    //    .done(function( data ) {
      
        
   $( "#tourQuestions" ).popup( "close" );
  //showAlert("Your video tour has been received.  We have begun combining the videos, adding transitions, and captions. We will email you when it's ready!", "Success!", "Close");
     $.mobile.changePage('#home', { transition: 'flip' });
     $.mobile.pushStateEnabled = false;
    
    
$.mobile.pushStateEnabled = false;
	}
     









captureApp.prototype = {
    pictureSource:null,
    
    destinationType:null,
     
    run:function() {
        
      
    
  
                                    
       
        var that = this;
     	
        //create and set project id
        id("project_id").value=makeid();
        
        
  id("createTourPageButton").addEventListener("click", function() {
   	alert('test');   
      
  });
        
        
        x=0;
        id("findButton").addEventListener("click", function() {
        if(x==0){
            
            loadMapScript();
           }
          x++;
   
        });
        
        id("register_button").addEventListener("click", function() {
        $.mobile.changePage("#register", { transition: "fade" });
   
        });
        
         id("createRegister").addEventListener("click", function() {
      		var firstName = id("firstName").value;
   		    var lastName =  id("lastName").value;
            var dob =  id("dob").value;
            var reg_email =  id("reg_email").value;
            var reg_pw =  id("reg_pw").value;
             //alert(firstName + " "+ lastName + " " + dob + " " + reg_email + reg_pw);
            
   			//validation
             
             //validate email address
    			var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    		  if (!re.test(reg_email)) {
  
     showAlert('Please use a valid email address.', 'Error', 'Try Again');
       return false;
  }     
             
               if (firstName.length < 2) {
                showAlert('A first name is required.', 'Error', 'Try Again');
      			 return false; 
             }
             
             //validate last name
         	 if (lastName.length < 2) {
                showAlert('A last name is required.', 'Error', 'Try Again');
      			 return false; 
             }
             
             //validate date of birth
             var reGoodDate = /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;
   			if (!reGoodDate.test(dob)) {
                 showAlert('Please check the format of your date of birth', 'Error', 'Try Again');
       return false;    
            }
             
              //check to see if password entered is minimum character lenth
                if (reg_pw.length < 8) {
                    showAlert('Your password should be at least 8 characters long.', 'Error', 'Try Again');
                    return false;
                }
               
             
                  
             
             
  			//validate first name
           
             
             //end validation of date of birth
             ////////////////end validation
             
             
             
             $.post("http://www.beyondtheballot.com/registerTour.php", {firstName: firstName, lastName: lastName, dob: dob, reg_email: reg_email, reg_pw: reg_pw})
    .done(function( data ) {
    alert( "Data Loaded: " + data );
        $.mobile.changePage("#logon", { transition: "fade" });
        });
      });     
        
        //this is when you click on the popup, it displays the capture video routine
		 id("transparent").addEventListener("click", function() {
  //	that._captureVideo.apply(that, arguments);  
            // id("transparent").popup("destroy");
            // alert('test');
             $( "#transparent" ).popup("close");
            that._captureVideo.apply(that, arguments);
          //  videoCapturePlusDemo(false,false,2)
 });
        
        
        
        
       //this is when you click on the popup, it displays the capture video routine
		 id("createTourButton").addEventListener("click", function() {
  			  $( "#tourQuestions" ).popup( "open" ); //open up additonal questions
             if (navigator.geolocation) {
                 navigator.geolocation.getCurrentPosition(success, error,  { enableHighAccuracy: true,
  timeout: 5000, maximumAge: 0});
            
             function success(pos){
               var crd = pos.coords;
                  
                  latitude =crd.latitude;
                  longitude = crd.longitude;
            
                  // var latlng = latitude +","+ longitude;
                   var latlng = new google.maps.LatLng(latitude, longitude);
                 geocoder.geocode({
        'latLng': latlng
    }, function(results, status) {

     
//alert(JSON.stringify(results, null, 4));
        var gStreet = results[0].address_components;             
        var gAddress = results[0].formatted_address;
      //  var gAddress = gAddress.split(",");
   alert(gAddress);
      // <a href="#popupDialog" data-rel="popup" data-position-to="window" data-role="button" data-inline="true" data-transition="pop">Dialog</a
     $( "#addressQuestion" ).popup( "open" ); //open up additonal questio
        //alert(JSON.stringify(results, null, 4));
        //var gCity = gAddress[0];
        //var gZip = gAddress[2];
        //var gState = gAddress[1];
                  
          //   var gState = gState.split(" ");
                     
            //  var fState = gState[1].trim();       
              // var fZip = gState[2];  
                 
              //$("#city").val(gCity);
               $('#address').val(gAddress);
                //     $('select[name="state"]').find('option[value="LA"]').attr("selected",true);
                  //$('select[name="state"]').selectmenu('refresh', true);
   			 //$("[name=state]"$('[name=options]')
             //  $('#state option[value=fState]').attr('selected',).val('LA');
                     
             //  $('#state option[value=fState]').attr('selected', true)      
         //     $("#zip").val(fZip);
    }//close function results
			 
			 );//close geocode
			               
    
   
             }//close success
             }
          
          function error() {
                  
                
              }
            
              // createTour(id("project_id").value);
             }
           
 );
         id("finalSubmitTour").addEventListener("click", function() {
           
        	$( "#tourQuestions" ).popup("close");
            var tourTitle=$("#tourTitle").val();
         createTour(id("project_id").value, tourTitle, latitude, longitude);
                        
           
        });
       
         id("room_desc").addEventListener("click", function() {
           
           // if (id("rm_count").innerHTML == "1" ) {
               // var e = id("stringselect");
				//var roomType = e.options[e.selectedIndex].text;
                var description = id("desc").value;
                var room_video_url = document.getElementById("current_video_url").value;
               var project_id = document.getElementById("project_id").value;
				
             // navigator.geolocation.getCurrentPosition(getLocate, alert('error'), {maximumAge:600000, timeout:5000, enableHighAccuracy: true});
     		
            // alert(latitude);
             submitVideo(description, room_video_url, project_id);
              //clear form fields and add one to button and remove popup
          // id("stringselect").value ="0";
         //   id("stringselect").value = "0";
            id("desc").value ="";
         
            //remove popup
             $( "#questions" ).popup( "close" );       
           //add one to room count on button display

           // id("createTour").style.display = "";
           //   $('#createTourButton').fadeIn('slow');]
              $('#createTourDiv').fadeIn('slow');
               //$('#createTourButton').show('refresh');
              $('#captureVideo').text('Capture Next Room').button('refresh');
             //make create tour button visible
             
             //}
         });
        
       function submitVideo(description, room_video_url, project_id) {
          	var project_id = id("project_id").value;
            var user_id = localStorage.getItem("user_id");
            var roomType = "Living Room";
           $.post("http://www.beyondtheballot.com/tour/submitVideoFade.php", { room_type: roomType, room_desc: description, room_video_url: room_video_url, project_id: project_id, user_id: user_id })
    .done(function( data ) {
   // alert( "Data Loaded: " + data );
               showAlert("This video clip has been uploaded.", "Video Uploaded", "Proceed")
	id("video_counter").value=parseInt(id("video_counter").value)+1;
               // uploadFile(capturedFiles[0]);  
               //   that._uploadFile.apply(capturedFiles[0], that, arguments);
  });
       
       }
        
   
         
        
        
        
      
        
        id("captureVideo").addEventListener("click", function() {
           
            
      //   if (id("rm_count").innerHTML == "1" ) {
          
            // alert('test');
             $( "#transparent" ).popup( "open" );             
           // $( "#transparent" ).bind('close', function(){alert('test')});
             // that._captureVideo.apply(that, arguments);
             exit();
       // }
         
        });
       // id("captureAudio").addEventListener("click", function() {
         //   that._capureAudio.apply(that, arguments);
        //});
     //   id("captureImage").addEventListener("click", function() {
       //     that._captureImage.apply(that, arguments);
        //});
       $( "#transparent" ).click(function()  {
            that._uploadFile(capturedFiles[0]);
            //alert('test');
        });
    },
    
     
     
    
    
    
    
    _captureVideo:function() {
        var that = this;
		
      
        
        navigator.device.capture.captureVideo(function() {
            that._captureSuccess.apply(that, arguments);
        }, function() { 
            captureApp._captureError.apply(that, arguments);
        }, {limit:1});
    },
    
    _capureAudio:function() {
        var that = this;
        navigator.device.capture.captureAudio(function() {
            that._captureSuccess.apply(that, arguments);
        }, function() { 
            captureApp._captureError.apply(that, arguments);
        }, {limit:1});
    },
    
    _captureImage:function() {
        var that = this;
        navigator.device.capture.captureImage(function() {
            that._captureSuccess.apply(that, arguments);
        }, function() { 
            captureApp._captureError.apply(that, arguments);
        }, {limit:1});
    },
    
    _captureSuccess:function(capturedFiles) {
       
        var i,
      
         media = document.getElementById("media");
      //  media.innerHTML = "";
        for (i=0;i < capturedFiles.length;i+=1) {
            
          	//var path =  capturedFiles[i].fullPath.replace("file:", ""); 
           // media.innerHTML+=""
            //media.innerHTML+='<p>Capture taken! Its path is: ' + path + '</p>';
            // media.innerHTML+=' <ul data-role="listview" data-style="inset"><li><label>What room is this?<select><option value=""></option><option value="First Option">Exterior Front</option><option value="Second Option">Kitchen</option></select></label></li></ul>';
         //  media.innerHTML+= '<video id="video" autobuffer height="240" width="360"><source src="'+capturedFiles[i].fullPath+'"></video>';
            
          // <video src="+capturedFiles[i].fullPath+"></video>"
            //media.innerHTML+= '<button  class="button dh"  id="uploadVideos" data-role="button" data-bind="events:{ click: listener}">Upload Tour</button>';
            
      captureApp._uploadFile(capturedFiles[i]);
           // alert(capturedFiles[i].duration;)
            $( "#questions" ).popup( "open" );  
            //captureApp._loadMovie();
            
           function alertObject(obj){      
        for(var key in obj) {
        alert('key: ' + key + '\n' + 'value: ' + obj[key]);
        if( typeof obj[key] === 'object' ) {
            alertObject(obj[key]);
        }
        }
    }
            //alert(capturedFiles[i].getFormatData(function(data)));
         //  capturedFiles[i].getFormatData(function(data) {
          //    alertObject(data);
//});
           // var sFile = new MediaFile("video", capturedFiles[i].fullPath);
//console.log("file path = " + sFile.fullPath);
//capturedFiles[i].getFormatData(function(data) {
   // alert("duration = " + data.duration);
//}, function() {
  //  alert("fail");
//});


            
            
        }
    },
    
    
     // Upload files to server
    _uploadFile:function(mediaFile) {
    $('#room_desc').button();     
    $('#room_desc').button('disable');		
       media.innerHTML="";
        var ft = new FileTransfer(),
            path = mediaFile.fullPath,
          name = 'test.mp4';
     
        
        
       ft.upload(path, encodeURI("http://www.beyondtheballot.com/upload2.php"),
          function(result) {
            document.getElementById("room_video_url").value+=" "+result.response;
            document.getElementById("current_video_url").value=result.response;
           $('#room_desc').button('enable');	
           //alert(result.response) ;  
           //alert('Upload success: ' + result.responseCode);
              //alert(result.bytesSent + ' bytes sent');
              // alert(path);
      },
         function(error) {
              alert('Error uploading file ' + path + ': ' + error.code);
          },
           { fileName: name });
    },
    
    
    _captureError:function(error) {
        if (window.navigator.simulator === true) {
            alert(error);
        }
        else {
            var media = document.getElementById("media");
            media.innerHTML = "An error occured! Code:" + error.code;
        }
    },
}



var airlinesApp = function(){}

airlinesApp.prototype = function() {
    
    var _flightForCheckin = null,
    _flightForDetails=null,
    _ffNum = null, 
    _customerData = null,
    _login = false,
    
    run = function(){
        var that = this,
        $seatPicker=$('#seatPicker');       
        

        $('#home').on('pagebeforecreate',$.proxy(_initHome,that));
   
        $('#find').on('pagebeforeshow',$.proxy(_initFind,that));
          
        $('#createTourPage').on('pagebeforeshow',$.proxy(_initTour,that));
        
        
        $('#myTripsListView').on('click', 'li', function () {
        	var item = $(this);
        	_flightForCheckin = item.data('flight');
            _flightForDetails = item.data('flight');
        });
        
       
    },
   
    _initFind = function(){
        var user_id = localStorage.getItem("user_id");
              //  alert(user_id);
         },
        
     _initTour = function(){
       showAlert('We require a small fee of $3.99 to encode and process your video tour.  This fee is payable at time of download via PayPal.', 'Encoding Is Expensive', 'Continue')
         },
    
   
    _initHome = function(){
		        
        if (!_login) {
	    	$.mobile.changePage("#logon", { transition: "flip" });
	    	$('#login').submit(function () {
	    		//$(this).hide();
	    		
                email=$('#email').val();
                pw=$('#pwd').val();
            
               //check to see if password entered is minimum character lenth
                if (pw.length < 8) {
                    showAlert('Your password should be at least 8 characters long.', 'Error', 'Try Again');
                    return false;
                }
               
    			var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    		  if (!re.test(email)) {
  
     showAlert('Please check your email address.', 'Error', 'Try Again');
       return false;
  }     
                
         
                 $.post("http://www.beyondtheballot.com/tour_login.php", {email: email, pw: pw})
                  .done(function( data ) {
               
                  _handleLogOn(data);
                 });
                 
	    		//airData.logOn($('#email').val(), $('#pwd').val(),_handleLogOn);
	    		return false;
	    	});
	    }
      
    },
    
   
    _handleLogOn = function (data) {   
      // data= data);
        data=JSON.parse(data);
    if( data.status == 'success' ) {
       
       localStorage.setItem("user_id", data.user_id);
       localStorage.setItem("firstName", data.firstName);
       localStorage.setItem("lastName", data.lastName);
       localStorage.setItem("bookmarks", data.bookmarks);
       localStorage.setItem("dob", data.dob);
          _login = true;
        $('.name_display').text(localStorage.getItem("firstName") +" "+ localStorage.getItem("lastName"));
        $('.bookmark_display').text(localStorage.getItem("bookmarks"));
        $('.dob_display').text(localStorage.getItem("dob"));
      // alert ('test '+localStorage.getItem('bookmarks'));
        $.mobile.changePage("#home", { transition: "fade" });  
         
        
    } else {
       //alert('test');
          showAlert('Your email address or password is incorrect.', 'Error', 'Try Again');
      	$(this).show();
         _login = false;
        
    }
 },
       
    
   // _handleLogOn = function (ff, success) {
//		if (success) {
  //         alert(ff);
//			_ffNum = ff;
//			airData.getDataforFF(_ffNum,_handleDataForFF);
//		}
//	},
    
    _handleDataForFF = function (data) {
        $flightList = $('#myTripsListView');
		_customerData = data;
		$('#ffname').text(data.firstName);
		$('#ffnum').text(data.ffNum);
		$('#currentStatus').text(data.status);
		$('#miles').text(data.miles);
		$('#numberOfFlights').text(data.flights.length);
		for (var i in data.flights) {
			var flight = data.flights[i],
            currentSegment = flight.segments[flight.currentSegment];
			$flightList.append('<li id="' + flight.id + '"><a href="#tripDetail" data-transition="slide">' + currentSegment.from+'</a></li>');
			var item = $('#' + flight.id, $flightList);
			item.data('flight', flight);
			if (flight.timeToCheckIn) {

				item.addClass('checkIn');
				$('a', item).attr('href', '#checkIn');
			}
			else {
				item.addClass('tripDetail');
			}
		}
		$.mobile.changePage('#home', { transition: 'flip' });

	};
    
    return {
        run:run,
    };
}();