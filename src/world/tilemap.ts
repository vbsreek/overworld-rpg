import Phaser from "phaser";

export const TILE_SIZE = 32;

/** 0 = grass, 1 = path, 2 = water (blocked) */
const MAP: number[][] = [
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 2],
  [2, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 2],
  [2, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 2],
  [2, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 2],
  [2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2],
  [2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];

const COLORS: Record<number, number> = {
  0: 0x4caf50,
  1: 0xc8b896,
  2: 0x2196f3,
};

export function createTilemap(scene: Phaser.Scene): Phaser.Physics.Arcade.StaticGroup {
  const walls = scene.physics.add.staticGroup();

  const g = scene.make.graphics({ x: 0, y: 0 }, false);
  g.fillStyle(0x5c6bc0);
  g.fillRect(0, 0, TILE_SIZE - 4, TILE_SIZE - 4);
  g.generateTexture("player", TILE_SIZE, TILE_SIZE);
  g.destroy();

  for (let row = 0; row < MAP.length; row++) {
    for (let col = 0; col < MAP[row].length; col++) {
      const tile = MAP[row][col];
      const x = col * TILE_SIZE + TILE_SIZE / 2;
      const y = row * TILE_SIZE + TILE_SIZE / 2;

      const rect = scene.add.rectangle(x, y, TILE_SIZE, TILE_SIZE, COLORS[tile]);
      rect.setStrokeStyle(1, 0x00000022);

      if (tile === 2) {
        walls.add(rect);
      }
    }
  }

  scene.physics.world.setBounds(0, 0, MAP[0].length * TILE_SIZE, MAP.length * TILE_SIZE);

  return walls;
}

export function getMapDimensions(): { width: number; height: number } {
  return {
    width: MAP[0].length * TILE_SIZE,
    height: MAP.length * TILE_SIZE,
  };
}
