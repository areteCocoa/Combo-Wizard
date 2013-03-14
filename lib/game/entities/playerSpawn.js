ig.module(
	'game.entities.playerSpawn'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntityPlayerSpawn = ig.Entity.extend({
	size: {x: 5, y: 5},	
	gravityFactor: 0
})

});