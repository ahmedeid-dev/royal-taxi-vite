import { RouterProvider } from 'react-router-dom'
import { router } from './lib/variables/Routes'
import { AuthProvider } from './lib/context/AuthContext'
import './App.css'

function App() {


  return <>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </>
}

export default App
