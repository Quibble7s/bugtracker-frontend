import { Route, Routes } from 'react-router-dom';
import { PageLoadingAnimation } from './Components/Animations';
import { Navbar } from './Components/Navigation';
import { useAuth } from './Hooks';
import { PrivateRoute, PublicRoute } from './Routes';
import {
  LoginPage,
  HomePage,
  RegisterPage,
  DashboardPage,
  NotFoundPage,
} from './Pages';
import { Alert } from './Components/Layout';

function App() {
  const auth = useAuth();
  const loading: boolean =
    localStorage.getItem('authenticated') === 'true' && auth.user === null;

  if (loading) {
    return <PageLoadingAnimation />;
  }

  return (
    <>
      <Alert />
      <section>
        <header>
          <Navbar />
        </header>
      </section>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path='/auth/login'
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path='/auth/register'
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
