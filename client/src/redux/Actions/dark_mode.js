const darkMode = (data) => ({
    type: "DARK_MODE",
    payload: {data}
});

export function enableDarkMode(enabled){
    localStorage.setItem('darkMode', enabled);
    return dispatch => {
        dispatch(darkMode(enabled))
    };
    
};

// The following function can be used in components accessing darkModeData
// The main purpose is to provide a single value to the element without handling multiple conditions inside the render function itself.
export function mapDarkModeDataToState() {
    const darkModeData = this.props.darkModeData;
    if (this.props.darkMode) {
        this.setState({
            darkBackgroundClassName: darkModeData.backgroundClassName,
            darkTextClassName: darkModeData.textClassName,
            darkBackgroundObject: darkModeData.backgroundObject,
            darkTextObject: darkModeData.darkTextObject
        });
    } else {
        this.setState({
            darkBackgroundClassName: "",
            darkTextClassName: "",
            darkBackgroundObject: [],
            darkTextObject: ""
        })
    }
}