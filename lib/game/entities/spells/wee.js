ig.module(
	'game.entities.spells.wee'
)
.requires(
	'impact.entity',
	'game.entities.spells.we'
)
.defines(function(){

EntityWEE = EntityWE.extend({	

	// animSheet: new ig.AnimationSheet( 'media/smallwat.png', 10, 10 ),
	blindness: 100,
});

});