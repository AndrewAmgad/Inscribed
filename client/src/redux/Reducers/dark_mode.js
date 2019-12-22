const darkModeLocalStorage = JSON.parse(localStorage.getItem('darkMode')) 
const initialState = {
    darkMode: darkModeLocalStorage === null ? true : darkModeLocalStorage,
    darkModeData: {
        backgroundClassName: "dark-background",
        textClassName: "dark-text",
        backgroundObject: {backgroundColor: "rgb(44, 44, 44)"},
        textObject: { color: "white" }
    }
};

export default function darkModeReducer(state = initialState, action){
    switch (action.type) {
        case "DARK_MODE":
            return {
                ...state,
                darkMode: action.payload.data
            };
        default:
            return state;
    };
};