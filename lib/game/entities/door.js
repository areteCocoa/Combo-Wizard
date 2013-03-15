/*
        HOW TO USE:

        Load up Weltmeister.
        Add door entity, select the entity and look to the variables on the right.
        Set key to 'level'
        And value to the level name.

        AND YOU'RE DONE.
*/

ig.module(
    'game.entities.door'
)
.requires(
    'impact.entity'
)
.defines(function(){
    EntityDoor = ig.Entity.extend({
        checkAgainst: ig.Entity.TYPE.A,
        size: {x: 15, y: 26},
        animSheet: new ig.AnimationSheet('media/door.png', 15, 26),
        level: null,
        zIndex: -10,

        // overwrite the update method and remove the this.parent() call, to stop it from rendering
        update: function(){},

        init: function(x, y, settings) {
            this.addAnim('idle', 1, [0]);
            this.parent(x, y, settings);
        },

        check: function(other) {
            if (ig.input.pressed('up')){
                if(this.level) {
                var levelName = this.level.replace(/^(Level)?(\w)(\w*)/, function(m, l, a, b) {
                    return a.toUpperCase() + b;
                });
                ig.game.loadLevelDeferred(ig.global['Level'+levelName]);
                }
            }
        }
    });
});