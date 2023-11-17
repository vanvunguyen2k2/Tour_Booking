package com.vti.dulichviet_team_1.request;

import com.vti.dulichviet_team_1.modal.entity.Account;
import com.vti.dulichviet_team_1.modal.entity.BookingStatus;
import com.vti.dulichviet_team_1.modal.entity.Tour;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.util.Date;

@Data
@NoArgsConstructor
public class BookingCreateRequest {


    private String note;

    private int accountId;

    private int tourId;

    private int guestSize;


}
