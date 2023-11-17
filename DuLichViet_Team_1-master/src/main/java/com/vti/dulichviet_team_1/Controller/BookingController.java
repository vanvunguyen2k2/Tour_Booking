package com.vti.dulichviet_team_1.controller;


import com.vti.dulichviet_team_1.service.impl.BookingService;
import com.vti.dulichviet_team_1.modal.entity.Account;
import com.vti.dulichviet_team_1.modal.entity.Booking;

import com.vti.dulichviet_team_1.request.BookingCreateRequest;
import com.vti.dulichviet_team_1.request.BookingSearchRequest;
import com.vti.dulichviet_team_1.request.BookingUpdateRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
@CrossOrigin("*")
public class BookingController {

  @Autowired
  BookingService bookingService;


  @GetMapping("/get-all-booking")
  public ResponseEntity<List<Booking>> getAllBooking() {
    return ResponseEntity.status(HttpStatus.OK).body(bookingService.getAllBooking());
  }

  // thêm mới Booking
  @PostMapping("/create-booking")
  public ResponseEntity<?> createBooking(@RequestBody BookingCreateRequest bookingCreateRequest) {
    bookingService.createBooking(bookingCreateRequest);
    return new ResponseEntity<>(HttpStatus.CREATED);
  }

  // sửa booking
  @PutMapping("/update/{bookingId}")
  public ResponseEntity<Booking> updateBooking(@PathVariable int bookingId, @RequestBody BookingUpdateRequest bookingRequest) {
    try {
      Booking updatedBooking = bookingService.updateBooking(bookingId, bookingRequest);
      return ResponseEntity.ok(updatedBooking);
    } catch (RuntimeException e) {
      return ResponseEntity.notFound().build();
    }
  }

  // xóa booking
  @DeleteMapping("/delete/{bookingId}")
  public ResponseEntity<?> deleteBooking(@PathVariable int bookingId) {
    bookingService.deleteBookingId(bookingId);
    return ResponseEntity.noContent().build();
  }



  // tìm dang sách booking từng account
  @GetMapping("/history/{accountId}")
  public ResponseEntity<List<Booking>> getBookingHistory(@PathVariable Integer accountId) {
    Account account = new Account();
    account.setId(accountId);
    List<Booking> bookingHistory = bookingService.getBookingHistoryByAccount(account);
    return ResponseEntity.ok(bookingHistory);
  }


  @PostMapping("/filter")
  public ResponseEntity<Page<Booking>> filterBookings(
    @RequestBody BookingSearchRequest searchRequest,  // Dữ liệu tìm kiếm Booking được gửi dưới dạng request body
    @RequestParam(value = "page", defaultValue = "1") int page,  // Trang mặc định là 1, có thể chỉ định bởi request param "page"
    @RequestParam(value = "size", defaultValue = "10") int size,  // Kích thước trang mặc định là 10, có thể chỉ định bởi request param "size"
    @RequestParam(value = "sort", defaultValue = "id,asc") String[] sort) {  // Sắp xếp mặc định theo id tăng dần (asc), có thể chỉ định bởi request param "sort"

    // Trích xuất trường sắp xếp và hướng sắp xếp từ request param "sort"
    String sortField = sort[0];
    String sortDirection = sort[1].equalsIgnoreCase("asc") ? "asc" : "desc";

    // Tạo đối tượng Pageable để quản lý phân trang và sắp xếp
    Pageable pageable = PageRequest.of(page - 1, size, Sort.by(sortDirection.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortField));

    // Lọc các Booking sử dụng dữ liệu tìm kiếm và thông tin phân trang/sắp xếp, thông qua bookingService
    Page<Booking> filteredBookings = bookingService.finBookings(searchRequest, pageable);

    // Trả về kết quả dưới dạng ResponseEntity và mã HTTP 200 (OK)
    return ResponseEntity.ok(filteredBookings);
  }


}


