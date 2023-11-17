package com.vti.dulichviet_team_1.modal.dto;


import com.vti.dulichviet_team_1.modal.entity.TourStatus;
import com.vti.dulichviet_team_1.modal.entity.Transport;
import com.vti.dulichviet_team_1.modal.entity.Type;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
@NoArgsConstructor
public class TourRequestUpdateDto {

    private int id;

    @NotBlank(message = " The title mustn't be null value")
    @Length(max = 100, message = "The title's length is max 100 characters")
    private String title;

//    @Pattern(regexp = "HOT_TOUR | TEAM_BUILDING | HOLIDAY | SHORT_TOUR")

    private Type type;

    @NotBlank(message = "The depart Mustn't be null value")

    private String depart;
    @NotBlank(message = "The arrival Mustn't be null value")

    private String arrival;
//    @NotBlank(message = "The duration mustn't be null value")

    private int duration;
//    @Pattern(regexp = "AIRPLANE | CAR | TRAIN ")

    private Transport transport;

    @NotBlank(message = "The content mustn't be null value")
    @Length(max = 200, message = "The content's length is max 100 characters")
    private String content;
    @NotBlank(message = "The image mustn't be null value")

    private String image;
//    @NotBlank(message = "The price mustn't be null value")

    private int price;

//    @Pattern(regexp = "AVAILABLE | UNAVAILABLE ")

    private TourStatus status;

    //    @NotBlank(message = "The number of people booking the tour cannot be left blank")
    private int maxGuestSize;

}
