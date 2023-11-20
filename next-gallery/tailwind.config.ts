import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { withUt } from "uploadthing/tw";

export default withUt({
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      backgroundImage: {
        "hero-image": "url('../../public/images/bear.jpg')",
      },
      colors: {
        darkOrange: "#5a4a30",
        darkYellow: "#b8a27f",
        darkGreen: "#305a4a",
        darkBlue: "#202b3c",
        darkPurple: "#35305a",
        darkPink: "#4a305a",
        blue: "#5f80b4",
        yellow: "#b4935f",
        red: "#b45f80",
        lightOrange: "#f0c47f",
        lightYellow: "#e3f07f",
        lightGreen: "#abf07f",
        lightBlue: "#7fabf0",
        lightPurple: "#8c7ff0",
        lightPink: "#e07ff0",
      },
    },
  },
  plugins: [],
}) satisfies Config;
