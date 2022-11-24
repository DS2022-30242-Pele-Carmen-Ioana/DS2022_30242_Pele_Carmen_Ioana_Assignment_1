package ro.tuc.ds2020.dtos.builders;

import ro.tuc.ds2020.dtos.UserDTO;
import ro.tuc.ds2020.entities.Users;

public class UserBuilder {
    public UserBuilder(){

    }
    public static UserDTO toUserDTO(Users users){
        return new UserDTO(users.getId(), users.getFirstname(), users.getLastname(), users.getAddress(), users.getAge(), users.getRole(), users.getPassword(), users.getUsername());
    }
    public static Users toEntity(UserDTO userDTO){
        return new Users(userDTO.getFirstname(),userDTO.getLastname(), userDTO.getRole(), userDTO.getAddress(), userDTO.getAge());
    }
}
