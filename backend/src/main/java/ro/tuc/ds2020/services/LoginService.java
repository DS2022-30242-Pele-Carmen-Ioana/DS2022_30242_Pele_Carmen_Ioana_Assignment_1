package ro.tuc.ds2020.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ro.tuc.ds2020.dtos.UserDTO;
import ro.tuc.ds2020.dtos.UserLoginDTO;
import ro.tuc.ds2020.dtos.UserSessionDTO;
import ro.tuc.ds2020.dtos.mappers.UserMapper;
import ro.tuc.ds2020.entities.Users;
import ro.tuc.ds2020.exception.UnauthorizedException;
import ro.tuc.ds2020.repositories.UserRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class LoginService {
    private static final Logger LOGGER= LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public LoginService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }


    @Transactional
    public UserSessionDTO login(UserLoginDTO userLoginDTO) {
        Users user = null;
        if (userRepository.getUsersByUsername(userLoginDTO.getUsername()) != null) {
            user = userRepository.getUsersByUsername(userLoginDTO.getUsername());
        }
        if (user == null || !userLoginDTO.getPassword().equals(user.getPassword()) ) {
            throw new UnauthorizedException("Email or password invalid");
        }
        UserSessionDTO userSessionDTO=new UserSessionDTO();
        userSessionDTO.setId(user.getId());
        userSessionDTO.setRole(user.getRole());
        return userSessionDTO;
    }
}
