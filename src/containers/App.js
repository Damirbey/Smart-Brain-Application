import React,{Component} from 'react';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import Rank from '../components/Rank/Rank';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import FaceRecognitionImage from '../components/FaceRecognitionImage/FaceRecognitionImage';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';
import Profile from '../components/Profile/Profile';
import Particles from "react-particles-js";
import 'tachyons';
import './App.css';

const particlesParameters={
  particles:{
    number:{
      value:30,
      density:{
        enable:true,
        value_area:300
      }
    }
  }
}


const initialState = {
      imageUrl:'',
      inputText:'',
      box:{},
      route:'signin',
      signedIn:false,
      user:{
        id:'',
        name:'',
        surname:'',
        email:'',
        entries:0,
        joined:''
      }
    }

class App extends Component{
  constructor()
  {
    super();
    this.state={
      imageUrl:'',
      inputText:'',
      box:{},
      route:'signin',
      signedIn:false,
      user:{
        id:'',
        name:'',
        surname:'',
        email:'',
        entries:0,
        joined:''
      }
    }
  }
  
  calculateImageBox(data){
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("mainImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol:clarifaiFace.left_col*width,
      topRow:clarifaiFace.top_row*height,
      rightCol:width - (clarifaiFace.right_col*width),
      bottomRow:height-(clarifaiFace.bottom_row*height)
    }
  }

  setBox(boxObj)
  {
    this.setState({box:boxObj});
  }

  onInputTextChange=(event)=>{
    this.setState({inputText:event.target.value});
  }

  onDetectButtonPress=()=>{
    if(this.state.inputText!== '')
    {
      this.setState({imageUrl:this.state.inputText});
      fetch('http://localhost:3000/clarifai',{
      method:'post',
      headers:{'Content-type':'application/json'},
      body:JSON.stringify({
        image:this.state.inputText
         })
      })
      .then(data=>data.json())
      .then(response=>{
        if(response)
        {
          fetch('http://localhost:3000/image',{
            method:'put',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              email:this.state.user.email
              })
          })
          .then(response=>response.json())
          .then(count=>this.setState(Object.assign(this.state.user,{entries:count})))
        }
        this.setBox(this.calculateImageBox(response))
      })
      .catch(err=>console.log(err));
    }
  }

  onRouteChange=(newRoute)=>{
    if(newRoute==='signIn' || newRoute==='register')
    {
      this.setState(initialState);
    }
    else{
      this.setState({signedIn:true})
    }
    this.setState({route:newRoute});
  }

  onLoadUser=(receivedUser)=>{
    this.setState({
      user:{
        id:receivedUser.id,
        name:receivedUser.name,
        surname:receivedUser.surname,
        email:receivedUser.email,
        entries:receivedUser.entries,
        joined:receivedUser.joined
      }
    })
  }

  render()
  {
    const {imageUrl,box,route,signedIn,user} = this.state;
    return(
      <div>
        <Particles className="particles" params={particlesParameters}/>
        <Navigation onRouteChange={this.onRouteChange} signedIn={signedIn}/>
        {
          route === 'home' ? 
          <React.Fragment>
            <Logo/>
            <Rank name={user.name} entries={user.entries}/>
            <ImageLinkForm onInputTextChange={this.onInputTextChange} onDetectButtonPress={this.onDetectButtonPress}/>
            <FaceRecognitionImage imageUrl = {imageUrl} box={box}/>
          </React.Fragment>
          : route==='profile' ? 
          <Profile id={user.id} name={user.name} surname={user.surname}/>
          :(
            route==='register'?
            <Register onLoadUser={this.onLoadUser} onRouteChange={this.onRouteChange}/>
            :<SignIn onLoadUser={this.onLoadUser} onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    )
  }
}

export default App;