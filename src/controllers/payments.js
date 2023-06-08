import Payment from '../model/Payment';

const createPayment = async (req, res) => {
  const { cardNumber, expiryDate, cvv, nameOnCard, amount } = req.body;

  try {
    const existingPayment = await Payment.findOne({ cardNumber });

    if (existingPayment) {
      return res.status(400).json({ message: 'Payment already exists' });
    }

    const newPayment = new Payment({
      cardNumber,
      expiryDate,
      cvv,
      nameOnCard,
      amount
    });

    // Process the payment or save it to the database

    // Send email using nodemailer
    // ...

    const savedPayment = await newPayment.save();

    res.status(201).json({ id: savedPayment._id });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.sendStatus(500);
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.send(payments);
  } catch (error) {
    console.error('Error getting payments:', error);
    res.sendStatus(500);
  }
};

const updatePayment = async (req, res) => {
  const { id } = req.params;
  const updatedPayment = req.body;

  try {
    const result = await Payment.updateOne({ _id: id }, updatedPayment);

    if (result.n === 0) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    return res.json({ message: 'Payment updated successfully' });
  } catch (error) {
    console.error('Error updating payment:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deletePayment = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Payment.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    return res.json({ message: 'Payment deleted successfully' });
  } catch (error) {
    console.error('Error deleting payment:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getPaymentById = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await Payment.findById(id);
    
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.json(payment);
  } catch (error) {
    console.error('Error getting payment by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { createPayment, getAllPayments, updatePayment, deletePayment, getPaymentById };