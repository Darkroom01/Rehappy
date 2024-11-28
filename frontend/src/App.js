import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from '../src/pages/Test/test'
import Chanho from '../src/pages/chanhomade/chanhomade'
import Signup from '../src/pages/SignUp/signup'
import Login from '../src/pages/Login/login'
import FindHospital from "./pages/FindHospital/findHospital";
import Community from "./pages/Community/community";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Test />} />
                <Route path="/chanho" element={<Chanho />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/findHospital" element={<FindHospital />} />
                <Route path="/community" element={<Community />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;