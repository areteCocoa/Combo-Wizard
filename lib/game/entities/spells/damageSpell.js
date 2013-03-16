ig.module(
	// Defines this entity module.
	'game.entities.spells.damageSpell'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityDamageSpell = ig.Entity.extend({
	size: {x: 1, y: 1},
	offset: {x: 2, y: 2},
	maxVel: {x: 200, y: 200},
	gravityFactor: 0,

	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.B, // Check Against B - our evil enemy group
	collides: ig.Entity.COLLIDES.ACTIVE,	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
	},
		
	handleMovementTrace: function( res ) {
		this.parent( res );
		/*
		if( res.collision.x || res.collision.y ) {
			this.kill();
			// only bounce 3 times
			this.bounceCounter++;
			if( this.bounceCounter > 3 ) {
				this.kill();
			}
		}
		*/
	},
});

});