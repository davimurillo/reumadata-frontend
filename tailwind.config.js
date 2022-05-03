const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
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
        require('@tailwindcss/forms')({
            //strategy: 'base', // only generate global styles
            strategy: 'class', // only generate classes
        }),
    ],
}