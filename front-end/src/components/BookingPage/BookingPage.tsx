import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Update the Seat interface to match the API response
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

interface Showtime {
  movie: {
    _id: string;
    title: string;
  };
  hall: {
    _id: string;
    hallName: string;
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
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [email, setEmail] = useState<string>('');
  const [bookingStatus, setBookingStatus] = useState<{ success: boolean; message?: string; bookingNumber?: string } | null>(null);

  useEffect(() => {
    if (showtimeId) {
      fetchShowtimeDetails();
      fetchAvailableSeats();
    }
  }, [showtimeId]);

  const fetchShowtimeDetails = async () => {
    try {
      const response = await fetch(`/api/showtime/${showtimeId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setShowtime(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load showtime details');
    }
  };

  const fetchAvailableSeats = async () => {
    try {
      const response = await fetch(`/api/showtime/${showtimeId}/seats`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSeats(data.seats);
    } catch (err) {
      console.error(err);
      setError('Failed to load seats');
    } finally {
      setLoading(false);
    }
  };

  const handleSeatClick = (seatId: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
    );
  };

  const handleBooking = async () => {
    if (!email || selectedSeats.length === 0) {
      setError('Please select seats and enter your email');
      return;
    }

    try {
      const response = await fetch('/api/user/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          movieId: showtime?.movie._id,
          hallId: showtime?.hall._id,
          showtimeId,
          selectedSeats,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setBookingStatus({
        success: true,
        bookingNumber: data.booking.bookingNumber,
      });

      setTimeout(() => {
        navigate(`/booking-confirmation/${data.booking.bookingNumber}`);
      }, 2000);
    } catch (err: any) {
      setBookingStatus({
        success: false,
        message: err.message,
      });
    }
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h1>{showtime?.movie?.title}</h1>
          <p>{new Date(showtime?.date!).toLocaleDateString()} - {showtime?.time}</p>
          <p>Hall: {showtime?.hall?.hallName}</p>
        </div>

        <div className="card-content">
          <h3>Select Seats</h3>
          <div className="seat-grid">
            {seats.map((seat) => (
              <button
                key={seat._id}
                onClick={() => !seat.isBooked && handleSeatClick(seat._id)}
                className={`seat-button ${!seat.isBooked ? (selectedSeats.includes(seat._id) ? 'selected' : '') : 'unavailable'}`}
                disabled={seat.isBooked}
              >
                {`R${seat.seat.rowNumber}S${seat.seat.seatNumber}`}
              </button>
            ))}
          </div>

          <div className="contact-info">
            <h3>Contact Information</h3>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="email-input"
            />
          </div>
        </div>

        <div className="card-footer">
          <p>Selected seats: {selectedSeats.length}</p>
          <button onClick={handleBooking} disabled={selectedSeats.length === 0 || !email} className="book-button">
            Complete Booking
          </button>
        </div>
      </div>

      {bookingStatus && (
        <div className={`alert ${bookingStatus.success ? 'alert-success' : 'alert-error'}`}>
          {bookingStatus.success
            ? `Booking successful! Your booking number is: ${bookingStatus.bookingNumber}`
            : `Booking failed: ${bookingStatus.message}`}
        </div>
      )}
    </div>
  );
};

export default BookingPage;