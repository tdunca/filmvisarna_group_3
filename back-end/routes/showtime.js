import express from 'express';
import { 
  createShowtime,
  getShowtimes,
  getShowtimeById,
  updateShowtime,
  deleteShowtime,
  getShowtimesByDateRange
} from '../controllers/showtimeController.js';
// import { authAdmin } from '../middlewares/authAdmin.js'; // Om du har admin-autentisering

const showtimeRouter = express.Router();

// Skapa ny visning (endast admin)
// showtimeRouter.post('/', authAdmin, createShowtime);
showtimeRouter.post('/', createShowtime);

// Hämta alla visningar med filtreringsmöjligheter
showtimeRouter.get('/', getShowtimes);

// Hämta visningar inom datumintervall
showtimeRouter.get('/date-range', getShowtimesByDateRange);

// Hämta specifik visning
showtimeRouter.get('/:id', getShowtimeById);

// Uppdatera visning (endast admin)
// showtimeRouter.put('/:id', authAdmin, updateShowtime);
showtimeRouter.put('/:id', updateShowtime);

// Ta bort visning (endast admin)
// showtimeRouter.delete('/:id', authAdmin, deleteShowtime);
showtimeRouter.delete('/:id', deleteShowtime);

export default showtimeRouter;