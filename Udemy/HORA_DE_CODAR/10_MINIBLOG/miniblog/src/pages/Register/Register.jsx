import styles from "./Register.module.css";

import { useState, useEffect } from "react";

const Register = () => {
  return (
    <div className={styles.register}>
      <h1>Cadastre-se para postar</h1>
      <form className={styles.register_form}>
        <label>
          <span>Nome:</span>
          <input type="text" name="displayName" required placeholder="Ex: João..." />
        </label>
        <label>
          <span>E-mail:</span>
          <input type="email" name="email" required placeholder="Ex: joao@email.com" />
        </label>
        <label>
          <span>Senha:</span>
          <input type="password" name="password" required placeholder="Ex: 123456" />
        </label>
        <label>
          <span>Confirmação de senha:</span>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirme a senha"
            className=""
          />
        </label>
        <button type="submit" className="btn">Cadastrar</button>
      </form>
    </div>
  );
};

export default Register;
