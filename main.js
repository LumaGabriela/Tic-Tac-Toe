// Circle and cross
const circle = '<i class="fas fa-dot-circle"></i>'
const cross = '<i class="fas fa-times"></i>'
//       //      //     //
const gameboard = (()=>{
    const gmboard = document.querySelector('#gameboard')
    const square = document.querySelectorAll('.block')
    const resDiv = document.querySelector("#resDiv")
    const sayResult = ''
    return {square, sayResult, resDiv, gmboard}
})()
//      //      //      //
const createPlayer = (name, choice)=> {
    const setName = name
    const setChoice = choice
    return {setName, setChoice}
}
const player1 = createPlayer('Player', cross)
const player2 = createPlayer('Robot', circle)
     //      //   Add event listeners   //     //
gameboard.square.forEach(sqr =>{
    sqr.addEventListener('mouseup', playGame)
})
document.querySelector('#restart').addEventListener('mouseup', restartGame)
let turn = 0
//      Play the turns      //
function playGame(choice) {
    if(this.innerHTML === '' && turn%2 === 0 ){
        choice = player1.setChoice
        this.innerHTML = choice
        turn ++
        gameboard.resDiv.innerHTML = `${player2.setChoice}'s  turn.`
        gameboard.resDiv.style.animation = 'resDiv .6s ease'
        setTimeout(animateDiv, 500)
        
    }else if(this.innerHTML === '' && turn%2 !== 0){
        choice = player2.setChoice
        this.innerHTML = choice
        turn ++
        gameboard.resDiv.innerHTML = `${player1.setChoice}'s  turn.`
        gameboard.resDiv.style.animation = 'resDiv .6s ease'
        setTimeout(animateDiv, 500)
    }
    winVerify()
    drawGame()
}

function animateDiv(){
    gameboard.resDiv.style.animation = ''
}
function drawGame(){
    let count = 0
    gameboard.square.forEach((sqr)=>{
        if(sqr.innerHTML!== ''){count ++}
    })
    if(count === 9){
        gameboard.resDiv.innerText = 'Draw Game'
    }
}
function winVerify(){
    const circle = 'fa-dot-circle'
    const cross = 'fa-times'
    const combo = []
    const circleCombo = [circle, circle, circle]
    const crossCombo = [cross, cross, cross]
    gameboard.square.forEach((sqr,i) =>{
        if(sqr.innerHTML!==''){ 
            combo[i] = sqr.children[0].classList[1];
        }
    })

    //      Verify winner     //
    const newCombo = {
        a:combo.slice(0,3),
        b:combo.slice(3,6),
        c:combo.slice(6,9),
        d:[combo[0], combo[4], combo[8]],
        e:[combo[2], combo[4], combo[6]],
        f:[combo[0], combo[3], combo[6]],
        g:[combo[1], combo[4], combo[7]],
        h:[combo[2], combo[5], combo[8]],
    }
    for(combination in newCombo){
        if(JSON.stringify(newCombo[combination]) === JSON.stringify(circleCombo)){
            gameboard.sayResult = player1.choice
            winGame()
            stopGame()
        }
    }
    for(combination in newCombo){
        if(JSON.stringify(newCombo[combination]) === JSON.stringify(crossCombo)){
            gameboard.sayResult = player2.choice
            winGame()
            stopGame()
        }
    }
}
//      //      //      //
function stopGame(){
    gameboard.square.forEach(sqr =>{
        sqr.removeEventListener('mouseup', playGame)
    })
}
//      //   Display the winner message   //      //
function winGame(){
    if(gameboard.sayResult === player1.choice){
        gameboard.resDiv.innerHTML = `${player1.setChoice}  won`
    }else if(gameboard.sayResult === player2.choice){
        gameboard.resDiv.innerHTML = `${player2.setChoice}  won`
    }
}
//      //  Restart game    //      //
function restartGame(){
    gameboard.sayResult = ''
    gameboard.resDiv.innerText = ''
    gameboard.square.forEach((sqr)=>{
        sqr.innerHTML = ''
        sqr.addEventListener('mouseup', playGame)
    })
    gameboard.gmboard.style.animation = 'resDiv .6s ease'
    setTimeout(animateGb, 600)
    
}
function animateGb(){
    gameboard.gmboard.style.animation = ''
}