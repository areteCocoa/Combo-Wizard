ig.module(
	'game.entities.spells.www'
)
.requires(
	'impact.entity',
	'game.entities.spells.damageSpell'
)
.defines(function(){

EntityWWW = EntityDamageSpell.extend({

	animSheet: new ig.AnimationSheet( 'media/spells/waterlarge.png', 30, 30 ),
	
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