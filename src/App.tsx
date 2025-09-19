import './App.css'
import AppRouter from './Router/index';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './Contexxt/authProvider';

function App() {
  return (
    <>
    <AuthProvider>
       <ToastContainer />
       <AppRouter />
     </AuthProvider> 
    </>
  )
}

export default App
