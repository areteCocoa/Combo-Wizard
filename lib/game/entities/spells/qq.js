ig.module(
	'game.entities.spells.qq'
)
.requires(
	'impact.entity',
	'game.entities.spells.damageSpell'
)
.defines(function(){

EntityQQ = EntityDamageSpell.extend({	

	animSheet: new ig.AnimationSheet( 'media/spells/firelarge.png', 30, 30 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 0.1, [0,1,2,3,4] );
	},
	
	check: function( other ) {
		other.receiveDamage( 5, this );
		this.kill();
	}	
});

});