import React from 'react';


const UserAvatar = ({ username }) => {
    // Get the initial letter from the username
    const initialLetter = username ? username.charAt(0).toUpperCase() : '';
    
    return (
        <div className="user-avatar">
            {initialLetter}
        </div>
    );
};

export default UserAvatar;
