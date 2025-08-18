import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Games from "./pages/Games";

import UserLogin from "./pages/UserLogin";
import AddAnimal from "./pages/AddAnimal";
import Home from "./pages/Home"; 
import AnimalGuess from "./components/AnimalGuess"; 
import UpdateAnimal from "./pages/UpdateAnimal";


export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/games" element={<Games />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/add-animal" element={<AddAnimal />} />
        <Route path="/guess-animal" element={<AnimalGuess />} />
        <Route path="/games" element={<Games/>}/>
        <Route path="/update-animal/:id" element={<UpdateAnimal />} />
        {/* Protected Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}