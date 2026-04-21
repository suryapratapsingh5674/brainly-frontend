import { Route, Routes } from "react-router"
import Home from './components/notes/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import AuthGuard from "./components/auth/AuthGuard"
import CreateNotes from "./components/notes/CreateNotes"
import Sharelink from "./components/notes/Sharelink"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthGuard><Home/></AuthGuard>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/create" element={<AuthGuard><CreateNotes/></AuthGuard>}/>
      <Route path="/share/:sharehash" element={<Sharelink/>}/>
    </Routes>
  )
}

export default App