ig.module(
	// Defines this entity module.
	'game.entities.player'
)
.requires(
	'impact.entity',
	'game.entities.qqq'
)
.defines(function(){

EntityPlayer = ig.Entity.extend({

	// Sets Player Attributes
	size: {x: 7, y:10},
	friction: {x:150, y: 15},
	maxVel: {x: 200, y: 200},

	// Sets Player's Collision Type as A. Three collision types: A, B, NONE
	type: ig.Entity.TYPE.A,

	// Checks collisions against both Collision Groups A and B.
	checkAgainst: ig.Entity.TYPE.BOTH,

	// Collision Type is Lite, meaning it will be "pushed" instead of applying "push" force to the other object when collided
	// collides: ig.Entity.COLLIDES.lite,
	flip: false,
	health: 10,
	
	// Sets animation sprite sheet, and defines the tiles as 7px width, 10px height
	animSheet: new ig.AnimationSheet( 'media/player.gif', 7, 10 ),	

	// Sets AnimationState variable.
	

	// Timer
	invincibleTimer: new ig.Timer(),
	isInvincible: false,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'idle', 1, [0] );
		this.addAnim( 'walking', .2, [0,1]);
		animationCurrent = "idle";
		spelltimer = new ig.Timer();
		elements = [];

		// Sounds
		this.jump = new ig.Sound( 'media/music/jump.*' );
		this.jump.volume = .2;
		this.hurt = new ig.Sound( 'media/music/hurt.*' );
		this.hurt.volume = .2;

	},
	
	receiveDamage: function( amount, from ) {
		if (!isInvincible) {
			this.invincibleTimer.reset();

			var xOffset = from.pos.x - this.pos.x;
			this.vel.x = -(xOffset/Math.abs(xOffset))*50;
			this.vel.y = -50;

			// Add particle blood
			ig.game.spawnEntity( entityParticleExplosion , this.pos.x, this.pos.y);
			// Play hurt SFX.
			this.hurt.play();

			this.parent( amount, from );
		}
	},

	// Every update tick, execute this code
	update: function() {

		// Combo Checker function. IT'S SO UGLY, BUT IT WORKS.
		comboCheck = function(){
			var joinedElements = elements.join('');
			var allCombos = [q,e,w,qq,ee,ww,qe,ew,wq,qqq,eee,www,qee,qww,eqq,eww,wqq,wee,qew,ewq,qwe];

			// Once done, reset elements back again.
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
			// this.vel.x = 0;
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
			ig.game.spawnEntity( entityQ, this.pos.x, this.pos.y - 25, {flip: this.flip} );
			elements.push("e");
			spelltimer.reset();
		}
		if (ig.input.pressed('r')) {
			ig.game.spawnEntity ( EntityQqq, this.pos.x, this.pos.y+5, {vel: {x: (this.flip ? -150 : 150), y:1}});
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

		// Is Invincible?
		if (this.invincibleTimer.delta() < 1.5) {
			isInvincible = true;
			this.currentAnim.alpha = 0.3;
		} else {
			isInvincible = false;
			this.currentAnim.alpha = 1;
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

// Will be moved to a seperate file, but just placeholder image/entity for QWE combo-ing.

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

// Blood Particles for entityParticleExplosion base class.
// yes, this should be a seperate file. Stays here for now.

entityBlood = ig.Entity.extend({
		size: {x: 2, y:2},
		maxVel: {x: 160, y: 200},
		type: ig.Entity.TYPE.NONE,
		collision: ig.Entity.COLLIDES.LITE,
		lifetime: 2,
		bounciness: .4,
		gravityFactor: 1,
		vel: {x: 75, y: 20},
		friction: {x:100, y: 0},
		fadeTime: 1,
		animSheet: new ig.AnimationSheet('media/blood.png', 2, 2),

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim( 'idle', 10, [0] );
			// Add random velocity to particle.
			this.vel.x = (Math.random() * 2 - 1) * this.vel.x;
			this.vel.y = (Math.random() * 2 - 1) * this.vel.y;
			this.idleTimer = new ig.Timer();
		},
		update: function(){
			this.currentAnim = this.anims.idle;
			if( this.idleTimer.delta() > this.lifetime ) {
			this.kill();
			return;
			}
			this.currentAnim.alpha = this.idleTimer.delta().map(
			this.lifetime - this.fadetime, this.lifetime,
			1, 0
			);

			if( this.currentAnim.loopCount ) {
                this.kill();
            }

			this.parent();
		}

});

// Particle Explosion Base Class

	entityParticleExplosion = ig.Entity.extend({
		lifetime: 2,
		particles: 10,
		init: function( x, y, settings ) {
		this.parent( x, y, settings );
		// Spawn multiple particles. Default 10.
		for(var i = 0; i < this.particles; i++)
				ig.game.spawnEntity(entityBlood, x, y);
			this.idleTimer = new ig.Timer();
		},
		update: function() {
		if( this.idleTimer.delta() > this.lifetime ) {
			this.kill();
			}
		}
	});


});