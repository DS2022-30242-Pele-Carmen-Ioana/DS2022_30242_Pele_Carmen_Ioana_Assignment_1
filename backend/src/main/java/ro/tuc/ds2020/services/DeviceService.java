package ro.tuc.ds2020.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.tuc.ds2020.controllers.handlers.exceptions.model.ResourceNotFoundException;
import ro.tuc.ds2020.dtos.DeviceDTO;
import ro.tuc.ds2020.dtos.MeasurementsDTO;
import ro.tuc.ds2020.dtos.builders.DeviceBuilder;
import ro.tuc.ds2020.dtos.mappers.DeviceMapper;
import ro.tuc.ds2020.dtos.mappers.MeasurementsMapper;
import ro.tuc.ds2020.entities.Device;
import ro.tuc.ds2020.entities.Measurements;
import ro.tuc.ds2020.repositories.DeviceRepository;
import ro.tuc.ds2020.repositories.MeasurementsRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
public class DeviceService {
    private static final Logger LOGGER= LoggerFactory.getLogger(DeviceService.class);
    private final DeviceRepository deviceRepository;
    private final DeviceMapper deviceMapper;
    private final MeasurementsRepository measurementsRepository;
    private final MeasurementsMapper measurementsMapper;


    @Autowired
    public DeviceService(DeviceRepository deviceRepository, MeasurementsRepository measurementsRepository, MeasurementsMapper measurementsMapper, DeviceMapper deviceMapper) {
        this.deviceRepository = deviceRepository;
        this.measurementsRepository = measurementsRepository;
        this.measurementsMapper = measurementsMapper;
        this.deviceMapper = deviceMapper;
    }

    public List<DeviceDTO> findDevices(){
        List<Device> deviceList=deviceRepository.findAll();
        return deviceList.stream()
                .map(deviceMapper::toDto)
                .collect(Collectors.toList());
    }
    public DeviceDTO findById(UUID id){
        Optional<Device> deviceOptional=deviceRepository.findById(id);
        if(!deviceOptional.isPresent()){
            LOGGER.error("Device with id {} was not found in db", id);
            throw new ResourceNotFoundException(Device.class.getSimpleName() + " with id: " + id);
        }
        return deviceMapper.toDto(deviceOptional.get());
    }
    @Transactional
    public UUID insert(DeviceDTO deviceDTO){
        Device device=deviceMapper.toEntity(deviceDTO);
        device=deviceRepository.save(device);
        LOGGER.debug("Device with id {} was inserted in db", device.getId());
        return device.getId();
    }
    @Transactional
    public UUID update(DeviceDTO deviceDTO,UUID id){
        Device device=deviceMapper.toEntity(deviceDTO);
        device.setId(id);
        device=deviceRepository.save(device);
        LOGGER.debug("Device with id {} was updated in db", device.getId());
        return device.getId();
    }
    @Transactional
    public void delete(UUID id){
        Optional<Device> device=deviceRepository.findById(id);
        if(device.isPresent()){
            LOGGER.debug("Device with id {} is deleted from db", device.get().getId());
            deviceRepository.delete(device.get());
        }

    }
    @Transactional
    public List<MeasurementsDTO> addMeasurement(UUID idDevice, UUID idMeasurement){
        Optional<Device> device=deviceRepository.findById(idDevice);
        Optional<Measurements> measurement=measurementsRepository.findById(idMeasurement);
        if(device.isPresent() && measurement.isPresent()){
            measurement.get().setDevice(device.get());
            device.get().addMeasurement(measurement.get());
        }

        return device.get().getMeasurements().stream().map(m->measurementsMapper.toDto(m)).collect(Collectors.toList());
    }
}
