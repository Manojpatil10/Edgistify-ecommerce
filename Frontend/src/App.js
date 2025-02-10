import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import ForgetPass from './Pages/ForgetPass/ForgetPass';
import UpdatePass from './Pages/UpdatePass/UpdatePass';
import MyCart from './Pages/MyCart/MyCart';
import MyOrders from './Pages/MyOrders/MyOrders';
import Profile from './Pages/Profile/Profile';
import Cart from './Pages/Cart/Cart';
import Checkout from './Pages/Checkout/Checkout';

function App() {
  const myRouter = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/myCart',
      element: <MyCart />
    },
    {
      path: '/myOrders',
      element: <MyOrders />
    },
    {
      path: '/profile',
      element: <Profile />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: '/forgetPass',
      element: <ForgetPass />
    },
    {
      path: '/updatePass',
      element: <UpdatePass />
    },
    {
      path:'/checkout',
      element:<Checkout/>
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={myRouter} />
    </div>
  );
}

export default App;

