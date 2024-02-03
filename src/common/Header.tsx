import reactLogo from '../assets/react.svg';
import Toggle from '../components/Toggle';

function Header() {

    return (
        <>
            <Toggle />
            <div>
                <img src={reactLogo} className="logo react" alt="React logo" />
            </div>
            <br/>
        </>
    );
}

export default Header;
