import styles from './Login.module.css'
import { useAuthentication } from "../../hooks/useAuthentication";

import { useState, useEffect } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    const { login, error: authError, loading } = useAuthentication();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      setError("");
  
      const user = {
        email,
        password,
      };
 
      const res = await login(user);
  
      console.log(user);
    };
  
    useEffect(() => {
      if (authError) {
        setError(authError);
      }
    }, [authError]);
  
  return (
    <div>
          <div className={styles.login}>
            <h1>Entrar</h1>
            <p>Faça o login para poder utilizar o sistema.</p>
            <form className={styles.login_form} onSubmit={handleSubmit}>
              <label>
                <span>E-mail:</span>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Ex: joao@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label>
                <span>Senha:</span>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Ex: 123456"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              
              {!loading && (
                <button type="submit" className="btn">
                  Entrar
                </button>
              )}
              {loading && (
                <button type="submit" disabled className="btn">
                  Aguarde...
                </button>
              )}
      
              {error && <p className="error">{error}</p>}
            </form>
          </div>
    </div>
  )
}

export default Login
