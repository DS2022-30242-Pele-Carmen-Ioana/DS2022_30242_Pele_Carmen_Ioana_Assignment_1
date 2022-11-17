package ro.tuc.ds2020.dtos.mappers;

import org.mapstruct.Mapper;
import ro.tuc.ds2020.dtos.MeasurementsDTO;
import ro.tuc.ds2020.entities.Measurements;

@Mapper(componentModel = "spring")
public interface MeasurementsMapper {
    MeasurementsDTO toDto(Measurements measurements);
    Measurements toEntity(MeasurementsDTO measurementsDTO);
}
