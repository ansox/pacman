import Entity from './entity.js';
import World from '../world/world.js';
import Game from '../game.js';

export default class Player extends Entity {
  static RIGHT = 'right';
  static LEFT = 'left';
  static UP = 'up';
  static DOWN = 'down';

  direction = '';

  spriteLeft = Game.spritesheet.getSprite(16, 0, 16, 16)

  constructor(x, y, width, height, speed, sprite) {
    super(x, y, width, height, speed, sprite);
    this.depth = 1;

  }

  tick() {
    if (this.direction == Player.RIGHT && World.isFree(this.x + this.speed, this.y)) {
      this.x += this.speed;
    } else if (this.direction == Player.LEFT && World.isFree(this.x - this.speed, this.y)) {
      this.x -= this.speed;
    } else if (this.direction == Player.UP && World.isFree(this.x, this.y - this.speed)) {
      this.y -= this.speed;
    } else if (this.direction == Player.DOWN && World.isFree(this.x, this.y + this.speed)) {
      this.y += this.speed;
    }
  }

  render(context) {
    if (this.direction === Player.RIGHT || this.direction == '') {
      super.render(context);
    }
    else {
      context.drawImage(this.spriteLeft, this.x, this.y);
    }
  }
}