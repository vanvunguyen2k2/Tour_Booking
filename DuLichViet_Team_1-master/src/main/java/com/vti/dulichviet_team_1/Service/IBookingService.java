package com.vti.dulichviet_team_1.service;


import com.vti.dulichviet_team_1.modal.entity.Account;
import com.vti.dulichviet_team_1.modal.entity.Booking;
import com.vti.dulichviet_team_1.request.BookingCreateRequest;
import com.vti.dulichviet_team_1.request.BookingSearchRequest;
import com.vti.dulichviet_team_1.request.BookingUpdateRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IBookingService {


  List<Booking> getAllBooking();


  void createBooking(BookingCreateRequest bookingCreateRequest);

  Booking updateBooking(int bookingId, BookingUpdateRequest bookingUpdateRequest);

  void deleteBookingId(int bookingId);
  //xem lịch sử của từng Account

  List<Booking> getBookingHistoryByAccount(Account account);

  // chức năng search
  Page<Booking> finBookings(BookingSearchRequest bookingsSearchRQ, Pageable pageable);


}
