ig.module(
	'game.entities.spells.w'
)
.requires(
	'impact.entity',
	'game.entities.spells.damageSpell'
)
.defines(function(){

EntityW = EntityDamageSpell.extend({	

	animSheet: new ig.AnimationSheet( 'media/spells/water.png', 15, 15 ),
	size: {x:15, y:15},
	maxVel: {x: 250, y: 0},
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 0.1, [0,1,2,3] );
	},

	check: function( other ) {
		other.receiveDamage( 2, this );
		this.kill();
	}	
});

});