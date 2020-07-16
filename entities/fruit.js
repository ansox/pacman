import Entity from "./entity.js";
import Game from "../game.js";

export default class Fruit extends Entity {
  sprite = Game.spritesheet.getSprite(0, 16, 16, 16);

  constructor(x, y, width, height, speed, sprite) {
    super(x, y, width, height, speed, sprite);
  }

}