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
	
	
	speed: 14,
	flip: false,
	
	animSheet: new ig.AnimationSheet( 'media/slime.png', 20, 20 ),
	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'crawl', 1, [0] );
		this.hurt = new ig.Sound( 'media/music/hurt.*' );
		this.hurt.volume = .2;
	},
	
	
	update: function() {
		this.currentAnim.flip.x = this.flip;
		// near an edge? return!
		if( !ig.game.collisionMap.getTile(
				this.pos.x + (this.flip ? +4 : this.size.x -4),
				this.pos.y + this.size.y+1
			)
		) {
			this.flip = !this.flip;
		}
		
		var xdir = this.flip ? -1 : 1;
		this.vel.x = this.speed * xdir;
		
		this.parent();
	},
	receiveDamage: function( amount, from ) {
			// Add particle blood
			ig.game.spawnEntity( EntityParticleExplosion , this.pos.x, this.pos.y, {particleOffset: 1} );
			this.hurt.play();
			var xOffset = from.pos.x - this.pos.x;
			this.vel.x = -(xOffset/Math.abs(xOffset))*50;
			this.vel.y = -20;
			this.parent( amount, from );
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