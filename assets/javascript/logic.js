// This is for the Parallax effect
$(document).ready(function(){

    // $('.parallax').parallax();
 
    // var userInput = //the actual interests of the user from the profile page. Used to search meetups
    // var userZip = //zipcode from profile page. used to search meetups
    //when user is created run this ajax request and store the latitude and longitude
var userLat=0;
var userLong=0;
    $.ajax({
      url: "https://maps.googleapis.com/maps/api/geocode/json",
      method: 'GET',
      data:{
        address:"32812",
        key:"AIzaSyDbO-ivrJFAH2KzMeRPuVOemHCxDqL3guQ"
      }
    }).done(function(response){
    
      console.log(response.results[0].geometry.location.lat);
      console.log(response.results[0].geometry.location.lng)
      userLat=response.results[0].geometry.location.lat;
      userLong=response.results[0].geometry.location.lng;
      
    });

  

  // ajax function call for landing page ... meet-ups
    $.ajax({
      url: "https://api.meetup.com/find/upcoming_events",
      method: 'GET',
      data:{
        // page: 5,
        // text:"jogging",
        // lat:userLat,
        // lon:userLong,
        key: "5a1b20747e54172335c4d412b296823",
        sign:"true"
      }
    }).done(function(response){
      console.log(response);
    });

  });

    $('.parallax').parallax();
  

//get firebase crap all sorted out
var config = {
  apiKey: "AIzaSyD9zUxSiYvAJ5aS_EhGLIx_MWILBbJy4TY",
  authDomain: "project-1-530e9.firebaseapp.com",
  databaseURL: "https://project-1-530e9.firebaseio.com",
  projectId: "project-1-530e9",
  storageBucket: "project-1-530e9.appspot.com",
  messagingSenderId: "441047690869"
};
//start firebase
firebase.initializeApp(config);

var database = firebase.database();
var currentUser;

//login a CURRENT user
$("#login-btn").on("click", function (event) {
  event.preventDefault();
  console.log("LOGIN button clicked");


  var email = $("#email-input").val();
  var password = $("#password-input").val();
  var auth = firebase.auth();


  //firebase CURRENT user method
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {

      var errorCode = error.code;
      var errorMessage = error.message;
      var auth = firebase.auth();
      console.log(error.code);
      console.log(error.message);
      alert(error.code + " " + error.message);


  });

});

//signup a NEW user
$("#signup-btn").on("click", function (event) {
  event.preventDefault();
  console.log("SIGNUP button clicked");


  var email = $("#email-input").val();
  var password = $("#password-input").val();
  var auth = firebase.auth();

  //firebase NEW user method
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(error.code);
      console.log(error.message);
      alert(error.code + " " + error.message);
  });

});

//signout button
$("#logout-btn").on("click", function (event) {
  event.preventDefault();
  console.log("LOGOUT button was clicked");
  alert("You have logged out");

  firebase.auth().signOut().then(function () {
      console.log("Logged out!")
  }, function (error) {
      console.log(error.code);
      console.log(error.message);
  });

});



firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
      currentUser = user;
      console.log(user.displayName + "user is currently signed in");
      //NOT SURE IF I NEED THESE
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
  } else {
      console.log("No users are signed in");
      // ...
  }
});

//updating profile info to firebase
$("#update-btn").on("click", function (event) {
  event.preventDefault();

  var firstName = $("#fn-input").val();
  var lastName = $("#ln-input").val();
  var branch = $("#branch-input").val();
  var rank = $("#rank-input").val();
  var zip = $("#zipcode-input").val();
  var hobbies = $("#hobbies-input").val();

  //create a temp object to pass to database
  var newProfile = {
      firstname: firstName,
      lastname: lastName,
      branch: branch,
      rank: rank,
      zipcode: zip,
      hobbies: hobbies,
      uid: currentUser.uid
  };

  database.ref("/userProfiles").push(newProfile);

});


database.ref("/userProfiles").on("child_added", function (childSnapshot, prevChildKey) {
  if (childSnapshot.val().uid === currentUser.uid) {
      console.log(childSnapshot.val());
  }


  // Store everything into a variable.
  var firstName = childSnapshot.val().firstname;
  var lastName = childSnapshot.val().lastname;
  var branch = childSnapshot.val().branch;
  var rank = childSnapshot.val().rank;
  var zip = childSnapshot.val().zipcode;
  var hobbies = childSnapshot.val().hobbies;

});


var name, email, photoUrl, uid, emailVerified;

if (user != null) {
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
  uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
  // this value to authenticate with your backend server, if
  // you have one. Use User.getToken() instead.
}

