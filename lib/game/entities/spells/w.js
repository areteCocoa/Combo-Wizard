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

	damage: 2,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.damage += this.damage * (Math.log(ig.global.waterLevel)/Math.log(5));

		this.addAnim( 'idle', 0.1, [0,1,2,3] );
	},

	check: function( other ) {
		this.parent(other);
		this.kill();
	}	
});

});