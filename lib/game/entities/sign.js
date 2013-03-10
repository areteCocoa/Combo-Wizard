ig.module(
	'game.entities.sign'
)
.requires(
	'impact.entity'
)
.defines(function(){

	entitySign = ig.Entity.extend({
		size: {x: 15, y:15},
		type: ig.Entity.TYPE.NONE,
		collision: ig.Entity.COLLIDES.PASSIVE,
		init: function(){
			
		},
		update: function(){
			
		}

	})

});