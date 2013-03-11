ig.module(
	// Defines this entity module.
	'game.entities.monster'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityMonster = ig.Entity.extend({

	// Sets Engine Attributes
	size: {x: 7, y:10},
	friction: {x:15, y: 15},
	maxVel: {x: 100, y: 200},

	// Set Creature Attributes
	health: 5, maxHealth: 5,

	// Sets Player's Collision Type as A. Three collision types: A, B, NONE
	type: ig.Entity.TYPE.B,
	// Checks collisions against both Collision Groups A and B.
	checkAgainst: ig.Entity.TYPE.A,
	// Collision Type is Lite, meaning it will be "pushed" instead of applying "push" force to the other object when collided
	collides: ig.Entity.COLLIDES.lite,
	flip: false,
	
	// Sets animation sprite sheet, and defines the tiles as 7px width, 10px height
	animSheet: new ig.AnimationSheet( 'media/player.gif', 7, 10 ),	

	// Sets AnimationState variable.
	

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'idle', 1, [0] );
		this.addAnim( 'walking', .2, [0,1]);
		animationCurrent = "idle";
		spelltimer = new ig.Timer();
		elements = [];
	},
	
	// Every update tick, execute this code
	update: function() {
		animationCurrent = "idle";

		// Animation Stuff
		switch (animationCurrent) {
			case "idle": 
			this.currentAnim = this.anims.idle;
			break;
			case "walkingright":
			this.flip = false;
			this.currentAnim = this.anims.walking;
			break;
			case "walkingleft": 
			this.flip = true;
			this.currentAnim = this.anims.walking;
			break;
		}
		this.currentAnim.flip.x = this.flip;
		this.parent();
	}
});

});