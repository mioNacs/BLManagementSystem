import Event from '../models/event.model.js';
import mongoose from 'mongoose';
const createEvent = async (req, res) => {
   try {
    const { title, description, startingDate, time, location,category,status} = req.body;
    if(!title || !description || !startingDate || !time || !location) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    const createdEvent = await Event.create({
      title,
      description,
      startingDate,
      time,
      location,
      category,
      status
    });
    res.status(201).json(createdEvent);
    
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error while creating event' });
    
   }
}

const getALLEvents = async (req, res) => {  
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error while fetching events' });
  }
}
const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { title, description, startingDate, time, location,category,status } = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(eventId, {
      title,
      description,
      startingDate,
      time,
      location,
      category,
      status
    }, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error while updating event' });
  }
}

export {createEvent,getALLEvents,updateEvent};//this is used to export the createEvent and getALLEvents function so that we can use it in other files