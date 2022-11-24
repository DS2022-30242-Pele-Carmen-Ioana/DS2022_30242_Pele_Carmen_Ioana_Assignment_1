package ro.tuc.ds2020.dtos;

import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.util.Objects;
import java.util.UUID;
@Getter
@Setter
public class MeasurementsDTO extends RepresentationModel<MeasurementsDTO> {
    private UUID id;
    private Time timeofmeasure;
    private Date dateofmeasure;
    private int energyConsumption;

    public MeasurementsDTO(){

    }
    public MeasurementsDTO(UUID id, Time timeofmeasure, Date dateofmeasure,int energyConsumption){
        this.id=id;
        this.timeofmeasure=timeofmeasure;
        this.dateofmeasure=dateofmeasure;
        this.energyConsumption=energyConsumption;
    }
    @Override
    public boolean equals(Object o){
        if (this == o) return true;
        if (o==null || getClass()!=o.getClass()) return false;
        MeasurementsDTO measurements=(MeasurementsDTO) o;
        return (Objects.equals(timeofmeasure,measurements.timeofmeasure) && Objects.equals(dateofmeasure,measurements.dateofmeasure) && Objects.equals(energyConsumption, measurements.energyConsumption) );
    }
    @Override
    public int hashCode(){return Objects.hash(id,dateofmeasure,timeofmeasure, energyConsumption);}
}
