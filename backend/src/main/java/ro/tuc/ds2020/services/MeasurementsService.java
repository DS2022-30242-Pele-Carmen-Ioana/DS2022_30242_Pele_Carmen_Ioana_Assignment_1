package ro.tuc.ds2020.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.tuc.ds2020.controllers.handlers.exceptions.model.ResourceNotFoundException;
import ro.tuc.ds2020.dtos.MeasurementChartDTO;
import ro.tuc.ds2020.dtos.MeasurementsDTO;
import ro.tuc.ds2020.dtos.mappers.DeviceMapper;
import ro.tuc.ds2020.dtos.mappers.MeasurementsMapper;
import ro.tuc.ds2020.dtos.mappers.UserMapper;
import ro.tuc.ds2020.dtos.DataChartDTO;
import ro.tuc.ds2020.entities.Device;
import ro.tuc.ds2020.entities.Measurements;
import ro.tuc.ds2020.entities.Users;
import ro.tuc.ds2020.repositories.DeviceRepository;
import ro.tuc.ds2020.repositories.MeasurementsRepository;
import ro.tuc.ds2020.repositories.UserRepository;

import javax.transaction.Transactional;
import java.sql.Date;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class MeasurementsService {
    private static final Logger LOGGER= LoggerFactory.getLogger(MeasurementsService.class);
    private final MeasurementsMapper measurementsMapper;
    private final MeasurementsRepository measurementsRepository;
    private final UserRepository userRepository;
    private final DeviceRepository deviceRepository;
    private final DeviceMapper deviceMapper;
    private final UserMapper userMapper;
    @Autowired
    public MeasurementsService(MeasurementsMapper measurementsMapper, MeasurementsRepository measurementsRepository, UserRepository userRepository, DeviceRepository deviceRepository, DeviceMapper deviceMapper, UserMapper userMapper) {
        this.measurementsMapper = measurementsMapper;
        this.measurementsRepository = measurementsRepository;
        this.userRepository = userRepository;
        this.deviceRepository = deviceRepository;
        this.deviceMapper = deviceMapper;
        this.userMapper = userMapper;
    }
    public List<MeasurementsDTO> findMeasurements(){
        List<Measurements> measurements=measurementsRepository.findAll();
        return measurements.stream().map(measurementsMapper::toDto).collect(Collectors.toList());
    }
    public MeasurementsDTO findById(UUID id){
        Optional<Measurements> measurementsOptional=measurementsRepository.findById(id);
        if(!measurementsOptional.isPresent()){
            LOGGER.error("Measurement with id {} was not found in db", id);
            throw new ResourceNotFoundException(Measurements.class.getSimpleName() + " with id: " + id);
        }
        return measurementsMapper.toDto(measurementsOptional.get());
    }
    @Transactional
    public UUID insert(MeasurementsDTO measurementsDTO){
        Measurements measurements=measurementsMapper.toEntity(measurementsDTO);
        measurements=measurementsRepository.save(measurements);
        LOGGER.debug("Measurement with id {} was inserted in db", measurements.getId());
        return measurements.getId();
    }
    @Transactional
    public UUID update(MeasurementsDTO measurementsDTO, UUID id){
        Measurements measurements=measurementsMapper.toEntity(measurementsDTO);
        measurements.setId(id);
        measurements=measurementsRepository.save(measurements);
        LOGGER.debug("Measurement with id {} was updated in db", measurements.getId());
        return measurements.getId();
    }
    @Transactional
    public void delete(UUID id){
        Optional<Measurements> measurements=measurementsRepository.findById(id);
        if(measurements.isPresent()){
            LOGGER.debug("Measurement with id {} is deleted from db", measurements.get().getId());
            measurementsRepository.delete(measurements.get());
        }
    }

    @Transactional
    public List<MeasurementChartDTO> measurementsForChart(UUID idUser, Date dateWanted){
        List<MeasurementChartDTO> measurementChartList=new ArrayList<>();

        Optional<Users> user=userRepository.findById(idUser);
        List<Device> myDevices= user.get().getDevices();

        myDevices.forEach(d->{
            MeasurementChartDTO measurement=new MeasurementChartDTO();
            measurement.setDevice(d);
            measurement.setDateOfMeasure(dateWanted);
            List<Measurements> measurementsForGivenDate=new ArrayList<>();
            d.getMeasurements().forEach(dm->{
                if(dm.getDateofmeasure().equals(dateWanted)){
                    measurementsForGivenDate.add(dm);
                }
            });
            measurement.setMeasurementsList(measurementsForGivenDate);
            measurementChartList.add(measurement);
        });

        return measurementChartList;
    }

}
