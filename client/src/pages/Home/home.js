import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import './home.css'
import '../../loader.css'
import Logo from '../../images/Logo.png'
import MetaTags from 'react-meta-tags';
import Snackbar from '@material-ui/core/Snackbar';

import { fetchAllNotes, fetchNote } from '../../redux/Actions/fetch_notes';
import { createNewNote, patchNote, deleteNote, archiveNote } from '../../redux/Actions/post_notes';
import { checkAuth } from '../../redux/Actions/user';
import { getFolders } from '../../redux/Actions/folders';
import { mapDarkModeDataToState } from '../../redux/Actions/dark_mode';


import CreateNote from '../../note-components/create-note/create-note';
import NoteCard from '../../note-components/note-card/note-card';
import NoteModal from '../../note-components/note-modal/note-modal';

import { onOpenModal, onCloseModal, editNote, deleteNoteFunc, archiveNoteFunc } from './note-modal-functions'
import { checkAuthFunc } from '../../user-auth/checkAuth';
import { createNote, getCreateNoteInput } from './create-note-functions';
import { filterOnSearch } from '../../search-function/search-controller';
import { fetchNotes, folderFilter, editPageTitle, displayNotes, getPinnedNotes, getArchivedNotes, editEmptyMessage } from './home-controller';



const PageMetaTags = (
    <MetaTags>
        <title>Inscribed</title>
        <meta name="description" content="Note taking application. Save your notes to a secure database so you won't forget them." />
        <meta property="og:title" content="Inscribed" />
        <meta property="og:image" content={Logo} />
    </MetaTags>
)

const blurStyle = {
    webKitFilter: "blur(5px)",
    MozFilter: "blur(5px)",
    OFilter: "blur(5px)",
    msFilter: "blur(5px)",
    filter: "blur(5px)",
}

class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            darkMode: true,
            createNoteTitle: "",
            createNoteText: "",
            openedNote: {},
            searchResult: [],
            folderFilter: [],
            openSnackBar: false,
            pageTitle: "All Notes",
            pinnedNotes: [],
            archivedNotes: [],
            displayedNotes: []
        }

        this.fetchNotes = fetchNotes.bind(this);
        this.createNote = createNote.bind(this);
        this.getCreateNoteInput = getCreateNoteInput.bind(this);
        this.onCloseModal = onCloseModal.bind(this);
        this.onOpenModal = onOpenModal.bind(this);
        this.editNote = editNote.bind(this);
        this.deleteNoteFunc = deleteNoteFunc.bind(this);
        this.archiveNoteFunc = archiveNoteFunc.bind(this);
        this.checkAuth = checkAuthFunc.bind(this);
        this.filterOnSearch = filterOnSearch.bind(this);
        this.closeSnackBar = this.closeSnackBar.bind(this);
        this.folderFilter = folderFilter.bind(this);
        this.editPageTitle = editPageTitle.bind(this);
        this.displayNotes = displayNotes.bind(this);
        this.getPinnedNotes = getPinnedNotes.bind(this);
        this.getArchivedNotes = getArchivedNotes.bind(this);
        this.mapDarkModeDataToState = mapDarkModeDataToState.bind(this);
        this.editEmptyMessage = editEmptyMessage.bind(this);

    }

    closeSnackBar = () => {
        this.setState({ openSnackBar: false })
    }

    componentDidMount = () => {
        this.mapDarkModeDataToState();
        this.fetchNotes();
        this.editPageTitle();

        // Close the note modal on back button click
        window.onpopstate = (event) => {
            if (this.state.modalOpen) {
                this.setState({ modalOpen: false })
            };
        };
    };



    componentDidUpdate = (prevProps) => {
        if (prevProps.darkMode !== this.props.darkMode) {
            this.mapDarkModeDataToState();
        };

        // Re-render the component once a search input is received.
        if (prevProps.searchInput !== this.props.searchInput) {
            this.filterOnSearch(this.props.searchInput);
            this.editPageTitle();
            this.getPinnedNotes();
            this.editEmptyMessage();
        }

        // Re-render component once the url has changed
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.folderFilter();
            this.getPinnedNotes();
            this.getArchivedNotes();
            this.editPageTitle();
            this.editEmptyMessage();
        }

        // Update the search result when a note is updated
        if (this.props.fetchAllResponse.response) {
            if (prevProps.fetchAllResponse !== this.props.fetchAllResponse) {
                this.filterOnSearch(this.props.searchInput)
            }
        }
    }

    render() {
        const openedNote = this.state.openedNote;
        const displayedNotes = this.displayNotes();
        const pinnedNotes = this.state.pinnedNotes
        const darkBackgroundClassName = this.state.darkBackgroundClassName;
        const darkTextClassName = this.state.darkTextClassName
        const pathname = this.props.location.pathname;


        if (this.props.fetchAllLoading || this.props.patchLoading) {
            return (
                <div className="d-flex justify-content-center">
                    <div className={"spinner-grow wrapper " + darkTextClassName} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )
        }

        return (
            <div id="container" className={"container " + darkBackgroundClassName} style={this.state.modalOpen ? blurStyle : {}}>
                {PageMetaTags}

                {/* The create note bar at the top */}
                {pathname.startsWith("/archive") ? "" :
                    <CreateNote
                        sendInputData={this.getCreateNoteInput}
                        createNote={this.createNote}
                        darkBackgroundClassName={darkBackgroundClassName}
                        darkTextClassName={darkTextClassName}
                    />
                }

                {/* Pinned notes */}
                {pinnedNotes.length > 0 ?
                    <>
                        <h5 className={"page-title " + darkTextClassName}>Pinned</h5>
                        <div style={{ "marginLeft": "auto", "marginRight": "auto" }} className="row flex-column flex-md-row">

                            {this.state.pinnedNotes.map((note) => {
                                return (
                                    <NoteCard
                                        title={note.title}
                                        text={note.text}
                                        date={note.date}
                                        color={note.color}
                                        darkMode={this.props.darkMode}
                                        darkTextClassName={darkTextClassName}
                                        onClick={this.onOpenModal.bind(this, note._id)}
                                    />
                                )
                            })}
                        </div>
                    </>
                    : ""}

                {/* Message only displayed when there are no notes to show  */}
                {displayedNotes.length === 0 && pinnedNotes.length === 0 ? <h5 className={"empty-message " + darkTextClassName}>{this.state.emptyMessage}</h5> : ""}

                {/* Main page title */}
                {displayedNotes.length !== 0 ? <h5 className={"page-title " + darkTextClassName}>{this.state.pageTitle}</h5> : ""}

                {/* Page notes */}
                <div style={{ "marginLeft": "auto", "marginRight": "auto" }} className="row flex-column flex-md-row">

                    {displayedNotes.length > 0 ? displayedNotes.map((note) => {
                        return (
                            <NoteCard
                                title={note.title}
                                text={note.text}
                                date={note.date}
                                color={note.color}
                                darkMode={this.props.darkMode}
                                darkTextClassName={darkTextClassName}
                                onClick={this.onOpenModal.bind(this, note._id)}
                            />
                        )
                    }) : ""}


                    {/* Modal opens when a note is clicked */}
                    {this.state.modalOpen ?
                        <NoteModal
                            openedNote={openedNote}
                            modalOpen={this.state.modalOpen}
                            loading={this.props.noteLoading}
                            onCloseModal={this.onCloseModal}
                            sendDataToParent={this.editNote}
                            darkMode={this.props.darkMode}
                            darkBackgroundClassName={darkBackgroundClassName}
                            darkTextClassName={darkTextClassName}
                            deleteNote={this.deleteNoteFunc.bind(this, openedNote._id)}
                            archiveNote={this.archiveNoteFunc.bind(this, openedNote._id)}
                            foldersResponse={this.props.foldersResponse}
                        />

                        : ""}

                    {/* Notification bar  */}
                    <Snackbar
                        bodyStyle={{ backgroundColor: "white" }}
                        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                        open={this.state.openSnackBar}
                        message={<span>{this.state.snackContent}</span>}
                        onClose={this.closeSnackBar}
                        autoHideDuration={6000}
                    />

                </div>
            </div>


        );
    };
};

