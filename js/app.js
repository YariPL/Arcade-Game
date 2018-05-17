// Enemies our player must avoid
let enemy = class Enemy{
   constractor() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    }

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
    static update(dt) {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    }

// Draw the enemy on the screen, required method for game
    static render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}
enemy.x = 300;
enemy.y = 300;
// Now write your own player class



// Now instantiate your objects.


// Place all enemy objects in an array called allEnemies
let allEnemies = [];

// Place the player object in a variable called player
class player {

    constractor(){
    }
    static update(){}
    static render(){
        ctx.drawImage(Resources.get('images/char-boy.png'), this.x, this.y);
    }

    static handleInput(e, x, y){
        //if 37 move left so on
        console.log('keyup');

        switch(e) {
            case 'left':
                console.log('1ass');//move left
                player.x=player.x-100;
                break;
            case 'up':
                console.log('2ass');//move up
                player.y=player.y-85;
                break;
            case 'right':
                console.log('3ass');//move right
                ;
                player.x=player.x+100;
                break
            case 'down':
                console.log('4ass');//move down
                ;
                player.y=player.y+85;
                break 
        }
    }
}

player.x = 200;
player.y = 400;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
