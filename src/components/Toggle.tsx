import { useState } from 'react';
import ReactSwitch from 'react-switch';

function Toggle() {
    const [checked, setChecked] = useState(true);

    // @ts-expect-error allow any
    const handleChange = val => {
        console.log(val);
        if (val)
            document.body.classList.add('dark');
        else
            document.body.classList.remove('dark');
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
