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
public class Device implements Serializable {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Type(type = "uuid-binary")
    private UUID id;
    @Column(name="named", nullable = false)
    private String named;
    @Column(name="description", nullable = false)
    private String description;

    @Column(name="location", nullable = false)
    private String location;

    @Column(name="hourly_consumption", nullable = false)
    private int consumption;

    @ManyToOne
    private Users users;

    @OneToMany(mappedBy = "device", orphanRemoval = true)
    List<Measurements> measurements=new ArrayList<>();

    public Device(){

    }
    public Device(String named,String description, String location, int consumption){
        this.named=named;
        this.description=description;
        this.location=location;
        this.consumption=consumption;
        measurements=new ArrayList<>();
    }
    public void addMeasurement(Measurements measurement){
        measurements.add(measurement);
    }
}
