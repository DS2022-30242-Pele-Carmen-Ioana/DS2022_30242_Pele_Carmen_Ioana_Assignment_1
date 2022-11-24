package ro.tuc.ds2020.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ro.tuc.ds2020.entities.Device;
import ro.tuc.ds2020.entities.Measurements;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MeasurementChartDTO {
    private Device device;
    private Date dateOfMeasure;
    private List<Measurements> measurementsList=new ArrayList<>();

    public List getSumOfConsumptions(){
       List result=new ArrayList<>();
        AtomicInteger sum = new AtomicInteger();
        measurementsList.forEach(m->{
            sum.addAndGet(m.getEnergyConsumption());
        });
        result.add(device.getNamed());
        result.add(sum.get());
        return result ;
    }

}
