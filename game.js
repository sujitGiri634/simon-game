//Button colours stored in an array
var buttonColours = ["red", "blue", "green", "yellow"];

//Storing given Pattern as an array
var gamePattern = [];
//Storing user Pettern as an array
var userClickedPattern = [];

//Setting staring value
var started = false;
var level = 0;

//To start the game with pressing any key on keyboard
$(document).keypress(function(){
	if(!started){
		$("#level-title").text("Level " + level);
		nextSequence();
		started = true;
	}
})

//It makes note of user clicked pattern and stored in line 7 
$(".btn").click(function(){
	//Gettin colour,chosen by user, using id 
	var userChosenColour = $(this).attr("id");
	userClickedPattern.push(userChosenColour);
	
	playSound(userChosenColour);
	animatePress(userChosenColour);
	
	checkAnswer(userClickedPattern.length-1);
});

//To check user answer sequence and given sequence are same
function checkAnswer(currentLevel){
	if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
		if(userClickedPattern.length === gamePattern.length){
			setTimeOut(function (){
				nextSequence();
			},1000);
		}
	} else {
		playSound("wrong");
		$("body").addClass("game-over");
		$("#level-title").text("Game Over, Press Any Key to Restart");
		
		setTimeOut(function(){
			$("body").removeClass("game-over");
		},200);
		
		startOver();
	}
}

//Give the next sequence 
function nextSequence(){
	//Resetting user clicked pattern to null
	userClickedPattern = [];
	level++;
	$("#level-title").text("Level " + level);
	
	//Choosing ramdon colour from colour stored in array
	var randomNumber = Math.floor(Math.random()*4);
	var randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);
	
	//Adding animation to represent a click
	$("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
	playSound(randomChosenColour);
}

//Adding pressed class to each colour using id 
function animatePress(currentColour){
	$("#" + currentColour).addClass("pressed");
	setTimeOut(function (){
		$("#" + currentColour).removeClass("pressed");
	}, 100);
}

//play sound from sounds file 
function playSound(name){	
	var audio = new Audio("sounds/"+name+".mp3");
	audio.play();
}

//to shatr over the game by initializing attributes
function startOver(){
	level = 0;
	gamePattern = [];
	started = false;
}
