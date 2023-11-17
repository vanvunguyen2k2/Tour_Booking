package com.vti.dulichviet_team_1.modal.dto;


import com.vti.dulichviet_team_1.modal.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginDto {
    private int id;
    private String username;
    private Role role;
    private String fullName;
    private String userAgent;

//    CHÍNH LÀ MÃ TOKEN ĐƯỢC SINH RA KHI ĐĂNG KÝ
    private String token;

}
