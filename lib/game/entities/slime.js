ig.module(
	'game.entities.slime'
)
.requires(
	'impact.entity',
	'game.entities.particleExplosion'
)
.defines(function(){
	
EntitySlime = ig.Entity.extend({
	size: {x: 20, y: 20},
	maxVel: {x: 100, y: 100},
	friction: {x: 150, y: 0},
	type: ig.Entity.TYPE.B, // Evil enemy group
	checkAgainst: ig.Entity.TYPE.A, // Check against friendly
	collides: ig.Entity.COLLIDES.PASSIVE,
		
	health: 10,
	
	speed: 20,
	flip: false,
	
	animSheet: new ig.AnimationSheet( 'media/monsters/slime.png', 20, 20 ),
	
	jumpTimer: new ig.Timer(.5),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'still', 1, [0] );
		this.addAnim( 'fly', 1, [1]);
		this.addAnim( 'hurt', 1, [2]);
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
	
	update: function() {
		this.vel.x = this.speed * (this.flip ? 1 : -1);

		if (this.standing) {
			this.setAnim(this.anims.still);
			if (this.jumpTimer.delta() > 0) {
				this.vel.y = -100;
			} else {
				this.vel.x = 0;
			}
		} else {
			this.setAnim(this.anims.fly);
		}

		this.currentAnim.flip.x = this.flip;
		
		this.parent();
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
			this.setAnim(this.anims.hurt);	
			this.parent( amount, from );
	},
	kill: function(){
		ig.game.spawnEntity( EntityxpDrop , this.pos.x, this.pos.y, {particles: 2} );
		this.parent();
	},
	handleMovementTrace: function( res ) {
		this.parent( res );
		
		// check for y collision
		if( res.collision.x ) {
			this.flip = !this.flip;
			this.vel.x = -this.vel.x
		} else if (res.collision.y && this.jumpTimer.delta() > 0) {
			this.jumpTimer.reset();
		}
	},	
	
	check: function( other ) {
		other.receiveDamage( 1, this );
	}
	
});

});