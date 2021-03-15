
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var index = 0;
var started = false;

function nextSequence(){
  level ++;
  index = 0;
  userClickedPattern = [];
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  var sound = "sounds/" + randomChosenColour + ".mp3";
  randomChosenColour = "#" + randomChosenColour;
  $(randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio = new Audio(sound);
  audio.play();

}

function checkAnswer(currentLevel){
  console.log("Cheater! Don't look here.");
  console.log(gamePattern);
  console.log(userClickedPattern);
  if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
    console.log("success");
    index++;
    if(index == level){
      setTimeout(nextSequence, 1000);
    }
  }else{
    console.log("wrong");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    started = false;
  }
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//nextSequence();
$(".btn").click(function (event) {
  var userChosenColour = $(this).attr("id");
  console.log("sound/" + userChosenColour + ".mp3");
  var audio = new Audio("sounds/" + userChosenColour + ".mp3");
  audio.play();
  //console.log(userClickedPattern);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  checkAnswer(index);
});

$(document).keypress(function() {
  if(started === false){
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    index = 0;
    started = true;
    $("#level-title").text("Level 0");
    nextSequence();
  }

});
