import { useState } from 'react';
import logo_dark from '../assets/logo-text_dark.png';
import logo_light from '../assets/logo-text_light.png';
import Toggle from '../components/Toggle';
import { DEFAULT_DARK, onDarkMode, onLightMode } from './DarkMode';

function Header() {
    const [logoImage, setLogoImage] = useState((DEFAULT_DARK) ? logo_dark : logo_light);

    /* Register hooks  */
    onDarkMode(() => { setLogoImage(logo_dark); });
    onLightMode(() => { setLogoImage(logo_light); });

    return (
        <>
            <Toggle />
            <div>
                <img src={logoImage} className="logo" alt="logo" />
            </div>
            <br />
        </>
    );
}

export default Header;
