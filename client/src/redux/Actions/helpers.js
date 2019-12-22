export const fetchDataBegin = (dataType) => ({
    type: "FETCH_" + dataType + "_BEGIN"
});

export const fetchDataSuccess = (dataType, data) => ({
    type: "FETCH_" + dataType + "_SUCCESS",
    payload: { data }
});

export const fetchDataFailure = (dataType, error) => ({
    type: "FETCH_" + dataType + "_FAILURE",
    payload: { error }
});
export function handleErrors(response) {
    // if (!response.ok){
    //     console.log(response)
    //     ;
    // }
    if(!response.ok){
        if (response.status === 401) {
            throw Error("Unauthorized")
     
    }
}
    return response;
}