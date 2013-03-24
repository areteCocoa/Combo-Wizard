ig.module(
	'game.entities.xpDrop'
)
.requires(
	'impact.entity'
)
.defines(function(){

	/*
		HOW TO USE:

		ig.game.spawnEntity( entityXpDrop , this.pos.x, this.pos.y, {particles: 1} );

		Set particles to the number of XP drops.
	*/
	
	EntityxpDrop = ig.Entity.extend({
		_wmIgnore: true,
		init: function( x, y, settings ) {
		this.parent( x, y, settings );
		for(var i = 0; i < settings.particles; i++)
				ig.game.spawnEntity(entityXPParticle, x, y);
			console.log("XP Drop");
		}
	});
	entityXPParticle = ig.Entity.extend({
		_wmIgnore: true,
		size: {x: 5, y:5},
		maxVel: {x: 160, y: 200},
		type: ig.Entity.TYPE.NONE,
		collision: ig.Entity.COLLIDES.LITE,
		bounciness: .4,
		gravityFactor: 1,
		vel: {x: 75, y: 20},
		friction: {x:100, y: 0},
		checkAgainst: ig.Entity.TYPE.A,
		animSheet: new ig.AnimationSheet('media/xp.png', 5, 5),

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim( 'idle', .1, [0,1,2,3]);
			// Add random velocity to particle.
			this.vel.x = (Math.random() * 2 - 1) * this.vel.x;
			this.vel.y = (Math.random() * 2 - 1) * this.vel.y;
		},
		update: function(){
			this.currentAnim = this.anims.idle;
			this.parent();
		},
		check: function(other){
			// Code to add to XP count in main.js, here.
			this.kill();
		}


});

});