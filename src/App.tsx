import { Route, Routes } from 'react-router-dom';
import { Navbar } from './Components/Navigation';
import { HomePage } from './Pages/HomePage';

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
