const initialState = {
    input: ""
};

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case "SEARCH_INPUT":
            return {
                ...state,
                input: action.payload.data
            };
        default:
            return state;
    };
};