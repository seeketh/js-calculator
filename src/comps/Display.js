import { useMemo } from 'react';
import { DISPLAY_OFF, DISPLAY_ON, DISPLAY_ON_HB } from './config'; // CSS classess.
import '../css/Display.scss';


// The calculator display.
function Display(props) {

    const displayClass = useMemo(() => {
        return (props.status) ? // Whether the calculator is powered or not.
            (props.isHb) ? DISPLAY_ON_HB // Whether the display high brightness is On or not.
            : DISPLAY_ON
        : DISPLAY_OFF;
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