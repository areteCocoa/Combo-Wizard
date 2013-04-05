ig.module(
	'game.entities.spells.eee'
)
.requires(
	'impact.entity',
	'game.entities.spells.damageSpell'
)
.defines(function(){

EntityEEE = EntityDamageSpell.extend({

	animSheet: new ig.AnimationSheet( 'media/spells/earthlarge.png', 30, 30 ),
	maxVel: {x: 100, y: 0},

	damage: 10,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.damage += this.damage * (Math.log(ig.global.earthLevel)/Math.log(5));

		this.addAnim( 'idle', 0.2, [0] );
	},
	
	check: function( other ) {
		this.parent( other );
		this.kill();
	}	
});

});