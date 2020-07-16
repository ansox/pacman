import Spritesheet from './core/spritesheet.js';
import Player from './entities/player.js';
import World from './world/world.js';
import UI from './ui/ui.js';
import Sound from './core/sound.js';
import Entity from './entities/entity.js';

export default class Game {
  canvas;
  context;

  static WIDTH = 270;
  static HEIGHT = 270;
  static SCALE = 3;

  static spritesheet;
  static entities = [];
  static enimies = [];
  static player;
  static world;
  static ui;
  static showMessageGameOver = false;
  static gameState = 'NORMAL';
  static restarting = false;
  static started = false;
  cur_level = 1;
  max_level = 1;

  framesGameOver = 0;
  restartGame = false;

  start() {
    this.canvas = document.getElementById('canvas');
    this.context = canvas.getContext('2d');
    this.context.canvas.width = Game.WIDTH * Game.SCALE;
    this.context.canvas.height = Game.HEIGHT * Game.SCALE;

    this.context.scale(Game.SCALE, Game.SCALE);

    Game.spritesheet = new Spritesheet();
    Game.spritesheet.loadImage('./imgs/spritesheet.png')
      .then(() => {
        // Sound.musicBackground.loop();
        Game.player = new Player(16, 16, 16, 16, 2, Game.spritesheet.getSprite(0, 0, 16, 16));
        Game.entities.push(Game.player);

        Game.world = new World();
        Game.world.loadImage('./imgs/level1.png')
          .then(() => {
            Game.started = true;
          });

        this.ui = new UI();

        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));

        window.requestAnimationFrame(this.run.bind(this));
      })
  }

  onKeyDown(e) {
    if (e.code === 'ArrowRight') {
      Game.player.direction = Player.RIGHT;
    }

    if (e.code === 'ArrowLeft') {
      Game.player.direction = Player.LEFT;
    }

    if (e.code === 'ArrowUp') {
      Game.player.direction = Player.UP;
    }

    if (e.code === 'ArrowDown') {
      Game.player.direction = Player.DOWN;
    }

    if (e.code === 'Enter') {
      this.restartGame = true;
    }

  }

  onKeyUp(e) {
    // if (e.code === 'ArrowRight') {
    //   Game.player.right = false;
    // }

    // if (e.code === 'ArrowLeft') {
    //   Game.player.left = false;
    // }

    // if (e.code === 'ArrowUp') {
    //   Game.player.up = false;
    // }

    // if (e.code === 'ArrowDown') {
    //   Game.player.down = false;
    // }
  }

  run() {
    this.tick();
    this.render();
    window.requestAnimationFrame(this.run.bind(this));
  }

  render() {
    if (Game.gameState === 'NORMAL' || Game.gameState === 'GAME_OVER') {
      this.context.fillStyle = "#000"
      this.context.fillRect(0, 0, Game.WIDTH * Game.SCALE, Game.HEIGHT * Game.SCALE);

      if (!Game.restarting) {
        Game.world.render(this.context);
        Game.entities.sort(Entity.nodeSorter);
        Game.entities.forEach(entity => entity.render(this.context));

        if (Game.gameState === 'GAME_OVER') {
          this.context.fillStyle = 'rgba(0, 0, 0, 0.5)';
          this.context.fillRect(0, 0, Game.WIDTH * Game.SCALE, Game.HEIGHT * Game.SCALE);
        }

        this.ui.render(this.context);
      }
    }
  }

  tick() {
    if (Game.gameState === 'NORMAL') {
      this.restartGame = false;

      Game.entities.forEach(entity => entity.tick());

    } else if (Game.gameState === 'GAME_OVER') {
      this.framesGameOver++;
      if (this.framesGameOver == 30) {
        this.framesGameOver = 0;
        Game.showMessageGameOver = !Game.showMessageGameOver;
      }

      if (this.restartGame) {
        Game.gameState = 'NORMAL';
        this.cur_level = 1;
        Game.world.restartGame('level1.png');
      }
    }
  }
}