
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Faculties from './pages/Faculties';
import FacultyDetail from './pages/FacultyDetail';
import Staff from './pages/Staff';
import Results from './pages/Results';
import Complaints from './pages/Complaints';
import Evaluation from './pages/Evaluation';
import Contact from './pages/Contact';
import Board from './pages/Board';
import AcademicDrive from './pages/AcademicDrive';
import Admission from './pages/Admission';
import News from './pages/News';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board" element={<Board />} />
          <Route path="/news" element={<News />} />
          <Route path="/faculties" element={<Faculties />} />
          <Route path="/faculties/:id" element={<FacultyDetail />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/results" element={<Results />} />
          <Route path="/academic-drive" element={<AcademicDrive />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/evaluation" element={<Evaluation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admission" element={<Admission />} />
          <Route path="/services" element={<Home />} /> 
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
