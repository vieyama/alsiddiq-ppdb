import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#27999A',
                secondaryGreen: '#8ABFA3',
                primaryBlack: '#232936'
            },
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
                static: ["Nothing You Could Do"],
                poppins: ["Poppins"],
                calibri: ["Calibri"]
            },
        },
    },
    daisyui: {
        themes: ["light", "dark", "emerald"],
        base: true, // applies background color and foreground color for root element by default
        styled: true, // include daisyUI colors and design decisions for all components
        utils: true, // adds responsive and modifier utility classes
        logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
        themeRoot: ":root", // The element that receives theme color CSS variables
    },
    plugins: [forms, require("daisyui")],
};
