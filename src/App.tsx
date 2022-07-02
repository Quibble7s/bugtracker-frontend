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
  JoinProjectPage,
  ProjectPage,
} from './Pages';
import { Alert, Background } from './Components/Layout';

function App() {
  const auth = useAuth();
  const loading: boolean =
    localStorage.getItem('authenticated') === 'true' && auth.user === null;

  if (loading) {
    return <PageLoadingAnimation />;
  }

  return (
    <>
      <Background />
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
          path='/join/:id'
          element={
            <PrivateRoute>
              <JoinProjectPage />
            </PrivateRoute>
          }
        />
        <Route
          path='/project/:id'
          element={
            <PrivateRoute>
              <ProjectPage />
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
