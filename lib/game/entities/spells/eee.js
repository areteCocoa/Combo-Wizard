ig.module(
	'game.entities.spells.eee'
)
.requires(
	'impact.entity',
	'game.entities.spells.damageSpell'
)
.defines(function(){

EntityEEE = EntityDamageSpell.extend({

	animSheet: new ig.AnimationSheet( 'media/spells/rocklarge.png', 20, 20 ),
	maxVel: {x: 100, y: 0},

	damage: 10,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'idle', 0.1, [0,1,2,3] );
		this.damage += this.damage * (Math.log(ig.global.earthLevel)/Math.log(5));

		this.addAnim( 'idle', 0.2, [0] );
	},
	
	check: function( other ) {
		this.parent( other );
		this.kill();
	}	
});

});