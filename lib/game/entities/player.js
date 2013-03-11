ig.module(
	// Defines this entity module.
	'game.entities.player'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityPlayer = ig.Entity.extend({

	// Sets Player Attributes
	size: {x: 7, y:10},
	friction: {x:15, y: 15},
	maxVel: {x: 100, y: 200},
	// Sets Player's Collision Type as A. Three collision types: A, B, NONE
	type: ig.Entity.TYPE.A,
	// Checks collisions against both Collision Groups A and B.
	checkAgainst: ig.Entity.TYPE.BOTH,
	// Collision Type is Lite, meaning it will be "pushed" instead of applying "push" force to the other object when collided
	collides: ig.Entity.COLLIDES.lite,
	flip: false,
	health: 10,
	
	// Sets animation sprite sheet, and defines the tiles as 7px width, 10px height
	animSheet: new ig.AnimationSheet( 'media/player.gif', 7, 10 ),	

	// Sets AnimationState variable.
	

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'idle', 1, [0] );
		this.addAnim( 'walking', .2, [0,1]);
		animationCurrent = "idle";
		spelltimer = new ig.Timer();
		elements = [];
		this.jump = new ig.Sound( 'media/music/jump.*' );
		this.jump.volume = .2;

	},
	
	receiveDamage: function( amount, from ) {
		var xOffset = this.distanceTo( from );
		this.vel.x = xOffset;

		this.parent( amount, from );
	},

	// Every update tick, execute this code
	update: function() {
		comboCheck = function(){
			elements = [];
		}
		// Checks for input states, if so, applies velocity to player entity.

		// Jumping code, will be refactored later.
		if (this.vel.y == 0 && ig.input.pressed('up')) {
			this.vel.y = -100;
			animationCurrent = "idle";
			this.jump.play();
		}

		if (ig.input.state('left') ){
			this.vel.x = -30;
			if (this.vel.y == 0){
				animationCurrent = "walkingleft";
			}
		}
		else if (ig.input.state('right') ){
			this.vel.x = 30;
			if (this.vel.y == 0){
				animationCurrent = "walkingright";
			}
		}
		else {
			this.vel.x = 0;
			animationCurrent = "idle";
		}

		// Element Combination
		
		if (ig.input.pressed('q')) {
			ig.game.spawnEntity( entityQ, this.pos.x, this.pos.y - 25 );
			elements.push("q");
			spelltimer.reset();
		}
		if (ig.input.pressed('w')) {
			ig.game.spawnEntity( entityQ, this.pos.x, this.pos.y - 25 );
			elements.push("w");
			spelltimer.reset();
		}
		if (ig.input.pressed('e')) {
			ig.game.spawnEntity( entityQ, this.pos.x, this.pos.y - 25 );
			elements.push("e");
			spelltimer.reset();
		}
		if (ig.input.pressed('r')) {
			
		}
		// Shifts array if there are more than 3 elements.
		if (elements.length > 3){
			elements.shift();
		}
		// Resets element array when combo is done (1 second has passed) and executes function to check combo.
		if (spelltimer.delta() >= 1 && elements.length != 0){
			console.log("Checking Combo: " + elements);
			comboCheck();
			spelltimer.reset();
		}



		// Animation Stuff
		switch (animationCurrent) {
			case "idle": 
			this.currentAnim = this.anims.idle;
			break;
			case "walkingright":
			this.flip = false;
			this.currentAnim = this.anims.walking;
			break;
			case "walkingleft": 
			this.flip = true;
			this.currentAnim = this.anims.walking;
			break;
		}
		this.currentAnim.flip.x = this.flip;
		this.parent();
	}
});

entityQ = ig.Entity.extend({
		size: {x: 15, y:15},
		offset: {x: 4, y: 0},
		type: ig.Entity.TYPE.NONE,
		collision: ig.Entity.COLLIDES.PASSIVE,
		gravityFactor: 0,
		animSheet: new ig.AnimationSheet('media/q.png', 15, 15),

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim( 'idle', 1, [0] );
			this.addAnim( 'spawn', .1, [1,2,3,4])
			this.animationCurrent = "spawn";
		},
		update: function(){
			var player = ig.game.getEntitiesByType( EntityPlayer )[0];
			this.pos.x = player.pos.x;
			this.pos.y = player.pos.y - 25;
			this.currentAnim = this.anims.spawn;

			if( this.currentAnim.loopCount ) {
                this.kill();
            }

			this.parent();
		}

});
EntityQQQ = ig.Entity.extend({
	size: {x: 4, y: 4},
	offset: {x: 2, y: 2},
	maxVel: {x: 200, y: 200},
	gravityFractor: .1,
	
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.B, // Check Against B - our evil enemy group
	collides: ig.Entity.COLLIDES.PASSIVE,
		
	animSheet: new ig.AnimationSheet( 'media/fire.png', 3, 3 ),
	
	bounceCounter: 0,
	
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
		this.vel.y = -50;
		this.addAnim( 'idle', 0.2, [0,1] );
	},
		
	handleMovementTrace: function( res ) {
		this.parent( res );
		if( res.collision.x || res.collision.y ) {
			
			// only bounce 3 times
			this.bounceCounter++;
			if( this.bounceCounter > 3 ) {
				this.kill();
			}
		}
	},

	// This function is called when this entity overlaps anonther entity of the
	// checkAgainst group. I.e. for this entity, all entities in the B group.
	check: function( other ) {
		other.receiveDamage( 5, this );
		// this.kill();
	}	
});

});