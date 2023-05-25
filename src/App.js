import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';
function App() {

  const router = createBrowserRouter([
    { path: '/', element: <Home /> , 
      children: [
        { path: '/login', element: <Login /> }
      ]
    },
    
  ]);

  return (
    <>
      <div className='App'>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
