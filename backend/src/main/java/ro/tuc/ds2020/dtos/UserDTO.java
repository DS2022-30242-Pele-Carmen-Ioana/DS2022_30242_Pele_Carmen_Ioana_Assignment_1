package ro.tuc.ds2020.dtos;

import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;

import java.util.Objects;
import java.util.UUID;

@Getter
@Setter
public class UserDTO extends RepresentationModel<UserDTO> {
    private UUID id;
    private String firstname;
    private String lastname;
    private String password;
    private String username;
    private String address;
    private int age;
    private String role;

    public UserDTO(){

    }
    public UserDTO(UUID id, String firstname, String lastname, String address, int age, String role,String password,String username){
        this.id=id;
        this.firstname=firstname;
        this.lastname=lastname;
        this.address=address;
        this.age=age;
        this.role=role;
        this.password=password;
        this.username=username;
    }
    @Override
    public boolean equals(Object o){
        if (this == o) return true;
        if (o==null || getClass()!=o.getClass()) return false;
        UserDTO userDTO=(UserDTO) o;
        return (Objects.equals(firstname, userDTO.firstname) && Objects.equals(lastname, userDTO.lastname) && Objects.equals(address, userDTO.address) && Objects.equals(age, userDTO.age) && Objects.equals(role, userDTO.role));
    }
    @Override
    public int hashCode(){return Objects.hash(id, firstname, lastname);}

}
