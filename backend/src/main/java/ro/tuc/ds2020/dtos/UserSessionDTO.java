package ro.tuc.ds2020.dtos;

import lombok.Getter;
import lombok.Setter;

import java.util.Objects;
import java.util.UUID;

@Getter
@Setter
public class UserSessionDTO {
    private UUID id;
    private String role;
    public UserSessionDTO(){

    }
    public UserSessionDTO(UUID id, String role){
        this.id=id;
        this.role=role;
    }
    @Override
    public boolean equals(Object o){
        if (this == o) return true;
        if (o==null || getClass()!=o.getClass()) return false;
        UserSessionDTO userDTO=(UserSessionDTO) o;
        return (Objects.equals(id, userDTO.id) && Objects.equals(role, userDTO.role));
    }
    @Override
    public int hashCode(){return Objects.hash(id, role);}
}
