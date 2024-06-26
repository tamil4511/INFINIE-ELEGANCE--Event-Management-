// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginAndRegister from './components/LoginAndRegister';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import StageDecoration from './components/StageDecoration';
import DJ from './components/DJ';
import AdminDashboard from './components/AdminDashboard';
import AdminMakeup from './components/AdminMakeup';
import MakeUp from './components/MakeUp';
function App() {
  return (
    <>
    {/* <LoginAndRegister /> */}
    <Router>
      <Routes>
        <Route path="/" element={<LoginAndRegister />} />
        <Route path="/Home" element={<Home />} />
        <Route path='/Gallery' element={<Gallery/>}/>
        <Route path='/StageDecoration' element={<StageDecoration/>}/>
        <Route path='/DJ' element={<DJ/>}/>
        <Route path='/MakeUp' element={<MakeUp/>}/>
      </Routes>
    </Router>
    {/* <DJ /> */}
    {/* <AdminDashboard /> */}
    {/* <Home /> */}
    {/* <Header /> */}
    {/* <Gallery /> */}
    {/* <MakeUp/> */}
    {/* <AdminMakeup/> */}
    {/* <StageDecoration /> */}
    </>
  );
}

export default App;
