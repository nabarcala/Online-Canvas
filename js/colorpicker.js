
// Simple example, see optional options for more configuration.
export const pickr = Pickr.create({
    el: '.color-picker',
    theme: 'classic', // or 'monolith', or 'nano'
    defaultRepresentation: 'HEX', 
    default: 'rgba(0, 0, 0, 1)', 
    closeWithKey: 'Enter',
    closeOnScroll: true,
    padding: 21,
    swatches: [
        'rgba(0, 0, 0, 1)',
        '#fff',
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 193, 7, 1)'
    ],

    components: {

        // Main components
        preview: true,
        opacity: true,
        hue: true,
        // Input / output Options
        interaction: {
            hex: true,
            rgba: true,
            hsla: false,
            hsva: false,
            cmyk: false,
            input: true,
            clear: false,
            save: false
        }
    },

    // Translations, these are the default values.
    i18n: {

        // Strings visible in the UI
       'ui:dialog': 'color picker dialog',
       'btn:toggle': 'toggle color picker dialog',
       'btn:swatch': 'color swatch',
       'btn:last-color': 'use previous color',
       'btn:save': 'Save',
       'btn:cancel': 'Cancel',
       'btn:clear': 'Clear',

       // Strings used for aria-labels
       'aria:btn:save': 'save and close',
       'aria:btn:cancel': 'cancel and close',
       'aria:btn:clear': 'clear and close',
       'aria:input': 'color input field',
       'aria:palette': 'color selection area',
       'aria:hue': 'hue selection slider',
       'aria:opacity': 'selection slider'
    }
}); 