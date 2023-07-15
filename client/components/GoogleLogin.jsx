import React from 'react';

function GoogleLogin(){
    const handleCallbackResponse = (response) => {
        console.log("Encoded JWT ID token: " + response.credential)
        var userObject = jwt_decode(response.credential);
        console.log(userObject);
      }

    return(
        <div>
            <div id="g_id_onload"
                data-client_id="436308603108-380rhsf5aesqeu5khtum6r66bo2pppmb.apps.googleusercontent.com"
                data-context="signin"
                data-ux_mode="popup"
                data-callback="handleCallbackResponse"
                data-auto_prompt="false">
            </div>

            <div className="g_id_signin"
                data-type="standard"
                data-shape="rectangular"
                data-theme="outline"
                data-text="signin_with"
                data-size="large"
                data-logo_alignment="left">
            </div>
        </div>
    )
}

export default GoogleLogin; 