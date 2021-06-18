import React from 'react';

const Rank = ({name,entries})=>{
    return (
        <div className="center">
            <div className="white f3">
                {`Hello ${name} your current number of entries is ....${entries}`}
            </div>
        </div>
    )
}

export default Rank;