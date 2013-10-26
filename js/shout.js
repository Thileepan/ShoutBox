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
	var message = document.getElementById('shoutArea').value;
	if(	checkForBlockWords(message, blockWords))
	{
		//alert("ShoutBox detects abuse words in your shout. Please act as a human being.");
		document.getElementById('waringMsgDiv').style.display="";
		document.getElementById('waringMsgSpan').innerHTML = "ShoutBox detects abuse words in your shout. Please act as a human being.";
		return false;
	}
	if(message.length == 0)
	{
		//alert("We couldn't hear your shout! Please aloud more.");
		document.getElementById('waringMsgDiv').style.display="";
		document.getElementById('waringMsgSpan').innerHTML = "We couldn't hear your shout! Please shout aloud.";
		return false;
	}

	$('#btnSendShout').button('loading');

	var Shouts = Parse.Object.extend("Shouts");
	var shouts = new Shouts();
	var user = currentLoggedInUser();	
	var name = user.get('firstname');
	 
	var createdOn = Math.round(+new Date()/1000);//new Date().getTime();
	shouts.set("message", message);
	shouts.set("createdBy", name);
	shouts.set("createdOn", createdOn);	
	 
	shouts.save(null, {
	  success: function(shouts) {
		//alert('New object created with objectId: ' + shouts.id);
		document.getElementById('shoutArea').value = "";
		$('#btnSendShout').button('reset');
		getShouts();
	  },
	  error: function(shouts, error) {
		alert('Failed to create new object, with error code: ' + error.description);
		$('#btnSendShout').button('reset');
	  }
	});
	
}

