// Power button Component
import { POWER_ON, POWER_OFF, ON, OFF } from './config'; // Setup goodies..
import '../css/PowerBtn.scss'; // Styles
import { IoPowerSharp } from 'react-icons/io5'; // Ionicons

function PowerBtn(props) {


    return(
        <div
            className={(props.status) ? POWER_ON : POWER_OFF}
            onClick={() => {(!props.status) ? props.onChangeStatus(ON) : props.onChangeStatus(OFF)}}
        >
            <IoPowerSharp />
        </div>
    );
}

export { PowerBtn };