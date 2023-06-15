import MenuType from '../model/MenuType';
import express from 'express';

const getNextID = async () => {
  const lastMenuType = await MenuType.findOne().sort({ ID_MenuType: -1 }).limit(1);
  const lastID = lastMenuType ? lastMenuType.ID_MenuType : 0;
  return parseInt(lastID) + 1;
};

const createMenuType = async (req, res) => {
  const { Name } = req.body;

  try {
    const nextID = await getNextID();

    const newMenuType = new MenuType({
      ID_MenuType: nextID.toString(),
      Name,
    });

    const savedMenuType = await newMenuType.save();
    res.status(201).json({ id: savedMenuType.ID_MenuType });
  } catch (error) {
    console.error('Error creating menu type:', error);
    res.sendStatus(500);
  }
};

const getAllMenuTypes = async (req, res) => {
  try {
    const menuTypes = await MenuType.find();
    res.send(menuTypes);
  } catch (error) {
    console.error('Error getting menu types:', error);
    res.sendStatus(500);
  }
};

const updateMenuType = async (req, res) => {
  const { id } = req.params;
  const updatedMenuType = req.body;

  try {
    const result = await MenuType.updateOne({ _id: id }, updatedMenuType);

    if (result.n === 0) {
      return res.status(404).json({ message: 'Menu type not found' });
    }

    return res.json({ message: 'Menu type updated successfully' });
  } catch (error) {
    console.error('Error updating menu type:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteMenuType = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await MenuType.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Menu type not found' });
    }

    return res.json({ message: 'Menu type deleted successfully' });
  } catch (error) {
    console.error('Error deleting menu type:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { createMenuType, getAllMenuTypes, updateMenuType, deleteMenuType };