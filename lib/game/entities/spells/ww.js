ig.module(
	'game.entities.spells.ww'
)
.requires(
	'impact.entity',
	'game.entities.spells.damageSpell'
)
.defines(function(){

EntityWW = EntityDamageSpell.extend({	

	animSheet: new ig.AnimationSheet( 'media/spells/watermedium.png', 15, 15 ),
	maxVel: {x: 225, y: 0},
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 0.1, [0, 1, 2, 3, 4] );
	},
		
	check: function( other ) {
		other.receiveDamage( 5, this );
		this.kill();
	}	
});

});