import React from 'react';
import validate from "./validators/measurement-validators";
import Button from "react-bootstrap/Button";
import * as API_MEASUREMENTS from "../api/measurement-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';



class MeasurementForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,

            formControls: {
                id: {
                    value: '',
                    placeholder: 'id',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                },
                energyConsumption: {
                    value: '',
                    placeholder: 'energyConsumption',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                },
                timeofmeasure: {
                    value: '',
                    placeholder: 'timestamp...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                },
                dateofmeasure: {
                    value: '',
                    placeholder: 'date...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                }
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
        this.handleSubmitDelete = this.handleSubmitDelete.bind(this);
    }

    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }


    handleChange = event => {

        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = this.state.formControls;

        const updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);
        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let updatedFormElementName in updatedControls) {
            formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
        }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });

    };


    deleteMeasurement(id) {
        return API_MEASUREMENTS.deleteMeasurement(id.id, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted person with id: " + result);
                this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }
    updateMeasurement(measurement,id) {
        return API_MEASUREMENTS.updateMeasurement(id.id,measurement, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted person with id: " + result);
                this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }
    addMeasurement(measurement){
        return API_MEASUREMENTS.postMeasurement(measurement, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted person with id: " + result);
                this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }
    handleSubmit() {
        let measurement = {
            timeofmeasure: this.state.formControls.timeofmeasure.value,
            dateofmeasure: this.state.formControls.dateofmeasure.value,
            energyConsumption: this.state.formControls.energyConsumption.value
        };

        console.log(measurement);
        this.addMeasurement(measurement);
    }
    handleSubmitUpdate() {
        let measurement = {
            timestamp: this.state.formControls.timestamp.value,
            energyConsumption: this.state.formControls.energyConsumption.value
        };
        let id={
            id: this.state.formControls.id.value
        }
        console.log(measurement);
        this.updateMeasurement(measurement,id);
    }
    handleSubmitDelete() {

        let id={
            id: this.state.formControls.id.value
        }
        console.log(id);
        this.deleteMeasurement(id);
    }

    render() {
        return (
            <div>
                <FormGroup id='id'>
                    <Label for='idField'> ID: </Label>
                    <Input name='id' id='idField' placeholder={this.state.formControls.id.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.id.value}
                           touched={this.state.formControls.id.touched? 1 : 0}
                           valid={this.state.formControls.id.valid}
                           required
                    />
                </FormGroup>
                <FormGroup id='timeofmeasure'>
                    <Label for='timeofmeasureField'> timeofmeasure: </Label>
                    <Input name='timeofmeasure' id='timeofmeasureField' placeholder={this.state.formControls.timeofmeasure.placeholder}
                           type="time"
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.timeofmeasure.value}
                           touched={this.state.formControls.timeofmeasure.touched? 1 : 0}
                           valid={this.state.formControls.timeofmeasure.valid}
                           required
                    />
                </FormGroup>
                <FormGroup id='dateofmeasure'>
                    <Label for='dateofmeasureField'> dateofmeasure: </Label>
                    <Input name='dateofmeasure' id='dateofmeasureField' placeholder={this.state.formControls.dateofmeasure.placeholder}
                           type="date"
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.dateofmeasure.value}
                           touched={this.state.formControls.dateofmeasure.touched? 1 : 0}
                           valid={this.state.formControls.dateofmeasure.valid}
                           required
                    />
                </FormGroup>

                <FormGroup id='energyConsumption'>
                    <Label for='energyConsumptionField'> energy consumption: </Label>
                    <Input name='energyConsumption' id='energyConsumptionField' placeholder={this.state.formControls.energyConsumption.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.energyConsumption.value}
                           touched={this.state.formControls.energyConsumption.touched? 1 : 0}
                           valid={this.state.formControls.energyConsumption.valid}
                           required
                    />
                </FormGroup>


                    <Row>
                        <Col sm={{size: '4', offset: 8}}>
                            <Button type={"submit"} disabled={!this.state.formControls.timeofmeasure.valid || !this.state.formControls.dateofmeasure.valid  || !this.state.formControls.energyConsumption.valid} onClick={this.handleSubmit}>  Insert </Button>
                        </Col>
                        <Col sm={{size: '4', offset: 8}}>
                            <Button type={"submit"} disabled={!this.state.formIsValid} onClick={this.handleSubmitUpdate}> Update </Button>
                        </Col>
                        <Col sm={{size: '4', offset: 8}}>
                            <Button type={"submit"} disabled={!this.state.formControls.id.valid} onClick={this.handleSubmitDelete}> Delete </Button>
                        </Col>
                    </Row>

                {
                    this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                }
            </div>
        ) ;
    }
}

export default MeasurementForm;
