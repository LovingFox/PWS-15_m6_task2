const numDivs = 36;
const maxHits = 10;

let hits = 0;
let clicks = 0;
let firstHitTime = 0;
let divSelector = undefined;

function round() {
  if( typeof divSelector != "undefined" ) {
     $(divSelector).removeClass("target");
     $(divSelector).text("");
  }

  if (hits === maxHits) {
    endGame();
  }
  else {
     divSelector = randomDivId();
     $(divSelector).addClass("target");
     $(divSelector).text(hits + 1);
  }
}

function initGame() {
   hits = 0;
   clicks = 0;
   firstHitTime = 0;
   round();
   $("#win-message").addClass("d-none");
   $(".game-field").removeClass("d-none");
   $("#status-message").text("Первый щелчек по квадрату запускает игру");
}

function endGame() {
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  let score = maxHits - clicks + hits;

  $("#status-message").text("Игра завершена");
  $("#total-time-played").text(totalPlayedSeconds);
  $("#score").text(score);
  $(".game-field").addClass("d-none");
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  clicks = clicks +1;
  if( clicks === 1 ) {
     firstHitTime = getTimestamp();
     $("#status-message").text("Время пошло...");
  }
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    round();
  }
  else {
    $(event.target).addClass("miss");
    setTimeout(function(){ $(event.target).removeClass("miss"); }, 100);
  }
}

function init() {
  initGame();

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    initGame();
  });
}

$(document).ready(init);
