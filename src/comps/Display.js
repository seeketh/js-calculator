import { useMemo } from 'react';
import { DISPLAY_OFF, DISPLAY_ON, DISPLAY_ON_HB } from './config'; // Setup goodies...
import '../css/Display.scss';


// The calculator display
function Display(props) {

    const displayClass = useMemo(() => {
        return (props.status)
            ? (props.isHb) ? DISPLAY_ON_HB : DISPLAY_ON
            : DISPLAY_OFF
     }, [props.status, props.isHb]);

    return(
        <div className={displayClass}>
            <div className="formula-display">
                {props.input}
            </div>
            <div className="result-display" id="display">
                {props.result}
            </div>
        </div>
    );
}

export { Display };