package com.vti.dulichviet_team_1.request;

import lombok.Data;

@Data
public class BaseRequest {

    protected int page;

    protected int size;

    protected String sortField;

    protected String sortType;

}
