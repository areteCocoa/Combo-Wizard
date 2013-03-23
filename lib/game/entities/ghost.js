ig.module(
	'game.entities.ghost'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntityGhost = ig.Entity.extend({
	size: {x: 14, y: 20},
	maxVel: {x: 100, y: 100},
	friction: {x: 150, y: 0},
	
	type: ig.Entity.TYPE.B, // Evil enemy group
	checkAgainst: ig.Entity.TYPE.A, // Check against friendly
	collides: ig.Entity.COLLIDES.PASSIVE,
	health: 10,
	speed: 14,
	flip: false,
	gravity: 0,
	animSheet: new ig.AnimationSheet( 'media/monsters/ghost.gif', 15, 15),
	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'idle', .2, [0] );
		this.addAnim( 'walking', .2, [0,1] );
		this.aiBehavior = 3;
		this.hurt = new ig.Sound( 'media/music/hurt.*' );
		this.hurt.volume = .2;

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
				if (player) {
					var dirFacing = ((player.pos.x > this.pos.x) ? 1 : -1);
					var dirFacing2 = ((player.pos.y > this.pos.y) ? 1 : -1);
					this.vel.x = (3*this.speed) * dirFacing;
					this.currentAnim.flip.x = ((dirFacing == 1) ? 0 : 1);
					this.currentAnim = this.anims.walking;
					this.vel.y = (3*this.speed)  * dirFacing2;
				}
				break;
				}
				if (ig.game.getEntitiesByType( EntityPlayer )[0] != undefined){
					var player = ig.game.getEntitiesByType( EntityPlayer )[0];
					if (Math.abs((player.pos.y - this.pos.y)) < 50 && Math.abs((player.pos.x - this.pos.x)) < 100){
					this.aiBehavior = 3;
					}
					else {
					this.aiBehavior = 2;
					}
				}
				else {
					this.aiBehavior = 2;
					}
		this.parent();
	},
	receiveDamage: function( amount, from ) {
			// Add particle blood
			
			this.hurt.play();
			var xOffset = from.pos.x - this.pos.x;
			this.vel.x = -(xOffset/Math.abs(xOffset))*50;
			this.vel.y = -20;
			this.parent( amount, from );
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