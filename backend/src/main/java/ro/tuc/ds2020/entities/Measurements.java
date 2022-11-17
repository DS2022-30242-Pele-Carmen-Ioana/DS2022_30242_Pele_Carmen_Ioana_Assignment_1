package ro.tuc.ds2020.entities;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Time;
import java.sql.Date;
import java.util.UUID;
@Getter
@Setter
@Entity
public class Measurements implements Serializable {
    //id timestamp, enegy consumption
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Type(type = "uuid-binary")
    private UUID id;

    @Column(name="timestamp", nullable = false)
    private Time timestamp;
    @Column(name="datem", nullable = false)
    private Date datem;

    @Column(name="energy_consumption", nullable = false)
    private int energyConsumption;

    @ManyToOne
    private Device device;

    public Measurements(){

    }
    public Measurements(Time timestamp,Date datem, int energyConsumption){
        this.timestamp=timestamp;
        this.datem=datem;
        this.energyConsumption=energyConsumption;
    }
}
