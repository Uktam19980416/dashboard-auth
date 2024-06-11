import { Home } from './pages/Home';
import Dashboard from './pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import './react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Categories } from './components/Categories';
import { Brands } from './components/Brands';
import { Cities } from './components/Cities';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="categories" element={<Categories />} />
            <Route path="brands" element={<Brands />} />
            <Route path="cities" element={<Cities />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
