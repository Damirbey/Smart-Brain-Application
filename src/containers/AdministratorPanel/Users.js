const Users=({users,onUserClick})=>{
    return (
        <table className="table table-striped table-hover ">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Surname</th>
                        <th scope="col">Email</th>
                        <th scope="col">Number of Entries</th>
                        <th scope="col">Date Joined</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user=>{
                            return <tr key={user.id} 
                                    onClick={()=>onUserClick(user)}>
                                <td >{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.surname}</td>
                                <td>{user.email}</td>
                                <td>{user.entries}</td>
                                <td>{user.joined}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
    )
}

export default Users;