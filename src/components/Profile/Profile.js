import React , {useState} from 'react';

function Profile(props){

    const {user} = props;
    const [editableMode,setEditableMode] = useState(false);
    const [name,setName] = useState(user.name);
    const [surname,setSurname] = useState(user.surname);
    const [email,setEmail] = useState(user.email);
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const onNameChange=(event)=>{
        setName(event.target.value);
    }
    const onSurnameChange=(event)=>{
        setSurname(event.target.value);
    }
    const onEmailChange=(event)=>{
        setEmail(event.target.value);
    }
    const onPasswordChange = (event)=>{
        setPassword(event.target.value);
    }
    const onConfirmPasswordChange=(event)=>{
        setConfirmPassword(event.target.value);
    }
    const exitEditableMode=()=>{
        setEditableMode(false);
        for(var i=0;i<3;i++)
        document.querySelectorAll(".editable")[i].readOnly = true;
    }
    const enableFields=()=>{
        setEditableMode(true);
        for(var i=0;i<3;i++)
        document.querySelectorAll(".editable")[i].readOnly = false;
    }
    function onUpateSubmit()
    {
        if(password.length>0)
        {
            if(password === confirmPassword)
            {
                alert("good");
            }
            else
            {
                alert("Passwords do not match");
            }
        }
    }
    return(
        <div className="container center"> 
            <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                <div className="card h-100">
                    <div className="card-body">
                        <div className="row gutters">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <h2 className="mb-2 text-primary">Personal Details</h2>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group" >
                                    <label for="name">Name</label>
                                    <input type="text" className="form-control editable" id="name" defaultValue={user.name} onChange={onNameChange} readOnly/>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label for="surname">Surname</label>
                                    <input type="text" className="form-control editable" id="surname" placeholder="Enter your surname" defaultValue={user.surname} onChange={onSurnameChange} readOnly/>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label for="eMail">Email</label>
                                    <input type="email" className="form-control editable" id="eMail" placeholder="Enter email ID" defaultValue={user.email} onChange={onEmailChange} readOnly/>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label for="entries">Number of Entries</label>
                                    <input type="number" className="form-control" id="entries" value={user.entries} disabled/>
                                </div>
                            </div>
                            {
                                editableMode ? 
                                <React.Fragment>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label for="password">New Password</label>
                                            <input type="password" className="form-control editable" id="password" placeholder="Enter new password"  onChange={onPasswordChange}/>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label for="confirmPassword">Confirm New Password</label>
                                            <input type="password" className="form-control editable" id="confirmPassword" placeholder="Confirm new password"  onChange={onConfirmPasswordChange}/>
                                        </div>
                                    </div>
                                </React.Fragment>
                            :
                                ""
                            }
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label for="dateJoined">Date Joined </label>
                                    <input type="text" className="form-control" id="dateJoined" value={user.joined} disabled/>
                                </div>
                            </div>
                        </div>
                        <div className="row gutters">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="text-right">
                                    {
                                        editableMode ? 
                                        <button type="button" id="submit" name="submit" className="btn btn-secondary ma2" onClick={exitEditableMode}>Cancel</button> 
                                        :""
                                    }
                                    <button type="button" 
                                        id="submit" 
                                        name="submit" 
                                        className="btn btn-primary" 
                                        onClick={editableMode ? onUpateSubmit : enableFields}> {editableMode?'Update':'Edit'} </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;