import Menu from '../model/Menu';
import express from 'express';

const createMenu = async (req, res) => {
  const { Image, Nom, Description, Prix, Type } = req.body;

  try {
    const newMenu = new Menu({
      Image,
      Nom,
      Description,
      Prix,
      Type
    });

    const savedMenu = await newMenu.save();

    res.status(201).json({ id: savedMenu._id });
  } catch (error) {
    console.error('Error creating menu:', error);
    res.sendStatus(500);
  }
};

const getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.find().populate('Type');
    res.send(menus);
  } catch (error) {
    console.error('Error getting menus:', error);
    res.sendStatus(500);
  }
};

const getMenuById = async (req, res) => {
  const { id } = req.params;

  try {
    const menu = await Menu.findById(id).populate('Type');

    if (!menu) {
      return res.status(404).json({ message: 'Menu not found' });
    }

    res.send(menu);
  } catch (error) {
    console.error('Error getting menu by ID:', error);
    res.sendStatus(500);
  }
};

const updateMenu = async (req, res) => {
  const { id } = req.params;
  const updatedMenu = req.body;

  try {
    const result = await Menu.updateOne({ _id: id }, updatedMenu);

    if (result.n === 0) {
      return res.status(404).json({ message: 'Menu not found' });
    }

    return res.json({ message: 'Menu updated successfully' });
  } catch (error) {
    console.error('Error updating menu:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteMenu = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Menu.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Menu not found' });
    }

    return res.json({ message: 'Menu deleted successfully' });
  } catch (error) {
    console.error('Error deleting menu:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { createMenu, getAllMenus, getMenuById, updateMenu, deleteMenu };