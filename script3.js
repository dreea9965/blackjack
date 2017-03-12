$(document).ready(function () {

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
    return 'cards/' + name + '_' + this.suit + '.png';
  };

  function Hand() {
    this.cards = [];
    this.points = 0;
  }

  Hand.prototype.addCard = function(card) {
    this.cards.push(card);
  };

  Hand.prototype.getPoints = function() {
    var sortedCards = this.cards.slice(0);
    var totalPoints = 0;

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
    // this.deck= newDeck();
    // this.deck = newDeck();

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


  var playerHand = new Hand();
  var dealerHand = new Hand();
  var deck = new Deck();
  var dealt = false;
  var pturn = true;



  deck.draw();
   $('#reset-button').hide();


  // $('.buttons').on('click', '#reset-button', function(e){
  //
  // });

  function dealerTurn(){
    while (dealerHand.getPoints() < 17 ) {
      dealerHand.addCard();
      scoring();
      deck.draw();
    }

    if ( playerHand.getPoints() < 21) {
      while(dealerHand.getPoints() < playerHand.getPoints()) {
        dealerHand.addCard();
        scoring();
        deck.draw();
      }
    }
    scoring();
    winner();
    deck.draw();

  }

  // function calculatePoints(cards){
  //   var total = 0;
  //   var ace = 0;
  //   cards.forEach(function(e){
  //     if (e.point > 10 ) {
  //       e.point = 10;
  //     }
  //     else if (e.point === 1) {
  //       ace++;
  //       e.point = 11;
  //     }
  //     total += e.point;
  //   });
  //   for (var i = 0; i < ace; i++) {
  //     if (total > 21) {
  //       total -= 10;
  //     }
  //   }
  //   return total;
  // }

  // function newDeck(deck){
  //   var d = [];
  //
  //   for(var num = 1; num<=13; num++){
  //     for(var s = 0; s<4; s++){
  //      var x = '';
  //       switch(s){
  //         case 0:
  //           x='spades';
  //           break;
  //         case 1:
  //           x='hearts';
  //           break;
  //         case 2:
  //           x='clubs';
  //           break;
  //         case 3:
  //           x='diamonds';
  //           break;
  //       }
  //       d.push(new Card(num, x[s]));
  //     }
  //   }
  //   return d;
  // }
  //
  // function scoring(){
  //   console.log(playerHand);
  //   playerHand.getPoints() = playerHand.reduce(function(a,b){return a.point + b.point;});
  // }

function scoring(){
  playerScore = playerHand.getPoints();
  dealerScore = dealerHand.getPoints();
}



  // function deal(){
  //
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

function deal(player){
  var myCard = deck.draw();

  $('#' + player + '-hand').append('<img class="card" src="' + myCard.getImageUrl() + '"alt=""');
  if (player === "player"){
    hand = playerHand;
  } else{
    hand = dealerHand;
  }
  hand.cards.push(myCard);

  $('#' + player + '-points').text(hand.getPoints());

}


    $('#player-points').text(playerHand.getPoints());
  console.log('test');
  console.log(pturn);
    if (pturn === false){
      console.log('test2');
    $('#dealer-points').text(dealerHand.getPoints());
    }


  function initialDeal(){
    for (var i = 0; i<2; i++){
      playerHand.addCard();
      dealerHand.addCard();
    }
  }


  // function dealCards(player){
  //   var r = (Math.floor(
  //  Math.random() * deck.length));
  //  var t = deck.splice(r,1);
  //  player.push(Object.values(t)[0]);
  // }

  function winner(){
    if (playerHand.getPoints() <= 21 && playerHand.getPoints() > dealerHand.getpoints || playerHand.getPoints() <= 21 && dealerHand.getPoints() > 21) {
      //fireworks
      $('#messages').text('You win!');
       $('#reset-button').show();
      $('body').css('background-image','url(./media/fireworks.gif)');
    }

    else if(playerHand.getPoints() > 21 && dealerHand.getPoints() > 21 || playerHand.getPoints() == dealerHand.getPoints()){
      $('#messages').text('DRAW!');
       $('#reset-button').show();
    }
    else{
      $('#messages').text('You Dead!');
       $('#reset-button').show();
    }

  }



$('.buttons').on('touchstart click','#deal-button', function(e){
  if(dealt === false){
  initialDeal();
  dealt = true;
  }
  // playerHand.getPoints();
  deck.draw();
});



$('.buttons').on('touchstart click','#hit-button', function(e){
  if (playerHand.getPoints() < 21) {
    playerHand.addCard();

    // scoring();
    deck.draw();
    deck.draw();
  }

  if (playerHand.getPoints() > 21){
    $('#messages').text('You Dead!');
    $('#reset-button').show();
    pturn = false;
  }
});

$('.buttons').on('touchstart click','#stand-button', function(e){
  if (pturn === true){
    pturn = false;
    dealerTurn();
  }

});

});
