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

console.log(url)

export function fetchAllNotes(folder, callback) {
    console.log(folder)
    return dispatch => {
        dispatch(fetchDataBegin("ALL_NOTES"));
        fetch(url + "/notes" + "?folder=" + folder , {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            credentials: 'include', // include, *same-origin, omit
        })
            .then(response => response.json())
            .then(parsedJSON => {
                if (parsedJSON.response) {
                    dispatch(fetchDataSuccess("ALL_NOTES", parsedJSON));
                } else if (parsedJSON.error) {
                    dispatch(fetchDataFailure("ALL_NOTES", parsedJSON.error))
                }
                if(callback){
                    callback();
                };
            })
            .catch(err => {
                console.log(err)
                dispatch(fetchDataFailure("ALL_NOTES", err))
            })
    }
}

export function fetchNote(id, callback){
    return dispatch => {
        dispatch(fetchDataBegin("NOTE"));
        fetch(url + "/notes/" + id, {
            method: 'GET',
            credentials: 'include', 
        })
           .then(response => response.json())
           .then(parsedJSON => {
               if(parsedJSON.result) {
                   dispatch(fetchDataSuccess("NOTE", parsedJSON));
               } else if(parsedJSON.error){
                   dispatch(fetchDataFailure("NOTE", parsedJSON.error))
               }
               callback();
              
           })
           .catch(err => {
               dispatch(fetchDataFailure("NOTE", err));
           });
    };
};

