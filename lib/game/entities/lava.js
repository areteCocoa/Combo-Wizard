ig.module(
	'game.entities.lava'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntityLava = ig.Entity.extend({
	size: {x: 16, y: 16},
	type: ig.Entity.TYPE.B, // Evil enemy group
	checkAgainst: ig.Entity.TYPE.BOTH, // Check against friendly
	collides: ig.Entity.COLLIDES.PASSIVE,
	animSheet: new ig.AnimationSheet( 'media/lava.png', 16, 16 ),
	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'idle', 1, [0,1,2,3] );
		this.fireballTimer = new ig.Timer();
		this.fireballRand = (Math.random() * 2);
	},
	
	
	update: function() {
		if (this.fireballTimer.delta() >= this.fireballRand){
			ig.game.spawnEntity( EntityFireball , (this.pos.x+5), this.pos.y-5);
			this.fireballRand = (Math.random() * 5);
			this.fireballTimer.reset();
		}
		this.parent();
	},
	
	check: function( other ) {
		other.receiveDamage( 100, this );
	},
	receiveDamage: function( amount, from ) {
	}
	
});
EntityFireball = ig.Entity.extend({
		size: {x: 5, y:5},
		maxVel: {x: 160, y: 200},
		type: ig.Entity.TYPE.NONE,
		collision: ig.Entity.COLLIDES.LITE,
		bounciness: .4,
		gravityFactor: 1,
		vel: {y: -200},
		friction: {x:100, y: 0},
		zIndex: -10,
		checkAgainst: ig.Entity.TYPE.BOTH,
		animSheet: new ig.AnimationSheet('media/fireball.png', 5, 5),

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim( 'idle', .1, [0]);
		},
		update: function(){
			this.currentAnim = this.anims.idle;
			this.parent();
		},
		check: function(other){
			other.receiveDamage( 2, this );
			this.kill();
		}


});

});