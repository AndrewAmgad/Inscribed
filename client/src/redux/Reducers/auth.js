const initialState = {
    authResponse: {},
    error: null
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {

        case "FETCH_CHECK_AUTH_SUCCESS":
            return {
                ...state,
                authResponse: action.payload.data
            }

        case "FETCH_CHECK_AUTH_FAILURE":
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state;
    };


}