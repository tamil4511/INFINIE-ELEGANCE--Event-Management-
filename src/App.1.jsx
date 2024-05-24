import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

export function App() {
  return (
    <>
      {/* <LoginAndRegister /> */}
      <Router>
        {/* <Routes>
              <Route path="/" element={<LoginAndRegister />} />
              <Route path="/Home" element={<Home />} />
              <Route path='/Gallery' element={<Gallery/>}/>
              <Route path='/StageDecoration' element={<StageDecoration/>}/>
              <Route path='/DJ' element={<DJ/>}/>
            </Routes> */}
      </Router>
      {/* <DJ /> */}
      {/* <AdminDashboard /> */}
      <MakeUp />
      {/* <Home /> */}
      {/* <Header /> */}
      {/* <Gallery /> */}
      {/* <AdminMakeup/> */}
      {/* <StageDecoration /> */}
    </>
  );
}
