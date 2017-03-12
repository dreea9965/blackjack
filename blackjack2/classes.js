$(document).ready(function () {


// var playerhand = new Hand();
// var dealerhand = new Hand();



$('#reset-button').hide();


var getImageUrl = new Card();


var playerScore = 0;
var dealerScore = 0;
var pturn = true;




function Card(point, suit) {
  this.point = point;
  this.suit = suit;
}

Card.prototype.getImageUrl = function() {
  var name = this.point;
  if (name === 11) {
    name = 'jack';
  } else if (name === 12) {
    name = 'queen';
  } else if (name === 13) {
    name = 'king';
  } else if (name === 1) {
    name = 'ace';
  }
  return 'images/' + name + '_' + this.suit + '.png';
};



function Hand() {
  this.cards = [];
}


Hand.prototype.draw = function(card) {
  this.cards.push(card);
};

Hand.prototype.getPoints = function() {
  var sortedCards = this.cards.slice(0);
  function compare(one, other) {
    return other.point - one.point;
  }
  sortedCards.sort(compare);
  var sum = sortedCards.reduce(function combine(currentSum, card) {
    var point = card.point;
    if (point > 10 && point <= 13) {
      point = 10;
    } else if (point === 1) {
      if (currentSum + 11 <= 21) {
        point = 11;
      }
    }
    return currentSum + point;
  }, 0);
  return sum;
};

function Deck() {
  this.cards = [];
  for (var i = 1; i <= 13; i++) {
    this.cards.push(new Card(i, 'diamonds'));
    this.cards.push(new Card(i, 'spades'));
    this.cards.push(new Card(i, 'hearts'));
    this.cards.push(new Card(i, 'clubs'));
  }
}

Deck.prototype.draw = function() {
  var card = this.cards.pop();
  return card;
};

Deck.prototype.numCardsLeft = function() {
  return this.cards.length;
};

Deck.prototype.shuffle = function() {
  for (var i = 0; i < this.cards.length; i++) {
    var a = Math.floor(Math.random() * 52);
    var b = Math.floor(Math.random() * 52);

    var temp = this.cards[a];
    this.cards[a] = this.cards[b];
    this.cards[b] = temp;
  }
};


// Deck.prototype.deal = function(handSelector, currentPlayerHand, hole) {
//   var cardImg = "";
//   var text = "";
//
//   // draw the first card from the deck
//   var myCard = this.draw();
//
//   // add the card to the current player's hand
//   currentPlayerHand.cards.push(myCard);
//
//   // check if the current deal is a dealer hole card or not
//   if (!hole) {
//     cardImg = '<img class="card" src="' + myCard.getImageUrl() + '" alt="card image" />';
//     text = currentPlayerHand.getPoints();
//   } else {
//     cardImg = '<img id="dealer-hole-card" src="' + myCard.getImageUrl() + '" alt="image" />';
//     text = '???';
//   }
//
//   // render the image on the page
//   $("#"+ handSelector +"-hand").append(cardImg);
//
//   // update the current player's point count that is being displayed
//   $('#' + handSelector + '-points').text(text);
//
// };

var deck = new Deck();
var playerHand = new Hand();
var dealerHand = new Hand();


var card = new Card();

function deal(handSelector) {

    // draw the first card from the deck
    var myCard = deck.draw();

    // render the image on the page
    $("#"+ handSelector +"-hand").append('<img class="card" src="' + myCard.getImageUrl() + '" alt="" />');

    // check who is the current Hand Selector
    if (handSelector === "player") {
      hand = playerHand;
    } else {
      hand = dealerHand;
    }

    // add the card to the current Hand Selector's cards
    hand.cards.push(myCard);

    // update the Hand Selector's points
    $('#' + handSelector + '-points').text(hand.getPoints());

  }

// function Game(){
// this.deck = new Deck();
// this.playerHand = new Hand();
// this.dealerHand = new Hand();
//
// }
//
// Game.prototype.deal = function(){
//   this.deck.draw();
//   this.deck.shuffle();
//   console.log(this.deck.draw());
//
//
//   this.myDeck.deal('player', this.playerHand);
//   this.myDeck.deal('dealer', this.dealerHand);
//   this.myDeck.deal('player', this.playerHand);
//   this.myDeck.deal('dealer', this.dealerHand, 'hole');
//
//   $('#deal-button').hide();
//
// };

;
card.getImageUrl();


var dealt = false;

$('#deal-button').click(function(){
  console.log('hello');


  deck.draw();
  deck.shuffle();
  card.getImageUrl();

  playerHand.getPoints();

});

$('.buttons').on('click','#hit-button', function(e){
  console.log(e);
  if (playerHand.getPoints < 21) {
    deck.draw(playerHand);
    deck.draw(dealerHand);

    playerScore.push(playerHand.getPoints());
    console.log(playerHand.getPoints());
    dealerHand.getPoints();

  }
  if (playerScore > 21){
    $('#messages').text('You Dead!');
    $('#reset-button').show();
    pturn = false;
  }
});

$('.buttons').on('click','#stand-button', function(e){
  if (pturn === true){
    pturn = false;
    dealerHand.draw();

  }
});


});
