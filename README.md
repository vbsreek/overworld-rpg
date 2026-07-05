# Overworld RPG

Top-down tile-based RPG prototype (Pokémon-style grid movement, original theme).

**Stack:** Phaser 3, TypeScript, Vite

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:5173 — use **arrow keys** or **WASD** to move.

## Project layout

```
src/
  scenes/     Phaser scenes (OverworldScene)
  entities/   Player, NPCs (next milestone)
  world/      Tilemap and collision
```

## Next milestones

1. Sprite sheets + walk animations
2. Grid-snapped movement (tile-by-tile)
3. NPC interaction and dialogue
4. Scene transitions (interior maps)
5. Optional Godot 4 port for native tooling
