package com.vti.dulichviet_team_1.modal.dto;


import lombok.Data;

@Data
public class BaseResquestViewList {

    private int page;
    private int page_size;
    private String sortField;
    private String sortType;

}
