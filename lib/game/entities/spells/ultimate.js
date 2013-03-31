ig.module(
	'game.entities.spells.ultimate'
)
.requires(
	'impact.entity',
	'game.entities.spells.damageSpell'
)
.defines(function(){

EntityUltimate = EntityDamageSpell.extend({	

	animSheet: new ig.AnimationSheet( 'media/smallwat.png', 10, 10 ),
	maxVel: {x: 200, y: 0},
	size: {x: 20, y: 20},

	// custom properties
	damage: 50,
	maxDamaged: 3,
	damaged: 0,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'idle', .1, [0] );
	},

	check: function( other ) {
		other.receiveDamage( this.damage, this );
		this.damaged++;
		if (this.damaged >= this.maxDamaged) {
			this.kill();
		}
	}	
});

});