import {
    fetchDataBegin,
    fetchDataSuccess,
    fetchDataFailure,
} from './helpers';

var apiUrl;

if(process.env.NODE_ENV === "development"){
    apiUrl = process.env.REACT_APP_LOCAL_API;
} else {
    apiUrl = process.env.REACT_APP_API_URL
}

export function signIn(email, password, callback) {
    return dispatch => {
    dispatch(fetchDataBegin("SIGN_IN"));
    fetch(apiUrl + "/user/signin", {
        method: "POST",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            email: email,
            password: password
        })
    })
        .then((response) => response.json())
        .then(parsedJSON => {
            dispatch(fetchDataSuccess("SIGN_IN", parsedJSON))
            console.log(parsedJSON);
            callback()

        })
        .catch(err => {
                dispatch(fetchDataFailure("SIGN_IN", err))
                console.log(err)
                callback()
              
        });
    } 
};

export function signUp(email, firstName, lastName, password, callback){
    return dispatch => {
        dispatch(fetchDataBegin("SIGN_UP"));
        fetch(apiUrl + "/user/signUp" , {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password
            })
        }).then((response) => response.json())
          .then(parsedJSON => {
              dispatch(fetchDataSuccess("SIGN_UP", parsedJSON));
              callback();
          })
          .catch(err => {
              dispatch(fetchDataFailure("SIGN_UP", err));
              callback();
          });
    };
};

export function checkAuth(callback){
    return dispatch => {
        fetch(apiUrl + "/user/checkauth", {
            method: "GET",
            credentials: "include",
        })
        .then(response => response.json())
        .then(parsedJSON => {
            dispatch(fetchDataSuccess("CHECK_AUTH", parsedJSON));
            if(callback){
                callback()
            }
        })
        .catch(err => {
            dispatch(fetchDataFailure("CHECK_AUTH", err));
            console.log(err)
        })
    }
}

export function signOut(callback){
    return dispatch => {
        fetch(apiUrl + "/user/logout", {
            method: "GET",
            credentials: "include",
        })
        .then(response => response.json())
        .then(parsedJSON => {
            dispatch(fetchDataSuccess("SIGN_OUT", parsedJSON));
            console.log(parsedJSON);
            callback()
        })
        .catch(err => {
            console.log(err)
        })
    }
}