ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.entities.player',
	'game.entities.slime',
	'game.entities.zombie',
	'game.entities.boss',
	'game.entities.spikes',
	'game.entities.lava',
	'game.entities.playerSpawn',
	'game.entities.particleExplosion',
	'game.entities.xpDrop',
	'game.levels.chunk0',
	'game.levels.chunk1',
	'game.levels.chunk2',
	'game.levels.chunk3',
	'game.levels.chunk4',
	'game.levels.chunk5',
	'game.levels.chunk6',
	'game.levels.chunk7',
	'game.levels.chunk8',
	'game.levels.boss1',
	'game.levels.template',
	'impact.debug.debug'
)
.defines(function(){

StartScreen = ig.Game.extend({
	font: new ig.Font( 'media/04b03.font.png' ),
	background: new ig.Image('media/combowizard.png'),
	init: function(){
		ig.input.bind(ig.KEY.MOUSE1, 'click');
		this.textTimer = new ig.Timer();
		this.textOn = true;
		this.intro = new ig.Sound('media/music/intro.*');
		this.intro.volume = .7;
		this.intro.play();

		// Init all global variables used in the game.
		ig.global.lives = 3;
		ig.global.playerMaxMana = 100;
		ig.global.xp = 1;
		ig.global.health = 10;
		ig.global.maxHealth = 10;
		ig.global.manaRegen = .5;
		ig.global.difficulty = 1;

	},
	update: function(){
		if(ig.input.pressed('click')){
			this.intro.stop();
			ig.system.setGame(MyGame)
		}
		this.parent();
	},
	draw: function(){
		this.parent();
		this.background.draw(0,ig.system.width/8);
		var x = ig.system.width/2,
		y = ig.system.height/2;
		if (this.textTimer.delta() >= .5){
			this.textOn = !this.textOn;
			this.textTimer.reset();
		}
		if (this.textOn){
			this.font.draw('Click to Start', x, 200, ig.Font.ALIGN.CENTER);
		}

	},
});

GameOver = ig.Game.extend({
	font: new ig.Font( 'media/04b03.font.png' ),
	init: function(){
		ig.input.bind(ig.KEY.MOUSE1, 'click');
	},
	update: function(){
		if(ig.input.pressed('click')){
			ig.system.setGame(MyGame)
		}
		this.parent();
	},
	draw: function(){
		this.parent();
		var x = ig.system.width/2,
		y = ig.system.height/2;
			this.font.draw('Game Over', x , y, ig.Font.ALIGN.CENTER);
			this.font.draw('Click to Retry', x , y+10, ig.Font.ALIGN.CENTER);
	}
});

MyGame = ig.Game.extend({
	
	font: new ig.Font( 'media/04b03.font.png' ),
	gravity: 175,
	maxMana: 10,
	xp: 0,
	currentMana: 100,

	// Images
	lifeImg: new ig.Image('media/life.png'),
	manaImage: new ig.Image('media/manabar.png'),
	manaFillerImage: new ig.Image('media/mana.png'),
	upgradeImage: new ig.Image('media/elements.png'),

	levels: [],
	repeat: -1,

	isBossLevel: false,
	bossLevelMonsters: [EntityZombie, EntitySlime, EntityGhost],
	spawnedBoss: false,

	init: function() {
		//Binds Player Controls to Event Aliases.
		ig.input.bind( ig.KEY.UP_ARROW, 'up');
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right');
		ig.input.bind( ig.KEY.DOWN_ARROW, 'down');
		ig.input.bind( ig.KEY.Q, 'q');
		ig.input.bind( ig.KEY.W, 'w');
		ig.input.bind( ig.KEY.E, 'e');
		ig.input.bind( ig.KEY.R, 'r');
		ig.input.bind( ig.KEY.T, 't');

		ig.input.initMouse();

		// Player globals
		ig.global.lives = 3;
		ig.global.playerMaxMana = 100;
		ig.global.xp = 1;
		ig.global.health = 10;
		ig.global.maxHealth = 10;
		ig.global.manaRegen = .5;
		ig.global.fireLevel = 1;
		ig.global.waterLevel = 1;
		ig.global.earthLevel = 1;

		ig.music.add( 'media/music/combo.ogg', 'prunk');

		ig.music.volume = .3;
		ig.music.loop = true;
		ig.music.play();
		this.levelup = new ig.Sound('media/music/levelup.*');
		// console.log(ig.music.tracks);

		//Loads Chunk0
		this.loadLevel( LevelChunk0 );
		this.spawnPlayer();
		if( ig.ua.mobile ) {
			ig.Sound.enabled = false;
			ig.input.bind( ig.KEY.MOUSE1, 'up');
			ig.input.initAccelerometer();
		}
	},

	loadLevel: function( data ) {
    	this.parent( data );
    	
    	var door = this.getEntitiesByType( EntityDoor )[0];
    	this.isBossLevel = (data == LevelBoss1);

    	if(data == LevelChunk0) {
    		// Reloading everything, harder
    		this.repeat++;
    		ig.global.difficulty = Math.pow(2, this.repeat);
    		this.levels = [LevelChunk1, LevelChunk2, LevelChunk3, LevelChunk4, LevelChunk5, LevelChunk6, LevelChunk7, LevelChunk8];
			this.bossLevelMonsters = [EntityZombie, EntitySlime, EntityGhost];
			this.spawnedBoss = false;
    	}

    	if (!door.level && door && this.levels.length != 0) {
    		var levelIndex = Math.floor(Math.random() * this.levels.length)
    		door.level = this.levels[levelIndex];
    		this.levels.splice(levelIndex, 1);
    	} else if (this.levels.length == 0 && !this.isBossLevel) {
    		door.level = LevelBoss1;
    	} else {
    		door.kill();
    	}

    	for( var i = 0; i < this.backgroundMaps.length; i++ ) {
    	    this.backgroundMaps[i].preRender = true;
   		}
	},	

	
	update: function() {
		// Allows the screen to move with the player. Smooth scrolling.
		var player = this.getEntitiesByType( EntityPlayer )[0];

		if( player ) {
            var xDifference = player.pos.x - ig.system.width/2;
			var yDifference = player.pos.y - ig.system.height/2;

			if (this.screen.x > xDifference + 2 || this.screen.x < xDifference - 2) {
				this.screen.x = (9*this.screen.x + xDifference)/10;
			} else {
				this.screen.x = xDifference;
			}
			if (this.screen.y > yDifference + 2 || this.screen.y < yDifference - 2) {
				this.screen.y = (9*this.screen.y + yDifference)/10;
			} else {
				this.screen.y = yDifference
			}
        }
		
		if (player) {
			this.screen.x = player.pos.x - ig.system.width/2;
			this.screen.y = player.pos.y - ig.system.height/2;
		}

        // Limit Camera movement
        var xOffset = 5;
        var map    = this.getMapByName("Level");
		var maxX = map.tilesize*(map.width + xOffset) - ig.system.width,
			maxY = map.tilesize*map.height - ig.system.height;

		if (this.screen.x > maxX) {
			this.screen.x = maxX;
		} else if (this.screen.x < -xOffset*map.tilesize) {
			this.screen.x = -xOffset*map.tilesize;
		}
		if (this.screen.y > maxY) {
			this.screen.y = maxY;
		} else if (this.screen.y < 0) {
			this.screen.y = 0;
		}

        // Respawn player
        if ( player == undefined ){
        	ig.global.lives--;
        	if(ig.global.lives >= 0) {
        		this.spawnPlayer();
        	}
        	if(ig.global.lives < 0){
        		ig.system.setGame(GameOver);
        	}
        } else {
        	this.maxMana = ig.global.playerMaxMana;
        }

        // Boss level temporary implementation
        if (this.isBossLevel) {
        	if(this.bossLevelMonsters[0]) {
        		var wave = this.getEntitiesByType( this.bossLevelMonsters[0] );
	        	if(!wave[0]) {
	        		this.bossLevelMonsters.splice(0, 1);
	        		for(var x=0; x<5; x++) {
	        			var map = this.getMapByName("Level");
	        			this.spawnEntity( this.bossLevelMonsters[0], Math.floor(Math.random() * 500) + 70, Math.floor(Math.random() * 50) + 50);
	        		}
	        	} else {
	        		// console.log("Entity Alive at:" + wave[0].pos.x + "x" + wave[0].pos.y);
	        	}
        	} else {
        		var boss = this.getEntitiesByType( EntityBoss )[0];
        		if( boss ) {
        			// Handle boss stuff
        		} else if (!this.spawnedBoss) {
        			this.spawnEntity( EntityBoss, 400, 100 );
        			this.spawnedBoss = true;
        		} else if (this.spawnedBoss && !this.getEntitiesByType(EntityDoor)[0]) {
        			var door = this.spawnEntity( EntityDoor, 500, 195);
        			door.zIndex = -10;
        			door.level = LevelChunk0;
        			this.sortEntitiesDeferred();
        		}
        	}
        }

        if (ig.input.pressed('click')) {
        	if (ig.input.mouse.y > ig.system.height-this.upgradeImage.height-3 && ig.input.mouse.y < ig.system.height-3) {
        		if (ig.input.mouse.x > ig.system.width-this.upgradeImage.width+10 && ig.input.mouse.x < ig.system.width-this.upgradeImage.width+20) {
        			if (this.xp >= Math.pow(2, (ig.global.fireLevel-1)/2)) {
        				this.xp -= Math.pow(2, (ig.global.fireLevel-1)/2);
						ig.global.fireLevel++;
						this.levelup.play();
					}
        		} else if (ig.input.mouse.x > ig.system.width-this.upgradeImage.width+23 && ig.input.mouse.x < ig.system.width-this.upgradeImage.width+33) {
        			if (this.xp >= Math.pow(2, (ig.global.waterLevel-1)/2)) {
        				this.xp -= Math.pow(2, (ig.global.waterLevel-1)/2);
						ig.global.waterLevel++;
						this.levelup.play();
					}
        		} else if (ig.input.mouse.x > ig.system.width-this.upgradeImage.width+36 && ig.input.mouse.x < ig.system.width-this.upgradeImage.width+46) {
        			if (this.xp >= Math.pow(2, (ig.global.earthLevel-1)/2)) {
        				this.xp -= Math.pow(2, (ig.global.earthLevel-1)/2);
						ig.global.earthLevel++;
						this.levelup.play();
					}
        		}
        	}
        	this.xp = Math.floor(this.xp);
        	// console.log("Click");
        }




		this.parent();
	},
	
	draw: function() {
		this.parent();
		var x = ig.system.width;
		var y = ig.system.height;
		// Grab Player Object and display properties.
		var player = this.getEntitiesByType( EntityPlayer )[0];
		if( player ) {
			// Iterate through the lives, and display hearts.
            for (var i = 1; i <= ig.global.lives; i++){
            	this.lifeImg.draw(i * 15 - 10, 5);
            }
            this.font.draw("Health: " + ig.global.health, 5, y-20, ig.Font.ALIGN.LEFT);
            this.manaImage.draw(5, y-11);
            
            var manaPercent = ((this.currentMana*38 / ig.global.playerMaxMana));
            for (var count = 0; count < manaPercent; count++ ) {
            	this.manaFillerImage.draw(count + 6, y-10);
            }
			this.font.draw("Mana:" + (Math.floor(this.currentMana)), 8, y - 10, ig.Font.ALIGN.LEFT);
			this.font.draw("XP: " + this.xp, 5, 20, ig.Font.ALIGN.LEFT);

			this.font.draw("Upgrades:", x-this.upgradeImage.width+28, y-this.upgradeImage.height-13, ig.Font.ALIGN.CENTER);

			if (this.xp >= Math.pow(2, (ig.global.fireLevel-1)/2)) {
				this.upgradeImage.draw(x-this.upgradeImage.width+10, y-this.upgradeImage.height-3, 0, 0, 10, 10);
			}
			if (this.xp >= Math.pow(2, (ig.global.waterLevel-1)/2)) {
				this.upgradeImage.draw(x-this.upgradeImage.width+23, y-this.upgradeImage.height-3, 10, 0, 10, 10);
			}
			if (this.xp >= Math.pow(2, (ig.global.earthLevel-1)/2)) {
				this.upgradeImage.draw(x-this.upgradeImage.width+36, y-this.upgradeImage.height-3, 20, 0, 12, 10);
			}
        }
		this.font.draw(elements, ((x/2) - 3), y-10, ig.Font.ALIGN.LEFT );
		this.font.draw( 'ComboWizard v0.7', x, 0, ig.Font.ALIGN.RIGHT );

	},

	spawnPlayer: function() {
		var player = this.getEntitiesByType( EntityPlayer )[0];
		var spawn = this.getEntitiesByType( EntityPlayerSpawn )[0];
		if (player == undefined && spawn != undefined) {
			this.player = this.spawnEntity( EntityPlayer, spawn.pos.x, spawn.pos.y );
			this.currentMana = ig.global.playerMaxMana;
			ig.global.health = ig.global.maxHealth;
			console.log("Spawning player at: " + spawn.pos.x + " " + spawn.pos.y);
		}
	}
});

// This will be the shop screen, every 5 levels, it will switch to this, once done shopping, load back to MyGame and pass next level data.

ShopScreen = ig.Game.extend({
	font: new ig.Font( 'media/04b03.font.png' ),
	init: function(){
		
	},
	update: function(){
		this.parent();
	},
	draw: function(){
		this.parent();
		var x = ig.system.width/2,
		y = ig.system.height/2;
			this.font.draw("You have " + ig.global.xp + "XP", x , y, ig.Font.ALIGN.CENTER);
	}
});

// Start the Game with 60fps, a resolution of 450x300, scaled
// up by a factor of 2
ig.main( '#canvas', StartScreen, 60, 320, 240, 2 );

});
