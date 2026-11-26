// NationAtlas bootstrap: start the hash router and re-render on navigation.
import { route } from './views.js';

window.addEventListener('hashchange', route);
route();
