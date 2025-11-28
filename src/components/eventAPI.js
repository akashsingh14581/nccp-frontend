import axios from "axios";
const API = "http://localhost:3000/api";

// Event APIs
export const createEvent = (data) => axios.post(`${API}/events`, data);
export const updateEvent = (id, data) => axios.put(`${API}/events/${id}`, data);
export const getEvent = (id) => axios.get(`${API}/events/${id}`);
export const getAllEvents = () => axios.get(`${API}/events`);

// Photo APIs
export const uploadPhoto = (data) =>
  axios.post(`${API}/photos/upload`, data, { 
    headers: { "Content-Type": "multipart/form-data" } 
  });

export const getPhotosByEvent = (eventId) => axios.get(`${API}/photos/event/${eventId}`);
export const getPhotoById = (photoId) => axios.get(`${API}/photos/${photoId}`);
export const updatePhoto = (photoId, data) => axios.put(`${API}/photos/${photoId}`, data);
export const replacePhoto = (data) =>
  axios.put(`${API}/photos/replace`, data, {
    headers: { "Content-Type": "multipart/form-data" }
  });
export const deletePhoto = (photoId) => axios.delete(`${API}/photos/${photoId}`);
export const updatePhotoOrder = (eventId, orderData) => 
  axios.put(`${API}/photos/order/${eventId}`, orderData);