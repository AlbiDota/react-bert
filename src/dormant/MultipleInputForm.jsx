import React from 'react';

const MultiInputForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log('Form data:', data);
    alert("Form data: " +JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 mb-2">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 mb-2">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="age" className="block text-gray-700 mb-2">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          className="w-full px-3 py-2 border rounded"
          min="0"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="country" className="block text-gray-700 mb-2">Country:</label>
        <select
          id="country"
          name="country"
          className="w-full px-3 py-2 border rounded"
          required
        >
          <option value="">Select a country</option>
          <option value="usa">United States</option>
          <option value="canada">Canada</option>
          <option value="uk">United Kingdom</option>
          <option value="australia">Australia</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Submit
      </button>
    </form>
  );
};

export default MultiInputForm;