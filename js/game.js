const numDivs = 36;
const maxHits = 10;

let hits = 0;
let clicks = 0;
let score = 0;
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
   $("#status-message").text( $("#message-init").text() );
}

function endGame() {
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  let score = maxHits - clicks + hits;

  $("#status-message").text( $("#message-end").text() );
  $("#total-time-played").text(totalPlayedSeconds);
  $("#score").text(score);
  $(".game-field").addClass("d-none");
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  clicks = clicks +1;
  if( clicks === 1 ) {
     firstHitTime = getTimestamp();
     $("#status-message").text( $("#message-start").text() );
  }
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    round();
  }
  else {
    $(event.target).addClass("miss");
    setTimeout(function(){ $(event.target).removeClass("miss"); }, 100);
  }
  
  if( clicks > 1 && hits < maxHits ) {
     let mess = $("#message-round").text();
     mess = mess.replace("{clicks}", clicks);
     mess = mess.replace("{hits}", hits);
     $("#status-message").text(mess);
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
