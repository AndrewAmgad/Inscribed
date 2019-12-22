export function filterOnSearch(input) {
    if (input) {
        this.props.history.push('/home?search=' + input)
    } else {
        this.props.history.push('/home')
    }
    var searchResult = [];
    if (this.props.fetchAllResponse.response) {
        this.props.fetchAllResponse.response.notes.map((note) => {
            const title = note.title.toLowerCase();
            const text = note.text.toLowerCase();
            const searchInput = input.toLowerCase();
            if (!note.archived) {
                if (title.includes(searchInput) || text.includes(searchInput)) {
                    searchResult.push(note)
                }
            }
        });

        this.setState({
            searchResult: searchResult
        })
    }
}