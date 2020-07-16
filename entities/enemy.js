import Entity from './entity.js';
import Game from '../game.js';
import Rectangle from '../core/rectangle.js';
import World from '../world/world.js';

export default class Enemy extends Entity {
  constructor(x, y, width, height, speed, sprite) {
    super(x, y, width, height, speed, sprite);
  }

  render(context) {

  }

  tick() {
    // this.depth = 0;
    // if (!this.iscollidingWithPlayer()) {
    //   if (this.path == null || this.path.length == 0) {
    //     let start = new Vector2i(parseInt(this.x / 16), parseInt(this.y / 16));
    //     let end = new Vector2i(parseInt(Game.player.x / 16), parseInt(Game.player.y / 16));
    //     this.path = AStar.findPath(Game.world, start, end)
    //   }
    // } else {
    //   if (Game.player.life > 0) {
    //     let r = Math.floor(Math.random(100) * 100);

    //     if (r < 15) {
    //       Sound.hitEffect.play();
    //       Game.player.life--;
    //       Game.player.isDammage = true;
    //     }
    //   }
    // }

    // this.followPath(this.path);

  }

  isColliding(xNext, yNext) {
    let enemyCurrent = new Rectangle(xNext, yNext, World.TILE_SIZE, World.TILE_SIZE);

    for (const enemy of Game.enimies) {
      if (enemy === this) {
        continue;
      }

      const targetEnemy = new Rectangle(enemy.x, enemy.y, World.TILE_SIZE, World.TILE_SIZE);

      if (enemyCurrent.intersect(targetEnemy)) {
        return true;
      }
    }

    return false;
  }

}