const mapStateToProps = (state) => {
    const fetchNotesReducer = state.fetchNotesReducer;
    const postNotesReducer = state.postNotesReducer;
    return {
        authResponse: state.authReducer.authResponse,
        fetchAllResponse: fetchNotesReducer.fetchAllResponse,
        noteResponse: fetchNotesReducer.noteResponse,
        createResponse: postNotesReducer.createResponse,
        deleteResponse: postNotesReducer.deleteResponse,
        archiveResponse: postNotesReducer.archiveResponse,
        foldersResponse: state.foldersReducer.foldersResponse,

        noteLoading: fetchNotesReducer.noteLoading,
        fetchAllLoading: fetchNotesReducer.fetchAllLoading,
        createLoading: postNotesReducer.createLoading,
        patchLoading: postNotesReducer.patchLoading,

        noteError: fetchNotesReducer.noteError,
        fetchAllError: fetchNotesReducer.fetchAllError,
        createError: postNotesReducer.createError,

        searchInput: state.searchReducer.input,

        darkMode: state.darkModeReducer.darkMode,
        darkModeData: state.darkModeReducer.darkModeData


    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllNotes: (folder, callback) => {
            dispatch(fetchAllNotes(folder, callback));
        },

        fetchNote: (id, callback) => {
            dispatch(fetchNote(id, callback));
        },

        createNewNote: (title, text, callback) => {
            dispatch(createNewNote(title, text, callback));
        },

        patchNote: (title, text, id, color, folder, pinned, callback) => {
            dispatch(patchNote(title, text, id, color, folder, pinned, callback));
        },

        checkAuth: (callback) => {
            dispatch(checkAuth(callback));
        },

        deleteNote: (id, callback) => {
            dispatch(deleteNote(id, callback));
        },

        archiveNote: (id, archived, callback) => {
            dispatch(archiveNote(id, archived, callback))
        },

        getFolders: (callback) => {
            dispatch(getFolders(callback));
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomePage));