import React from 'react';

function Profile(props){
    const {id,name,surname} = props;
    return(
        <div>
            <p>My Profile</p>
            <p>My id is {id}</p>
            <p><strong>Name :</strong> {name}</p>
            <p><strong>Surname:</strong> {surname}</p>
            <p></p>
        </div>
    )
}

export default Profile;