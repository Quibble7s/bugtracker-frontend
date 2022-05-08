import { Route, Routes } from 'react-router-dom';
import { PageLoadingAnimation } from './Components/Animations';
import { Navbar } from './Components/Navigation';
import { useAuth } from './Hooks';
import { HomePage } from './Pages/HomePage';

function App() {
  const auth = useAuth();
  const loading: boolean =
    localStorage.getItem('authenticated') === 'true' && auth.user === null;

  if (loading) {
    return <PageLoadingAnimation />;
  }

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
