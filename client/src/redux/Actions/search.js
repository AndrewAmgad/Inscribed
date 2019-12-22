const searchInputReceived = (data) => ({
    type: "SEARCH_INPUT",
    payload: { data }
});


export function sendSearchInput(input){
    return dispatch => {
        dispatch(searchInputReceived(input));
    };
};