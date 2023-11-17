package com.vti.dulichviet_team_1.service;


import com.vti.dulichviet_team_1.modal.dto.TourRequestCreateDto;
import com.vti.dulichviet_team_1.modal.dto.TourRequestUpdateDto;
import com.vti.dulichviet_team_1.modal.dto.ViewListRequestDto;
import com.vti.dulichviet_team_1.modal.entity.Tour;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ITourService {

    List<Tour> getAllTour();

    Tour createTour(TourRequestCreateDto tourRequestCreateDto);

    Tour updateTour(TourRequestUpdateDto tourRequestUpdateDto);

    void deleteTour(int id);

    Tour viewDetailTour(int id);

    Page<Tour> viewListTour(ViewListRequestDto viewListRequestDto);


}
