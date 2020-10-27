const prompt = require('prompt-sync')();

var n //number of players
var cardstate = []
var i

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

function shuffle(){
    for(i = 0; i < n; i++){
        userpoints[i] = 0
        var j=0
        var playercard = []
        for(j = 0; j < 4; j++){
            var cardno = pickcard()
            cardstate[cardno] = i+1
            userpoints[i]+=cardpoints[cardno]
            playercard.push(cardno)
            if(j<2){
                console.log('Player '+(i+1)+' : '+(j+1)+' card is '+ cardno)
            }
        }
        usercards.push(playercard)
    }
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
    console.log("Player number "+(playerno+1)+" move: ")
    console.log('Card from the center '+cardno)
    var tradecard = prompt("Enter your card number to trade: 1-4 from your deck or 5 to select the center card: ")
    var replacecard// cardno to be traded with
    if(tradecard < 5){
        replacecard = usercards[playerno+1][tradecard-1]
        usercards[playerno+1][tradecard-1] = cardno
        cardstate[replacecard] = 0;
        cardstate[cardno] = playerno
    }
    else{
        replacecard = cardno
    }
    userpoints[playerno] += cardpoints[cardno] - cardpoints[replacecard]

    var topcard = cardpoints[replacecard]
    console.log("Top card on the top is "+ topcard+ ". Enter similar cards")
    if(topcard == 7){
        var seecard = prompt("Enter which card of yours you want to see 1-4? ")
        console.log('Your card value is '+ cardpoints[usercards[playerno+1][seecard-1]])
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
        var tempcardno2 = usercards[playerno+1][tempcardno-1]
        usercards[otherplayer][seecard-1] = tempcardno2
        usercards[playerno+1][tempcardno-1] = tempcardno1
        userpoints[playerno] += cardpoints[tempcardno2] - cardpoints[tempcardno1]
        userpoints[otherplayer-1] += cardpoints[tempcardno1] - cardpoints[tempcardno2] 
    }

    //To allow other users to put matching cards
    var k
    for(k = 0; k<n; k++){
        console.log("For player number "+(k+1))
        var tot = prompt('Enter number of cards')
        var m
        for(m = 0; m<tot; m++){
            var deckcard = prompt("Enter the cardnumber to put into the deck")
            var thecard = usercards[k+1][deckcard-1]
            if(thecard!=0 && cardpoints[thecard]==topcard){
            usercards[k+1][deckcard-1] = 0
            cardstate[thecard] = 0
            userpoints[k] -= cardpoints[thecard]
            console.log("Done")
            }
            else{
                console.log("Wrong Move")
            }
        }
    }

    //to check if game is over
    var gameover = 0
    for(k=0; k<n; k++){
        var sum=0
        var m
        for(m=0; m<4; m++){
            if(usercards[k+1][m]>0){
                sum=1;
                break;
            }
        }
        if(sum==0 || userpoints[k]>50){
            gameover = 1;
            break;
        }
    }
    //if game is over, print the points of all users
    if(gameover){
        console.log("Game Over!")
        for(k=0; k<n; k++){
            console.log('Player'+(k+1)+' has '+userpoints[k]+' points')
        }
    }
    else{//if game not over, call for next player's move
        nextmove((playerno+1)%n)
    }
}

//Function to restart the game
function startgame(){
    console.log("Starting the game!")
    n = prompt("Enter number of players: ")
    userpoints = []
    usercards = [[]]
    for (i = 0; i < 52; i++){
        cardstate.push(0);
    }
    shuffle();
    nextmove(0)
}

//lets start the game
startgame()
