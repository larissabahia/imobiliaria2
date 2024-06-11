import { useState } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        const response = await fetch('/credentials.json');
        const credentials = await response.json();

        if (username === credentials.username && password === credentials.password) {
            Cookies.set('isLogged', 'true', { expires: 7 }); 
            alert('Login realizado com sucesso!');
            window.location.href = '/admin';
        } else {
            alert('Usuário ou senha incorretos!');
        }
    };

    return (
        <div className="login-page">
            <div className="headerLoginContainer">
                <div className="headerLogin">
                <Link href="/" passHref>
                    <button className="buttonBackToSite">
                        Voltar para o site
                    </button>
                    </Link>
                </div>
            </div>
            <div className="login-container">
                <form className="login-form" onSubmit={handleLogin}>
                    <label htmlFor="username" className="login-label">Usuário:</label>
                    <input type="text" id="username" className="login-input"  value={username} onChange={e => setUsername(e.target.value)} required />
                    <label htmlFor="password" className="login-label">Senha:</label>
                    <input type="password" id="password" className="login-input" value={password} onChange={e => setPassword(e.target.value)} required/>
                    <button type="submit" className="login-button">Entrar</button>
                </form>
            </div>
        </div>
    );
}
