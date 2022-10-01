const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        './public/index.html',
        './node_modules/tw-elements/dist/js/*.js',
    ],
    theme: {
        extend: {
            colors: {
                'input-green': "#BCF0EF"
            },
            fontFamily: {
                'sans': ['Poppins', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [
        require('tw-elements/dist/plugin'),
        require('@tailwindcss/forms')({
            //strategy: 'base', // only generate global styles
            strategy: 'class', // only generate classes
        }),
    ],
}