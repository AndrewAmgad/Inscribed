const initialState = {
    fetchAllResponse: {},
    createResponse: {},
    noteResponse: {},
    fetchAllLoading: false,
    noteLoading: false,
    createLoading: false,
    fetchAllError: null,
    noteError: null,
    error: null,
}

export default function fetchNotesReducer(state = initialState, action) {
    switch (action.type) {
        case "FETCH_ALL_NOTES_BEGIN":
            return {
                ...state,
                fetchAllLoading: true,
                fetchAllError: null
            }
        case "FETCH_ALL_NOTES_SUCCESS":
            return {
                ...state,
                fetchAllLoading: false,
                fetchAllResponse: action.payload.data
            }
        case "FETCH_ALL_NOTES_FAILURE":
            return {
                ...state,
                fetchAllLoading: false,
                fetchAllError: action.payload.error,
                fetchAllResponse: {}
            }

        case "FETCH_NOTE_BEGIN":
            return {
                ...state,
                noteLoading: true,
                noteError: null
            }
        case "FETCH_NOTE_SUCCESS":
            return {
                ...state,
                noteLoading: false,
                noteResponse: action.payload.data
            }
        case "FETCH_NOTE_FAILURE":
            return {
                ...state,
                noteLoading: false,
                noteError: action.payload.error,
                noteResponse: {}
            }
        default:
            return state;
    };
};