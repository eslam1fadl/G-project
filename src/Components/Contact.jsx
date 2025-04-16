
  import React, { useState } from 'react'
  
  export default function Contact() {

    const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.name) {
      newErrors.name = "Name is required";
    } else if (/\d/.test(formData.name)) {
      newErrors.name = "Name cannot contain numbers";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Phone number must contain only digits";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      alert("Form submitted successfully");
      setFormData({ name: "", phone: "", email: "", message: "" });
    }
    setErrors(validationErrors);
  };
    return (
        <div className='container'>
 <section className="p-6 mt-20 bg-white shadow-2xl shadow-gray-300  max-w-5xl mx-auto flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-bold mb-4 text-[#199ED3]">Contact Us</h2>
          <p className="mb-2 text-[#666666]">Phone: +20 259 83 999</p>
          <p className="mb-2 text-[#666666]">Address: Cairo, Egypt</p>
          <p className='mb-2 text-[#666666]'>Email: customercare@drhome.com</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full md:w-1/2 grid gap-4">
          <input type="text" placeholder="Full Name" 
      className="block py-2 px-3 w-full text-sm text-gray-700 bg-transparent border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#199ED3] focus:outline-none"
      value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <input type="tel" placeholder="Phone Number"
      className="block py-2 px-3 w-full text-sm text-gray-700 bg-transparent border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#199ED3] focus:outline-none"
      value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

          <input type="email" placeholder="Email Address" 
      className="block py-2 px-3 w-full text-sm text-gray-700 bg-transparent border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#199ED3] focus:outline-none"
      value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <textarea placeholder="Your Message" 
      className="block py-2 px-3 w-full text-sm text-gray-700 bg-transparent border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#199ED3] focus:outline-none"
      value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />

          <button type="submit"
          className="flex justify-center items-center text-lg font-medium text-white bg-red-500 hover:bg-red-700 focus:ring-4   rounded-lg w-full py-1"
          >Send</button>
        </form>
      </section>
        </div>
       
    )
  }
  