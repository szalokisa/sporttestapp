import startPicutre from './login_alert.png';
import './LoginAlertSite.scss';
import './login_alert.png'
import TitleBar from "../../components/titleBar/TitleBar";

export default function Logo(props) {

    return <main className="page-persons">
        <TitleBar title={props.title} />
        <div className='startpicture'>
            <div className='startpicture-img'>
                <img src={startPicutre} alt="startpicture" />
            </div>
        </div>
    </main>
}
