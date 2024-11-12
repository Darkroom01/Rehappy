import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from '../src/pages/Test/test'
import Chanho from '../src/pages/chanhomade/chanhomade'
import Signup from '../src/pages/SignUp/signup'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Test />} />
                <Route path="/chanho" element={<Chanho />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;