import { useEffect,useState } from "react";
import SearchBox from "./SearchBox";
import Users from "./Users";
const AdministratorPanel = ({onRouteChange,setUserToUpdateState})=>{
    
    const [users,setUsers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const onInputChange=(event)=>{
        setSearchText(event.target.value);
    }
    const onUserClick=(userClicked)=>{
        onRouteChange('userProfile');
        setUserToUpdateState(userClicked);
    }

    useEffect(()=>{
        fetch('https://arctic-eds-99400.herokuapp.com/users',{
            method:'get'
        }).then(res=>res.json())
        .then(receivedUsers=>setUsers(receivedUsers));
    },[])
    
    const filteredUsers = users.filter((user)=>user.name.toLowerCase().includes(searchText.toLowerCase()));

    return(
        <div className="container">
            <SearchBox onInputChange={onInputChange}/>
            <br/>
            <Users users={filteredUsers} onUserClick={onUserClick}/>
         </div>
    )
}

export default AdministratorPanel;