ig.module(
	// Defines this entity module.
	'game.entities.qqq'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityQqq = ig.Entity.extend({
	size: {x: 4, y: 4},
	offset: {x: 2, y: 2},
	maxVel: {x: 200, y: 200},
	gravityFactor: 0,
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.B, // Check Against B - our evil enemy group
	collides: ig.Entity.COLLIDES.PASSIVE,		
	animSheet: new ig.AnimationSheet( 'media/fire.png', 7, 7 ),
	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 0.2, [1,2,3] );
	},
		
	handleMovementTrace: function( res ) {
		this.parent( res );
		if( res.collision.x || res.collision.y ) {
			this.kill();
			// only bounce 3 times
			/*this.bounceCounter++;
			if( this.bounceCounter > 3 ) {
				this.kill();
			}*/
		}
	},
	
	// This function is called when this entity overlaps anonther entity of the
	// checkAgainst group. I.e. for this entity, all entities in the B group.
	check: function( other ) {
		other.receiveDamage( 5, this );
		this.kill();
	}	
});

});