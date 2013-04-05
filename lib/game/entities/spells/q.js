ig.module(
	'game.entities.spells.q'
)
.requires(
	'impact.entity',
	'game.entities.spells.damageSpell'
)
.defines(function(){

EntityQ = EntityDamageSpell.extend({	

	animSheet: new ig.AnimationSheet( 'media/spells/firesmall.png', 10, 10 ),
	maxVel: {x: 225, y: 0},

	damage: 2,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'idle', 0.05, [0,1,2,3] );
		this.sound = new ig.Sound( 'media/music/qsound.*' );
		this.sound.volume = .2;
		this.sound.play();

		this.damage += this.damage * (Math.log(ig.global.fireLevel)/Math.log(5));
	},
	
	check: function( other ) {
		this.parent(other);
		this.kill();
	}	
});

});