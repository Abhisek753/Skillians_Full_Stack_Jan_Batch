import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '../contexts/AuthContext';
import { loginUser } from '../services/api';

function Login() {
  const navigate = useNavigate();
  const { saveAuth } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // This function updates email or password when the user types.
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // This function sends login details to the backend login API.
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await loginUser(formData);
      saveAuth(data.user, data.token);
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
    }
  };

  return (
    <section className="rounded bg-white p-8 shadow-md">
      <h1 className="mb-4 text-2xl font-bold">Login to FoodieHub</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            className="mt-1 w-full rounded border border-stone-300 px-3 py-2 focus:border-orange-500 focus:outline-none"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="rahul@gmail.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            className="mt-1 w-full rounded border border-stone-300 px-3 py-2 focus:border-orange-500 focus:outline-none"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="123456"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
        >
          Login
        </button>
      </form>
    </section>
  );
}

export default Login;
