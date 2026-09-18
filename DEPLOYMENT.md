# Deployment Guide – Information Dashboard Web Component

This document describes the deployment process for the **Information Dashboard** web component using GitHub Actions and GitHub Pages as a CDN.

## Architecture

```
Source Repository (TypeScript + Lit)
        ↓
GitHub Actions Workflow (build-deploy.yml)
        ↓
Vite Build → information-dashboard.js
        ↓
GitHub Pages (CDN)
        ↓
Consumer Portals
```

## Setup: GitHub Pages

1. **Enable GitHub Pages in repository settings:**
   - Go to: `Settings → Pages`
   - **Build and deployment:**
     - Source: `Deploy from a branch`
     - Branch: `gh-pages` (automatically created by Actions)
     - Folder: `/ (root)`

2. **Result:** Your component is published at:
   ```
   https://edgar-treischl.github.io/qtab/
   ```

## Deployment Flow

### Automatic Deployment

The workflow (`build-deploy.yml`) automatically builds and deploys when:

1. **Pushing to `main` branch:**
   - Builds and publishes to `/latest/` directory
   - Example URL: `https://edgar-treischl.github.io/qtab/latest/information-dashboard.js`

2. **Pushing a version tag** (e.g., `v1.0.0`, `v1.0.1`):
   - Builds and publishes to `/<tag>/` directory
   - Example URL: `https://edgar-treischl.github.io/qtab/v1.0.0/information-dashboard.js`

### Manual Deployment

Trigger the workflow manually from GitHub Actions tab:
- Go to: `Actions → Build & Deploy to GitHub Pages → Run workflow`
- Select branch and click **Run workflow**

## Creating a Release

### 1. Commit your changes
```bash
git add .
git commit -m "feat: add new feature"
```

### 2. Create a version tag
```bash
git tag v1.0.0
git push origin main
git push origin v1.0.0
```

The workflow automatically:
- Detects the tag
- Builds the component
- Deploys to `/v1.0.0/information-dashboard.js`

### 3. Create GitHub Release (optional but recommended)
```bash
gh release create v1.0.0 \
  --title "v1.0.0" \
  --notes "Release notes here"
```

Or use GitHub UI: `Releases → Draft a new release`

## Usage in Consumer Portals

### React Example
```tsx
useEffect(() => {
  // Dynamically load the component script
  const script = document.createElement('script');
  script.type = 'module';
  script.src = 'https://edgar-treischl.github.io/qtab/v1.0.0/information-dashboard.js';
  document.head.appendChild(script);
}, []);

return <div id="dashboard"></div>;
```

### HTML Example
```html
<script 
  type="module" 
  src="https://edgar-treischl.github.io/qtab/v1.0.0/information-dashboard.js">
</script>

<information-dashboard
  title="Production Status"
  data-source="https://api.example.com/status">
</information-dashboard>
```

### Dynamic Version (Always Latest)
```html
<script 
  type="module" 
  src="https://edgar-treischl.github.io/qtab/latest/information-dashboard.js">
</script>

<information-dashboard title="Dashboard"></information-dashboard>
```

## Version Strategy

- **`/latest/`** — Points to the most recent build from `main` branch
  - Use for development/testing environments
  - Auto-updates with every main branch push
  
- **`/vX.Y.Z/`** — Tagged releases
  - Use for production deployments
  - Immutable; never changes once published
  - Pin exact versions for stability

## Troubleshooting

### Workflow fails to build
1. Check GitHub Actions logs: `Actions` tab → workflow run → build logs
2. Common issues:
   - `bun install` fails → check `bun.lock` is committed
   - TypeScript errors → run `bun run build:check` locally first
   - Missing dependencies → run `bun install` locally and commit updated `bun.lock`

### Component not loading from GitHub Pages
1. Verify the file exists:
   - Visit: `https://edgar-treischl.github.io/qtab/latest/information-dashboard.js`
   - Should return JavaScript code
   
2. Check browser console for CORS errors
   - GitHub Pages supports CORS by default
   - Verify script tag has `type="module"`

3. Verify HTML structure:
   - Component element must be in DOM when script loads
   - Example: `<information-dashboard id="app"></information-dashboard>`

### Pages not updating after push
1. GitHub Actions workflow may still be running
   - Check `Actions` tab for running jobs
   
2. Browser may be caching old version
   - Clear cache or use `?v=` query parameter: 
   ```html
   <script 
     type="module" 
     src="https://edgar-treischl.github.io/qtab/latest/information-dashboard.js?v=2024">
   </script>
   ```

## Files Deployed

The workflow deploys:
- `information-dashboard.js` — ES module format (recommended)
- `information-dashboard.umd.cjs` — UMD/CommonJS format (legacy)

Use the `.js` version for modern browsers/frameworks.

## Next Steps

1. ✅ Verify GitHub Pages is enabled
2. ✅ Push a commit to `main` to trigger the workflow
3. ✅ Check workflow execution in `Actions` tab
4. ✅ Verify files appear at `https://edgar-treischl.github.io/qtab/latest/`
5. Create a tagged release (e.g., `v1.0.0`) for production use
6. Integrate the component into a consumer portal for testing
