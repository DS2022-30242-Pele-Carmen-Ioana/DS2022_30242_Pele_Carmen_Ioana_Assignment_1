package ro.tuc.ds2020.dtos.mappers;

import org.mapstruct.Mapper;
import ro.tuc.ds2020.dtos.UserDTO;
import ro.tuc.ds2020.entities.Users;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDTO toDto(Users user);
    Users toEntity(UserDTO userDTO);

}
