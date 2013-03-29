ig.module(
	'game.entities.spells.wwe'
)
.requires(
	'impact.entity',
	'game.entities.spells.we'
)
.defines(function(){

EntityWWE = EntityWE.extend({	

	// animSheet: new ig.AnimationSheet( 'media/smallwat.png', 10, 10 ),
	damage: 10
});

});