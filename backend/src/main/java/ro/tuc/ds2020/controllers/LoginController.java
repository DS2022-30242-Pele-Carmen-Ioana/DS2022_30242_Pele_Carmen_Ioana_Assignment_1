package ro.tuc.ds2020.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.tuc.ds2020.dtos.UserLoginDTO;
import ro.tuc.ds2020.dtos.UserSessionDTO;
import ro.tuc.ds2020.services.LoginService;

@RestController
@CrossOrigin
@RequestMapping(value = "/login")
public class LoginController {
    private final LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }
    @PostMapping()
    public ResponseEntity<?> login(@RequestBody UserLoginDTO userLoginDTO){
        UserSessionDTO userSessionDTO=loginService.login(userLoginDTO);
        return new ResponseEntity<>(userSessionDTO, HttpStatus.OK);
    }
}
