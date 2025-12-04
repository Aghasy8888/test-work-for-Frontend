/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

import '@fontsource/roboto/400.css' // Regular
import '@fontsource/roboto/500.css' // Medium
import '@fontsource/roboto/700.css' // Bold

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
