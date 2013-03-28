ig.module(
	'game.entities.spells.ee'
)
.requires(
	'impact.entity',
	'game.entities.spells.damageSpell'
)
.defines(function(){

EntityEE = EntityDamageSpell.extend({

	animSheet: new ig.AnimationSheet( 'media/spells/earthmedium.png', 20, 20 ),
	maxVel: {x: 150, y: 0},
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 0.2, [0] );
	},
	
	check: function( other ) {
		other.receiveDamage( 5, this );
		this.kill();
	}	
});

});