ig.module(
	'game.entities.spells.qq'
)
.requires(
	'impact.entity',
	'game.entities.spells.damageSpell'
)
.defines(function(){

EntityQQ = EntityDamageSpell.extend({	

	animSheet: new ig.AnimationSheet( 'media/spells/QQ.png', 15, 11 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 0.05, [0,1,2,3,4] );
	},
	
	check: function( other ) {
		other.receiveDamage( 5, this );
		this.kill();
	}	
});

});