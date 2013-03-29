ig.module(
	'game.entities.spells.eq'
)
.requires(
	'impact.entity',
	'game.entities.spells.damageSpell'
)
.defines(function(){

EntityEQ = EntityDamageSpell.extend({	

	animSheet: new ig.AnimationSheet( 'media/smallwat.png', 10, 10 ),
	maxVel: {x: 150, y: 150},
	size: {x: 10, y: 10},
	gravityFactor: 2,

	// custom properties
	damage: 1,
	time: 1,
	
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