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
	maxVel: {x: 300, y: 0},

	damage: 2,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.damage += this.damage * (Math.log(ig.global.earthLevel)/Math.log(5));

		this.addAnim( 'idle', 0.2, [0]);
	},
	
	check: function( other ) {
		this.parent(other);
		this.kill();
	}	
});

});