function getShouts()
{	
	document.getElementById('spanPage1').style = 'border-bottom:3px solid #109adc;';
	document.getElementById('spanPage2').style = '';
	document.getElementById('spanPage3').style = '';

	hideCreateShoutArea();
	document.getElementById('mainDiv').innerHTML = '<img src="images/ajax-loader.gif" />&nbsp;Please wait...';

	var Shouts = Parse.Object.extend("Shouts");
	var query = new Parse.Query(Shouts);
	query.descending("createdAt");
	query.find({
	  success: function(results) {

		// The object was retrieved successfully.
		var shoutBoxHTML = '';//'<a href="#" class="curHand" onclick="getShouts();">Refresh</a>';
//		shoutBoxHTML += '<ul class="list-group">';
		//alert("Successfully retrieved " + results.length + " scores.");
		for (var i = 0; i < results.length; i++) {
		  var object = results[i];
		  //console.log(object);
		//console.log('CreatedOn:' + object.get('createdOn'));
		 //var _time = object.get('createdOn');
		 //console.log(_time);
//		 shoutBoxHTML += '<li class="list-group-item">';
			shoutBoxHTML += '<div class="row" style="border-bottom:1px solid lightgrey;padding-top:10px;"><div class="col-xs-2"><img src="images/shout.jpg" alt="..." class="img-thumbnail img-responsive"></div><div class="col-xs-8">' + '<span class="text-info"><b>' + object.get('createdBy') + '</b></span><p class="text-muteds"><small>' + object.get('message') + '</small></p></div><div class="col-xs-2"><small><abbr class="text-muted pull-right" data-livestamp="'+object.get('createdOn')+'"></abbr></small></div></div>';
//		 shoutBoxHTML += '</li>';
		}
//		shoutBoxHTML += '</ul>';

		document.getElementById('mainDiv').innerHTML = shoutBoxHTML;
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

function showCreateShoutArea()
{
	document.getElementById('mainDiv').style.display = 'none';
	//document.getElementById('projLblShout').style.display = 'none';
	document.getElementById('projLblShout').style.cssFloat="left";
	document.getElementById('shoutAreaDiv').style.display = '';
	document.getElementById('btnCreateShout').style.display = 'none';
	document.getElementById('btnBackShout').style.display = '';
	document.getElementById('btnSendShout').style.display = '';
	document.getElementById('projLblShout').style.marginLeft="41%"
//	document.getElementById('shoutArea').focus();
}

function hideCreateShoutArea()
{
	document.getElementById('mainDiv').style.display = '';
	document.getElementById('projLblShout').style.display = '';
	document.getElementById('shoutAreaDiv').style.display = 'none';
	document.getElementById('btnCreateShout').style.display = '';
	document.getElementById('btnBackShout').style.display = 'none';
	document.getElementById('btnSendShout').style.display = 'none';
	document.getElementById('projLblShout').style.cssFloat="Left";
	document.getElementById('projLblShout').style.marginLeft="10px"
}

function getShouters()
{

}

function getFollowingList()
{
	var Follows = Parse.Object.extend("Follows");
	var query = new Parse.Query(Follows);
	query.descending("createdAt");
	query.equalTo("sourceid", "Dan Stemkoski");
	query.find({
		success: function(results) {
			//success
		},
		error: function(object, error) {
			// The object was not retrieved successfully.
			// error is a Parse.Error with an error code and description.
		}
	});
}

function getFollowersList()
{
}

function searchShouters()
{
	var query = new Parse.Query(Parse.User);
	//query.equalTo(gender, "female");  // find all the women
	query.find({
		success: function(users) {
			console.log(users);
			var searchHTML = '';
			for (var i = 0; i < users.length; i++)
			{
				var object = users[i];
				searchHTML += '<div class="row" style="border-bottom:1px solid lightgrey;padding-top:10px;">';
					searchHTML += '<div class="col-xs-9"><span class="text-info"><b>' + object.get('username') + '</b></span><p class="text-muted"><small>' + object.get('firstname') + '</small></p></div>';
					searchHTML += '<div class="col-xs-3"><button type="button" class="btn btn-primary">Follow</button></div>';
				searchHTML += '</div>';
				document.getElementById('searchListDiv').innerHTML = searchHTML;
			}

		},
		error: function(user, error) {
			alert("Unable to list the shouters");
		}
	});
}

function loadSettings()
{
	document.getElementById('spanPage1').style = '';
	document.getElementById('spanPage2').style = '';
	document.getElementById('spanPage3').style = 'border-bottom:3px solid #109adc;';

	var currentUser = currentLoggedInUser();
	if(currentUser)
	{
		var userName = currentUser.get('username');
		var firstName = currentUser.get('firstname');

		var settingsHTML = '';
		settingsHTML += '<div class="panel panel-default">';
			settingsHTML += '<div class="panel-body" align="center">';
				settingsHTML += '<img src="images/profile-picture.jpg" alt="..." class="img-thumbnail img-responsive">';
				settingsHTML += '<b>'+ firstName +'</b>';
				settingsHTML += '<p>'+ userName + '</p>';
			settingsHTML += '</div>';
		settingsHTML += '</div>';
		settingsHTML += '<div class="row">';
			settingsHTML += '<div align="center"><button type="button" class="btn btn-primary">Following</button>&nbsp;';
			settingsHTML += '<button type="button" class="btn btn-primary">Followers</button></div>';
		settingsHTML += '</div>';
/*
		settingsHTML += '<form class="form-horizontal" role="form">';
			settingsHTML += '<div class="form-group">';
				settingsHTML += '<label class="col-xs-4 control-label text-info">UserName</label>';
				settingsHTML += '<div class="col-xs-8">';
					settingsHTML += '<p class="form-control-static">'+ userName +'</p>';
				settingsHTML += '</div>';
			settingsHTML += '</div>';
			settingsHTML += '<div class="form-group">';
				settingsHTML += '<label for="inputPassword" class="col-xs-4 control-label text-info">FirstName</label>';
				settingsHTML += '<div class="col-xs-8">';
					settingsHTML += '<input type="text" class="form-control" id="inputFirstName" placeholder="FirstName" value="'+ firstName +'">';
				settingsHTML += '</div>';
			settingsHTML += '</div>';
			settingsHTML += '<div class="form-group">';
				settingsHTML += '<div class="col-lg-offset-4 col-xs-8">';
					settingsHTML += '<button type="submit" class="btn btn-default">Save</button>';
				settingsHTML += '</div>';
			settingsHTML += '</div>';
		settingsHTML += '</form>';
*/
		document.getElementById('mainDiv').innerHTML = settingsHTML;
//		return settingsHTML;
	}
	else
	{
		alert("Unable to load the settings. Please try again.");
	}
}

function hideWaring()
{
	document.getElementById('waringMsgDiv').style.display="none";	
}
function enableShoutbtn()
{
	if(document.getElementById('shoutArea').value.length > 0)
	{
		document.getElementById('btnSendShout').disabled = false;
	}
	else if(document.getElementById('shoutArea').value.length == 0)
	{
		document.getElementById('btnSendShout').disabled = true;
	}
}