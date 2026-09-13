# Global Hack Week Tree Game

A lightweight, browser-based starter game for **MLH Global Hack Week: Data**.

## Game loop

- Press **Start Game** to begin a 45-second round.
- **Plant Tree** to add trees and earn points (costs water).
- **Water Forest** to recover water (small score penalty).
- Keep your forest alive through drought and heatwaves.
- Score increases over time when living trees keep growing.
- Press **Restart** anytime for a fresh run.

## Run locally

This project has no build step and no dependencies.

1. Clone the repository.
2. Open `/home/runner/work/global-hack-week-tree-game/global-hack-week-tree-game/index.html` in your browser.

Or from the repository root, run a simple local server:

```bash
python3 -m http.server 8000
```

Then visit: `http://localhost:8000`

## Project structure

- `index.html` — UI layout and controls
- `style.css` — game styling
- `game.js` — game state and playable logic
