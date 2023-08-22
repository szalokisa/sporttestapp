import Stat2Picture from './Stat2.png';

import './StatSite.scss';
// import './sport_test.png'

export default function Logo(props) {
    return (
        <div className='stat2picture'>
            <div className='startpicture-img'>
                <img src={Stat2Picture} alt="startpicture" />
            </div>
        </div>
    )
}
