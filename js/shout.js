//Author: Thileepan Sivanandham
//Email: sktgthill@gmail.com

//Initialize parse
Parse.initialize('rrP68oytm7Q6QmHmaNsYZiBo7a9ZARcRtT5tOMox', 'xIt8fDW8ke6rfFJa1ewGDObxgsSwxD73BRkYSSzJ');

function checkForBlockWords(string, array){
    var arrKeys = array.length;
    var match = false;
    var patt;
    for(i=0; i < arrKeys; i++ ){
        patt = new RegExp(array[i]);
        if(patt.test(string))
		{
			match = true;
			return match;
		}
    }
    return match;
}

function shout()
{
	var message = document.getElementById('shoutarea').value;
	if(	checkForBlockWords(message, blockWords))
	{
		alert("ShoutBox detects abuse words in your shout. Please act as a human being.");
		return false;
	}
	$('#btnShout').button('loading');

	var Shouts = Parse.Object.extend("Shouts");
	var shouts = new Shouts();
	var user = currentLoggedInUser();	
	 
	/*
	var dateObj= new Date();
	var yyyy = dateObj.getFullYear().toString();
	var mm = (dateObj.getMonth()+1).toString(); // getMonth() is zero-based
	var dd  = dateObj.getDate().toString();
	var createdOn = yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]);
	*/
	var createdOn = Math.round(+new Date()/1000);//new Date().getTime();
	shouts.set("message", message);
	shouts.set("createdBy", user);
	shouts.set("createdOn", createdOn);	
	 
	shouts.save(null, {
	  success: function(shouts) {
		//alert('New object created with objectId: ' + shouts.id);
		document.getElementById('shoutarea').value = "";
		$('#btnShout').button('reset');
		getShouts();
	  },
	  error: function(shouts, error) {
		alert('Failed to create new object, with error code: ' + error.description);
		$('#btnShout').button('reset');
	  }
	});
	
}

function getShouts()
{	
	document.getElementById('shoutBoxDiv').innerHTML = '<img src="images/ajax-loader.gif" />&nbsp;Retreving shouts...';
	var Shouts = Parse.Object.extend("Shouts");
	var query = new Parse.Query(Shouts);
	query.descending("createdAt");
	query.find({
	  success: function(results) {

		/*
		// The object was retrieved successfully.
		var shoutBoxHTML = '<div class="list-group">';
		//alert("Successfully retrieved " + results.length + " scores.");
		for (var i = 0; i < results.length; i++) {
		  var object = results[i];
		  //console.log(object);
		  //alert(object.id + ' - ' + object.get('message'));
		 var _time = object.get('createdOn');
		 console.log(_time);
		 shoutBoxHTML += '<a href="#" class="list-group-item">';
			shoutBoxHTML += '<h4 class="list-group-item-heading"><span class="label label-primary">' + object.get('createdBy') + '</span></h4><small><abbr class="timeago pull-right">'+jQuery.timeago(_time)+'</abbr></small><p class="list-group-item-text">' + object.get('message') + '</p>';
		 shoutBoxHTML += '</a>';
		}
		shoutBoxHTML += '</div>';
		*/

		// The object was retrieved successfully.
		var shoutBoxHTML = '<ul class="list-group">';
		//alert("Successfully retrieved " + results.length + " scores.");
		for (var i = 0; i < results.length; i++) {
		  var object = results[i];
		  //console.log(object);
		//console.log('CreatedOn:' + object.get('createdOn'));
		 //var _time = object.get('createdOn');
		 //console.log(_time);
		 shoutBoxHTML += '<li class="list-group-item">';
			shoutBoxHTML += '<div class="row"><div class="col-xs-1"><img src="https://ssl.gstatic.com/ui/v1/icons/mail/profile_mask2.png" alt="..." class="img-circle"></div><div class="col-xs-9">' + '<b>' + object.get('createdBy') + '</b><p class="text-muted"><small>' + object.get('message') + '</small></p></div><div class="col-xs-2"><small><abbr class="pull-right" data-livestamp="'+object.get('createdOn')+'"></abbr></small></div></div>';
		 shoutBoxHTML += '</li>';
		}
		shoutBoxHTML += '</ul>';

		document.getElementById('shoutBoxDiv').innerHTML = shoutBoxHTML;
	  },
	  error: function(object, error) {
		// The object was not retrieved successfully.
		// error is a Parse.Error with an error code and description.
	  }
	});

/*
	jQuery(document).ready(function() {
	  jQuery("abbr.timeago").timeago();
	});
*/
}

function getShouters()
{

}