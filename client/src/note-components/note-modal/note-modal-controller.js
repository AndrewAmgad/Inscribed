export function changeColor(event) {
    var colorCode = event.target.style.color;
    var backgroundColor = "";

    // Check if the color code of the circle button and set state.background and state.backgroundColor accordingly
    colorCode === "rgb(232, 234, 237)" || colorCode === "rgb(86, 86, 87)"  ? backgroundColor = "grey" :
        colorCode === "rgb(174, 203, 250)" || colorCode ===  "rgb(54, 69, 95)" ? backgroundColor = "blue" :
            colorCode === "rgb(242, 139, 130)" || colorCode === "rgb(112, 79, 76)" ? backgroundColor = "red" :
                backgroundColor = "white"

    this.setState({
        background: colorCode,
        backgroundColor: backgroundColor
    });
}

// Get the selected folder name from the ModalBottom component
export function getFolderName(folder){
    this.setState({
        folderName: folder,
        snackContent: folder !== "none" ? "Moved to " + folder : "",
        openSnackBar: true
    });
};

export function pinNote(pinned){
    this.setState({
        pinned: pinned,
        snackContent: pinned ? "Note Pinned" : "Note Unpinned",
        openSnackBar: true
    });
};