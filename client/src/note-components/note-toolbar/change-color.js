import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';


export default function ChangeColor(props) {
    const [open, openToolBar] = React.useState(null);

    const setOpen = () => {
        !open ? openToolBar(true) : openToolBar(false); 
    }

    const InteractiveToolTip = withStyles(theme => ({
        tooltip: {
            fontSize: theme.typography.pxToRem(15),

        },
    }))(Tooltip);

    const darkMode = props.darkMode;

    return (
        <InteractiveToolTip placement="top" open={open} interactive  title={
            <div className="color-wheel">

                <div onClick={props.changeColor} style={{ "color": darkMode ? "rgb(44, 44, 44)" : "" }} className="color-div"></div>
                <div onClick={props.changeColor} style={{ "color": darkMode ? "rgb(86, 86, 87)" : "#e8eaed" }} className="color-div"></div>
                <div onClick={props.changeColor} style={{ "color": darkMode ? "rgb(54, 69, 95)" : "#aecbfa" }} className="color-div"></div>
                <div onClick={props.changeColor} style={{ "color": darkMode ? "rgb(112, 79, 76)" : "#f28b82" }} className="color-div"></div>
            </div>
        }>

            <i className={"fas fa-palette bottom-icon " + props.darkTextClassName} onClick={setOpen}></i>
        </InteractiveToolTip>
    )
}