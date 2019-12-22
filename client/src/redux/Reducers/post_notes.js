const initialState = {
    createResponse: {},
    patchResponse: {},
    deleteResponse: {},
    archiveResponse: {},
    createLoading: false,
    patchLoading: false,
    createError: null,
    patchError: null,
}

export default function postNotesReducer(state = initialState, action) {
    switch (action.type) {
        case "FETCH_CREATE_NOTE_BEGIN":
            return {
                ...state,
                createLoading: true,
                createError: null
            }
        case "FETCH_CREATE_NOTE_SUCCESS":
            return {
                ...state,
                createLoading: false,
                createResponse: action.payload.data
            }
        case "FETCH_CREATE_NOTE_FAILURE":
            return {
                ...state,
                createLoading: false,
                createError: action.payload.error,
                createResponse: {}
            }

        case "FETCH_PATCH_NOTE_BEGIN":
            return {
                ...state,
                patchLoading: true,
                patchError: null
            }
        case "FETCH_PATCH_NOTE_SUCCESS":
            return {
                ...state,
                patchLoading: false,
                patchResponse: action.payload.data
            }
        case "FETCH_PATCH_NOTE_FAILURE":
            return {
                ...state,
                patchLoading: false,
                patchError: action.payload.error,
                patchResponse: {}
            }

        case "FETCH_DELETE_NOTE_SUCCESS":
            return {
                ...state,
                deleteResponse: action.payload.data
            }

        case "FETCH_ARCHIVE_NOTE_SUCCESS":
            return {
                ...state,
                archiveResponse: action.payload.data
            }
        default:
            return state;
    };
}
