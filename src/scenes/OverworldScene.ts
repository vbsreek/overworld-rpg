import Phaser from "phaser";
import { Player } from "../entities/Player";
import { TILE_SIZE, createTilemap } from "../world/tilemap";

export class OverworldScene extends Phaser.Scene {
  private player!: Player;
  private walls!: Phaser.Physics.Arcade.StaticGroup;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };

  constructor() {
    super("OverworldScene");
  }

  create() {
    this.walls = createTilemap(this);

    this.player = new Player(this, 5 * TILE_SIZE + TILE_SIZE / 2, 5 * TILE_SIZE + TILE_SIZE / 2);
    this.add.existing(this.player);
    this.physics.add.collider(this.player, this.walls);

    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setBounds(0, 0, 20 * TILE_SIZE, 15 * TILE_SIZE);

    this.cursors = this.input.keyboard!.createCursorKeys();
    this.wasd = this.input.keyboard!.addKeys("W,A,S,D") as typeof this.wasd;

    this.add
      .text(8, 8, "Overworld RPG — Arrow keys / WASD to move", {
        fontFamily: "monospace",
        fontSize: "11px",
        color: "#e8f5e9",
        backgroundColor: "#1b4332aa",
        padding: { x: 6, y: 4 },
      })
      .setScrollFactor(0)
      .setDepth(100);
  }

  update() {
    const speed = 120;
    let vx = 0;
    let vy = 0;

    if (this.cursors.left.isDown || this.wasd.A.isDown) vx = -speed;
    else if (this.cursors.right.isDown || this.wasd.D.isDown) vx = speed;

    if (this.cursors.up.isDown || this.wasd.W.isDown) vy = -speed;
    else if (this.cursors.down.isDown || this.wasd.S.isDown) vy = speed;

    this.player.setVelocity(vx, vy);

    if (vx !== 0 && vy !== 0) {
      this.player.setVelocity(vx * 0.707, vy * 0.707);
    }
  }
}
