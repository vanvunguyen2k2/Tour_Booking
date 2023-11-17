package com.vti.dulichviet_team_1.request;

import com.vti.dulichviet_team_1.modal.entity.AccountStatus;
import com.vti.dulichviet_team_1.modal.entity.Role;
import lombok.Data;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data
public class AccountUpdateRq {


    private String email;
    private String username;
    private String fullName;
    private String phone;
    private String address;
    private String password;
    @Enumerated(value = EnumType.STRING)
    private Role role;
    @Enumerated(value = EnumType.STRING)
    private AccountStatus status;
}
