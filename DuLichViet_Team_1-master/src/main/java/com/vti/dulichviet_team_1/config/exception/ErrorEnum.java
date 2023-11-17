package com.vti.dulichviet_team_1.config.exception;

public enum ErrorEnum {

    NOT_FOUND_USER(404, "Không tìm thấy người dùng"),
    NOT_MATCH_PASS(404, "Sai mật khẩu"),

    NOT_FOUND_USERNAME(404, "Không tìm thấy username người dùng");
    public final int status;
    public final String message;

    ErrorEnum(int status, String message) {
        this.status = status;
        this.message = message;
    }

}
