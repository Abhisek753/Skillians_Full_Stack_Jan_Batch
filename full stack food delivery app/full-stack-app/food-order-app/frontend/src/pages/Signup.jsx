import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '../contexts/AuthContext';
import { signupUser } from '../services/api';

function Signup() {
  const navigate = useNavigate();
  const { saveAuth } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });

  // This function updates the correct field when the user types.
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // This function sends form data to the backend signup API.
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await signupUser(formData);
      saveAuth(data.user, data.token);
      toast.success('Signup successful!');
      navigate('/');
    } catch (error) {
      const message = error.response?.data?.message || 'Signup failed';
      toast.error(message);
    }
  };

  return (
    <section className="rounded bg-white p-8 shadow-md">
      <h1 className="mb-4 text-2xl font-bold">Create your FoodieHub account</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            className="mt-1 w-full rounded border border-stone-300 px-3 py-2 focus:border-orange-500 focus:outline-none"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Rahul"
            required
          />
        </div>
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
        <div>
          <label className="block text-sm font-medium">Role</label>
          <select
            className="mt-1 w-full rounded border border-stone-300 px-3 py-2 focus:border-orange-500 focus:outline-none"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="customer">Customer</option>
            <option value="restaurant">Restaurant</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full rounded bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
        >
          Sign Up
        </button>
      </form>
    </section>
  );
}

export default Signup;
