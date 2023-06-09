import './TitleBar.scss';

export default function TitleBar(props) {
    return (
        <div className='main-title'>
            <h3>{props.title || '??? TitleBar - props.title'}</h3>
        </div>
    )
}