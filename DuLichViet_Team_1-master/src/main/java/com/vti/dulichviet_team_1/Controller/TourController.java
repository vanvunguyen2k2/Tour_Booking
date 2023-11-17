package com.vti.dulichviet_team_1.controller;


import com.vti.dulichviet_team_1.repository.TourRepository;
import com.vti.dulichviet_team_1.service.TourService;
import com.vti.dulichviet_team_1.modal.dto.TourRequestCreateDto;
import com.vti.dulichviet_team_1.modal.dto.TourRequestUpdateDto;
import com.vti.dulichviet_team_1.modal.dto.ViewListRequestDto;
import com.vti.dulichviet_team_1.modal.entity.Tour;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/tour")
@CrossOrigin("*")
@Validated
public class TourController {

    @Autowired
    private TourService tourService;

    @Autowired
    private TourRepository tourRepository;


    @GetMapping("/getAll")
    public List<Tour> getAll() {
        return tourService.getAllTour();
    }

    @PostMapping("/create_tour")
    public Tour createTour(@RequestBody @Valid TourRequestCreateDto tourRequestCreateDto) {
        return tourService.createTour(tourRequestCreateDto);
    }

    @PutMapping("/update_tour")
    public Tour updateTour(@RequestBody @Valid TourRequestUpdateDto tourRequestUpdateDto) {
        return tourService.updateTour(tourRequestUpdateDto);
    }

    @DeleteMapping("/delete_tour/{id}")
    public void deleteTour(@PathVariable(name = "id") int id) {
        tourService.deleteTour(id);
    }

    @GetMapping("/viewdetail/{id}")
    public Tour viewDetailTour(@PathVariable(name = "id") int id) {
        Optional<Tour> optionalTour = tourRepository.findById(id);
        if (optionalTour.isPresent()) {
            return tourService.viewDetailTour(id);

        } else {
            return null;
        }
    }

    @PostMapping("/view_list_tour")
    public Page<Tour> viewListTour(@RequestBody ViewListRequestDto viewListRequestDto) {
        return tourService.viewListTour(viewListRequestDto);
    }

}
