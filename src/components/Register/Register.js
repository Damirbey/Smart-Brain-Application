import React ,{Component} from 'react';

class Register extends Component{
    constructor(props){
        super(props);
        this.state={
            registerName:'',
            registerSurname:'',
            registerEmail:'',
            registerPassword:''
        }
    }

    onRegisterNameChange=(event)=>{
        this.setState({registerName:event.target.value});
    }
    onRegisterSurnameChange=(event)=>{
        this.setState({registerSurname:event.target.value});
    }
    onRegisterEmailChange=(event)=>{
        this.setState({registerEmail:event.target.value});
    }
    onRegisterPasswordChange=(event)=>{
        this.setState({registerPassword:event.target.value});
    }

    onRegisterSubmit=()=>{
        fetch('https://rocky-sea-98675.herokuapp.com/register',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                name:this.state.registerName,
                surname:this.state.registerSurname,
                email:this.state.registerEmail,
                password:this.state.registerPassword
            })
        })
        .then(response=>response.json())
        .then(data=>{
            if(data!=='Oops something went wrong')
            {
                this.props.onRouteChange('home');
                this.props.onLoadUser(data[0]);
            }
        })
    }

    render()
    {
        const {onRouteChange} = this.props;
        return(
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input 
                                    onChange={this.onRegisterNameChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="surname">Surname</label>
                                <input
                                    onChange={this.onRegisterSurnameChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="surname"  id="surname"/>
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    onChange={this.onRegisterEmailChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    onChange={this.onRegisterPasswordChange}
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                            </div>
                
                            </fieldset>
                            <div className="center">
                                <input
                                    onClick={this.onRegisterSubmit} 
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" 
                                    type="submit" 
                                    value="Register"
                                />
                            </div>
                        </div>
                    </main>
            </article>
        )
    }

    
}

export default Register;