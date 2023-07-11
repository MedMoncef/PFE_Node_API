import Reservation from '../model/Reservation';
import express from 'express';
import nodemailer from 'nodemailer';
import axios from 'axios';


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const createReservation = async (req, res) => {
  const { firstName, lastName, Email, CIN, ID_Rooms, Date_Debut, Date_Fin, Duree, Prix, Paid } = req.body;

  try {

    const newReservation = new Reservation({
      firstName,
      lastName,
      Email,
      CIN,
      ID_Rooms,
      Date_Debut,
      Date_Fin,
      Duree,
      Prix,
      Paid,
    });

    const savedReservation = await newReservation.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: Email,
      subject: 'Confirmation of Your Reservation at Harbor Hotel',
      text: 'Thank you for your reservation.',
      html: `
        <h1>Harbor Hotel</h1>
        <img src="cid:unique@nodemailer.com" />
<pre>
Dear ${firstName} ${lastName},

We are thrilled to confirm your reservation at Harbor Hotel and eagerly await your arrival. Here are the details:

Guest Name: ${firstName} ${lastName}
Email: ${Email}
Dates: ${Date_Debut} to ${Date_Fin}
Durration: ${Duree} days
Prix: ${Prix} $

Our team is dedicated to ensuring your comfort and satisfaction during your stay. Should you have any questions or specific needs, please feel free to reach out to us at +1 123 456 7890.

Please note that check-in time is at ${Date_Debut}, and check-out time is at ${Date_Fin}. If you require early check-in or late check-out, please inform us in advance, subject to availability.

We offer Spa and massage services for your convenience. Our hotel is also conveniently located near Harbor Beach and Harbor Museum.

Your reservation is guaranteed until ${Date_Debut}. If you need to modify or cancel your reservation, kindly inform us at least 2 days prior to your scheduled arrival by calling us at +1 123 456 7890 or contacting us through (http://localhost:3000/Client/contact) with this serial number (${savedReservation._id}).

Thank you for choosing Harbor. We are excited to provide you with a memorable experience. Please don't hesitate to contact us if you need any further assistance.

Warm regards,

Med Moncef Zmander
Director of Harbor Hotel
+1 123 456 7890
</pre>
      `,
      attachments: [{
        filename: 'favicon_uqaujb.jpg',
        path: 'https://res.cloudinary.com/dv5o7w2aw/image/upload/v1689081635/Insta/360_F_317545278_9npY5ZatinXjQq6aMVhHO9KuUUMJdkNd_yjiewt.jpg',
        cid: 'unique@nodemailer.com'
      }]
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: `Failed to send email. Error: ${error.message}` });
      } 
    });

    if(!res.headersSent){
      res.status(201).json({ id: savedReservation._id });
    }

  } catch (error) {
    console.error('Error creating reservation:', error);
    res.sendStatus(500);
  }
};


const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('ID_Rooms');
    res.send(reservations);
  } catch (error) {
    console.error('Error getting reservations:', error);
    res.sendStatus(500);
  }
};

const getReservationById = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const reservation = await Reservation.findByIdAndUpdate(id, updateData, { new: true }).populate('ID_Rooms');

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.send(reservation);
  } catch (error) {
    console.error('Error updating reservation by ID:', error);
    res.sendStatus(500);
  }
};


const updateReservation = async (req, res) => {
  const { id } = req.params;
  const updatedReservation = req.body;

  try {
    console.log(updatedReservation); // Should show the data received
    const result = await Reservation.updateOne({ _id: id }, updatedReservation);
    console.log(result); // Should show the result of the update operation


    if (result.n === 0) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    return res.json({ message: 'Reservation updated successfully' });
  } catch (error) {
    console.error('Error updating reservation:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteReservation = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Reservation.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    return res.json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    console.error('Error deleting reservation:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { createReservation, getAllReservations, getReservationById, updateReservation, deleteReservation };