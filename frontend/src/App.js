import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from '../src/pages/Test/test'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Test />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;