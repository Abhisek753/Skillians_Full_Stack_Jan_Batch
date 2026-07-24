import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '../contexts/AuthContext';
import { createRestuarant } from '../services/restuarantapi';

const emptyForm = {
  name: '',
  address: '',
  image: '',
  description: '',
};

function RestuarantCreate() {
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!token || user?.role !== 'restuarant') {
      toast.error('Only restaurant owners can create a restaurant');
      return;
    }

    try {
      setSubmitting(true);
      await createRestuarant(form, token);
      toast.success('Restaurant created');
      navigate('/restuarant/dashboard');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create restaurant';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (user?.role !== 'restuarant') {
    return <p className="text-red-600">Only restaurant owners can view this page.</p>;
  }

  return (
    <section className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-md">
      <h1 className="text-2xl font-bold">Create Restaurant</h1>
      <p className="mt-1 text-stone-600">Add your restaurant details to start managing the menu.</p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            className="mt-1 w-full rounded border border-stone-300 px-3 py-2"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            className="mt-1 w-full rounded border border-stone-300 px-3 py-2"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Image URL</label>
          <input
            className="mt-1 w-full rounded border border-stone-300 px-3 py-2"
            name="image"
            value={form.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            className="mt-1 w-full rounded border border-stone-300 px-3 py-2"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="rounded bg-orange-600 px-4 py-2 text-white hover:bg-orange-700 disabled:opacity-60"
          >
            {submitting ? 'Creating...' : 'Create Restaurant'}
          </button>
          <Link
            to="/restuarant/dashboard"
            className="rounded border border-stone-300 px-4 py-2 text-stone-700 hover:bg-stone-50"
          >
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
}

export default RestuarantCreate;
