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

console.log(usercards[4][1])