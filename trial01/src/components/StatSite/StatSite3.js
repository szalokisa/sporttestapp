import Stat3Picture from './Stat3.png';
import './StatSite.scss';

export default function Logo(props) {
    return (
        <div className='stat3picture'>
            <div className='startpicture-img'>
                <img src={Stat3Picture} alt="startpicture" />
            </div>
        </div>
    )
}
