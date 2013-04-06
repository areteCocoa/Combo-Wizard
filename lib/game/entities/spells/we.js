ig.module(
	'game.entities.spells.we'
)
.requires(
	'impact.entity',
	'game.entities.spells.damageSpell'
)
.defines(function(){

EntityWE = EntityDamageSpell.extend({	

	animSheet: new ig.AnimationSheet( 'media/smallwat.png', 10, 10 ),
	maxVel: {x: 150, y: 0},
	size: {x: 10, y: 10},

	// Custom properties
	damage: 5,
	blindness: 50,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		var damageIncrease = this.damage * (Math.log(ig.global.waterLevel)/Math.log(5));
		damageIncrease += this.damage * (Math.log(ig.global.earthLevel)/Math.log(5))
		this.damage += damageIncrease;

		this.addAnim( 'idle', 1, [0] );
	},

	check: function( other ) {
		this.parent(other);
		this.kill();
	}	
});
 
});