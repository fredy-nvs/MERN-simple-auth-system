import './App.css'
import {Route, Routes} from "react-router-dom";
import {Home, Login, SignUp} from "./pages/index.jsx";

function App() {

  return (
    <>
        <div className="App">
            <Routes>
                <Route path="/" element={ <Home />} />
                <Route path="/login" element={ <Login />} />
                <Route path="/register" element={ <SignUp /> } />
            </Routes>
        </div>
    </>
  )
}

export default App
