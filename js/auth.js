//Author: Thileepan Sivanandham
//Email: sktgthill@gmail.com

//Initialize parse
Parse.initialize('rrP68oytm7Q6QmHmaNsYZiBo7a9ZARcRtT5tOMox', 'xIt8fDW8ke6rfFJa1ewGDObxgsSwxD73BRkYSSzJ');

/*
var Shouts = Parse.Object.extend("Shouts");
var shouts = new Shouts();
shouts.destroy({
  success: function(myObject) {
  },
  error: function(myObject, error) {
    // The delete failed.
    // error is a Parse.Error with an error code and description.
	alert(error);
  }
});
*/

function showSigninDiv()
{
	document.getElementById('signinDiv').style.display = '';
	document.getElementById('signupDiv').style.display = 'none';
	document.getElementById('inputSignInEmail').focus();
}

function showSignupDiv()
{
	document.getElementById('signinDiv').style.display = 'none';
	document.getElementById('signupDiv').style.display = '';
	document.getElementById('inputSignUpName').focus();
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

	if(email == "")
	{
		alert("Please enter email. It can't be empty.");
		document.getElementById('inputSignInEmail').focus();
		return false;
	}
	else if(password == "")
	{
		alert("Please enter password. It can't be empty.");
		document.getElementById('inputSignInPwd').focus();
		return false;
	}

	$('#btnSignIn').button('loading');
	Parse.User.logIn(email, password, {
	  success: function(user) {
		
		//store the username and password in local storage
		//var storage = window.localStorage;
		//storage.setItem("shoutUserName", email);
		//storage.setItem("shoutPassword", password);

		// Do stuff after successful login.
		window.location.href = "shouts.html";
	  },
	  error: function(user, error) {
		// The login failed. Check error to see why.
		alert("Invalid login. Please try again");
		$('#btnSignIn').button('reset');
	  }
	});
}

function isUserLoggedIn()
{
	var currentUser = Parse.User.current();
	if (currentUser) {
		// do stuff with the user
		//console.log(currentUser);
		window.location.href = "shouts.html";
	} else {
		// show the signup or login page
		//window.location.href = "index.html";
	}
}

function currentLoggedInUser()
{
	var currentUser = Parse.User.current();
	if (currentUser) {
		// do stuff with the user
		//console.log(currentUser);
		return currentUser;
	}
}

function signup()
{
	var name = document.getElementById('inputSignUpName').value;
	var email = document.getElementById('inputSignUpEmail').value;
	var password = document.getElementById('inputSignUpPwd').value;

	if(name == "")
	{
		alert("Please enter name. It can't be empty.");
		document.getElementById('inputSignUpName').focus();
		return false;
	}
	else if(email == "")
	{
		alert("Please enter email. It can't be empty.");
		document.getElementById('inputSignUpEmail').focus();
		return false;
	}
	else if(password == "")
	{
		alert("Please enter password. It can't be empty.");
		document.getElementById('inputSignUpPwd').focus();
		return false;
	}

	$('#btnSignUp').button('loading');
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
		$('#btnSignUp').button('reset');
	  }
	});
}