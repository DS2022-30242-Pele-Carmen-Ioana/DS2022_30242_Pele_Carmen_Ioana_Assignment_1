package ro.tuc.ds2020.dtos;

import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;

import java.util.Objects;
import java.util.UUID;
@Getter
@Setter
public class DeviceDTO extends RepresentationModel<DeviceDTO> {
    private UUID id;
    private String named;
    private String description;
    private String location;
    private int consumption;

    public DeviceDTO(){

    }
    public DeviceDTO(UUID id,String named, String description, String location, int consumption){
        this.id=id;
        this.named=named;
        this.description=description;
        this.location=location;
        this.consumption=consumption;
    }

    @Override
    public boolean equals(Object o){
        if (this == o) return true;
        if (o==null || getClass()!=o.getClass()) return false;
        DeviceDTO deviceDTO=(DeviceDTO) o;
        return (Objects.equals(description, deviceDTO.description) && Objects.equals(location, deviceDTO.location) && Objects.equals(consumption, deviceDTO.consumption));
    }
    @Override
    public int hashCode(){return Objects.hash(id, description);}
}
