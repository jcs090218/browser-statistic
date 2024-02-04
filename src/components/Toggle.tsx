import { useState } from 'react';
import ReactSwitch from 'react-switch';
import { DEFAULT_DARK, setDart, setLight } from '../common/DarkMode';

function Toggle() {
    const [checked, setChecked] = useState(DEFAULT_DARK);

    // @ts-expect-error allow any
    const handleChange = val => {
        if (val)
            setDart();
        else
            setLight();
        setChecked(val);
    }

    return (
        <div className="toggle-btn" style={{ textAlign: "center" }}>
            <ReactSwitch
                uncheckedIcon={false}
                checkedIcon={false}
                onColor='#D8DB00'
                checked={checked}
                onChange={handleChange} />
        </div>
    );
}

export default Toggle;
