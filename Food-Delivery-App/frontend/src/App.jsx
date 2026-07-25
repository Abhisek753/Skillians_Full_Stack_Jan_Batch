import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import RestuarantDetails from "./pages/RestuarantDetails";
import RestuarantDashboard from "./pages/RestuarantDashboard"
import RestuarantCreate from "./pages/RestuarantCreate";
function App() {
  return (
    <>
      {/* <h1 className='text-xl font-bold text-red-500'>My food Delivery App</h1> */}
      <div className="min-h-screen bg-stone-100 text-stone-900">
        <Navbar />

        <main className="px-4 py-8 mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurants/:id" element={<RestuarantDetails />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/restuarant/create" element={<RestuarantCreate />} />
            <Route
              path="/restuarant/dashboard"
              element={<RestuarantDashboard/>}
            />
          </Routes>
        </main>
        <ToastContainer position="top-right" />
      </div>
    </>
  );
}

export default App;
