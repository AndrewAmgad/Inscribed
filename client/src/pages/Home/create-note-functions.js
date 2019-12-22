export function createNote() {
    this.props.createNewNote(this.state.createNoteTitle, this.state.createNoteText, () => {
        this.fetchNotes()
    });
};


// Get the data entered from the create note child component

export function getCreateNoteInput(val){
    this.setState({
        createNoteTitle: val.title,
        createNoteText: val.text
    });
};