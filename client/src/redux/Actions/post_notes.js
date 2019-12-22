import {
    fetchDataBegin,
    fetchDataSuccess,
    fetchDataFailure,
} from './helpers';

var url;

if(process.env.NODE_ENV === "development"){
    url = process.env.REACT_APP_LOCAL_API;
} else {
    url = process.env.REACT_APP_API_URL
}

export function archiveNote(id, archived, callback){
    return dispatch => {
        fetch(url + "/notes/" + id, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                archived: archived
            })
        })
        .then(response => response.json())
        .then(parsedJSON => {
            dispatch(fetchDataSuccess("ARCHIVE_NOTE", parsedJSON));
            if(callback){
                callback()
            };
        })
        .catch(err => {
            dispatch(fetchDataFailure("ARCHIVE_NOTE", err))
            console.log(err)
        });
    };
};
export function patchNote(title, text, id, color, folder, pinned, callback) {
    return dispatch => {
        dispatch(fetchDataBegin("PATCH_NOTE"))
        fetch(url + "/notes/" + id, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                title: title,
                text: text,
                color: color,
                folder: folder,
                pinned: pinned,
            })
        })
            .then((response) => response.json())
            .then(parsedJSON => {
                dispatch(fetchDataSuccess("PATCH_NOTE", parsedJSON));
                console.log(parsedJSON)
                callback();
            })
            .catch(err => {
                dispatch(fetchDataFailure("PATCH_NOTE", err));
                console.log(err)
            });
    };
};

export function deleteNote(id, callback) {
    return dispatch => {
        fetch(url + "/notes/" + id, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then(parsedJSON => {
                console.log(parsedJSON)
                dispatch(fetchDataSuccess("DELETE_NOTE", parsedJSON));
                callback();
            })
            .catch(err => {
                console.log(err)
            })
    }
}


export function createNewNote(title, text, callback) {
    return dispatch => {
        dispatch(fetchDataBegin("CREATE_NOTE"))
        fetch(url + "/notes/", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            credentials: 'include', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                title: title,
                text: text,
                color: "white"
            })
        })
            .then((response) => response.json())
            .then(parsedJSON => {
                dispatch(fetchDataSuccess("CREATE_NOTE", parsedJSON));
                callback();
            })
            .catch(err => {
                dispatch(fetchDataFailure("CREATE_NOTE", err));
                console.log(err);
            })
    }
}