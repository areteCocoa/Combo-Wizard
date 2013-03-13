ig.module(
	'game.entities.spells.ww'
)
.requires(
	'impact.entity',
	'game.entities.spells.damageSpell'
)
.defines(function(){

EntityWW = EntityDamageSpell.extend({	

	animSheet: new ig.AnimationSheet( 'media/spells/watermedium.png', 20, 20 ),
	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.addAnim( 'idle', 0.2, [0] );
	},
		
	handleMovementTrace: function( res ) {
		this.parent( res );
		if( res.collision.x || res.collision.y ) {
			this.kill();
			// only bounce 3 times
			/*this.bounceCounter++;
			if( this.bounceCounter > 3 ) {
				this.kill();
			}*/
		}
	},
	
	// This function is called when this entity overlaps anonther entity of the
	// checkAgainst group. I.e. for this entity, all entities in the B group.
	check: function( other ) {
		other.receiveDamage( 5, this );
		this.kill();
	}	
});

});