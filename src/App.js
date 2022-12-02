import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignupPage from './pages/signup';
import LoginPage from './pages/login';
import CreateClass from './pages/createClass';
import Dashboard from './pages/dashboard';
import ClassPage from "./pages/classes";
import AssignmentDashboard from "./pages/assignmentDashboard";
import StudentPage from './pages/student';
import Misc from './pages/misc'

function App() {
  return (
    <div className="flex items-center justify-center overflow-y-auto">
      <div className="w-full">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/class/:id" element={<ClassPage />} />
            <Route path="/assignment/:id" element={<AssignmentDashboard />} />
            <Route path="/student" element={<StudentPage/>} />
            <Route path="/misc" element={<Misc/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
