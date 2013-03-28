ig.module(
	'game.entities.spells.www'
)
.requires(
	'impact.entity',
	'game.entities.spells.damageSpell'
)
.defines(function(){

EntityWWW = EntityDamageSpell.extend({

	animSheet: new ig.AnimationSheet( 'media/spells/waterlarge.png', 20, 20 ),
	maxVel: {x: 200, y: 0},
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 0.1, [0, 1, 2, 3, 4, 5] );
	},
	
	check: function( other ) {
		other.receiveDamage( 10, this );
		this.kill();
	}	
});

});