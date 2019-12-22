// The following functions are imported to the home container and not the modal component because it is the one connected to Redux

export function onOpenModal(id) {
    const fetchAllResponse = this.props.fetchAllResponse;

    // Search for the selected note's data from the fetch all response and save it to the openedNote state.
    // The checkAuth function is written this way in order to allow the below code to execute in an asynchronous way in order to
    // not cause a delay when a note is clicked.
    
    this.checkAuth();
    if (fetchAllResponse.response) {
        fetchAllResponse.response.notes.map(note => {
            if (id === note._id) {
                this.setState({
                    openedNote: note
                })
            }
        });

        this.setState({ modalOpen: true });
        this.props.history.push(this.props.location.pathname + "/note/" + id)
    }
}

export function onCloseModal() {
    this.props.getFolders();
    this.props.history.goBack()
    this.setState({ modalOpen: false });

}

export function deleteNoteFunc(id) {
    this.props.deleteNote(id, () => {
        if (this.props.deleteResponse.deleted) {
            this.props.history.push("/home")
            this.setState({ modalOpen: false, openSnackBar: true, snackContent: "Note has been permanently deleted" });
            this.fetchNotes();
        }
    });
};

export function archiveNoteFunc(id) {
    if (!this.state.openedNote.archived) {
        this.props.archiveNote(id, true, () => {
            if (this.props.archiveResponse) {
                this.props.history.push("/home");
                this.setState({ modalOpen: false, openSnackBar: true, snackContent: "Note has been moved to archive" });
                this.fetchNotes()
            };
        });

    } else if (this.state.openedNote.archived) {
        this.props.archiveNote(id, false, () => {
            if (this.props.archiveResponse) {
                this.props.history.push("/archive");
                this.setState({ modalOpen: false, openSnackBar: true, snackContent: "Note has been restored successfully" });
                this.fetchNotes()
            }
        })
    }
}


export function editNote(newTitle, newText, newColor, newFolder, newPinned) {
    const openedNote = this.state.openedNote;

    const title = openedNote.title;
    const text = openedNote.text;
    const color = openedNote.color;
    const folder = openedNote.folder;
    const pinned = openedNote.pinned;

    var note = {}

    newTitle !== title ? note.newTitle = newTitle : note = { ...note };
    newText !== text ? note.newText = newText : note = { ...note };
    newColor !== color ? note.newColor = newColor : note = { ...note };
    newFolder !== folder ? note.newFolder = newFolder : note = { ...note };
    newPinned !== pinned ? note.newPinned = newPinned === false ? "false" : true : note = { ...note };


    // Save changes made to the note if any of the following changes are detected
    if (note.newTitle || note.newText || note.newColor || note.newFolder || note.newPinned) {
        this.props.patchNote(note.newTitle, note.newText, openedNote._id, note.newColor, note.newFolder, note.newPinned, () => {
            // Re-fetch the notes one the changes are done
            this.fetchNotes(() => {
                this.getPinnedNotes();
                this.displayNotes()
            });

            this.setState({
                openSnackBar: true,
                snackContent: "Note has been updated successfully"
            })


        });
    }

}

