import Modal from "react-responsive-modal";
import React, { Component } from 'react';
import './note-modal.css'
import ModalToolBar from '../note-toolbar/note-toolbar-container';
import {changeColor, getFolderName, pinNote } from './note-modal-controller';
import Snackbar from '@material-ui/core/Snackbar';

export default class NoteModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            background: "",
            backgroundColor: "",
            pinned: this.props.openedNote.pinned
        }

        this.changeColor = changeColor.bind(this);
        this.getFolderName = getFolderName.bind(this);
        this.pinNote = pinNote.bind(this);
        this.closeSnackBar = this.closeSnackBar.bind(this);
    }

    closeSnackBar = () => {
        this.setState({ openSnackBar: false })
    }

    modalColor() {
        var backgroundColor = this.props.openedNote.color;
        const darkMode = this.props.darkMode
        var colorCode = ""

        backgroundColor === "red" ? darkMode ? colorCode = "rgb(112, 79, 76) " : colorCode = "rgb(242, 139, 130)" :
            backgroundColor === "blue" ? darkMode ? colorCode = "rgb(54, 69, 95)" : colorCode = "rgb(174, 203, 250)" :
                backgroundColor === "grey" ? darkMode ? colorCode = "rgb(86, 86, 87)" : colorCode = "rgb(232, 234, 237)" :
                    backgroundColor === "white" ? darkMode ? colorCode = "rgb(44, 44, 44)" : colorCode = "white" :
                        backgroundColor = "white"

        this.setState({
            background: colorCode,
            backgroundColor: backgroundColor

        })
    }

    componentWillMount() {
        this.modalColor();
    }

    componentWillUnmount() {
        this.props.sendDataToParent(this.titleInput.value, this.textInput.value, this.state.backgroundColor, this.state.folderName, this.state.pinned);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.darkMode !== this.props.darkMode) {
            this.modalColor();
        }
    }

    render() {
        const darkTextClassName = this.props.darkTextClassName;
        const darkMode = this.props.darkMode;
        const modalId = this.props.darkMode ? "note-modal-dark-" + this.state.backgroundColor : "note-modal-" + this.state.backgroundColor;
        const openedNote = this.props.openedNote;

        return (
            <Modal closeIconSize={25} open={this.props.modalOpen} onClose={this.props.onCloseModal} modalId={modalId} center>

                {this.props.loading ?
                    <div class="d-flex justify-content-center">
                        <div class="spinner-grow wrapper" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>

                    :

                    <div className="note-modal">
                        <div className="note-modal-text-container">

                            <button style={{ "position": "absolute", "visibility": "hidden" }} />

                            <input className={"card-title mt-2 note-modal-title " + darkTextClassName}
                                defaultValue={openedNote.title}
                                style={{ "background": this.state.background }}
                                ref={(input) => { this.titleInput = input; }} />

                            <div className={darkMode ? "note-modal-date-dark" : "note-modal-date"}> Last edited {openedNote.date}</div>

                            <textarea className={"note-modal-text " + darkTextClassName}
                                style={{ "background": this.state.background }}
                                defaultValue={openedNote.text}
                                ref={(input) => { this.textInput = input; }}>
                            </textarea>
                            
                        </div>

                        <ModalToolBar
                            background={this.state.background}
                            changeColor={this.changeColor}
                            onCloseModal={this.props.onCloseModal}
                            deleteNoteFunc={this.props.deleteNote}
                            archiveNoteFunc={this.props.archiveNote}
                            sendFolderToParent={this.getFolderName}
                            folderName={openedNote.folder}
                            pinNote={this.pinNote}
                            pinned={this.state.pinned}
                            archived={this.props.openedNote.archived}
                            darkTextClassName={darkTextClassName}
                            darkMode={this.props.darkMode}
                            foldersResponse={this.props.foldersResponse}
                        />

                        <Snackbar
                            bodyStyle={{backgroundColor: "white"}}
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            open={this.state.openSnackBar}
                            message={<span>{this.state.snackContent}</span>}
                            onClose={this.closeSnackBar}
                            autoHideDuration={6000}
                        />

                    </div >
                }
            </Modal >
        )
    }
}