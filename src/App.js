import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout.jsx';
import LoginPage from './pages/LoginPage';
import MainLayout from './pages/MainLayout';
import DetailPage from './pages/DetailPage/index.jsx';

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<LoginPage />} />
          <Route path='main/*' element={<MainLayout />} />
          <Route path=':pokemonName' element={<DetailPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
