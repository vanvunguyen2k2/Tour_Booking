package com.vti.dulichviet_team_1.Controller.Login;

import com.vti.dulichviet_team_1.config.exception.AppException;
import com.vti.dulichviet_team_1.config.exception.ErrorEnum;
import com.vti.dulichviet_team_1.repository.IAccountRepository;
import com.vti.dulichviet_team_1.modal.dto.LoginDto;
import com.vti.dulichviet_team_1.modal.entity.Account;
import com.vti.dulichviet_team_1.request.LoginRequest;
import com.vti.dulichviet_team_1.utils.JWTokenUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("api/v1/login")
public class AuthController {

    @Autowired
    private IAccountRepository accountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTokenUtils jwTokenUtils;


    @Autowired
    private HttpServletRequest httpServletRequest;

    @PostMapping("/login-jwt")
    public LoginDto loginDto (@RequestBody LoginRequest loginRequest) {

        Optional<Account> optionalAccount = accountRepository.findAccountByUsername(loginRequest.getUsername());

        if (optionalAccount.isEmpty()) {

            throw new AppException(ErrorEnum.NOT_FOUND_USERNAME);
        }

       Account account = optionalAccount.get();

        System.out.println(account);

//        SO SANH PASSWORD MA NGUOI DUNG NHAP VAO SO VOI PASSWORD CO TRONG DATEBASE

        boolean checkPassword = passwordEncoder.matches(loginRequest.getPassword(), account.getPassword());
        if (!checkPassword) {
            throw  new AppException(ErrorEnum.NOT_MATCH_PASS);

        }

        System.out.println(account);

//         CÒN NẾU MÀ USERNAME VÀ PASSOWORD OK THÌ SẼ TẠO RA MỘT ĐỐI TƯỢNG LOGINDTO MỚI

//        SANG CLASS LOGINDTO ĐỂ XEM CÁC THUỘC TÍNH
        LoginDto loginDto = new LoginDto();

        System.out.println(loginDto);

        BeanUtils.copyProperties(account, loginDto);

        System.out.println(loginDto);

        loginDto.setUserAgent(httpServletRequest.getHeader("User-Agent"));

        String token = jwTokenUtils.createAccessToken(loginDto);
        System.out.println(token);
        loginDto.setToken(token);
        return loginDto;



    }

}
