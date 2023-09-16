import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import User from './components/User/User';
import Navbar from './components/Navbar/Navbar';
import Homes from './components/Home/Homes';
import Auth from './components/Auth/Auth';
import NavTwo from './components/Navbar/NavTwo';
import Navbardemo from './components/Navbar/Navbardemo';
import Nav3 from './components/Navbar/Nav3';
import Footer from './components/Footer/footer';
import Search from './components/Search/Search';

function App() {
  return (
    <div className="App" style={{backgroundColor: "#f0f5ff",}}>
      <Router>
        <Nav3 />
        <Routes>
          <Route path="/" element={<div className="page-container"><Homes /></div>} />
          <Route path="/users/:userId" element={<div className="page-container"><User /></div>} />
          <Route path="/auth" element={localStorage.getItem("currentUser") != null ? <Navigate to="/" /> :<div className="page-container"> <Auth /></div>} />
          <Route path="/search" element={<div className="page-container"><Search /></div>} />
        </Routes>
        <Footer  className="fixed-footer" />
      </Router>
    </div>
  );
}

export default App;
