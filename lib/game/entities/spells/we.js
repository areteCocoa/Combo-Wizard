ig.module(
	'game.entities.spells.we'
)
.requires(
	'impact.entity',
	'game.entities.spells.damageSpell'
)
.defines(function(){

EntityWE = EntityDamageSpell.extend({	

	animSheet: new ig.AnimationSheet( 'media/smallwat.png', 10, 10 ),
	maxVel: {x: 150, y: 0},
	size: {x: 10, y: 10},

	checkAgainst: ig.Entity.TYPE.B,

	// Custom properties
	damage: 5,
	blindness: 50,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 1, [0] );
	},

	check: function( other ) {
		other.receiveDamage( this.damage, this );
		this.kill();
	}	
});

});