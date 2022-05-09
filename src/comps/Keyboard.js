import { useMemo } from 'react';
import { KEYS, ORDERED_KEY_NAMES } from './config';
import { Key } from './Key';
import '../css/Keyboard.scss';


// Calculator Keyboard.

function Keyboard(props) {

    // Create keys
   const keyboardKeys = useMemo(() => {
        return ORDERED_KEY_NAMES.map(keyName => {
            //console.log("key names ", keyName);
            return <Key keyData={KEYS[keyName]} key={keyName} isPowered={props.status} onKeyActivate={props.onSetInput} isHb={props.isHb} onChangeHb={props.onChangeHb} />;
        });
    }, [props.onSetInput, props.status, props.isHb, props.onChangeHb]);

    return(
        <div className="keyboard">
            {keyboardKeys}
        </div>
    );
}

export { Keyboard };