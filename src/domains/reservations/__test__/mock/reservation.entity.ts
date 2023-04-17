import { Reservation, ServiceType } from '../../entities/reservations.entity';

export const mockReservation = (): Reservation => {
  return {
    id: 1,
    serviceType: ServiceType.In,
    serviceCharge: 10000,
    customerName: 'kim haha',
    contactNumber: '010-9191-1919',
    carType: 'avante',
    plateNumber: '11h1111',
    note: '',
    serviceEndDate: '08',
    serviceTime: '07:30',
    listDate: '2022-02-22',
    // company: [],
  };
};

export const mockReservationWithoutId = () => {
  return {
    serviceType: ServiceType.In,
    serviceCharge: 10000,
    customerName: 'kim haha',
    contactNumber: '010-9191-1919',
    carType: 'avante',
    plateNumber: '11h1111',
    note: '',
    serviceEndDate: '08',
    serviceTime: '07:30',
    listDate: '2022-02-22',
    // company: [],
  };
};
