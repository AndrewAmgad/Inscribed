const initialState = {
    logOutResponse: {},
    signInResponse: {},
    signUpResponse: {},
    loading: false,
    error: null,
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case "FETCH_SIGN_IN_BEGIN":
            return {
                ...state,
                loading: true,
                error: null
            }
        case "FETCH_SIGN_IN_SUCCESS":
            return {
                ...state,
                loading: false,
                signInResponse: action.payload.data
            }
        case "FETCH_SIGN_IN_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                signInResponse: {}
            }
        case "FETCH_SIGN_UP_BEGIN":
            return {
                ...state,
                loading: true,
                error: null
            }
        case "FETCH_SIGN_UP_SUCCESS":
            return {
                ...state,
                loading: false,
                signUpResponse: action.payload.data
            }
        case "FETCH_SIGN_UP_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                signUpResponse: {}
            }
 

        case "FETCH_SIGN_OUT_SUCCESS":
            return {
                ...state,
                logOutResponse: action.payload.data
            }
        default:
            return state;
    };
};