import React ,{useState} from 'react';

function Register(props){

    const [registerName,setRegisterName] = useState('');
    const [registerSurname,setRegisterSurname] = useState('');
    const [registerEmail,setRegisterEmail] = useState('');
    const [registerPassword,setRegisterPassword] = useState('');
    const [errorMessage,setErrorMessage] = useState('');
    const [isHidden,setIsHidden] = useState(true);

    const visible={
        color:"yellow"
    }
    const onRegisterNameChange=(event)=>{
        setRegisterName(event.target.value);
        document.querySelectorAll("input")[0].style.border=""; 
    }
    const onRegisterSurnameChange=(event)=>{
        setRegisterSurname(event.target.value);
        document.querySelectorAll("input")[1].style.border="";
    }
    const onRegisterEmailChange=(event)=>{
        setRegisterEmail(event.target.value);
        document.querySelectorAll("input")[2].style.border="";
    }
    const onRegisterPasswordChange=(event)=>{
        setRegisterPassword(event.target.value);
        document.querySelectorAll("input")[3].style.border="";
    }
    const highlightAllFieldsRed=()=>{
        document.querySelectorAll("input")[0].style.border="1px solid red"; 
        document.querySelectorAll("input")[1].style.border="1px solid red";
        document.querySelectorAll("input")[2].style.border="1px solid red";
        document.querySelectorAll("input")[3].style.border="1px solid red";
    }
    const {user} = props;

    const onRegisterSubmit=()=>{
        if(registerName.length > 0 && registerSurname.length > 0 && registerEmail.length > 0 && registerPassword.length > 0)
        {
            if(registerEmail.includes("@"))
            {
                fetch('http://localhost:3000/register',{
                method:'post',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    name:registerName,
                    surname:registerSurname,
                    email:registerEmail,
                    password:registerPassword
                    })
                })
                .then(response=>response.json())
                .then(data=>{
                    if(data!=='Oops something went wrong' && data!=='Email is already taken')
                    {  
                        if(user.id===1)
                        {
                            props.onRouteChange('home'); 
                        } 
                        else{
                            props.onRouteChange('home');
                            props.onLoadUser(data[0]);
                        }
                        
                    }
                    else{
                        setErrorMessage("Unable to register user at the moment");
                        setIsHidden(false);
                    }
                })
            }
            else{
                setErrorMessage('Invalid Email');
                document.querySelectorAll("input")[2].style.border="1px solid red";
                setIsHidden(false);
            }
            
        }
        else{
            setErrorMessage('Please fill in all the fields on this form');
            setIsHidden(false);
            highlightAllFieldsRed();
        }
    }
    
         return(
            <div>
                {
                    isHidden ? 
                    ""
                    :<div className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center" style={visible}>
                        {errorMessage}
                    </div>
                }
            
                <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <main className="pa4 black-80">
                        <div className="measure">
                                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f2 fw6 ph0 mh0">{user.id === 1 ? "Create New User" : "Register"}</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                    <input 
                                        onChange={onRegisterNameChange}
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="surname">Surname</label>
                                    <input
                                        onChange={onRegisterSurnameChange}
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="surname"  id="surname"/>
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input
                                        onChange={onRegisterEmailChange}
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input
                                        onChange={onRegisterPasswordChange}
                                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                                </div>
                    
                                </fieldset>
                                <div className="center">
                                    <input
                                        onClick={onRegisterSubmit} 
                                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" 
                                        type="submit" 
                                        value={user.id === 1 ? "Create New User" : "Register" }
                                    />
                                </div>
                            </div>
                        </main>
                </article>
            </div>
        )
    

    
}

export default Register;