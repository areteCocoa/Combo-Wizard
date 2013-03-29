ig.module(
	// Defines this entity module.
	'game.entities.spells.damageSpell'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityDamageSpell = ig.Entity.extend({
	size: {x: 10, y: 10},
	offset: {x: 0, y: 0},
	maxVel: {x: 200, y: 0},
	gravityFactor: 0,

	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.B, // Check Against B - our evil enemy group
	collides: ig.Entity.COLLIDES.LITE,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		if (settings.vel.x > 0) {
			this.vel.x = this.maxVel.x;
		} else {
			this.vel.x = -this.maxVel.x;
		}
	},

	handleMovementTrace: function( res ) {
		this.parent( res );
		if( res.collision.x || res.collision.y ) {
			this.kill();
		}
	},

	update: function() {
		this.parent();

		if ( this.vel.x > 0 ) {
			this.currentAnim.flip.x = false;
		} else {
			this.currentAnim.flip.x = true;
		}
	},
});

});