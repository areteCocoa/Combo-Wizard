ig.module(
	'game.entities.spells.qww'
)
.requires(
	'impact.entity',
	'game.entities.spells.qw'
)
.defines(function(){

EntityQWW = EntityQW.extend({

	// TODO: CUSTOM ANIMATION
	// animSheet: new ig.AnimationSheet( 'media/player.gif', 14, 20 ),	

	push: 150,
});

});