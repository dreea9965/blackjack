$(document).ready(function () {
  var playerHand = [];
  var dealerHand =[];
  var deck = newDeck();
  var dealt = false;
  var playerScore = 0;
  var dealerScore = 0;
  var pturn = true;

  draw();
   $('#reset-button').hide();

  $('.buttons').on('click','#deal-button', function(e){
    if(dealt === false){
    initialDeal();
    dealt = true;
    }
    scoring();
    draw();
  });

  $('.buttons').on('click','#hit-button', function(e){
    if (playerScore < 21) {
      dealCards(playerHand);
      scoring();
      draw();
      draw();
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
      dealerTurn();

    }
  });

  // $('.buttons').on('click', '#reset-button', function(e){
  //
  // });

  function dealerTurn(){
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

  }

  function calculatePoints(cards){
    var total = 0;
    var ace = 0;
    cards.forEach(function(e){
      if (e.point > 10 ) {
        e.point = 10;
      }
      else if (e.point === 1) {
        ace++;
        e.point = 11;
      }
      total += e.point;
    });
    for (var i = 0; i < ace; i++) {
      if (total > 21) {
        total -= 10;
      }
    }
    return total;
  }

  function newDeck(deck){
    var d = [];

    for(var num = 1; num<=13; num++){
      for(var s = 0; s<4; s++){
       var x = '';
        switch(s){
          case 0:
            x='spades';
            break;
          case 1:
            x='hearts';
            break;
          case 2:
            x='clubs';
            break;
          case 3:
            x='diamonds';
            break;
        }
        d.push({point: num, suit: x});
      }
    }
    return d;
  }
  //
  // function scoring(){
  //   console.log(playerHand);
  //   playerScore = playerHand.reduce(function(a,b){return a.point + b.point;});
  // }

function scoring(){
  playerScore = calculatePoints(playerHand);
  dealerScore = calculatePoints(dealerHand);
}



  function draw(){

    $('#dealer-hand').children().remove();
    $('#player-hand').children().remove();

    for(var n=0; n < playerHand.length; n++){

      $('#player-hand').append('<img class =\'card\'src=./cards/' + playerHand[n].point + '_' + playerHand[n].suit + '.png>');
    }

    for(var n=0; n < dealerHand.length; n++){

      if (n === 0 && pturn === true){
        var back = Math.floor((Math.random() * 9) +1);
        console.log('<img class =\'card\'src=./cards/back' + back+'.png>');
        $('#dealer-hand').append('<img class =\'card\'src=./cards/back' + back+'.png>');
      }
      else{
        console.log('<img class =\'card\'src=./cards/' + dealerHand[n].point + '_' + dealerHand[n].suit + '.png>');
        $('#dealer-hand').append('<img class =\'card\'src=./cards/' + dealerHand[n].point + '_' + dealerHand[n].suit + '.png>');
      }
    }
    $('#player-points').text(playerScore);
  console.log('test');
  console.log(pturn);
    if (pturn === false){
      console.log('test2');
    $('#dealer-points').text(dealerScore);
    }
  }

  function initialDeal(){
    for (var i = 0; i<2; i++){
      dealCards(playerHand);
      dealCards(dealerHand);
    }
  }


  function dealCards(player){
    var r = (Math.floor(
   Math.random() * deck.length));
   var t = deck.splice(r,1);
   player.push(Object.values(t)[0]);
  }

  function winner(){
    if (playerScore <= 21 && playerScore > dealerScore || playerScore <= 21 && dealerScore > 21) {
      //fireworks
      $('#messages').text('You win!$$$');
       $('#reset-button').show();
      $('body').css('background-image','url(./media/fireworks.gif)')
    }
    else if(playerScore > 21 && dealerScore > 21 || playerScore == dealerScore){
      $('#messages').text('DRAW!');
       $('#reset-button').show();
    }
    else{
      $('#messages').text('You Dead!');
       $('#reset-button').show();
    }

  }





});
