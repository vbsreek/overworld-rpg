import Phaser from "phaser";
import { OverworldScene } from "./scenes/OverworldScene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "game",
  width: 640,
  height: 480,
  backgroundColor: "#2d4a3e",
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  scene: [OverworldScene],
};

new Phaser.Game(config);
