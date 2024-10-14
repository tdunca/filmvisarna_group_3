import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingPage.css';

interface Seat {
  seat: {
    _id: string;
    seatNumber: string;
    rowNumber: number;
    hall: string;
  };
  isBooked: boolean;
  _id: string;
}

interface Movie {
  _id: string;
  title: string;
  year: number;
  length: number;
  description: string;
  genre: string[];
  distributor: string;
  productionCountries: string[];
  language: string;
  subtitles: string;
  director: string;
  actors: string[];
  poster: string;
  trailer: string;
}

interface Showtime {
  _id: string;
  movie: {
    _id: string;
    title: string;
  };
  hall: {
    _id: string;
    hallName: string;
    seatsPerRow: number[];
  };
  date: string;
  time: string;
}

interface BookingPageProps {
  showtimeId: string | undefined;
}

const BookingPage: React.FC<BookingPageProps> = ({ showtimeId }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showtime, setShowtime] = useState<Showtime | null>(null);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [email, setEmail] = useState<string>('');
  const [ticketCounts, setTicketCounts] = useState({ adult: 0, child: 0, senior: 0 });
  const [ageConfirmation, setAgeConfirmation] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<{ success: boolean; message?: string; bookingNumber?: string } | null>(null);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    if (showtimeId) {
      fetchShowtimeDetails();
      fetchAvailableSeats();
    }
  }, [showtimeId]);

  useEffect(() => {
    // Calculate total amount based on ticket counts
    const adultPrice = 140;
    const childPrice = 80;
    const seniorPrice =120;
    const total = (ticketCounts.adult * adultPrice) + (ticketCounts.child * childPrice) + (ticketCounts.senior * seniorPrice);
    setTotalAmount(total);
  }, [ticketCounts]);

  const fetchShowtimeDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/showtime/${showtimeId}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch showtime details');
      }
      setShowtime(data);
      await fetchMovieDetails(data.movie._id);
      await fetchAvailableSeats();
    } catch (err: any) {
      console.error('Error fetching showtime details:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovieDetails = async (movieId: string) => {
    try {
      const response = await fetch(`/api/movie/${movieId}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch movie details');
      }
      setMovie(data);
    } catch (err: any) {
      console.error('Error fetching movie details:', err);
      setError(err.message);
    }
  };

  const fetchAvailableSeats = async () => {
    try {
      const response = await fetch(`/api/showtime/${showtimeId}/seats`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch available seats');
      }
      setSeats(data.seats);
    } catch (err: any) {
      console.error('Error fetching available seats:', err);
      setError(err.message);
    }
  };

  const handleSeatClick = (seatId: string) => {
  const totalTickets = ticketCounts.adult + ticketCounts.child + ticketCounts.senior;
  if (selectedSeats.includes(seatId)) {
    // If the seat is already selected, remove it
    setSelectedSeats((prev) => prev.filter((id) => id !== seatId));
  } else if (selectedSeats.length < totalTickets) {
    // Add the seat only if the number of selected seats is less than the total ticket count
    setSelectedSeats((prev) => [...prev, seatId]);
  } else {
    alert('You have selected the maximum number of seats allowed.');
  }
};

  const handleBooking = async () => {
  if (!email || selectedSeats.length === 0 || !ageConfirmation) {
    setError('Please select seats, enter your email, and confirm age');
    return;
  }

  try {
    const tickets = [
      { type: 'adult', quantity: ticketCounts.adult },
      { type: 'senior', quantity: ticketCounts.senior },
      { type: 'child', quantity: ticketCounts.child },
    ];

     // Filter out only the selected seats
    const selectedSeatObjects = seats.filter(seat => selectedSeats.includes(seat._id));

    const response = await fetch('/api/user/bookings', {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        movieId: showtime?.movie._id,
        hallId: showtime?.hall._id,
        showtimeId,
        selectedSeats: selectedSeatObjects.map(seat => seat.seat._id),
        email,
        tickets,
        totalAmount,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to create booking');
    }

    setBookingStatus({
      success: true,
      bookingNumber: data.booking.bookingNumber,
    });

    setShowModal(true); // Visa modalen med bokningsinformation
  } catch (err: any) {
    console.error('Error creating booking:', err);
    setBookingStatus({
      success: false,
      message: err.message,
    });
  }
};


  const closeModal = () => {
    setShowModal(false);
    navigate(`/booking-confirmation/${bookingStatus?.bookingNumber}`);
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="container">
      <div className="booking-information">

        {/* Section 1: Showtime Info */}
        <div className="booking-information-header">
          <div className="booking-information-header__poster">
            <img src={movie?.poster} alt={movie?.title} />
          </div>
          <div className="booking-information-header__top">
          <h1>{movie?.title}</h1>
            <p>Tal: {movie?.language}, Undertexter: {movie?.subtitles}</p>
            <p>Genre: {movie?.genre.join(', ')}</p>
            <p>Speltid: {movie?.length} minuter</p>
          </div>
          <div className="booking-information-header__bottom">
            <p>Datum: {showtime && new Date(showtime.date).toLocaleDateString()}</p>
            <p>Tid: {showtime?.time}</p>
            <p>Salong: {showtime?.hall.hallName}</p>
          </div>
        </div>

        {/* Section 2: Ticket Selection */}
        <div className="ticket-counts">
          <h3>Välj biljetter</h3>
          <div className="ticket-counts__tickets">
            <div className="ticket-counts__tickets__ticket">
              <label>Vuxen: </label>
              <div className="ticket-counts__tickets__ticket__button-container">
            <button onClick={() => setTicketCounts((prev) => ({ ...prev, adult: Math.max(0, prev.adult - 1) }))}>-</button>
            <span>{ticketCounts.adult}</span>
            <button onClick={() => setTicketCounts((prev) => ({ ...prev, adult: prev.adult + 1 }))}>+</button>
              </div>
            </div>
          <div className="ticket-counts__tickets__ticket">
              <label>Barn: </label>
              <div className="ticket-counts__tickets__ticket__button-container">
            <button onClick={() => setTicketCounts((prev) => ({ ...prev, child: Math.max(0, prev.child - 1) }))}>-</button>
            <span>{ticketCounts.child}</span>
            <button onClick={() => setTicketCounts((prev) => ({ ...prev, child: prev.child + 1 }))}>+</button>
              </div>
              </div>
          <div className="ticket-counts__tickets__ticket">
              <label>Pensionär: </label>
              <div className="ticket-counts__tickets__ticket__button-container">
            <button onClick={() => setTicketCounts((prev) => ({ ...prev, senior: Math.max(0, prev.senior - 1) }))}>-</button>
            <span>{ticketCounts.senior}</span>
            <button onClick={() => setTicketCounts((prev) => ({ ...prev, senior: prev.senior + 1 }))}>+</button>
            </div>
            </div>
            </div>
        </div>

        <div className="booking-information-content">
          {/* Section 3: Seat Selection */}
          <h3>Välj platser</h3>
          <div className="seat-grid">
            {showtime?.hall.seatsPerRow.map((seatsInRow, rowIndex) => (
              <div className="seat-row" key={rowIndex}>
                {Array.from({ length: seatsInRow }).map((_, seatIndex) => {
                  const reverseSeatIndex = seatsInRow - seatIndex; // Räknar ner istället för upp
                  const seat = seats.find(
                    (s) => s.seat.rowNumber === rowIndex + 1 && parseInt(s.seat.seatNumber) === reverseSeatIndex
                  );
                  return (
                    <button
                      key={seat?._id || `${rowIndex}-${reverseSeatIndex}`}
                      onClick={() => seat && !seat.isBooked && handleSeatClick(seat._id)}
                      className={`seat-button ${seat && !seat.isBooked ? (selectedSeats.includes(seat._id) ? 'selected' : '') : 'unavailable'}`}
                      disabled={seat?.isBooked || !seat}
                    >
                      {`R${rowIndex + 1}S${reverseSeatIndex}`}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Section 4: Contact Information */}
          <div className="contact-info">
            <h3>Biljettleverans</h3>
            <p>För att boka biljetter, ange din e-postadress.</p>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="email-input"
            />
          </div>

          {/* Section 5: Age Confirmation */}
          <div className="age-confirmation">
            <label>
              <input
                type="checkbox"
                checked={ageConfirmation}
                onChange={() => setAgeConfirmation(!ageConfirmation)}
              />
              Jag är medveten om filmer kan ha åldersgränser. Barn som har fyllt 11 år får medfölja i vuxens sällskap. Ålder ska kunna styrkas med giltig legitimation. 
            </label>
          </div>

          <h3>Att betala: {totalAmount} SEK</h3>

          <button className="book-button" onClick={handleBooking}>
            Genomför bokning
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Bokningsbekräftelse</h2>
            {bookingStatus?.success ? (
              <>
                <p>Bokningen genomfördes</p>
                <p>Ditt bokningsnummer: {bookingStatus.bookingNumber}</p>
                <p>Information har skickats till angiven e-postadress</p>
                <button onClick={closeModal}>Stäng</button>
              </>
            ) : (
              <>
                <p>{bookingStatus?.message}</p>
                <button onClick={closeModal}>Stäng</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
