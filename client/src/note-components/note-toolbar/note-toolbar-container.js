

import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import './note-toolbar.css'
import ChangeFolderItem from './change-folder';
import ChangeColorItem from './change-color';

export default function ModalBottom(props) {
    const pinNote = () => {
        console.log(props.pinned)
        props.pinned ? props.pinNote(false) : props.pinNote(true)
    }


    const CustomToolTip = withStyles(theme => ({
        tooltip: {
            fontSize: theme.typography.pxToRem(15),
        },
    }))(Tooltip);

    const darkMode = props.darkMode;
    const folders = props.foldersResponse.folders;

    return (
        <div className="note-modal-bottom" style={{ "background": props.background }}>
            <div className="bottom-icons">

                <CustomToolTip title={props.archived ? "Restore Note" : "Archive"} placement="top">
                    <i onClick={props.archiveNoteFunc} className={"fa fa-archive bottom-icon " + props.darkTextClassName}></i>
                </CustomToolTip>

                <CustomToolTip title="Delete Note" placement="top">

                    <i onClick={props.deleteNoteFunc} className={"fas fa-trash bottom-icon " + props.darkTextClassName}></i>

                </CustomToolTip>

                <ChangeFolderItem
                    archived={props.archived}
                    darkTextClassName={props.darkTextClassName}
                    folderName={props.folderName}
                    folders={folders}
                    sendFolderToParent={props.sendFolderToParent}
                    onCloseModal={props.onCloseModal}
                />

                <ChangeColorItem
                    darkMode={darkMode}
                    changeColor={props.changeColor}
                    darkTextClassName={props.darkTextClassName}
                />


                {!props.archived ?
                    <CustomToolTip title="Pin Note" placement="top">
                        <i onClick={pinNote} className={"fas fa-thumbtack bottom-icon " + props.darkTextClassName}></i>
                    </CustomToolTip>
                    : ""}

            </div>

            <button
                type="button"
                className="btn btn-light float-right close-modal-button"
                onClick={props.onCloseModal}
                style={{ "display": "none" }}
            >
                Close
    </button>
        </div>
    )
}