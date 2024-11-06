import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './BookingForm.css';

const BookingForm = () => {
  const [venues] = useState(['Venue A', 'Venue B', 'Venue C']);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      venue: '',
      date: '',
      time: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      venue: Yup.string().required('Required'),
      date: Yup.string().required('Required'),
      time: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('https://attendapp-backend.cloud-stacks.com/api/bookings', values, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 201) {
          setBookingSuccess(true);
          alert('Confirmation email sent to ' + values.email);
        }
      } catch (error) {
        alert('Failed to submit booking request: ' + error.response.data.error);
      }
    },
  });

  return (
    <div className="booking-form">
      <h1>Book a Venue</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" {...formik.getFieldProps('name')} />
          {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...formik.getFieldProps('email')} />
          {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
        </div>
        <div>
          <label htmlFor="venue">Venue</label>
          <select id="venue" {...formik.getFieldProps('venue')}>
            <option value="">Select a venue</option>
            {venues.map((venue) => (
              <option key={venue} value={venue}>
                {venue}
              </option>
            ))}
          </select>
          {formik.touched.venue && formik.errors.venue ? <div>{formik.errors.venue}</div> : null}
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input id="date" type="date" {...formik.getFieldProps('date')} />
          {formik.touched.date && formik.errors.date ? <div>{formik.errors.date}</div> : null}
        </div>
        <div>
          <label htmlFor="time">Time</label>
          <input id="time" type="time" {...formik.getFieldProps('time')} />
          {formik.touched.time && formik.errors.time ? <div>{formik.errors.time}</div> : null}
        </div>
        <button type="submit">Submit</button>
      </form>
      {bookingSuccess && <p>Your booking request has been submitted!</p>}
    </div>
  );
};

export default BookingForm;
