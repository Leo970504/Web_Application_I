import React from "react";

function SimpleButton(props) {
    if(props.selected)
        return <button type='button' className='btn btn-primary' style={{marginRight:5}}
                    disabled={true} >{props.name}</button>
    else
        return <button type='button' className='btn btn-secondary' style={{marginRight:5}}
                    onClick={()=>props.changeSelected(props.index)}>{props.name}</button>
}

export default SimpleButton;