ig.module(
	// Defines this entity module.
	'game.entities.player'
)
.requires(
	'impact.entity',
	'game.entities.spells.damageSpell',
	'game.entities.spells.q',
	'game.entities.spells.qq',
	'game.entities.spells.qqq',
	'game.entities.spells.w',
	'game.entities.spells.ww',
	'game.entities.spells.www',
	'game.entities.spells.e',
	'game.entities.spells.ee',
	'game.entities.spells.eee',
	'game.entities.spells.qw',
	'game.entities.spells.qqw',
	'game.entities.spells.qww',
	'game.entities.spells.we',
	'game.entities.spells.wwe',
	'game.entities.spells.wee',
	'game.entities.spells.eq',
	'game.entities.spells.eeq',
	'game.entities.spells.eqq',
	'game.entities.spells.ultimate',
	'game.entities.particleExplosion'
)
.defines(function(){

EntityPlayer = ig.Entity.extend({

	// Sets Player Attributes
	size: {x: 14, y:20},
	friction: {x:350, y: 15},
	maxVel: {x: 200, y: 200},

	// Sets Player's Collision Type as A. Three collision types: A, B, NONE
	type: ig.Entity.TYPE.A,

	// Checks collisions against both Collision Groups A and B.
	checkAgainst: ig.Entity.TYPE.BOTH,

	// Custom properties
	flip: false,
	health: 10,
	
	animSheet: new ig.AnimationSheet( 'media/player.gif', 14, 20 ),	

	manaTimer: new ig.Timer(.5),
	spellTimer: new ig.Timer(.25),
	resetTimer: new ig.Timer(),

	// Invincibility
	invincibleTimer: new ig.Timer(),
	isInvincible: false,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'idle', 1, [0] );
		this.addAnim( 'walking', .2, [0,1]);
		this.addAnim( 'falling', .2, [2]);
		this.addAnim( 'casting', 1, [3]);
		animationCurrent = "idle";
		elements = [];

		// Sounds
		this.jump = new ig.Sound( 'media/music/jump.*' );
		this.jump.volume = .2;
		this.hurt = new ig.Sound( 'media/music/hurt.*' );
		this.hurt.volume = .2;
		this.xpPickUp = new ig.Sound( 'media/music/xpPickUp.*');
		this.xpPickUp.volume = .2;

	},
	
	receiveDamage: function( amount, from ) {
		if (!isInvincible) {
			this.invincibleTimer.reset();

			var xOffset = from.pos.x - this.pos.x;
			this.vel.x = -(xOffset/Math.abs(xOffset))*50;
			this.vel.y = -50;
			// this.vel.y -= 50; was causing too many problems of widely increasing the jump height of the player.

			// Add particle blood
			ig.game.spawnEntity( EntityParticleExplosion , this.pos.x, this.pos.y, {particleOffset: 0} );
			this.hurt.play();
			ig.global.health -= amount;
			this.parent( amount, from );
		}
	},

	update: function() {
		if (this.manaTimer.delta() > 0) {
			ig.game.currentMana += ig.global.manaRegen;
			this.manaTimer.reset();
			if(ig.game.currentMana >= ig.global.playerMaxMana) {
				ig.game.currentMana = ig.global.playerMaxMana;
				this.manaTimer.pause();
			}
		}
		this.health = ig.global.health;

		const tierOneSpells = ["q", "w", "e"];
		const tierTwoSpells = ["qq", "ww", "ee", "qw", "we", "eq"];
		const tierThreeSpells = ["qqq", "www", "eee", "qqw", "qww", "wwe", "wee", "eeq", "eqq"];
		const spellArrays = [tierOneSpells, tierTwoSpells, tierThreeSpells];

		const tierOneSpellEntities = [EntityQ, EntityW, EntityE];
		const tierTwoSpellEntities = [EntityQQ, EntityWW, EntityEE, EntityQW, EntityWE, EntityEQ];
		const tierThreeSpellEntities = [EntityQQQ, EntityWWW, EntityEEE,
			EntityQQW, EntityQWW, EntityWWE, EntityWEE, EntityEEQ, EntityEQQ];
		const spellEntitiesArray = [tierOneSpellEntities, tierTwoSpellEntities, tierThreeSpellEntities];

		// Checks to see what combo was pressed with array matching
		comboCheck = function(){
			var joinedElements = elements.join('');

			// First check if an ultimate, else match to Entity Array
			if (joinedElements[0] != joinedElements[1] && joinedElements[0] != joinedElements[2] && joinedElements[1] != joinedElements[2] && joinedElements.length == 3) {
				attackEntity = EntityUltimate;
			} else if (joinedElements != "") {
				var possibleSpells = spellArrays[joinedElements.length-1];
				
				var index = -1;
				for (var count = 0; count < possibleSpells.length; count++) {
					if (possibleSpells[count].split("").sort().toString() == joinedElements.split("").sort().toString()) {
						var attackEntity = spellEntitiesArray[joinedElements.length-1][count];
					}
				}
			}

			return attackEntity;
		}
		
		// Reset elements array every second.
		if (this.resetTimer.delta() >= 1){
			this.resetTimer.reset();
			elements = [];
		}


		// Jumping/Move through door code
		if (ig.input.pressed('up')) {
			var door = ig.game.getEntitiesByType( EntityDoor )[0];
			if ( this.touches(door) ) {
				if ( door.level ) {

               		ig.game.loadLevelDeferred(door.level);

				}
			} else if (this.standing) {
				this.vel.y = -120;
				animationCurrent = "idle";
				this.jump.play();
			}
		}

		if (ig.input.state('left') || ig.input.accel.x < -3 ){
			this.vel.x = -60;
			this.flip = true;
			if (this.vel.y == 0){
				animationCurrent = "walkingleft";
			}
		}
		else if (ig.input.state('right') || ig.input.accel.x > 3){
			this.vel.x = 60;
			this.flip = false;
			if (this.vel.y == 0){

				animationCurrent = "walkingright";
			}
		}
		else if (this.vel.y == 0){
			animationCurrent = "idle";
		} 
		if (this.vel.y > 0) {
				animationCurrent = "falling";
		}





		// Use user input to find element combo
		if (ig.input.pressed('q') || ig.input.pressed('w') || ig.input.pressed('e')) {
			var entQ = ig.game.getEntitiesByType( entityQ )[0];
			if(entQ) {
				entQ.kill();
			}
			animationCurrent = "casting";
		}

		if (ig.input.pressed('q')) {
			ig.game.spawnEntity( entityQ, this.pos.x, this.pos.y - 25 );
			this.resetTimer.reset();
			elements.push("q");
		}
		if (ig.input.pressed('w')) {
			ig.game.spawnEntity( entityQ, this.pos.x, this.pos.y - 25 );
			this.resetTimer.reset();
			elements.push("w");
		}
		if (ig.input.pressed('e')) {
			ig.game.spawnEntity( entityQ, this.pos.x, this.pos.y - 25, {flip: this.flip} );
			this.resetTimer.reset();
			elements.push("e");
		}


		if (ig.input.state('r')) {
			var attackEntity = comboCheck();

			if ( attackEntity ) {
				var manaCost = 0;
				for (var count=0; count<spellEntitiesArray.length; count++) {
					if (spellEntitiesArray[count].indexOf(attackEntity) != -1) {
						manaCost = Math.pow(5, count);
					}
				}

				// Comment for real game, uncomment for dev mode
				manaCost = 0;

				if (ig.game.currentMana > manaCost && this.spellTimer.delta() > 0) {
					ig.game.currentMana -= manaCost;
					this.manaTimer.unpause();
					var settings = {vel: {x: (this.flip ? -150 : 150), y:0}};

					ig.game.spawnEntity ( attackEntity, this.pos.x, this.pos.y, settings);

					elements = [];
					this.spellTimer.reset();
				}
			} else {
				elements = [];
			}
		} else if (ig.input.state('t')) {
			elements = [];
		}


		// Shifts array if there are more than 3 elements.
		if (elements.length > 3){
			elements.shift();
		}
		// Is Invincible?
		if (this.invincibleTimer.delta() < 1.5) {
			isInvincible = true;
			this.currentAnim.alpha = this.invincibleTimer.delta() - .5;
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
			this.currentAnim = this.anims.walking;
			break;
			case "walkingleft": 
			this.currentAnim = this.anims.walking;
			break;
			case "falling": 
			this.currentAnim = this.anims.falling;
			break;
			case "casting": 
			this.currentAnim = this.anims.casting;
			break;
		}
		this.currentAnim.flip.x = this.flip;
		this.parent();
	},

	triggeredBy: function( entity, trigger ) {
		console.log("Woah!");
	}
});

// Will be moved to a seperate file, but just placeholder image/entity for QWE combo-ing.

entityQ = ig.Entity.extend({
		size: {x: 15, y:15},
		offset: {x: 4, y: 0},
		type: ig.Entity.TYPE.NONE,
		collision: ig.Entity.COLLIDES.PASSIVE,
		gravityFactor: 0,
		animSheet: new ig.AnimationSheet('media/elements.png', 11, 10),

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim( 'fire', 1, [0] );
			this.addAnim( 'water', 1, [1]);
			this.addAnim( 'earth', 1, [2]);
			this.currentAnim = this.anims.fire;

			if (ig.input.pressed('q')) {
				this.currentAnim = this.anims.fire;
			}
			if (ig.input.pressed('w')) {
				this.currentAnim = this.anims.water;
			}
			if (ig.input.pressed('e')) {
				this.currentAnim = this.anims.earth;
			}
		},

		update: function(){
			var player = ig.game.getEntitiesByType( EntityPlayer )[0];

			if (player) {
				this.pos.x = player.pos.x + 6;
				this.pos.y = player.pos.y - 10;
			}

			if( this.currentAnim.loopCount ) {
                this.kill();
            }

			this.parent();
		}

});
});