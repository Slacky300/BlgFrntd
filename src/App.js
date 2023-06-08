import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';
import { Register } from './pages/Register';
import Validate from './pages/Validate';
import Rhome from './pages/Rhome';
import Blog from './pages/Blog';
import { BlogDetail } from './pages/BlogDetail';
import Admin from './pages/Admin';
import AddPosts from './pages/AddPosts';
import About from './pages/About';


function App() {
  
  const router = createBrowserRouter([
    {
      path: '/', element: <Home />,
      children: [
        { path: '/', element: <Rhome /> },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '/activate/:uid/:token/', element: <Validate /> },
        { path: '/posts', element: <Blog /> },
        { path: '/posts/:slug/', element: <BlogDetail /> },
        { path: '/admin_blog', element: <Admin /> },
        { path: '/add_post', element: <AddPosts /> },
        { path: '/about', element: <About/>}
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
