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
	size: {x: 20, y: 20},
	maxVel: {x: 200, y: 0},

	damage: 10,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.damage = this.damage * (Math.log(ig.global.waterLevel)/Math.log(5));

		this.addAnim( 'idle', 0.1, [0, 1, 2, 3, 4, 5] );
	},
	
	check: function( other ) {
		this.parent(other);
		this.kill();
	}	
});

});