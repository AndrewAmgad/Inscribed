import React, { Component } from 'react';

export default function SocialSignIn(props) {
    const googleSignIn = () => {
        // Redirect to the following API URL, the rest is handled server-side
        var url;
        if (process.env.NODE_ENV === "development") {
            url = process.env.REACT_APP_LOCAL_API;
        } else {
            url = process.env.REACT_APP_API_URL
        }
        window.location.href = url + "/user/google"
    }
    return (
        <div className="social">
            {/* <div className="border signin-social facebook"><i className="fa fa-facebook-f social-icon" /></div> */}
            <div onClick={googleSignIn} className="border signin-social"><i className="fa fa-google social-icon" /></div>
        </div>
    )
}