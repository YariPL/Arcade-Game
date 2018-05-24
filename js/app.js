// Enemies our player must avoid
class Enemy {
    constractor() {}
    static render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    static update() {
            //move enemy every 0.1 seconds
            setInterval(function(){
                if(Enemy.x < 650){
                    Enemy.x = Enemy.x + Enemy.speed;
                } else {
                    Enemy.x = -100;
                    Enemy.speed = Math.random()
                }
                //if collision happend
                player.collision();
            }, 2050);
    }
}

class Enemy2{
    constructor() {}
    static render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    static update() {
            //move enemy every 0.3 seconds
            setInterval(function(){
                if(Enemy2.x < 650){
                    Enemy2.x = Enemy2.x + Enemy2.speed;
                } else {
                    Enemy2.x = -100;
                    Enemy2.speed = Math.random()
                }
                //if collision happend
                    player.collision();
                    //if player loose all 3 live happyend is impossible  
            }, 1750);
    }
}
class Enemy3{
    constructor() {}
    static render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    static update(dt) {
            //move enemy every 0.1 seconds
            setInterval(function(){
                if(Enemy3.x < 650){
                    Enemy3.x += Enemy3.speed;
                } else {
                    Enemy3.x = -100;
                    Enemy3.speed = Math.random();
                }
                //if collision happend
                player.collision();
            }, 1550);                       
    }
}
//declare all necessary values for all enemies
Enemy.x = -300;
Enemy.y = 60;
Enemy.sprite = 'images/enemy-bug.png';
Enemy.speed = 0.5;

Enemy2.x = -100;
Enemy2.y = 145;
Enemy2.sprite = 'images/enemy-bug.png';
Enemy2.speed = 0.5;

Enemy3.x = -200;
Enemy3.y = 230;
Enemy3.sprite = 'images/enemy-bug.png';
Enemy3.speed = 0.5;
Enemy.update();
Enemy2.update();
Enemy3.update();

// Place all enemy objects in an array called allEnemies
let allEnemies = [Enemy, Enemy2, Enemy3];
// Place the player object in a variable called player
class player {
    constractor(){}
    static update(){}
    //draw the player icon-avatar
    static render(){
        ctx.drawImage(Resources.get('images/char-boy1.png'), this.x, this.y);
    }
    static handleInput(e){
        console.log('keyup');
        //moving (if left go left and so on)
        switch(e) {
            case 'left':
                console.log('left');//move left
                if(player.x > 26){
                    player.x=player.x-100;
                }
                break;
            case 'up':
                console.log('up');//move up
                if(player.y >= 25){
                    player.y=player.y-85;
                }
                break;
            case 'right':
                console.log('right');//move right
                if(player.x < 399){
                    player.x=player.x+100;
                }
                break;
            case 'down':
                console.log('down');//move down
                if(player.y < 399){
                    player.y=player.y+85;
                }
                break ;
        }
        //if reach the watertrue
        if(player.y<60){
            player.x = 200;
            player.y = 400;
            player.points += 100;
            console.log(player.points);
        }
    }
    //if player has no life run final window
    static win() {
       if (player.lives === 0) {
            let winWindow = document.querySelector('.wins');
            winWindow.classList.add('win');
            //create win window
            winWindow.insertAdjacentHTML('afterbegin',`<div class='congrat'> Congratulations!</div>
                                        <div class='result'>You end with ${player.points} points</div>
                                        <div class='onceAgainButton'>Wanna try again...?</div>`);     
                //different endings gifs
                if(player.points<300) {
                    winWindow.insertAdjacentHTML('beforeend',`<img src='https://media.giphy.com/media/Q42cpzgcUeZkA/giphy.gif'>`);
                }else if(player.points<700){   
                    winWindow.insertAdjacentHTML('beforeend',`<img src='http://bestanimations.com/Music/Dancers/happy-dance/happy-dance-animated-gif-image-46-2.gif'>`);
                }else if(player.points<1200) {ііііііііііііііііііііііііііііііііііііііііііііііііііііііііііі
                    winWindow.insertAdjacentHTML('beforeend',`<img src='https://media.giphy.com/media/rypyVNU547qrC/giphy.gif'>`);
                }else {
                    winWindow.insertAdjacentHTML('beforeend',`<img src='https://i.gifer.com/nJw.gif'>`);
                }
            //delete previous win window for the new one
            let onceButton = document.querySelector('.onceAgainButton');
            onceButton.addEventListener('click', function(){
                while (winWindow.firstChild) {
                    winWindow.removeChild(winWindow.firstChild);
                    winWindow.style.display = 'none';
                }    
                player.points = 0;
                player.lives = 3;
            
            });
        }   
    }
    //if collision happend
    static collision() {
        if(player.x === Enemy.x && player.y === Enemy.y || player.x === Enemy2.x && player.y === Enemy2.y||player.x === Enemy3.x && player.y === Enemy3.y){
                    //reset to a starting point
                    player.x = 200;
                    player.y = 400;
                    //minus 1 live
                    player.lives--;
                    //if player loose all 3 live happyend is impossible
                    player.win();
        }
    }  
    static newGame() {
        let Game = document.querySelector('.start');
        Game.addEventListener('click',function(){
            startButton = document.getElementById('start').style.display = 'none';
            Enemy.x = -300;
            Enemy2.x = -100;
            Enemy3.x = -200;
        });
    }
}          
let startButton;
player.newGame();
player.x = 200;
player.y = 400;
player.lives = 3;
player.points = 0;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
