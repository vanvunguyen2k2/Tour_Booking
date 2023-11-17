package com.vti.dulichviet_team_1.modal.dto;

import com.vti.dulichviet_team_1.request.BaseRequest;
import lombok.Data;

@Data
public class AccountSearchRequest extends BaseRequest {
  private String username;
  private String fullName;
  private String email;
}
