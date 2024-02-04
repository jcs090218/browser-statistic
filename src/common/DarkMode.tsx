type EmptyFunction = () => void;

const darkModeHook: Array<EmptyFunction> = [];
const lightModeHook: Array<EmptyFunction> = [];

export const onDarkMode = (exec: EmptyFunction) => {
    darkModeHook.push(exec);
};

export const onLightMode = (exec: EmptyFunction) => {
    lightModeHook.push(exec);
};

export const setDart = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
    darkModeHook.forEach(exec => { exec(); });
};

export const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
    lightModeHook.forEach(exec => { exec(); });
};

const STORED_THEME = localStorage.getItem("theme");

const PREFERS_DARK =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

export const DEFAULT_DARK =
    STORED_THEME === "dark" || (STORED_THEME === null && PREFERS_DARK);

if (DEFAULT_DARK) {
    setDart();
}
