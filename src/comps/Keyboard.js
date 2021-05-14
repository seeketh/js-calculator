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

    //console.log("mother hb?", props.isHb);

    return(
        <div className="keyboard">
            {keyboardKeys}
            {/*
            <Key keyData={KEYS[ORDERED_KEY_NAMES[0]]} isPowered={props.status} onInputChange={props.onSetInput} />
            <Key keyData={KEYS[ORDERED_KEY_NAMES[1]]} isPowered={props.status} onInputChange={props.onSetInput} />
            <Key keyData={KEYS[ORDERED_KEY_NAMES[2]]} isPowered={props.status} onInputChange={props.onSetInput} />
            <Key keyData={KEYS[ORDERED_KEY_NAMES[3]]} isPowered={props.status} onInputChange={props.onSetInput} />
            <Key keyData={KEYS[ORDERED_KEY_NAMES[4]]} isPowered={props.status} onInputChange={props.onSetInput} />
            <Key keyData={KEYS[ORDERED_KEY_NAMES[5]]} isPowered={props.status} onInputChange={props.onSetInput} />
            <Key keyData={KEYS[ORDERED_KEY_NAMES[6]]} isPowered={props.status} onInputChange={props.onSetInput} />
            <Key keyData={KEYS[ORDERED_KEY_NAMES[7]]} isPowered={props.status} onInputChange={props.onSetInput} />
            <Key keyData={KEYS[ORDERED_KEY_NAMES[8]]} isPowered={props.status} onInputChange={props.onSetInput} />
            <Key keyData={KEYS[ORDERED_KEY_NAMES[9]]} isPowered={props.status} onInputChange={props.onSetInput} />
            <Key keyData={KEYS[ORDERED_KEY_NAMES[10]]} isPowered={props.status} onInputChange={props.onSetInput} />
            <Key keyData={KEYS[ORDERED_KEY_NAMES[11]]} isPowered={props.status} onInputChange={props.onSetInput} />
            <Key keyData={KEYS[ORDERED_KEY_NAMES[12]]} isPowered={props.status} onInputChange={props.onSetInput} />
            <Key keyData={KEYS[ORDERED_KEY_NAMES[13]]} isPowered={props.status} onInputChange={props.onSetInput} />
            <Key keyData={KEYS[ORDERED_KEY_NAMES[14]]} isPowered={props.status} onInputChange={props.onSetInput} />
            <Key keyData={KEYS[ORDERED_KEY_NAMES[15]]} isPowered={props.status} onInputChange={props.onSetInput} />
            <Key keyData={KEYS[ORDERED_KEY_NAMES[16]]} isPowered={props.status} onInputChange={props.onSetInput} />
            <Key keyData={KEYS[ORDERED_KEY_NAMES[17]]} isPowered={props.status} onInputChange={props.onSetInput} /> */}
        </div>
    );
}

export { Keyboard };