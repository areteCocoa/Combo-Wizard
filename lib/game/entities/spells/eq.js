ig.module(
	'game.entities.spells.eq'
)
.requires(
	'impact.entity',
	'game.entities.spells.damageSpell'
)
.defines(function(){

EntityEQ = ig.Entity.extend({	
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.B, // Check Against B - our evil enemy group
	collides: ig.Entity.COLLIDES.LITE,

	animSheet: new ig.AnimationSheet( 'media/smallwat.png', 10, 10 ),
	maxVel: {x: 150, y: 150},
	size: {x: 10, y: 10},
	gravityFactor: 2,

	// custom properties
	damage: 2,
	time: 10,

	timer: new ig.Timer(0),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		console.log(this.time);
		this.timer.set(this.time);
		
		if (settings.vel.x > 0) {
			this.vel.x = this.maxVel.x;
		} else {
			this.vel.x = -this.maxVel.x;
		}

		if (settings.vel.y > 0) {
			this.vel.y = this.maxVel.y;
		} else {
			this.vel.y = -this.maxVel.y;
		}

		this.addAnim( 'idle', 1, [0] );
		// this.addAnim('idle', 1, [1]); // Whilst laying down
	},

	handleMovementTrace: function( res ) {
		this.parent(res);

		if (res.collision.y) {
			if (this.vel.x != 0) {
				this.vel.x = 0;
				this.timer.reset();
			}
		}
	},

	check: function( other ) {
		other.receiveDamage( this.damage, this );
		this.kill();
	}, 

	update: function() {
		this.parent();

		if ( this.vel.x > 0 ) {
			this.currentAnim.flip.x = false;
		} else {
			this.currentAnim.flip.x = true;
		}

		if (this.timer.delta() > 0 && this.vel.x == 0) {
			this.kill();
		}
	},
});

});