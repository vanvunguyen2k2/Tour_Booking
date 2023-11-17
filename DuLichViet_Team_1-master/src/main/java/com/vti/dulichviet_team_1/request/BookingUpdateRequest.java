package com.vti.dulichviet_team_1.request;

import com.vti.dulichviet_team_1.modal.entity.Account;
import com.vti.dulichviet_team_1.modal.entity.BookingStatus;
import com.vti.dulichviet_team_1.modal.entity.Tour;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class BookingUpdateRequest {

    private int bookingId;

    private String note;

    private int accountId;

    private int tourId;

    private Integer price;

    private int guestSize;

    private BookingStatus status;
}
