/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                saffron: '#FF9933',
                saffronDark: '#E68A2E',
                indianGreen: '#138808',
                greenDark: '#107006',
                earthyBlonde: '#F4F1EA',
                earthyBrown: '#8B5A2B',
            },
            fontFamily: {
                poppins: ['"Poppins"', 'sans-serif'],
                outfit: ['"Outfit"', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            }
        },
    },
    plugins: [],
}
