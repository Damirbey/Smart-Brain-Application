import React,{useState} from 'react';

function SignIn (props){

    const [signInEmail,setEmail] = useState('');
    const [signInPassword, setPassword] = useState('');
    const [isHidden,setHidden] = useState(true);
    const [errorMessage,setErrorMessage] = useState('');

    const onSignInEmailChange=(event)=>{
        setEmail(event.target.value);
        document.querySelectorAll("input")[0].style.border=""; 
    }
    const highlightAllFieldsRed=()=>{
        document.querySelectorAll("input")[0].style.border="1px solid red"; 
        document.querySelectorAll("input")[1].style.border="1px solid red";
    }
    const onSignInPasswordChange=(event)=>{
        setPassword(event.target.value); 
        document.querySelectorAll("input")[1].style.border="";    
    }

    const visible={
        color:"yellow"
    }

    const onSignInSubmit=()=>{
        if(signInEmail.length>0 && signInPassword.length>0)
        {
            fetch('http://localhost:3000/signIn',{
                method:'post',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    email:signInEmail,
                    password:signInPassword
                })
            }).then(response=>response.json())
            .then(data=>{
                if(data!=='Wrong Credentials' && data!=="Something went wrong" && data!=='Not Found!')
                {
                    props.onRouteChange('home');
                    props.onLoadUser(data[0]);
                }
                else{
                    setErrorMessage("Wrong Email or Password");
                    setHidden(false);
                    highlightAllFieldsRed();
                }
            })
        }
        else
        {
            setHidden(false);
            setErrorMessage("Please fill in Email and Password fields");
            highlightAllFieldsRed();     
        }
    }


    const {onRouteChange}=props;
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
                            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    onChange={onSignInEmailChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email" 
                                    name="email-address"  
                                    id="email-address"
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    onChange={onSignInPasswordChange}
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    id="password"
                                />
                            </div>
                            </fieldset>
                            <div className="center">
                                <input 
                                    onClick={onSignInSubmit}
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" 
                                    type="submit" 
                                    value="Sign in"
                                />
                            </div>
                            <div className="lh-copy mt3 center">
                                <p 
                                    onClick={()=>onRouteChange('register')}
                                    className="f6 link dim black db pointer">Register
                                </p>
                            </div>
                        </div>
                    </main>
                </article>
            </div>
        ) 
}

export default SignIn;