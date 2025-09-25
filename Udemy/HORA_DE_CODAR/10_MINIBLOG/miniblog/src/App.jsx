import "./App.css";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar.jsx";
import Register from "./pages/Register/Register.jsx";
import Login from "./pages/Login/Login.jsx";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {onAuthStateChanged} from "firebase/auth"

//hooks
import {useState, useEffect} from "react"
import { useAuthentication } from "./hooks/useAuthentication.jsx";

//context
import { AuthProvider } from "./context/AuthContext.jsx";
import CreatePost from "./pages/CreatePost/CreatePost.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";

function App() {

  const [user, setUser] = useState(undefined);
  const {auth} = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

  }, [auth])

  if(loadingUser){
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <AuthProvider value={{user}}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/register" element={!user? <Register /> : <Navigate to="/"/>} />
              <Route path="/login" element={!user? <Login /> : <Navigate to="/"/>} />
              <Route path="/posts/create" element={user? <CreatePost /> : <Navigate to="/"/>} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
