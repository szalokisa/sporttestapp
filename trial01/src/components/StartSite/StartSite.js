import startPicutre from './sport_test.png';
import './StartSite.scss';
import './sport_test.png'

export default function Logo(props) {
    return (
        <div className='startpicture'>
            <div className='startpicture-img'>
                <img src={startPicutre} alt="startpicture" />
            </div>
        </div>
    )
}
