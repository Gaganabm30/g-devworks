```javascript
import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme } from './utils/Themes';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/sections/Hero";
import Skills from "./components/sections/Skills";
import Achievements from "./components/sections/Achievements";
import Education from "./components/sections/Education";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";
import ProjectDetails from "./components/ProjectDetails";
import Circle from "./components/Circle";
import StartCanvas from "./components/canvas/Stars";
import AdminLogin from "./pages/Admin/Login";
import AdminDashboard from "./pages/Admin/Dashboard";

const Body = styled.div`
background - color: ${ ({ theme }) => theme.bg };
width: 100 %;
overflow - x: hidden;
position: relative;
`;

const Wrapper = styled.div`
padding - bottom: 100px;
background: linear - gradient(
  38.73deg,
  rgba(204, 0, 187, 0.15) 0 %,
  rgba(201, 32, 184, 0) 50 %
    ),
  linear - gradient(
    141.27deg,
    rgba(0, 70, 209, 0) 50 %,
    rgba(0, 70, 209, 0.15) 100 %
    );
width: 100 %;
clip - path: polygon(0 0, 100 % 0, 100 % 100 %, 30 % 98 %, 0 100 %);
`;

function App() {
  const [openModal, setOpenModal] = useState({ state: false, project: null });
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Navbar />
        <Body>
          <StartCanvas />
          <Routes>
            <Route path="/" element={
              <>
                <Circle top="-35vh" right="-20vw" />
                <Circle top="30vh" right="0" />
                <Circle top="50vh" right="50vw" />

                <Hero />
                <Wrapper>
                  <Skills />
                  <Achievements />
                </Wrapper>
                <Projects openModal={openModal} setOpenModal={setOpenModal} />
                <Wrapper>
                  <Education />
                  <Contact />
                </Wrapper>
                <Footer />
                {openModal.state &&
                  <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
                }
              </>
            } />

            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />

          </Routes>
        </Body>
      </Router>
    </ThemeProvider>
  );
}

export default App;