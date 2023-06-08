import RoomType from '../model/RoomType';
import express from 'express';

const getNextID = async () => {
  const lastRoomType = await RoomType.findOne().sort({ ID_RoomType: -1 }).limit(1);
  const lastID = lastRoomType ? lastRoomType.ID_RoomType : 0;
  return parseInt(lastID) + 1;
};

const createRoomType = async (req, res) => {
  const { Name } = req.body;

  try {
    const nextID = await getNextID();

    const newRoomType = new RoomType({
      ID_RoomType: nextID.toString(),
      Name,
    });

    const savedRoomType = await newRoomType.save();
    res.status(201).json({ id: savedRoomType.ID_RoomType });
  } catch (error) {
    console.error('Error creating room type:', error);
    res.sendStatus(500);
  }
};

const getAllRoomTypes = async (req, res) => {
  try {
    const roomTypes = await RoomType.find();
    res.send(roomTypes);
  } catch (error) {
    console.error('Error getting room types:', error);
    res.sendStatus(500);
  }
};

const updateRoomType = async (req, res) => {
  const { id } = req.params;
  const updatedRoomType = req.body;

  try {
    const result = await RoomType.updateOne({ _id: id }, updatedRoomType);

    if (result.n === 0) {
      return res.status(404).json({ message: 'Room type not found' });
    }

    return res.json({ message: 'Room type updated successfully' });
  } catch (error) {
    console.error('Error updating room type:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteRoomType = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await RoomType.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Room type not found' });
    }

    return res.json({ message: 'Room type deleted successfully' });
  } catch (error) {
    console.error('Error deleting room type:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { createRoomType, getAllRoomTypes, updateRoomType, deleteRoomType };