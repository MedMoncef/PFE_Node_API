import Reservation from '../model/Reservation';
import express from 'express';

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

    res.status(201).json({ id: savedReservation._id });
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.sendStatus(500);
  }
};


const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
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
    const reservation = await Reservation.findByIdAndUpdate(id, updateData, { new: true });

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
    const result = await Reservation.updateOne({ _id: id }, updatedReservation);

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