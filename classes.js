
$(document).ready(function () {
  var playerHand = [];
  var dealerHand =[];
  var deck = newDeck();
  var dealt = false;
  var playerScore = 0;
  var dealerScore = 0;
  var pturn = true;



function Player(){
  this.hand = 0;
  this.bet = 0;
  this.cash = 1000;
  this.bank = 0;
  this.score = '';

}

function Dealer(){
  this.hand = 0;
  this.score = '';

}


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
  return 'images/' + name + '_of_' + this.suit + '.png';
};

function Hand() {
  this.cards = [];
}

Hand.prototype.addCard = function(card) {
  this.cards.push(card);
};

Hand.prototype.initalDeal = function(){
    for (var i = 0; i<2; i++){
      dealCards(playerHand);
      dealCards(dealerHand);
    }
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

Hand.prototype.dealerTurn = function(){
  while (dealerScore < 17 ) {
    dealCards(dealerHand);
    scoring();
    draw();
  }

  if ( playerScore < 21) {
    while(dealerScore < playerScore) {
      dealCards(dealerHand);
      scoring();
      draw();
    }
  }
  scoring();
  winner();
  draw();

};

Hand.prototype.scoring = function(){
  playerScore = calculatePoints(playerHand);
  dealerScore = calculatePoints(dealerHand);
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


//   $('#dealer-hand').children().remove();
//   $('#player-hand').children().remove();
//
//   for(var n=0; n < playerHand.length; n++){
//
//     $('#player-hand').append('<img class =\'card\'src=./cards/' + playerHand[n].point + '_' + playerHand[n].suit + '.png>');
//   }
//
//   for(var n=0; n < dealerHand.length; n++){
//
//     if (n === 0 && pturn === true){
//       var back = Math.floor((Math.random() * 9) +1);
//       console.log('<img class =\'card\'src=./cards/back' + back+'.png>');
//       $('#dealer-hand').append('<img class =\'card\'src=./cards/back' + back+'.png>');
//     }
//     else{
//       console.log('<img class =\'card\'src=./cards/' + dealerHand[n].point + '_' + dealerHand[n].suit + '.png>');
//       $('#dealer-hand').append('<img class =\'card\'src=./cards/' + dealerHand[n].point + '_' + dealerHand[n].suit + '.png>');
//     }
//   }
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

// var playerHand = new Hand();
// var dealerHand = new Hand();

var player1 = Player();
var dealer = Dealer();

});
