ig.module(
	// Defines this entity module.
	'game.entities.player'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityPlayer = ig.Entity.extend({

	// Sets Player Attributes
	size: {x: 7, y:10},
	friction: {x:15, y: 15},
	maxVel: {x: 100, y: 200},
	// Sets Player's Collision Type as A. Three collision types: A, B, NONE
	type: ig.Entity.TYPE.A,
	// Checks collisions against both Collision Groups A and B.
	checkAgainst: ig.Entity.TYPE.BOTH,
	// Collision Type is Lite, meaning it will be "pushed" instead of applying "push" force to the other object when collided
	collides: ig.Entity.COLLIDES.lite,
	
	// Sets animation sprite sheet, and defines the tiles as 7px width, 10px height
	animSheet: new ig.AnimationSheet( 'media/player.png', 7, 10 ),	
	

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'idle', 1, [0] );
	},
	
	// Every update tick, execute this code
	update: function() {

		// Checks for input states, if so, applies velocity to player entity.
		if (ig.input.state('left') ){
			this.vel.x = -30;
		}
		else if (ig.input.state('right') ){
			this.vel.x = 30;
		}
		else {
			this.vel.x = 0;
		}
		// Jumping code, will be refactored later.
		if (this.vel.y == 0 && ig.input.pressed('up')) {
			this.vel.y = -150;
		}

		this.parent();
	}
});




});