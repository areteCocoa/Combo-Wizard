ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.entities.player',
	'game.entities.slime',
	'game.entities.zombie',
	'game.entities.spikes',
	'game.levels.level1',
	'game.levels.level2'
)
.defines(function(){

StartScreen = ig.Game.extend({
	font: new ig.Font( 'media/04b03.font.png' ),
	background: new ig.Image('media/combowizard.png'),
	init: function(){
		ig.input.bind(ig.KEY.MOUSE1, 'start');
	},
	update: function(){
		if(ig.input.pressed('start')){
			ig.system.setGame(MyGame)
		}
		this.parent();
	},
	draw: function(){
		this.parent();
		this.background.draw(0,0);
		var x = ig.system.width/2,
		y = ig.system.height/2;
		var t = new ig.Timer();
		if (t.delta()){
			this.font.draw('Click To Start', x , y + 130, ig.Font.ALIGN.CENTER);
		}

	}
});

GameOver = ig.Game.extend({
	font: new ig.Font( 'media/04b03.font.png' ),
	init: function(){
		ig.input.bind(ig.KEY.MOUSE1, 'start');
	},
	update: function(){
		if(ig.input.pressed('start')){
			ig.system.setGame(MyGame)
		}
		this.parent();
	},
	draw: function(){
		this.parent();
		var x = ig.system.width/2,
		y = ig.system.height/2;
			this.font.draw('Game Over', x , y, ig.Font.ALIGN.CENTER);
			this.font.draw('Click to Retry', x , y+10, ig.Font.ALIGN.CENTER);

	}
});

MyGame = ig.Game.extend({
	
	font: new ig.Font( 'media/04b03.font.png' ),
	gravity: 175,
	lives: 3,
	lifeImg: new ig.Image('media/life.png'),
	
	init: function() {
		//Spawns Player Entity
		// this.player = this.spawnEntity( EntityPlayer, 0,0 );

		//Binds Player Controls to Event Aliases.
		ig.input.bind( ig.KEY.UP_ARROW, 'up');
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right');
		ig.input.bind( ig.KEY.DOWN_ARROW, 'down');
		ig.input.bind( ig.KEY.Q, 'q');
		ig.input.bind( ig.KEY.W, 'w');
		ig.input.bind( ig.KEY.E, 'e');
		ig.input.bind( ig.KEY.R, 'r');
		//Loads Level1
		this.loadLevel( LevelLevel2 );
	},
	
	update: function() {
		// Allows the screen to move with the player.
		var player = this.getEntitiesByType( EntityPlayer )[0];
			  if( player ) {
            this.screen.x = player.pos.x - ig.system.width/2+10;
            this.screen.y = player.pos.y - ig.system.height/2;
        }
        // Refactored this code because it was spawning and not checking before it subtracting this.lives, so it added more lives. FIXED
        if ( player == undefined ){
        	this.lives--;
        	if(this.lives >= 0) {
        		this.player = this.spawnEntity( EntityPlayer, 20, 256 );
        	}
        	if(this.lives < 0){
        		ig.system.setGame(GameOver);
        	}
        }

        var slimes = this.getEntitiesByType( EntitySlime );
        if (!slimes[0]) {
        	for(var x=0; x<10; x++) {
        		this.spawnEntity( EntitySlime, Math.floor(Math.random() * 200) + 200, Math.floor(Math.random() * 75) + 50 );
        	}
        }
		this.parent();
	},
	
	draw: function() {
		this.parent();

		// Grab Player Object and display properties.
		var player = this.getEntitiesByType( EntityPlayer )[0];
		if( player ) {
			// Iterate through the lives, and display hearts.
            for (var i = 1; i <= this.lives; i++){
            	this.lifeImg.draw(i * 15 - 10, 25);
            }
            this.font.draw("Health: " + player.health, 5, 15, ig.Font.ALIGN.LEFT);
        }
		var x = ig.system.width;
		var y = ig.system.height;
		this.font.draw("Combo: " + elements, 5, 5, ig.Font.ALIGN.LEFT );
		this.font.draw( 'ComboWizard v0.0.3', x, 0, ig.Font.ALIGN.RIGHT );

	}
});


// Start the Game with 60fps, a resolution of 450x300, scaled
// up by a factor of 2
ig.main( '#canvas', StartScreen, 60, 450, 300, 2 );

});
