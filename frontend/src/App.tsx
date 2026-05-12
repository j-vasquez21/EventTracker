import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import NotFound from './pages/NotFound';
import { useAuth } from './context/AuthContext';

function Protected({ children }: {children: React.ReactNode}) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to='/login' replace />
  return <>{children}</>
}

export default function App() {



  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="*" element={<NotFound />}/>
        <Route 
          path="/" 
          element={
            <Protected>
              <Dashboard />
            </Protected>    
          }
        />
        <Route 
          path="/events/new" 
          element={
            <Protected>
              <CreateEvent />
            </Protected>    
          }
        />
        <Route 
          path="/events/:id/edit" 
          element={
            <Protected>
              <EditEvent />
            </Protected>    
          }
        />
      </Routes>
    </>
  )
}