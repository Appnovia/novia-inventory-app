/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  darkMode: "selector",
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "base-color": "#FF6347",
        "sec-color": "#3b82f6",
        "bg-color": "#f3f4f6",
      },
      fontFamily: {
        poppins: ["Poppins_600SemiBold"],
        "poppins-light": ["Poppins_300Light"],
        "poppins-bold": ["Poppins_700Bold"],
        "poppins-regular": ["Poppins_400Regular"],
        "poppins-medium": ["Poppins_500Medium"],
      },
    },
  },
  plugins: [],
};
