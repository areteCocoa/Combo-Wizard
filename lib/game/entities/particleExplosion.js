ig.module(
	'game.entities.particleExplosion'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
	entityParticleExplosion = ig.Entity.extend({
		lifetime: 2,
		particles: 10,
		init: function( x, y, settings ) {
		this.parent( x, y, settings );
		// Spawn multiple particles. Default 10.
		for(var i = 0; i < this.particles; i++)
				ig.game.spawnEntity(entityBlood, x, y);
			this.idleTimer = new ig.Timer();
		},
		update: function() {
		if( this.idleTimer.delta() > this.lifetime ) {
			this.kill();
			}
		}
	});
	entityBlood = ig.Entity.extend({
		size: {x: 2, y:2},
		maxVel: {x: 160, y: 200},
		type: ig.Entity.TYPE.NONE,
		collision: ig.Entity.COLLIDES.LITE,
		lifetime: 2,
		bounciness: .4,
		gravityFactor: 1,
		vel: {x: 75, y: 20},
		friction: {x:100, y: 0},
		fadeTime: 1,
		animSheet: new ig.AnimationSheet('media/blood.png', 2, 2),

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim( 'idle', 10, [0] );
			// Add random velocity to particle.
			this.vel.x = (Math.random() * 2 - 1) * this.vel.x;
			this.vel.y = (Math.random() * 2 - 1) * this.vel.y;
			this.idleTimer = new ig.Timer();
		},
		update: function(){
			this.currentAnim = this.anims.idle;
			if( this.idleTimer.delta() > this.lifetime ) {
			this.kill();
			return;
			}
			this.currentAnim.alpha = this.idleTimer.delta().map(
			this.lifetime - this.fadetime, this.lifetime,
			1, 0
			);

			if( this.currentAnim.loopCount ) {
                this.kill();
            }

			this.parent();
		}

});

});