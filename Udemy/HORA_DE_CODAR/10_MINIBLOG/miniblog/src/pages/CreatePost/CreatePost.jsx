import styles from "./CreatePost.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className={styles.create_post}>
      <h2>Criar post</h2>
      <p>Escreva sobre o que estiver pensando.</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Titulo:</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Pense num bom título..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>URL da imagem:</span>
          <input
            type="text"
            name="image"
            required
            placeholder="Insira a url da sua imagem..."
            onChange={(e) => setImage(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea
            name="body"
            required
            placeholder="Insira o conteúdo do post."
            onChange={(e) => setBody(e.target.body)}
            value={body}
            ></textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Insira as tags separadas por vírgula."
            onChange={(e) => setTags(e.target.value)}
            value={title}
          />
        </label>
        <button type="submit" className="btn">
            Cadastrar
          </button>
         {/* {!loading && (
          <button type="submit" className="btn">
            Cadastrar
          </button>
        )}
        {loading && (
          <button type="submit" disabled className="btn">
            Aguarde...
          </button>
        )}

        {error && <p className="error">{error}</p>} */}
      </form>
    </div>
  );
};

export default CreatePost;
