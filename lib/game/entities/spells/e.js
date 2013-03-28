ig.module(
	'game.entities.spells.e'
)
.requires(
	'impact.entity',
	'game.entities.spells.damageSpell'
)
.defines(function(){

EntityE = EntityDamageSpell.extend({

	animSheet: new ig.AnimationSheet( 'media/spells/rocksmall.png', 10, 10 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 0.2, [0]);
	},
	
	check: function( other ) {
		other.receiveDamage( 2, this );
		this.kill();
	}	
});

});