package ro.tuc.ds2020.entities;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
@Getter
@Setter
@Entity
public class Users implements Serializable {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Type(type = "uuid-binary")
    private UUID id;
    //id, name, role:admin/client

    @Column(name="firstname", nullable = false)
    private String firstname;
    @Column(name="lastname", nullable = false)
    private String lastname;
    @Column(name="username", nullable = false, unique = true)
    private String username;
    @Column(name="password", nullable = false)
    private String password;

    @Column(name="role", nullable = false)
    private String role;
    @Column(name="address", nullable = false)
    private String address;
    @Column(name="age", nullable = false)
    private int age;

   @OneToMany(mappedBy = "users", orphanRemoval = true)
   private List<Device> devices=new ArrayList<>();

    public Users(){

    }
    public Users(String firstname,String lastname, String role, String address, int age){
        this.firstname=firstname;
        this.lastname=lastname;
        this.role=role;
        this.address=address;
        this.age=age;
        this.devices=new ArrayList<>();
    }
    public void addDevice(Device device){
        devices.add(device);
    }
    public List<Device> getMYDevices(){
        return this.devices;
    }


}
