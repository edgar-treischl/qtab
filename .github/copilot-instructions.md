# qtab: Copilot Instructions

## Project Overview

**qtab** is an independently deployable Web Component implementing an Information Dashboard using Lit and TypeScript. The component is designed to be framework-agnostic and can be integrated into any web application (React, Angular, plain HTML, etc.) without tight coupling.

### Architecture

```
Source (TypeScript + Lit)
        ↓
    Vite Build
        ↓
  information-dashboard.js (bundled component)
        ↓
  Consumed by host portals as <information-dashboard>
```

The project emphasizes **independent deployment**: the component can be versioned, built, and distributed separately from host applications via static hosting or CDN.

## Build, Test & Lint

### Development
- **Start dev server**: `bun run dev` (or `npm run dev`)
  - Runs Vite dev server on http://localhost:5173
  - Hot module reload for TypeScript and components

### Build
- **Build for production**: `bun run build` (or `npm run build`)
  - Runs TypeScript compiler check: `tsc`
  - Builds with Vite for distribution
  - Output: `dist/` directory

### Preview
- **Preview production build**: `bun run preview`
  - Serves the built output locally to verify production bundle

### Testing & Linting
- **No dedicated test/lint commands yet** - TypeScript strict mode enforces type safety
- TypeScript options: `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `erasableSyntaxOnly`

## Key Conventions

### Web Component Pattern
- All custom elements use the `@customElement` decorator to auto-register (e.g., `@customElement('information-dashboard')`)
- Extend `LitElement` from the `lit` library
- Declarative properties using `@property()` decorator make attributes reactive
- Static `styles` property defines scoped CSS; `:host` targets the component element itself

### TypeScript Configuration
- **Target**: ES2023 (modern browsers, no polyfills needed)
- **Module**: ESNext with bundler module resolution
- **Strict checks enabled**: No unused variables/parameters, non-nullable types by default
- **No emit**: TypeScript is for type-checking only; Vite handles actual compilation

### Template & Rendering
- Use Lit's `html` template literal for rendering
- Component state flows through reactive `@property()` decorated fields
- When properties change, `render()` automatically re-executes
- CSS-in-JS using `css` tagged templates; scoped automatically by LitElement

### File Structure
- `src/information-dashboard.ts` - Main Web Component class
- `src/main.ts` - Entry point; imports and instantiates the component in the demo
- `src/counter.ts` - Example utility (can be removed; not part of core component)
- `src/style.css` - Global styles (prefer component-level CSS in static `styles`)
- `index.html` - Demo/test harness for local development

### Property & Attribute Binding
- Component public API defined by `@property()` decorators
- Properties automatically serialize to HTML attributes (e.g., `title="Production Status"`)
- Lit handles bi-directional updates: host attribute changes → component property updates

## Package Manager & Runtime
- **Bun**: Primary package manager and runtime (`bun.lock` file)
- Falls back to npm if Bun not available
- Dependencies: `lit` (Web Component library), `vite` + `typescript` (build tooling)

## Distribution & Integration Model
The built component is designed to be consumed like:
```html
<script type="module" src="https://cdn.example.com/information-dashboard@1.0.0/information-dashboard.js"></script>

<information-dashboard title="Production Status"></information-dashboard>
```

No backend required—the component uses host-provided data or external APIs only.
