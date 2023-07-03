import Room from '../model/Room';
import express from 'express';

const createRoom = async (req, res) => {
  const { Room_Number, Floor_Number, Name, Image, Description, View, Type, Price } = req.body;

  try {
    const newRoom = new Room({
      Room_Number,
      Floor_Number,
      Name,
      Image,
      Description,
      View,
      Type,
      Price,
    });

    const savedRoom = await newRoom.save();

    res.status(201).json({ id: savedRoom._id });
  } catch (error) {
    console.error('Error creating room:', error);
    res.sendStatus(500);
  }
};

const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate('Type');
    res.send(rooms);
  } catch (error) {
    console.error('Error getting rooms:', error);
    res.sendStatus(500);
  }
};

const updateRoom = async (req, res) => {
  const { id } = req.params;
  const updatedRoom = req.body;

  try {
    const result = await Room.updateOne({ _id: id }, updatedRoom);

    if (result.n === 0) {
      return res.status(404).json({ message: 'Room not found' });
    }

    return res.json({ message: 'Room updated successfully' });
  } catch (error) {
    console.error('Error updating room:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteRoom = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Room.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Room not found' });
    }

    return res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Error deleting room:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getRoomById = async (req, res) => {
  const { id } = req.params;

  try {
    const room = await Room.findById(id).populate('Type');

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.json(room);
  } catch (error) {
    console.error('Error getting room:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { createRoom, getAllRooms, updateRoom, deleteRoom, getRoomById };