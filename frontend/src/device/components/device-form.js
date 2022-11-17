import React from 'react';
import validate from "./validators/device-validators";
import Button from "react-bootstrap/Button";
import * as API_DEVICES from "../api/device-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, FormGroup, Input, Label, Row} from "reactstrap";


class DeviceForm extends React.Component {

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
                description: {
                    value: '',
                    placeholder: 'description',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                },
                address: {
                    value: '',
                    placeholder: 'address...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                },
                consumption: {
                    value: '',
                    placeholder: 'Age...',
                    valid: false,
                    touched: false,
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

    deleteDevice(id) {
        return API_DEVICES.deleteDevice(id.id, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted person with id: " + result);
                this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
                alert(error);
            }
        });
    }
    updateDevice(device,id) {
        return API_DEVICES.updateDevice(id.id,device, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted person with id: " + result);
                this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
                alert(error);
            }
        });
    }
   addDevice(device) {
        return API_DEVICES.addDevice(device, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted person with id: " + result);
                this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
                alert(error);
            }
        });
    }
    handleSubmit() {
        let device = {
            description: this.state.formControls.description.value,
            address: this.state.formControls.address.value,
            consumption: this.state.formControls.consumption.value
        };

        console.log(device);
        this.addDevice(device);
    }
    handleSubmitUpdate() {
        let device = {
            description: this.state.formControls.description.value,
            address: this.state.formControls.address.value,
            consumption: this.state.formControls.consumption.value
        };
        let id={
            id: this.state.formControls.id.value
        }
        console.log(device);
        this.updateDevice(device,id);
    }
    handleSubmitDelete() {

        let id={
            id: this.state.formControls.id.value
        }
        console.log(id);
        this.deleteDevice(id);
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
                <FormGroup id='description'>
                    <Label for='descriptionField'> Name: </Label>
                    <Input name='description' id='descriptionField' placeholder={this.state.formControls.description.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.description.value}
                           touched={this.state.formControls.description.touched? 1 : 0}
                           valid={this.state.formControls.description.valid}
                           required
                    />
                    {this.state.formControls.description.touched && !this.state.formControls.description.valid &&
                    <div className={"error-message row"}> * Name must have at least 3 characters </div>}
                </FormGroup>

                <FormGroup id='address'>
                    <Label for='addressField'> Address: </Label>
                    <Input name='address' id='addressField' placeholder={this.state.formControls.address.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.address.value}
                           touched={this.state.formControls.address.touched? 1 : 0}
                           valid={this.state.formControls.address.valid}
                           required
                    />
                </FormGroup>
                <FormGroup id='consumption'>
                    <Label for='consumptionField'> Role: </Label>
                    <Input name='consumption' id='consumptionField' placeholder={this.state.formControls.consumption.placeholder}
                           min={0} max={100} type="number"
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.consumption.value}
                           touched={this.state.formControls.consumption.touched? 1 : 0}
                           valid={this.state.formControls.consumption.valid}
                           required
                    />
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

export default DeviceForm;
