import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import StyledRadio from '../../ui-components/radio-button';

export default function ChangeFolder(props) {
    let textInput = React.createRef();

    const [folderName, setFolderName] = React.useState(props.folderName ? props.folderName : "none");
    const [open, openToolBar] = React.useState(null);
    const [newFolder, setNewFolder] = React.useState(undefined)

    const setOpen = () => {
        !open ? openToolBar(true) : openToolBar(false);
    }

    const handleFolderChange = event => {
        setFolderName(event.target.value);
        props.sendFolderToParent(event.target.value);
    }

    const createNewFolder = () => {
        props.sendFolderToParent(textInput.current.value)
        setNewFolder(textInput.current.value);
      

    }

    const InteractiveToolTip = withStyles(theme => ({
        tooltip: {
            fontSize: theme.typography.pxToRem(15),

        },
    }))(Tooltip);


    return (
        <>
            {!props.archived ?
                <InteractiveToolTip placement="top" open={open} interactive disableFocusListener title={
                    <div className="folderTooltip">
                        {/* <div className="folderTooltip-title">Create a new folder</div> */}
                        <input className="folderTooltip-input" autoCapitalize="off" autoCorrect="off" placeholder="Enter Folder Name" maxLength="15" ref={textInput} />
    
                        <div className="create-folder-text" onClick={createNewFolder}>+ Create New Folder</div>
                        <hr />


                        <RadioGroup aria-label="folder" name="folder" value={newFolder ? newFolder : folderName} onChange={handleFolderChange}>
                            {props.folders ? props.folders.map((folder) => {
                                return (
                                    <FormControlLabel
                                        value={folder}
                                        control={<StyledRadio />}
                                        label={folder}
                                    />
                                )
                            }) : ""}

                            {newFolder ? 
                            <FormControlLabel
                               value={newFolder}
                               control={<StyledRadio />}
                               label={newFolder}
                            /> : "" }

                            <FormControlLabel
                                value="none"
                                control={<StyledRadio />}
                                label="None"
                            />

                        </RadioGroup>

                    </div>
                }>
                    <i className={"fas fa-folder bottom-icon " + props.darkTextClassName} onClick={setOpen}></i>
                </InteractiveToolTip>
                : ""}
        </>

    )



}