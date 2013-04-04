ig.module(
	'game.entities.spells.eqq'
)
.requires(
	'impact.entity',
	'game.entities.spells.eq'
)
.defines(function(){

EntityEQQ = EntityEQ.extend({

	// TODO: CUSTOM ANIMATION
	// animSheet: new ig.AnimationSheet( 'media/player.gif', 14, 20 ),	

	time: 60,
});

});