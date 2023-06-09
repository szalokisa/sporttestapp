import logo from './sport_test.png';
import './Logo.scss';
import './sport_test.png'

export default function Logo(props) {
    return (
        <div className='logo'>
            <div className='logo-img'>
                <img src={logo} alt="logo" />
            </div>
        </div>
    )
}
