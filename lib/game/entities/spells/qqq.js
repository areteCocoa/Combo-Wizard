ig.module(
	'game.entities.spells.qqq'
)
.requires(
	'impact.entity',
	'game.entities.spells.damageSpell'
)
.defines(function(){

EntityQQQ = EntityDamageSpell.extend({

	animSheet: new ig.AnimationSheet( 'media/spells/firemax.png', 20, 20 ),
	size: {x: 20, y: 20},
	maxVel: {x: 150, y: 0},
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'idle', 0.1, [0, 1, 2, 3, 4] );
		this.sound = new ig.Sound( 'media/music/qsound.*' );
		this.sound.volume = .7;
		this.sound.play();
	},
	
	check: function( other ) {
		other.receiveDamage( 10, this );
		this.kill();
	}	
});

});