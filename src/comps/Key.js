
import { Component } from 'react';
import { ACTIVE_KEY, LONG_KEY, INACTIVE_KEY, INACTIVE_LONG_KEY, ACTIVE_LONG_KEY, HB_KEY, ACTIVATED_HB_KEY, ON, OFF } from './config';
import '../css/Key.scss';
import { IoSunnyOutline, IoSunnySharp } from 'react-icons/io5';

// A Calculator Keyboard Key.

export class Key extends Component {

    constructor(props) {
        super(props);

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.checkHb = this.checkHb.bind(this); // Check High brightness status.

        this.state = {keyClass: (this.props.keyData.type) ? INACTIVE_LONG_KEY : INACTIVE_KEY}; // Styling class for the key.
    }

    // Expected props: key {id, value},  isPowered, onKeyActivate, isHb, onChangeHb

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown);
    }

    componentDidUpdate() {
        // Disable brightness indicator when the calculator is turned off (from an active high brightness state)
        (this.checkHb() & !this.props.isPowered & !(this.state.keyClass === INACTIVE_KEY)) && this.setState({keyClass: INACTIVE_KEY});
        //console.log("key component updated");
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown(event) {
        //console.log("received key", event.key.toUpperCase());
        if (this.props.keyData.value === event.key.toUpperCase()) {
            this.handleClick();
        }  
    }

    checkHb() {
        return (this.props.keyData.value === HB_KEY);
    }

    handleClick() {
        // Ignore any click or keypress if the calculator is not powered
        console.log("combo", this.props.keyData.value);
        
        if (this.props.isPowered) {
            // Set CSS style based on key type and functionality
            this.setState({
                keyClass: (this.props.keyData.type) ? ACTIVE_LONG_KEY : ACTIVE_KEY
            });

            (this.checkHb() & this.props.isHb) ? this.props.onChangeHb(OFF)
            : (this.checkHb() & !this.props.isHb) ? this.props.onChangeHb(ON)
                : this.props.onKeyActivate(this.props.keyData.value); // It is not Hb key.

            setTimeout(() => {
                this.setState({
                    keyClass: (this.props.keyData.type) ? INACTIVE_LONG_KEY
                    : (this.checkHb() & this.props.isHb) ? ACTIVATED_HB_KEY : INACTIVE_KEY
            })}, 100);
        }
    }

    render() {
        // Dermine key label
        const label = (this.checkHb()) ? (this.props.isHb) ? <IoSunnySharp /> : <IoSunnyOutline />: this.props.keyData.value;

        return (
            <div className={this.props.keyData.type && LONG_KEY}>
                <button
                    className={this.state.keyClass}
                    onClick={this.handleClick} 
                    id={this.props.keyData.id}
                >
                    {label}
                </button>
            </div>         
        );
    }

}

