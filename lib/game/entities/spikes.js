ig.module(
	'game.entities.spikes'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntitySpikes = ig.Entity.extend({
	size: {x: 15, y: 15},
	type: ig.Entity.TYPE.B, // Evil enemy group
	checkAgainst: ig.Entity.TYPE.BOTH, // Check against friendly
	collides: ig.Entity.COLLIDES.PASSIVE,
	animSheet: new ig.AnimationSheet( 'media/spikes.png', 15, 15 ),
	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'idle', 1, [0] );
	},
	
	
	update: function() {
		
		this.parent();
	},
	
	check: function( other ) {
		other.receiveDamage( 100, this );
	},
	receiveDamage: function( amount, from ) {
	}
	
})

});