const prompt = require('prompt-sync')();

var n = 4 //number of players
var cardstate = []
var i
for (i = 0; i < 52; i++){
    cardstate.push(0);
}
var cardpoints = []
//intializing ponts for the cards
for(i = 0; i<52; i++){
    cardpoints.push(i%13+1)
}
//changing red king's value to -1
cardpoints[12] = -1
cardpoints[25] = -1

var userpoints = []
var usercards = [[]]
for(i = 0; i < n; i++){
    userpoints[i] = 0
    var j=0
    var playercard = []
    for(j = 0; j < 4; j++){
        var cardno = pickcard()
        cardstate[cardno] = i+1
        userpoints[i]+=cardpoints[cardno]
        playercard.push(cardno)
    }
    usercards.push(playercard)
}

//picks a card from center
function pickcard(){
    var cardno = Math.floor(Math.random() * 52);
    while(cardstate[cardno] !=0){
        cardno = (cardno + 1)%52
    }
    return cardno 
}

function nextmove(playerno){
    var cardno = pickcard()
    console.log("Player number "+playerno+" move: ")
    console.log('Card from the center '+cardno)
    var tradecard = prompt("Enter your card number to trade: 1-4 from your deck or 5 to select the center card")
    var replacecard// cardno to be traded with
    if(tradecard < 5){
        replacecard = usercards[playerno][tradecard-1]
        usercards[playerno][tradecard-1] = cardno
        cardstate[replacecard] = 0;
        cardstate[cardno] = playerno
    }
    else{
        replacecard = cardno
    }
    userpoints[playerno-1] += cardpoints[cardno] - cardpoints[replacecard]

    var topcard = cardpoints[replacecard]
    if(topcard == 7){
        var seecard = prompt("Enter which card of yours you want to see 1-4? ")
        console.log('Your card value is '+ cardpoints[usercards[playerno][seecard-1]])
    }
    else if(topcard == 8){
        var otherplayer = prompt("Enter the player number to check one card from the deck")
        var seecard = promt("Enter his card number to see")
        console.log('The card value is'+ cardpoints[usercards[otherplayer][seecard-1]])
    }
    else if(topcard == 9){
        var otherplayer = prompt("Enter the player number to exchange one card from the deck")
        var seecard = prompt("Enter his card number")
        var myseecard = prompt("Enter you card number to exchange")
        var tempcardno1 = usercards[otherplayer][seecard-1]
        var tempcardno2 = usercards[playerno][tempcardno-1]
        usercards[otherplayer][seecard-1] = tempcardno2
        usercards[playerno][tempcardno-1] = tempcardno1
        userpoints[playerno] += cardpoints[tempcardno2] - cardpoints[tempcardno1]
        userpoints[otherplayer] += cardpoints[tempcardno1] - cardpoints[tempcardno2] 
    }

    //To allow other users to put matching cards
    var k
    for(k = 0; k<n; k++){
        var tot = prompt('Enter number of cards')
        var m
        for(m = 0; m<tot; m++){
            var deckcard = prompt("Enter the cardnumber to put into the deck")
            var thecard = usercards[k+1][deckcard-1]
            usercards[k+1][deckcard-1] = 0
            cardstate[thecard] = 0
        }
    }
}

var name = prompt('What is your name?');
console.log(`Hey there ${name}`);

console.log(usercards[4][1])