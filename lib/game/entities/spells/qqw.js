ig.module(
	'game.entities.spells.qqw'
)
.requires(
	'impact.entity',
	'game.entities.spells.qw'
)
.defines(function(){

EntityQQW = EntityQW.extend({	
	damage: 10,
});

});