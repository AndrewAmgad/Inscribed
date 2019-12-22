export function fetchNotes(callback) {
    this.props.fetchAllNotes("", () => {
        if (this.props.fetchAllError === "Auth failed") {
            this.props.history.push("/user/signIn")
        } else {
            
            this.getPinnedNotes();
            this.folderFilter();
            this.getArchivedNotes();
            this.editPageTitle();
            this.editEmptyMessage();

            if (callback) {
                callback()
            }
        }
    });
}


export function getPinnedNotes() {
    var pinnedNotes = [];
    if (this.props.location.pathname.startsWith('/home') && !this.props.searchInput) {
        if (this.props.fetchAllResponse.response) {
            this.props.fetchAllResponse.response.notes.map(note => {
                if (note.pinned) {
                    pinnedNotes.push(note);
                };
            });

            this.setState({
                pinnedNotes: pinnedNotes
            });
        }
    } else {
        this.setState({
            pinnedNotes: []
        })
    }
}

export function getArchivedNotes() {
    var archivedNotes = [];
    const notes = this.props.fetchAllResponse.response ? this.props.fetchAllResponse.response.notes : [];

    if (notes) {
        notes.map(note => {
            if (note.archived === true) {
                archivedNotes.push(note);
            };
        });

        this.setState({
            archivedNotes: archivedNotes
        });
    }

}



export function displayNotes() {
    var displayedNotes;
    const pathname = this.props.location.pathname;
    const pinnedNotes = this.state.pinnedNotes;
    const fetchAllResponse = this.props.fetchAllResponse;

    if (pathname.startsWith("/folder")) {
        displayedNotes = this.state.folderFilter;
    } else if (pathname.startsWith("/archive")) {
        displayedNotes = this.state.archivedNotes;

    } else {
        // The allNotes variable will contain all user's notes except the pinned and archived ones.

        var allNotes = [];

        if (fetchAllResponse.response) {
            fetchAllResponse.response.notes.map(note => {
                if (note.pinned !== true && note.archived !== true) {
                    allNotes.push(note);
                };
            });
        };

        // Replace the displayed notes with the search result if there's a search input
        displayedNotes = this.props.searchInput.length !== 0 ? this.state.searchResult :
            allNotes
    }

    return displayedNotes
}

// Filter the notes response to show only the ones matching the selected folder name
export function folderFilter() {
    const pathname = this.props.location.pathname;

    const fetchAllResponse = this.props.fetchAllResponse

    // Get folder name from the URL
    var folderName = pathname.replace('/folder/', "").split('/')[0]
    var filtered = [];

    // Find note objetcs that have a folder property matching the selected folder name
    if (fetchAllResponse.response) {
        const notes = this.props.fetchAllResponse.response.notes;
        notes.map((note) => {
            if (note.folder === folderName && note.archived !== true) {
                filtered.push(note);
            };
        });

        this.setState({
            folderFilter: filtered
        });
    }
};


export function editPageTitle() {
    const pathname = this.props.location.pathname;
    const pinnedNotes = this.state.pinnedNotes;
    if (this.props.searchInput) {
        if (this.state.searchResult.length > 0) {
            this.setState({
                pageTitle: "Showing results for: " + this.props.searchInput
            })
        } else {
            this.setState({
                pageTitle: 'No results found matching "' + this.props.searchInput + '"'
            })
        }

    } else if (this.props.searchInput === "") {
        if (pathname.includes('/home')) {
            this.setState({
                pageTitle: pinnedNotes.length === 0 ? "Notes" : "Others"
            })
        } else if (pathname.startsWith('/folder')) {
            var title = pathname.replace('/folder/', "").split("/")[0];
            this.setState({
                pageTitle: title
            });
        } else if (pathname.startsWith("/archive")) {
            this.setState({
                pageTitle: "Archive"
            })
        }
    };
};

export function editEmptyMessage(){
    const pathname = this.props.location.pathname;
    if (pathname.startsWith("/home")) {
        if(this.props.searchInput){
            this.setState({
                emptyMessage: 'No results found matching "' + this.props.searchInput + '"'
            })
        } else {
            this.setState({
                emptyMessage: "You have note notes yet, create your first note!"
            })
        }
        
    } else if (pathname.startsWith("/archive")) {
        if(this.props.searchInput){
            this.setState({
                emptyMessage: 'No results found matching "' + this.props.searchInput + '"'
            })
        } else {
            this.setState({
                emptyMessage: "Your archive is empty"
            })
        }
    }
}

