import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './component/Navbar'
import Home from './component/Home'
import Pastes from './component/Pastes'
import Viewpaste from './component/Viewpaste'

const router = createBrowserRouter([
  {
    path:"/",
    element:
    <div className='flex  flex-col	justify-center items-center'>
      <Navbar/>
      <Home/>
    </div>
  },
  {
    path:"/paste",
    element:
    <div className='flex  flex-col	justify-center items-center '>
      <Navbar/>
      <Pastes/>
    </div>
  },
  {
    path:"/paste/:id",
    element:
    <div className='flex  flex-col	justify-center items-center '>
      <Navbar/>
      <Viewpaste/>
    </div>
  },
])
function App() {
  
  return (
   <div>
    <RouterProvider router={router}></RouterProvider>
   </div>  )
}

export default App
