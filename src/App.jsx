import Auth from "./page/Auth/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ToDo from "./page/ToDo";
import Register from "./page/Auth/Register";


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/register" element={<Register />} />
          <Route path="/todo" element={<ToDo />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
