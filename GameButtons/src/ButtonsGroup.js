import React from 'react';
import SimpleButton from "./SimpleButton";

class ButtonsGroup extends React.Component {
    constructor(props) {
        super(props);

        this.state = { chosen : 0 };
    }

    changeSelected = (id) => {
        this.setState( {chosen: id});
    }

    render() {
        return <div>
            {this.props.names.map((name, index)=>(<SimpleButton key={index} name={name} index={index} selected={index===this.state.chosen} changeSelected={this.changeSelected}/>))}
        </div>
    }


}

export default ButtonsGroup;