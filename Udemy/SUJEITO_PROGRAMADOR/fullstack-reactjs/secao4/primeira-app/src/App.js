import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [tarefas, setTarefas] = useState(
    JSON.parse(localStorage.getItem('@tarefa'))
  );

  useEffect(() => {
    const tarefasStorage = localStorage.getItem('@tarefa');

    if (tarefasStorage) {
      setTarefas(JSON.parse(tarefasStorage));
    }

  }, []);


  useEffect(() => {
    localStorage.setItem('@tarefa', JSON.stringify(tarefas));
  }, [tarefas]);

  function handleRegister(event) {
    event.preventDefault();
    setTarefas([...tarefas, input]);
    setInput('');
  }

  return (
    <div className="App App-header">
      <h1>Cadastrando tarefa</h1>
      <form onSubmit={handleRegister}>
        <label>Nome da tarefa:
          <br />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type='submit'>Adicionar</button>
        </label>

      </form>
      <p>Tarefas</p>
      <div>

        {tarefas.map((tarefa, index) => (
          <p key={index}>{index + 1} - {tarefa}</p>
        ))}
      </div>
    </div >
  );
}

export default App;
