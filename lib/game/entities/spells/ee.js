ig.module(
	'game.entities.spells.ee'
)
.requires(
	'impact.entity',
	'game.entities.spells.damageSpell'
)
.defines(function(){

EntityEE = EntityDamageSpell.extend({

	animSheet: new ig.AnimationSheet( 'media/spells/earthmedium.png', 20, 20 ),
	maxVel: {x: 150, y: 0},

	damage: 5,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.damage += this.damage * (Math.log(ig.global.earthLevel)/Math.log(5));

		this.addAnim( 'idle', 0.2, [0] );
	},
	
	check: function( other ) {
		this.parent(other);
		this.kill();
	}	
});

});