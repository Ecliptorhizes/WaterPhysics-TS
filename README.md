# WaterPhysics-TS (NOT FINISH BE AWARE)

Water physics for Roblox built with **TypeScript**, **Flamework**, and **suphi-datastore** (Lapis equivalent).

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Rojo](https://rojo.space/) 7+ (install via [Rojo VSCode extension](https://marketplace.visualstudio.com/items?itemName=evaera.vscode-rojo))
- [Roblox Studio](https://www.roblox.com/create)

## Setup

```bash
npm install
```

## Syncing to Roblox Studio

1. **Start the TypeScript compiler** (watch mode):
   ```bash
   npm run watch
   ```

2. **Start Rojo** (in a separate terminal):
   ```bash
   rojo serve
   ```

3. **Connect Roblox Studio**:
   - Open Roblox Studio
   - Click "Connect" in the Rojo plugin
   - Or use the Rojo VSCode extension's "Connect" button

Your code will sync from `out/` into Roblox Studio. Changes to TypeScript files will automatically recompile when using `npm run watch`.

## Project Structure

```
src/
├── client/           # Client-side code
│   ├── components/   # Flamework components (client)
│   ├── controllers/ # Flamework controllers
│   └── runtime.client.ts
├── server/           # Server-side code
│   ├── components/  # Flamework components (server)
│   ├── services/    # Flamework services
│   └── runtime.server.ts
└── shared/           # Shared code
    ├── components/   # Shared Flamework components
    ├── network.ts    # Networking events/functions
    └── waterPhysics/ # Water physics types & config
```

## Features

- **Flamework** – Dependency injection, components, services, networking
- **suphi-datastore** – DataStore with session locking, auto-save (Lapis-style)
- **Water physics** – `WaterZone` component for water parts, extensible config

## Water Zone Setup

In Roblox Studio, add a Part and tag it with `WaterZone` (use the Tag Editor). The `WaterZone` component will automatically configure it with water physics attributes.

## Scripts

| Command | Description |
|--------|-------------|
| `npm run build` | One-time build |
| `npm run watch` | Continuous build (use with Rojo) |
