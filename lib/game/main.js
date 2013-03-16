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
	'game.entities.playerSpawn',
	'game.entities.particleExplosion',
	'game.levels.level1',
	'game.levels.level2',
	'game.levels.chunk1'
)
.defines(function(){

StartScreen = ig.Game.extend({
	font: new ig.Font( 'media/04b03.font.png' ),
	background: new ig.Image('media/combowizard.png'),
	init: function(){
		ig.input.bind(ig.KEY.MOUSE1, 'start');
		this.textTimer = new ig.Timer();
		this.textOn = true;
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
		if (this.textTimer.delta() >= .5){
			this.textOn = !this.textOn;
			this.textTimer.reset();
		}
		if (this.textOn){
			this.font.draw('Click to Start', x, 200, ig.Font.ALIGN.CENTER);
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
		this.loadLevel( LevelChunk1 );
		this.spawnPlayer();
	},
	
	update: function() {
		// Allows the screen to move with the player. Smooth scrolling.
		var player = this.getEntitiesByType( EntityPlayer )[0];

		if( player ) {
            var xDifference = player.pos.x - ig.system.width/2;
			var yDifference = player.pos.y - ig.system.height/2;

			if (this.screen.x > xDifference + 2 || this.screen.x < xDifference - 2) {
				this.screen.x = (9*this.screen.x + xDifference)/10;
			} else {
				this.screen.x = xDifference;
			}
			if (this.screen.y > yDifference + 2 || this.screen.y < yDifference - 2) {
				this.screen.y = (9*this.screen.y + yDifference)/10;
			} else {
				this.screen.y = yDifference
			}
        }

        // Limit Camera movement
        var map    = this.getMapByName("1");
		var maxX = map.tilesize*map.width - ig.system.width,
			maxY = map.tilesize*map.height - ig.system.height;

		if (this.screen.x > maxX) {
			this.screen.x = maxX;
		} else if (this.screen.x < 0) {
			this.screen.x = 0;
		}
		if (this.screen.y > maxY) {
			this.screen.y = maxY;
		} else if (this.screen.y < 0) {
			this.screen.y = 0;
		}


        // Respawn player
        if ( player == undefined ){
        	this.lives--;
        	if(this.lives >= 0) {
        		this.spawnPlayer();
        	}
        	if(this.lives < 0){
        		ig.system.setGame(GameOver);
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
		this.font.draw( 'ComboWizard v0.1', x, 0, ig.Font.ALIGN.RIGHT );

	},

	spawnPlayer: function() {
		var player = this.getEntitiesByType( EntityPlayer )[0];
		var spawn = this.getEntitiesByType( EntityPlayerSpawn )[0];
		if (player == undefined && spawn != undefined) {
			this.player = this.spawnEntity( EntityPlayer, spawn.pos.x, spawn.pos.y );
			console.log("Spawning player at: " + spawn.pos.x + " " + spawn.pos.y);
		}
	}
});


// Start the Game with 60fps, a resolution of 450x300, scaled
// up by a factor of 2
ig.main( '#canvas', StartScreen, 60, 320, 240, 2 );

});
