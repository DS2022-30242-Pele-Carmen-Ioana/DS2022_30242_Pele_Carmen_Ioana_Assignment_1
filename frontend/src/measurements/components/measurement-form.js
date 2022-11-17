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
                timestamp: {
                    value: '',
                    placeholder: 'timestamp...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                },
                datem: {
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
    handleSubmit() {
        let measurement = {
            timestamp: this.state.formControls.timestamp.value,
            energyConsumption: this.state.formControls.energyConsumption.value
        };

        console.log(measurement);
        this.registerMeasurement(measurement);
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
                    {this.state.formControls.id.touched && !this.state.formControls.id.valid &&
                        <div className={"error-message row"}> * Name must have at least 3 characters </div>}
                </FormGroup>
                <FormGroup id='timestamp'>
                    <Label for='timestampField'> Name: </Label>
                    <Input name='timestamp' id='timestampField' placeholder={this.state.formControls.timestamp.placeholder}
                           type="time"
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.timestamp.value}
                           touched={this.state.formControls.timestamp.touched? 1 : 0}
                           valid={this.state.formControls.timestamp.valid}
                           required
                    />
                    {this.state.formControls.timestamp.touched && !this.state.formControls.timestamp.valid &&
                    <div className={"error-message row"}> * Name must have at least 3 characters </div>}
                </FormGroup>
                <FormGroup id='datem'>
                    <Label for='datemField'> Name: </Label>
                    <Input name='datem' id='datemField' placeholder={this.state.formControls.datem.placeholder}
                           type="date"
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.datem.value}
                           touched={this.state.formControls.datem.touched? 1 : 0}
                           valid={this.state.formControls.datem.valid}
                           required
                    />
                    {this.state.formControls.datem.touched && !this.state.formControls.datem.valid &&
                        <div className={"error-message row"}> * Name must have at least 3 characters </div>}
                </FormGroup>

                <FormGroup id='energyConsumption'>
                    <Label for='energyConsumptionField'> Username: </Label>
                    <Input name='energyConsumption' id='energyConsumptionField' placeholder={this.state.formControls.energyConsumption.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.energyConsumption.value}
                           touched={this.state.formControls.energyConsumption.touched? 1 : 0}
                           valid={this.state.formControls.energyConsumption.valid}
                           required
                    />
                    {this.state.formControls.energyConsumption.touched && !this.state.formControls.energyConsumption.valid &&
                    <div className={"error-message"}> Username incorrect</div>}
                </FormGroup>


                    <Row>
                        <Col sm={{size: '4', offset: 8}}>
                            <Button type={"submit"} disabled={!this.state.formIsValid} onClick={this.handleSubmit}>  Insert </Button>
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
