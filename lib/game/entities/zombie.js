ig.module(
	'game.entities.zombie'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntityZombie = ig.Entity.extend({
	size: {x: 10, y: 10},
	maxVel: {x: 100, y: 100},
	friction: {x: 150, y: 0},
	
	type: ig.Entity.TYPE.B, // Evil enemy group
	checkAgainst: ig.Entity.TYPE.A, // Check against friendly
	collides: ig.Entity.COLLIDES.PASSIVE,
	health: 10,
	speed: 14,
	flip: false,
	animSheet: new ig.AnimationSheet( 'media/zombie.gif', 7, 10 ),
	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'idle', .2, [0] );
		this.addAnim( 'walking', .2, [0,1] );
		this.aiArray = [2,4,6,8];
		this.aiBehavior = 3;
	},
	
	
	update: function() {
		// near an edge? return!
		this.currentAnim.flip.x = this.flip;

			// AI Behavior Code
    		switch (this.aiBehavior){
				case 1:
				// Idle
				this.vel.x = 0;
				this.currentAnim = this.anims.idle;
				break;
				case 2:
				// Wandering
				var xdir = this.flip ? -1 : 1;
				this.vel.x = this.speed * xdir;
				this.currentAnim = this.anims.walking;
				if( !ig.game.collisionMap.getTile(
				this.pos.x + (this.flip ? +4 : this.size.x -4),
				this.pos.y + this.size.y+1
				)
				) {
				this.flip = !this.flip;
				}

				break;
				case 3:
				// Chase Player
				var player = ig.game.getEntitiesByType( EntityPlayer )[0];
				var dirFacing = ((player.pos.x > this.pos.x) ? 1 : -1);
					this.vel.x = this.speed * dirFacing;
					this.currentAnim.flip.x = ((dirFacing == 1) ? 0 : 1);
					this.currentAnim = this.anims.walking;
				break;
				}
				var player = ig.game.getEntitiesByType( EntityPlayer )[0];
				if (player.pos.y <= this.pos.y + 10 && (player.pos.x - this.pos.x) < 100) {
					this.aiBehavior = 3;
				}
				else {
					this.aiBehavior = 2;
				}
			



		
		this.parent();
	},
	
	handleMovementTrace: function( res ) {
		this.parent( res );
		
		// collision with a wall? return!
		if( res.collision.x ) {
			this.flip = !this.flip;
			}
		},	
	
	check: function( other ) {
		other.receiveDamage( 1, this );
	}
});

});