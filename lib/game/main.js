ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'impact.debug.debug',
	'game.entities.player',
	'game.levels.level1'
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

MyGame = ig.Game.extend({
	
	font: new ig.Font( 'media/04b03.font.png' ),
	gravity: 175,
	
	init: function() {
		//Spawns Player Entity
		this.player = this.spawnEntity( EntityPlayer, 0,0 );
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
		this.loadLevel( LevelLevel1 );
	},
	
	update: function() {
		// Allows the screen to move with the player.
		var player = this.getEntitiesByType( EntityPlayer )[0];
			  if( player ) {
            this.screen.x = player.pos.x - ig.system.width/2+10;
            this.screen.y = player.pos.y - ig.system.height/2;
        }
		this.parent();
	},
	
	draw: function() {
		this.parent();
		var x = ig.system.width;
		var y = ig.system.height;
		this.font.draw("Combo: " + elements, 0, 0, ig.Font.ALIGN.LEFT );
		this.font.draw( 'ComboWizard v0.0.2', x, 0, ig.Font.ALIGN.RIGHT );

	}
});


// Start the Game with 60fps, a resolution of 450x300, scaled
// up by a factor of 2
ig.main( '#canvas', StartScreen, 60, 450, 300, 2 );

});
