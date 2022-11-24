package ro.tuc.ds2020.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.tuc.ds2020.dtos.MeasurementChartDTO;
import ro.tuc.ds2020.dtos.MeasurementsDTO;
import ro.tuc.ds2020.dtos.DataChartDTO;
import ro.tuc.ds2020.services.MeasurementsService;

import javax.validation.Valid;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping(value = "/measurements")
public class MeasurementsController {
    private final MeasurementsService measurementsService;
    @Autowired
    public MeasurementsController(MeasurementsService measurementsService) {
        this.measurementsService = measurementsService;
    }
    @GetMapping()
    public ResponseEntity<List<MeasurementsDTO>> getMeasurementss(){
        List<MeasurementsDTO> measurementss= measurementsService.findMeasurements();
        return new ResponseEntity<>(measurementss, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getMeasurements(@PathVariable UUID id){
        MeasurementsDTO dto=measurementsService.findById(id);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
    @PostMapping()
    public ResponseEntity<UUID> insertMeasurements(@Valid @RequestBody MeasurementsDTO measurementsDTO) {
        UUID id = measurementsService.insert(measurementsDTO);
        return new ResponseEntity<>(id, HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateMeasurements(@RequestBody MeasurementsDTO measurementsDTO,@PathVariable UUID id){
        UUID idR=measurementsService.update(measurementsDTO,id);
        return new ResponseEntity<>(idR, HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMeasurements(@PathVariable UUID id){
        measurementsService.delete(id);
        return new ResponseEntity<>(id,HttpStatus.OK);
    }

    @GetMapping("/chartm/{idU}/{date}")
    public ResponseEntity<?> getMeasurementsForChart(@PathVariable UUID idU,@PathVariable String date){
        Date dateL=Date.valueOf(date);
        List<MeasurementChartDTO> measurements=measurementsService.measurementsForChart(idU,dateL);
        DataChartDTO dataChartDTO= new DataChartDTO();
        List res=measurements.stream().map(MeasurementChartDTO::getSumOfConsumptions).collect(Collectors.toList());
        List resu=new ArrayList<>();
        List headers=new ArrayList<>();
        headers.add("Device");
        headers.add("Consumption");
        resu.add(headers);
        res.forEach(r->resu.add(r));
        dataChartDTO.setListData(resu);
        return new ResponseEntity<>(dataChartDTO, HttpStatus.OK);
    }
}
