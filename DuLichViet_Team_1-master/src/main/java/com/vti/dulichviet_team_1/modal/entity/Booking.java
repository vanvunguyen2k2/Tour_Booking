package com.vti.dulichviet_team_1.modal.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "`booking`")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`id`")
    private int id;

    @Column(name = "`note`")
    private String note;

    @ManyToOne()
    @JoinColumn(name = "`account_id`")
    private Account account;

    @ManyToOne()
    @JoinColumn(name = "`tour_id`")
    private Tour tour;

    @Column(name = "`status`")
    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    @Column(name = "price")
    private double price;

    @Column(name = "booking_date")
    private LocalDate bookingDate;

    @Column(name = "guest_size")
    private Integer guestSize;


}
