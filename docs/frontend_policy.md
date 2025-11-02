# Frontend Policy

## Rules

- ✅ Vue 3 Composition API
- ✅ Pure HTML/CSS (no Vuetify)
- ✅ Use `API_MAP` for all API calls
- ✅ Components must stay < 500 lines
- ✅ Virtual scrolling for lists > 50 items

## Component Structure

- `.vue` files with separate `.js` includes
- Use `setup()` function for Composition API
- Clean up event listeners in `beforeUnmount()`

## Debugging

- Use `console.log` while developing
- Remove `console.log` before commit
- Use `console.error` / `console.warn` only in production

## Code Style

- No external CDN/fonts - all assets local
- No caching except temp operation queue
- Follow existing patterns in components
