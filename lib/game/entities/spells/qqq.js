ig.module(
	'game.entities.spells.qqq'
)
.requires(
	'impact.entity',
	'game.entities.spells.damageSpell'
)
.defines(function(){

EntityQQQ = EntityDamageSpell.extend({

	animSheet: new ig.AnimationSheet( 'media/spells/firelarge.png', 30, 30 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 0.1, [0,1,2,3,4] );
	},
	
	check: function( other ) {
		other.receiveDamage( 10, this );
		this.kill();
	}	
});

});