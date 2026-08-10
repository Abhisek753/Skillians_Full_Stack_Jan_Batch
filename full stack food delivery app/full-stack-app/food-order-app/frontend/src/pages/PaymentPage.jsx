import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const totalAmount = location.state?.totalAmount ?? 0;

  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.cardNumber || !formData.expiry || !formData.cvv) {
      toast.error('Please fill in all payment details');
      return;
    }

    toast.success('Payment successful!');
    navigate('/cart');
  };

  return (
    <section className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-md">
      <h1 className="text-3xl font-bold">Payment</h1>
      <p className="mt-2 text-stone-600">
        Complete your payment for <span className="font-semibold text-orange-600">₹{Number(totalAmount).toFixed(2)}</span>
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Cardholder Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded border border-stone-300 px-3 py-2 outline-none focus:border-orange-500"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            className="w-full rounded border border-stone-300 px-3 py-2 outline-none focus:border-orange-500"
            placeholder="1234 5678 9012 3456"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Expiry</label>
            <input
              type="text"
              name="expiry"
              value={formData.expiry}
              onChange={handleChange}
              className="w-full rounded border border-stone-300 px-3 py-2 outline-none focus:border-orange-500"
              placeholder="MM/YY"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">CVV</label>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              className="w-full rounded border border-stone-300 px-3 py-2 outline-none focus:border-orange-500"
              placeholder="123"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded bg-orange-600 px-4 py-2 font-semibold text-white transition hover:bg-orange-700"
        >
          Pay Now
        </button>
      </form>
    </section>
  );
}

export default PaymentPage;
