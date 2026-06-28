export interface Bike {
  id: string;
  name: string;
  type: 'scooter' | 'motorcycle' | 'bicycle';
  pricePerHour: number;
  pricePerDay: number;
  image: string;
  status: 'Available' | 'Booked' | 'Rented' | 'In Service';
  specs: string[];
  description: string;
}

export interface Booking {
  id: string;
  bikeId: string;
  bikeName: string;
  customerName: string;
  customerPhone: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  totalAmount: number;
  paymentStatus: 'Pending' | 'Paid (Razorpay Advance)';
  bookingStatus: 'Confirmed' | 'Collected' | 'Completed';
  timestamp: string;
}
