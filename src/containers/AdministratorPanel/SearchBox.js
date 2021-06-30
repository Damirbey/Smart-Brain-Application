const SearchBox = ({onInputChange})=>{
    return (
        <input 
            className="form-control mr-sm-2 " 
            type="search" 
            placeholder="Search Users by Name" 
            aria-label="Search"
            onChange={onInputChange}
        />
    )
}

export default SearchBox;