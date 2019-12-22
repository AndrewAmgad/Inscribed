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

export function getFolders(callback){
    return dispatch => {
        dispatch(fetchDataBegin("FOLDERS"));
        fetch(url + "/folders", {
            method: 'GET',
            credentials: 'include',
        })
          .then(response => response.json())
          .then(parsedJSON => {
              if(parsedJSON.response){
                  dispatch(fetchDataSuccess("FOLDERS", parsedJSON.response));
              } else if (parsedJSON.error){
                  dispatch(fetchDataFailure("FOLDERS", parsedJSON.error));
              }
              if(callback){
                  callback()
              }
          })
          .catch(err => {
              console.log(err);
              dispatch(fetchDataFailure("FOLDERS", err));
          });
    };
};