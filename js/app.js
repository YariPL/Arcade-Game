class Player {
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
                if(Player.x > 26){
                    Player.x=Player.x-100;
                }
                break;
            case 'up':
                if(Player.y >= 25){
                    Player.y=Player.y-85;
                }
                break;
            case 'right':
                if(Player.x < 399){
                    Player.x=Player.x+100;
                }
                break;
            case 'down':
                if(Player.y < 399){
                    Player.y=Player.y+85;
                }
                break ;
        }
        //if reach the watertrue
        if(Player.y<60){
            Player.x = 200;
            Player.y = 400;
            Player.points += 100;
         }
    }
    
   static newGame() {
        let Game = document.querySelector('.start');
        Game.addEventListener('click',function() {
            startButton = document.getElementById('start').style.display = 'none';
            Enemy.x = -300;
            Enemy2.x = -100;
            Enemy3.x = -200;
        });
        rules = document.querySelector('.rules');
        rules.addEventListener('click',function() {
            document.querySelector('.rulesExplain').style.display = 'flex';
        })
        back = document.querySelector('.backButton');
        back.addEventListener('click', function() {
            document.querySelector('.rulesExplain').style.display = 'none';
        })

    }

    //if collision happend
    static collision() {
        if(Player.x === Enemy.x && Player.y === Enemy.y || Player.x === Enemy2.x && Player.y === Enemy2.y||Player.x === Enemy3.x && Player.y === Enemy3.y){
                    //reset to a starting point
                    Player.x = 200;
                    Player.y = 400;
                    //minus 1 live
                    Player.lives--;
                    if(Player.lives == 0){
                        Player.win();
                    }

                    //if Player loose all 3 live happyend is impossible
                    
        }
    }  
 

//if Player has no life run final window
    static win() {
       if (Player.lives === 0) {
            let winWindow = document.querySelector('.wins');
            winWindow.classList.add('win');
            //create win window
            winWindow.insertAdjacentHTML('afterbegin',`<div class='congrat'> Congratulations!</div>
                                        <div class='result'>You end with ${Player.points} points</div>
                                        <div class='onceAgainButton'>Wanna try again...?</div>`);     
                //different endings gifs
                if(Player.points<300) {
                    winWindow.insertAdjacentHTML('beforeend',`<img src='https://media.giphy.com/media/Q42cpzgcUeZkA/giphy.gif'>`);
                }else if(Player.points<700){   
                    winWindow.insertAdjacentHTML('beforeend',`<img src='http://bestanimations.com/Music/Dancers/happy-dance/happy-dance-animated-gif-image-46-2.gif'>`);
                }else if(Player.points<1200) {
                    winWindow.insertAdjacentHTML('beforeend',`<img src='https://media.giphy.com/media/rypyVNU547qrC/giphy.gif'>`);
                }else {
                    winWindow.insertAdjacentHTML('beforeend',`<img src='https://i.gifer.com/nJw.gif'>`);
                }
            //delete previous win window for the new one
            let onceButton = document.querySelector('.onceAgainButton');
            onceButton.addEventListener('click', function(){
                while (winWindow.firstChild) {
                    winWindow.removeChild(winWindow.firstChild);
                }   
                            document.querySelector('.wins').classList.remove('win');
 
                Player.points = 0;
                Player.lives = 3;
                Enemy.x = -300;
                Enemy2.x = -100;
                Enemy3.x = -200;          
              });
        }   
    }

}   
// Enemies our Player must avoid
class Enemy {
    constractor() {}
    static render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    static update(dt) {

            //move enemy every 0.1 seconds
                if(Enemy.x < 650){
                    Enemy.x = Enemy.x + Enemy.speed;
                } else {
                    Enemy.x = -100;
                    Enemy.speed = speedArray[Math.floor(Math.random()*speedArray.length)];

                }
                //if collision happend
                Player.collision();
}
}
class Enemy2 extends Enemy{
    static render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    static update(dt) {
                if(Enemy2.x < 650){
                    Enemy2.x = Enemy2.x + Enemy2.speed ;
                } else {
                    Enemy2.x = -100;
                    Enemy2.speed = speedArray[Math.floor(Math.random()*speedArray.length)];
                    }
                //if collision happend
                    Player.collision();
    }
}
class Enemy3 extends Enemy{
    static render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    static update(dt) {
                if(Enemy3.x < 650){
                    Enemy3.x += Enemy3.speed;
                } else {
                    Enemy3.x = -100;
                    Enemy3.speed = speedArray[Math.floor(Math.random()*speedArray.length)];

                }
                //if collision happend
                Player.collision();
    }
}
//declare all necessary values for all enemies
let speedArray = [4,10,  20];

Enemy.x = -300;
Enemy.y = 60;
Enemy.sprite = 'images/enemy-bug.png';
Enemy.speed = speedArray[Math.floor(Math.random()*speedArray.length)];

Enemy2.x = -100;
Enemy2.y = 145;
Enemy2.sprite = 'images/enemy-bug.png';
Enemy2.speed = speedArray[Math.floor(Math.random()*speedArray.length)];

Enemy3.x = -200;
Enemy3.y = 230;
Enemy3.sprite = 'images/enemy-bug.png';
Enemy3.speed = speedArray[Math.floor(Math.random()*speedArray.length)];
Enemy.update();
Enemy2.update();
Enemy3.update();
// Place all enemy objects in an array called allEnemies
let allEnemies = [Enemy, Enemy2, Enemy3];
// Place the Player object in a variable called Player
   
let back;
let rules;    
let startButton;
Player.newGame();
Player.x = 200;
Player.y = 400;
Player.lives = 3;
Player.points = 0;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    Player.handleInput(allowedKeys[e.keyCode]);
});
