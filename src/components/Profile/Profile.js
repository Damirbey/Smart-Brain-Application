import React , {useState} from 'react';

function Profile(props){

    /**States of the component */
    const {user,onLoadUser} = props;
    const [editableMode,setEditableMode] = useState(false);
    const [name,setName] = useState(user.name);
    const [surname,setSurname] = useState(user.surname);
    const [email,setEmail] = useState(user.email);
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [displayMessage, setDisplayMessage] = useState('');
    const [successBox,setSuccessBox] = useState(false);
    const [errorBox, setErrorBox] = useState(false);
    const optionalText={
        color:"green"
    }
    /**Fields variables */
    const onNameChange=(event)=>{
        resetField("#name");
        setName(event.target.value);
    }
    const onSurnameChange=(event)=>{
        resetField("#surname");
        setSurname(event.target.value);
    }
    const onEmailChange=(event)=>{
        resetField("#email");
        setEmail(event.target.value);
    }
    const onPasswordChange = (event)=>{
        resetField("#password");
        setPassword(event.target.value);
    }
    const onConfirmPasswordChange=(event)=>{
        resetField("#confirmPassword");
        setConfirmPassword(event.target.value);
    }
    /** Cosmetic functions to enable, disable and highlight required fields*/
    const exitEditableMode=()=>{
        setEditableMode(false);
        for(var i=0;i<3;i++)
        {
            document.querySelectorAll(".editable")[i].readOnly = true;
        }
        resetField("#name");
        resetField("#surname");
        resetField("#email");
    }
    const enableFields=()=>{
        setEditableMode(true);
        for(var i=0;i<3;i++)
        document.querySelectorAll(".editable")[i].readOnly = false;
    }
    const resetField=(id)=>{
        document.querySelector(id).style.border="";
    }
    const highlightField=(id)=>{
        document.querySelector(id).style.border="1px solid red";
    }
    /**Component's fetch function */
    const requestUpdate = (endpoint)=>{
        return fetch(endpoint,{
                    method:'put',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify({
                        id:user.id,
                        name:name,
                        surname:surname,
                        email:email,
                        password:password
                        })
            })
    }
    /**Submit function of the component */
    const onUpateSubmit = ()=>{
       if(name.length > 0 && surname.length > 0 && email.length > 0)
       {
            if(password.length > 0 || confirmPassword.length > 0)
            {
                if(password === confirmPassword)
                {
                    /*Submitting the records for update with passwords*/
                    requestUpdate('https://smart-brain-server-918s.onrender.com/profileUpdate')
                    .then(res=>res.json())
                    .then(response=>{
                        if(response!=="Something went wrong")
                        {
                            setDisplayMessage("Updated Successfully");
                            setErrorBox(false);
                            setSuccessBox(true); 
                            onLoadUser(response[0]);
                            exitEditableMode();
                        }
                        else{
                            setDisplayMessage("Oops cannot update at the moment");
                            setErrorBox(true);
                            setSuccessBox(false); 
                        }
                    }) 
                }
                else
                {
                    setDisplayMessage("Passwords do not match!");
                    setErrorBox(true);
                    setSuccessBox(false); 
                    highlightField("#password");
                    highlightField("#confirmPassword");
                }
            }
            /*Submitting the records for update without passwords*/
            else{
                resetField("#password");
                resetField("#confirmPassword");
                requestUpdate('https://smart-brain-server-918s.onrender.com/profileUpdate')
                .then(res=>res.json())
                .then(response=>{
                    if(response!=="Something went wrong")
                    {
                        setDisplayMessage("Updated Successfully");
                        setErrorBox(false);
                        setSuccessBox(true); 
                        onLoadUser(response[0]);
                        exitEditableMode();
                    }
                    else{
                        setDisplayMessage("Oops cannot update at the moment");
                        setErrorBox(true);
                        setSuccessBox(false); 
                    }
                })  
            }
       }
       else
       {
           
           setDisplayMessage("Please fill in all required fields");
           setErrorBox(true);
           setSuccessBox(false); 
           highlightField("#name");
           highlightField("#surname");
           highlightField("#email");
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
                            {
                                successBox ? 
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 alert alert-success" role="alert">
                                    {displayMessage}
                                </div>
                                : errorBox ? 
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 alert alert-danger" role="alert">
                                    {displayMessage}
                                </div>
                                : ""
                            }
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
                                    <label for="email">Email</label>
                                    <input type="email" className="form-control editable" id="email" placeholder="Enter email ID" defaultValue={user.email} onChange={onEmailChange} readOnly/>
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
                                            <label for="password">*New Password <span style={optionalText}>(Optional)</span></label>
                                            <input type="password" className="form-control editable" id="password" placeholder="Enter new password"  onChange={onPasswordChange}/>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label for="confirmPassword">*Confirm New Password <span style={optionalText}>(Optional)</span></label>
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