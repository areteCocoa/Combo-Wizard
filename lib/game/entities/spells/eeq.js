ig.module(
	'game.entities.spells.eeq'
)
.requires(
	'impact.entity',
	'game.entities.spells.eq'
)
.defines(function(){

EntityEEQ = EntityEQ.extend({

	// TODO: CUSTOM ANIMATION
	// animSheet: new ig.AnimationSheet( 'media/player.gif', 14, 20 ),	

	damage: 10,
});

});