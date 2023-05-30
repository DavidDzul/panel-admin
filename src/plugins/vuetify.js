import { createApp } from 'vue'
import { createVuetify, ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as labsComponents from 'vuetify/labs/components'
import * as Vue from 'vue';
import * as VueRouter from 'vue-router';

const myCustomLightTheme = {
    dark: false,
    colors: {
        background: '#ffffff',
        primary: '#007bff',
        'primary-darken-1': '#3700B3',
        secondary: '#042552',
        'secondary-darken-1': '#018786',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFB718',
        navbar: '#f7f7f7'
    },
}

export default createVuetify({
    components: {
        ...components,
        ...labsComponents,
    },
    theme: {
        defaultTheme: 'myCustomLightTheme',
        themes: {
            myCustomLightTheme,
        },
    },
})