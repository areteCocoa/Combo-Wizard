ig.module(
	'game.entities.spells.eee'
)
.requires(
	'impact.entity',
	'game.entities.spells.damageSpell'
)
.defines(function(){

EntityEEE = EntityDamageSpell.extend({

	animSheet: new ig.AnimationSheet( 'media/spells/earthlarge.png', 30, 30 ),
	maxVel: {x: 100, y: 0},
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 0.2, [0] );
	},
	
	check: function( other ) {
		other.receiveDamage( 10, this );
		this.kill();
	}	
});

});