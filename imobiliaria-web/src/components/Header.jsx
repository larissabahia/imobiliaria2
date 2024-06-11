import React from 'react';

const Header = () => {
    const handleLogout = () => {
        // console.log('Usuário deslogado');
    };

    return (
        <div className="header">
            <div className="logout" onClick={handleLogout}>
                Logout
            </div>
        </div>
    );
};

export default Header;
