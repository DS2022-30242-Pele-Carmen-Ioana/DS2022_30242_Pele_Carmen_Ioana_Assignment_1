package ro.tuc.ds2020.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.tuc.ds2020.controllers.handlers.exceptions.model.ResourceNotFoundException;
import ro.tuc.ds2020.dtos.DeviceDTO;
import ro.tuc.ds2020.dtos.UserDTO;
import ro.tuc.ds2020.dtos.builders.UserBuilder;
import ro.tuc.ds2020.dtos.mappers.DeviceMapper;
import ro.tuc.ds2020.dtos.mappers.UserMapper;
import ro.tuc.ds2020.entities.Device;
import ro.tuc.ds2020.entities.Users;
import ro.tuc.ds2020.repositories.DeviceRepository;
import ro.tuc.ds2020.repositories.UserRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService {
    private static final Logger LOGGER= LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;
    private final DeviceRepository deviceRepository;
    private final DeviceMapper deviceMapper;
    private final UserMapper userMapper;
    @Autowired
    public UserService(UserRepository userRepository, DeviceRepository deviceRepository, DeviceMapper deviceMapper, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.deviceRepository = deviceRepository;
        this.deviceMapper = deviceMapper;
        this.userMapper = userMapper;
    }
    public List<UserDTO> findUsers(){
        List<Users> users =userRepository.findAll();
        return users.stream().map(userMapper::toDto).collect(Collectors.toList());
    }
    public UserDTO findById(UUID id){
        Optional<Users> userOptional=userRepository.findById(id);
        if(!userOptional.isPresent()){
            LOGGER.error("User with id {} was not found in db", id);
            throw new ResourceNotFoundException(Users.class.getSimpleName() + " with id: " + id);
        }
        return userMapper.toDto(userOptional.get());
    }
    @Transactional
    public UUID insert(UserDTO userDTO){
        Users users =userMapper.toEntity(userDTO);
        users =userRepository.save(users);
        LOGGER.debug("User with id {} was inserted in db", users.getId());
        return users.getId();
    }
    @Transactional
    public UUID update(UserDTO userDTO,UUID id){
        Users users =userMapper.toEntity(userDTO);
        users.setId(id);
        users =userRepository.save(users);
        LOGGER.debug("User with id {} was updated in db", users.getId());
        return users.getId();
    }
    @Transactional
    public void delete(UUID id) {
        Optional<Users> user = userRepository.findById(id);
        if (user.isPresent()) {
            LOGGER.debug("User with id {} is deleted from db", user.get().getId());
            userRepository.delete(user.get());
        }
    }
    @Transactional
    public List<DeviceDTO> addDevice(UUID idUser, UUID idDevice){
        Optional<Device> device=deviceRepository.findById(idDevice);
        Optional<Users> user=userRepository.findById(idUser);
        if(user.isPresent() && device.isPresent()){
            device.get().setUsers(user.get());
            user.get().addDevice(device.get());
        }
        return user.get().getDevices().stream().map(d->deviceMapper.toDto(d)).collect(Collectors.toList());
    }
    @Transactional
    public List<DeviceDTO> getMyDevices(UUID idUser){
        Optional<Users> user=userRepository.findById(idUser);

        return user.get().getDevices().stream().map(d->deviceMapper.toDto(d)).collect(Collectors.toList());
    }
//    @Transactional
//    public UserDTO register(UserDTO userDTO) {
//        byte[] bytes = userDTO.getPassword().getBytes();
//        String encoded = String.valueOf(Hex.encode(bytes));
//        userDTO.setPassword(encoded);
//        Users user = userMapper.toEntity(userDTO);
//
//        Users userFromDatabase = userRepository.save(user);
//        return userMapper.toDto(userFromDatabase);
//    }
//    @Transactional
//    public String login(String username, String password) {
//        Users user = null;
//        if (userRepository.getUsersByUsername(username) != null) {
//            user = userRepository.getUsersByUsername(username);
//        }
//        byte[] bytes = password.getBytes();
//        String encoded = String.valueOf(Hex.encode(bytes));
//        if (user == null || !encoded.equals(user.getPassword()) ) {
//            throw new UnauthorizedException("Email or password invalid");
//        }
//        return JwtUtils.generateToken(user.getId(), user.getUsername(), user.getRole());
//    }
}
