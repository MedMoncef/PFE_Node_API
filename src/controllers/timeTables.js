const moment = require('moment');
import Login from '../model/TimeTable';


const getAllTimeTable = async (req, res) => {
  try {
    const timetables = await Login.find().populate('user');
    return res.send(timetables);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteTimeTable = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Login.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Time Table not found' });
    }

    return res.json({ message: 'Time Table deleted successfully' });
  } catch (error) {
    console.error('Error deleting Time Table:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getTimeTableById = async (req, res) => {
  const { _id } = req.params;

  try {
    const timetable = await Login.find({user : _id}).populate('user');

    if (!timetable) {
      return res.status(404).json({ message: 'Time Table not found' });
    }

    return res.json(timetable);
  } catch (error) {
    console.error('Error getting Time Table:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateTimeTable = async (req, res) => {
  const { id } = req.params;
  const updatedTimeTable = req.body;

  try {
    const result = await Login.updateOne({ _id: id }, updatedTimeTable);

    if (result.n === 0) {
      return res.status(404).json({ message: 'Time table not found' });
    }

    return res.json({ message: 'Time table updated successfully' });
  } catch (error) {
    console.error('Error updating Time table:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { getAllTimeTable, deleteTimeTable, getTimeTableById, updateTimeTable };