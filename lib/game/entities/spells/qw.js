ig.module(
	'game.entities.spells.qw'
)
.requires(
	'impact.entity',
	'game.entities.spells.damageSpell'
)
.defines(function(){

EntityQW = EntityDamageSpell.extend({	

	animSheet: new ig.AnimationSheet( 'media/wat.png', 20, 20 ),
	maxVel: {x: 0, y: 0},
	size: {x: 40, y: 40},

	checkAgainst: ig.Entity.TYPE.BOTH,

	lifeTimer: new ig.Timer(.25),

	effected: [],
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 1, [0] );
		this.lifeTimer.reset();

		effected = [];
	},

	update: function() {
		if (this.lifeTimer.delta() > 0) {
			this.kill();
		}
	},

	check: function( other ) {
		console.log(this.effected.indexOf(other));
		if (this.effected.indexOf(other) == -1) {
			this.effected.push(other);
			console.log(effected);
			if (other.type == ig.Entity.TYPE.B) {
				other.receiveDamage( 5, this );
			}

			if (other == ig.game.getEntitiesByType( EntityPlayer )[0]) {
				other.vel.y += -150;
			} else {
				var xOffset = this.pos.x - this.pos.x;
				this.vel.x = -(xOffset/Math.abs(xOffset))*200;
				other.vel.y = -75;
			}
		}
	}	
});

});