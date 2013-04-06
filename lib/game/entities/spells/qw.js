ig.module(
	'game.entities.spells.qw'
)
.requires(
	'impact.entity',
	'game.entities.spells.damageSpell'
)
.defines(function(){

EntityQW = EntityDamageSpell.extend({	

	animSheet: new ig.AnimationSheet( 'media/spells/qw.png', 20, 20 ),
	maxVel: {x: 0, y: 0},
	size: {x: 40, y: 40},
	checkAgainst: ig.Entity.TYPE.BOTH,

	effected: [],
	health: 10000,
	// custom properties
	damage: 1,
	push: 50,
	
	init: function( x, y, settings ) {
		this.addAnim( 'steam', .05, [0,1,2,3,4,5] );
		this.currentAnim = this.anims.steam;
		effected = [];

		var damageIncrease = this.damage * (Math.log(ig.global.waterLevel)/Math.log(5));
			damageIncrease += this.damage * (Math.log(ig.global.fireLevel)/Math.log(5));
		this.damage += damageIncrease;

		this.parent( x, y, settings );
	},

	update: function() {
		if (this.anims.steam.loopCount>0) { 
			this.kill(); 
		}
		else {
			this.parent();
		}
	},


	check: function( other ) {
		if (this.effected.indexOf(other) == -1) {
			this.effected.push(other);
			if (other.type == ig.Entity.TYPE.B) {
				other.receiveDamage( this.damage, this );
			}

			if (other == ig.game.getEntitiesByType( EntityPlayer )[0]) {
				// Going to be used for upgraded version, too OP
				other.vel.y += -this.push;
			} else {
				var xOffset = this.pos.x - this.pos.x;
				this.vel.x = -(xOffset/Math.abs(xOffset))*200;
				other.vel.y = -75;
			}
		}
	}	
});

});