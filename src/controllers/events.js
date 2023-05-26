import Event from '../model/Event';
import express from 'express';

const createEvent = async (req, res) => {
  const { ID_Event, Type, Time, Duree, Host, Desc } = req.body;

  try {
    const newEvent = new Event({
      ID_Event,
      Type,
      Time,
      Duree,
      Host,
      Desc
    });

    const savedEvent = await newEvent.save();

    res.status(201).json({ id: savedEvent._id });
  } catch (error) {
    console.error('Error creating event:', error);
    res.sendStatus(500);
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.send(events);
  } catch (error) {
    console.error('Error getting events:', error);
    res.sendStatus(500);
  }
};

const getEventById = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.send(event);
  } catch (error) {
    console.error('Error getting event by ID:', error);
    res.sendStatus(500);
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const updatedEvent = req.body;

  try {
    const result = await Event.updateOne({ _id: id }, updatedEvent);

    if (result.n === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    return res.json({ message: 'Event updated successfully' });
  } catch (error) {
    console.error('Error updating event:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Event.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    return res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent };