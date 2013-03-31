ig.module(
	'game.entities.boss'
)
.requires(
	'impact.entity',
	'game.entities.particleExplosion'
)
.defines(function(){
	
EntityBoss = ig.Entity.extend({
	size: {x: 50, y: 50},
	maxVel: {x: 100, y: 100},
	friction: {x: 0, y: 0},
	
	type: ig.Entity.TYPE.B, // Evil enemy group
	checkAgainst: ig.Entity.TYPE.A, // Check against friendly
	collides: ig.Entity.COLLIDES.PASSIVE,
	health: 100,
	flip: false,

	animSheet: new ig.AnimationSheet( 'media/largewat.png', 50, 50 ),
	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'idle', .2, [0], true);

		this.hurt = new ig.Sound( 'media/music/hurt.*' );
		this.hurt.volume = .2;
	},
	
	setAnim: function (animation) {
		if (this.currentAnim == this.anims.hurt) {
			if (this.vel.y == 0) {
				this.currentAnim = animation;
			} else {
				this.currentAnim = this.anims.hurt;
			}
		} else {
			this.currentAnim = animation;
		}
	},

	receiveDamage: function( amount, from ) {
			// Add particle blood
			ig.game.spawnEntity( EntityParticleExplosion , this.pos.x, this.pos.y, {particleOffset: 1} );
			this.hurt.play();
			var xOffset = from.pos.x - this.pos.x;
			this.vel.x = -(xOffset/Math.abs(xOffset))*50;
			if (this.currentAnim != this.anims.hurt || this.vel.y == 0) {
				this.vel.y = -50;
			}
			this.currentAnim = this.anims.hurt;
			this.parent( amount, from );


			
	},

	kill: function(){
		ig.game.spawnEntity( EntityXpDrop , this.pos.x, this.pos.y, {particles: 10} );
		this.parent();
	},

	handleMovementTrace: function( res ) {
		this.parent( res );
		
		// collision with a wall? return!
		if( res.collision.x ) {
			this.flip = !this.flip;
			}
		},	
	
	check: function( other ) {
		other.receiveDamage( 1, this );

	}
});

});