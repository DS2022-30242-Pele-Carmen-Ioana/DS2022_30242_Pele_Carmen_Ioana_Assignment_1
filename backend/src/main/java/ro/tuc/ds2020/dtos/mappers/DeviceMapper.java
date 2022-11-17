package ro.tuc.ds2020.dtos.mappers;

import org.mapstruct.Mapper;
import ro.tuc.ds2020.dtos.DeviceDTO;
import ro.tuc.ds2020.entities.Device;

@Mapper(componentModel = "spring")
public interface DeviceMapper {
    DeviceDTO toDto(Device device);
    Device toEntity(DeviceDTO deviceDTO);
}
