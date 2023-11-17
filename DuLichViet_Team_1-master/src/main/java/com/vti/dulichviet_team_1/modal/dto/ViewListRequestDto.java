package com.vti.dulichviet_team_1.modal.dto;


import com.vti.dulichviet_team_1.modal.entity.TourStatus;
import com.vti.dulichviet_team_1.modal.entity.Transport;
import com.vti.dulichviet_team_1.modal.entity.Type;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
public class ViewListRequestDto extends BaseResquestViewList {

    private String title;
    private String depart;
    private String arrival;
    private int duration;
    private Set<Transport> transport;
    private String content;
    private Set<Type> type;

    //    TẠO RA 2 GIÁ TRỊ PRICE ĐỂ LẤY RA GIÁ TRỊ GIỮA CHÚNG
    private int minPrice;
    private int maxPrice;

    private Set<TourStatus> status;

}
