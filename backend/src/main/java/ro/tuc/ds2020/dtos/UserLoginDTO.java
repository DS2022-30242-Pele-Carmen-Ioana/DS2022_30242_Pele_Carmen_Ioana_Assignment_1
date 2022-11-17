package ro.tuc.ds2020.dtos;

import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Getter
@Setter
public class UserLoginDTO {
    private String username;
    private String password;
    public UserLoginDTO(){

    }
    public UserLoginDTO(String username, String password){
        this.username=username;
        this.password=password;
    }
    @Override
    public boolean equals(Object o){
        if (this == o) return true;
        if (o==null || getClass()!=o.getClass()) return false;
        UserLoginDTO userLoginDTO=(UserLoginDTO) o;
        return (Objects.equals(username, userLoginDTO.username)  && Objects.equals(password, userLoginDTO.password));
    }
    @Override
    public int hashCode(){return Objects.hash(username,password);}
}
