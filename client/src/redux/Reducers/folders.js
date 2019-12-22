const initialState = {
    foldersResponse: {},
    error: null
};

export default function foldersResponse(state = initialState, action) {
    switch (action.type) {
        case "FETCH_FOLDERS_SUCCESS":
            return {
                ...state,
                foldersResponse: action.payload.data
            }

        case "FETCH_FOLDERS_FAILURE":
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state;
    };
};