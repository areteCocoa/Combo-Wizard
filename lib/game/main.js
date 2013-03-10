ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',

	'game.entities.player',
	'game.levels.level1'
)
.defines(function(){

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
		//Sets BG Image
		this.backgroundImage = new ig.Image('media/combowizard.png');
		//Loads Level1
		this.loadLevel( LevelLevel1 );
	},
	
	update: function() {
		this.parent();
	},
	
	draw: function() {
		this.parent();
		var x = ig.system.width;
		this.font.draw( 'ComboWizard v0.0.1', x, 0, ig.Font.ALIGN.RIGHT );
	}
});


// Start the Game with 60fps, a resolution of 450x300, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 450, 300, 2 );

});
