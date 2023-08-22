import Stat1Picture from './Stat1.png';

import './StatSite.scss';
// import './sport_test.png'

export default function Logo(props) {
    return (
        <div className='stat1picture'>
            <div className='startpicture-img'>
                <img src={Stat1Picture} alt="startpicture" />
            </div>
        </div>
    )
}
