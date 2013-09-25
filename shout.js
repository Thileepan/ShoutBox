//Initialize parse
Parse.initialize('rrP68oytm7Q6QmHmaNsYZiBo7a9ZARcRtT5tOMox', 'xIt8fDW8ke6rfFJa1ewGDObxgsSwxD73BRkYSSzJ');

function showSigninDiv()
{
	document.getElementById('signinDiv').style.display = '';
	document.getElementById('signupDiv').style.display = 'none';
}

function showSignupDiv()
{
	document.getElementById('signinDiv').style.display = 'none';
	document.getElementById('signupDiv').style.display = '';
}

function logout()
{
	Parse.User.logOut();
	window.location.href = "index.html";
}

function signin()
{
	var email = document.getElementById('inputSignInEmail').value;
	var password = document.getElementById('inputSignInPwd').value;

	Parse.User.logIn(email, password, {
	  success: function(user) {
		// Do stuff after successful login.
		window.location.href = "shouts.html";
	  },
	  error: function(user, error) {
		// The login failed. Check error to see why.
		alert("Invalid login. Please try again");
	  }
	});
}

function currentLoggedInUser()
{
	var currentUser = Parse.User.current();
	if (currentUser) {
		// do stuff with the user
		console.log(currentUser);
	} else {
		// show the signup or login page
		window.location.href = "shouts.html";
	}
}

function signup()
{
	var name = document.getElementById('inputSignUpName').value;
	var email = document.getElementById('inputSignUpEmail').value;
	var password = document.getElementById('inputSignUpPwd').value;

	var user = new Parse.User();
	user.set("username", email);
	user.set("password", password);
	user.set("firstname", name);
	 
	// other fields can be set just like with Parse.Object
	//user.set("phone", "415-392-0202");
	 
	user.signUp(null, {
	  success: function(user) {
		alert("Conguragulations! Your account has been setup successfully");
		window.location.href= "shouts.html";
	  },
	  error: function(user, error) {
		// Show the error message somewhere and let the user try again.
		alert("Error: " + error.code + " " + error.message);
	  }
	});
}

function shout()
{
	var message = document.getElementById('shoutarea').value;
	var Shouts = Parse.Object.extend("Shouts");
	var shouts = new Shouts();
	 
	shouts.set("message", message);
	shouts.set("createdBy", "Thileepan");
	shouts.set("createdOn", "2013-09-26");
	 
	shouts.save(null, {
	  success: function(shouts) {
		//alert('New object created with objectId: ' + shouts.id);
		getShouts();
	  },
	  error: function(shouts, error) {
		alert('Failed to create new object, with error code: ' + error.description);
	  }
	});
}

function getShouts()
{	
	var Shouts = Parse.Object.extend("Shouts");
	var query = new Parse.Query(Shouts);
	query.find({
	  success: function(results) {
		// The object was retrieved successfully.
		var shoutBoxHTML = '<table class="table table-striped">';
		//alert("Successfully retrieved " + results.length + " scores.");
		for (var i = 0; i < results.length; i++) {
		  var object = results[i];
		  //alert(object.id + ' - ' + object.get('message'));
		  shoutBoxHTML += '<tr><td>' + object.get('message') + '</td></tr>';
		}
		shoutBoxHTML += '</table>';
		document.getElementById('shoutBoxDiv').innerHTML = shoutBoxHTML;
	  },
	  error: function(object, error) {
		// The object was not retrieved successfully.
		// error is a Parse.Error with an error code and description.
	  }
	});
}
