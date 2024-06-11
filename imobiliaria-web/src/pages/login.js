

export default function Login() {


    return (
        <div className="login-page">
            <div className="headerLoginContainer">
                <div className="headerLogin">
                    <button className="buttonBackToSite">
                        Voltar para o site
                    </button>
                </div>
            </div>
            <div className="login-container">
                <form className="login-form">
                    <label htmlFor="username" className="login-label">Usuário:</label>
                    <input type="text" id="username" className="login-input" required />
                    <label htmlFor="password" className="login-label">Senha:</label>
                    <input type="password" id="password" className="login-input" required />
                    <button type="submit" className="login-button">Entrar</button>
                </form>
            </div>
        </div>
    );
}
