import Announcement from '../model/Announcement';

const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().populate('ID_Sent'); // Make sure you populate the correct field
    return res.send(announcements);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const createAnnouncement = async (req, res) => {
  try {
    const newAnnouncement = new Announcement(req.body);
    await newAnnouncement.save();
    return res.status(201).send(newAnnouncement);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getAnnouncementById = async (req, res) => {
  const { id } = req.params;

  try {
    const announcement = await Announcement.findById(id).populate('ID_Sent');

    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    res.send(announcement);
  } catch (error) {
    console.error('Error getting announcement by ID:', error);
    res.sendStatus(500);
  }
};

const updateAnnouncement = async (req, res) => {
  const { id } = req.params;
  const updatedAnnouncement = req.body;

  try {
    const result = await Announcement.updateOne({ _id: id }, updatedAnnouncement);

    if (result.n === 0) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    return res.json({ message: 'Announcement updated successfully' });
  } catch (error) {
    console.error('Error updating announcement:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteAnnouncement = async (req, res) => {
  try {
    const result = await Announcement.findByIdAndRemove(req.params.id);
    if (!result) {
      return res.status(404).send({ message: 'Announcement not found' });
    }
    return res.send({ message: 'Announcement deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export { getAllAnnouncements, createAnnouncement, updateAnnouncement, getAnnouncementById, deleteAnnouncement };