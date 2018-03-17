$( document ).ready(function() {
// initialize firebase
   var config = {
    apiKey: "AIzaSyA1hIhx1cLF9Ym1jqZ_AoI18mGCjxUFoUE",
    authDomain: "train-schedular-3b366.firebaseapp.com",
    databaseURL: "https://train-schedular-3b366.firebaseio.com",
    projectId: "train-schedular-3b366",
    storageBucket: "",
    messagingSenderId: "337795484692"
  };
  // Initialize Firebase
  firebase.initializeApp(config);

// a var to represent the database
 var database = firebase.database();

 var trainName = "";
 var destination = "";
 var trainTime = "";
 var frequencyTime = ""; 




// Capture Button Click
$("#submit").on("click", function() {
  // Don't refresh the page!
  event.preventDefault();

  //variables to retireve data from the form 
  var trainName = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();
  var trainTime = moment($("#trainTime").val().trim(), "HH:mm").format("X");
  var frequencyTime = $("#frequencyTime").val().trim();

  //creates local "temp" object for holding train data
 var newTrain = {
  name: trainName,
  dest: destination,
  time: trainTime,
  freq: frequencyTime
 };

  //uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.time);
  console.log(newTrain.freq);

  // Alert
  alert("Added New Train");

  // Clears all of the text-boxes
  $("#trainName").val("");
  $("#destination").val("");
  $("#trainTime").val("");
  $("#frequencyTime").val("");

  //end of click function
  });

//create firebase event for adding new trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(snapshot) {
  console.log(snapshot.val());

  //store everything into a veriable 
  var trainName = snapshot.val().name;
  var destination = snapshot.val().dest;
  var trainTime = snapshot.val().time;
  var frequencyTime = snapshot.val().freq;
 
 console.log(trainName);
 console.log(destination);
 console.log(trainTime);
 console.log(frequencyTime);

//traintime pushed back 1 yr to make sure it comes before current time
 var firstTimeConv = moment(trainTime, "HH:mm").subtract(1, "years");
 console.log(firstTimeConv);

//current time
var currentTime = moment();

//calculate difference between times
  var difference =  moment().diff(moment(firstTimeConv),"minutes");

//time apart(remainder)
  var trainRemain = difference % frequencyTime;

//minutes until arrival
  var minUntil = frequencyTime - trainRemain;

//next arrival time
  var nextArrival = moment().add(minUntil, "minutes").format('hh:mm');


//add each train's data into the table
 $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" 
  + destination + "</td><td>" + frequencyTime + "</td><td>" + nextArrival + 
  "</td><td>" + minUntil + (" min") +
   "</td></tr>") 
//end of firebase event 
}); 
//end of document function
});

