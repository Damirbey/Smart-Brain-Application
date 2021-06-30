import React from 'react';

const Navigation = ({onRouteChange,signedIn,user})=>{
    /*Styling the navigation*/
    const navigationStyle = {
        display:"flex",
        justifyContent:"flex-end"
    }
    if(signedIn)
    {
        return(
            user.id === 1 ?
            <nav style={navigationStyle}>
                <p className="f3 link dim black underline pa3 pointer" onClick={()=>onRouteChange('profile')}>My Profile</p>
                <p className="f3 link dim black underline pa3 pointer" onClick={()=>onRouteChange('register')}>Create New User</p>
                <p className="f3 link dim black underline pa3 pointer" onClick={()=>onRouteChange('home')}>Home</p>
                <p className="f3 link dim black underline pa3 pointer" onClick={()=>onRouteChange('signIn')}>Sign Out</p>
            </nav>
            :
            <nav style={navigationStyle}>
                <p className="f3 link dim black underline pa3 pointer" onClick={()=>onRouteChange('profile')}>My Profile</p>
                <p className="f3 link dim black underline pa3 pointer" onClick={()=>onRouteChange('home')}>Home</p>
                <p className="f3 link dim black underline pa3 pointer" onClick={()=>onRouteChange('signIn')}>Sign Out</p>
            </nav>
        )
    }
    else{
        return (
            <nav style={navigationStyle}>
                <p className="f3 link dim black underline pa3 pointer" onClick={()=>onRouteChange('signIn')}>Sign In</p>
                <p className="f3 link dim black underline pa3 pointer" onClick={()=>onRouteChange('register')}>Register</p>
            </nav>
        )
    }
   
}

export default Navigation;