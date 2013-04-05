ig.module(
	'game.entities.spells.qq'
)
.requires(
	'impact.entity',
	'game.entities.spells.damageSpell'
)
.defines(function(){

EntityQQ = EntityDamageSpell.extend({	

	animSheet: new ig.AnimationSheet( 'media/spells/firemedium.png', 15, 11 ),
	size: {x: 15, y:11},
	maxVel: {x: 175, y: 0},

	damage: 5,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'idle', 0.05, [0,1,2,3,4] );
		this.sound = new ig.Sound( 'media/music/qsound.*' );
		this.sound.volume = .5;
		this.sound.play();

		this.damage += this.damage * (Math.log(ig.global.fireLevel)/Math.log(5));
	},
	
	check: function( other ) {
		this.parent( other );
		this.kill();
	}	
});

});