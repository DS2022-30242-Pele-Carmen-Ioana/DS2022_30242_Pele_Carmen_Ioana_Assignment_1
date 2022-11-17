import React from 'react';
import validate from "./validators/user-validators";
import Button from "react-bootstrap/Button";
import * as API_USERS from "../api/user-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';



class UserForm extends React.Component {

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
                name: {
                    value: '',
                    placeholder: 'What is your name?...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                username: {
                    value: '',
                    placeholder: 'Username...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                password: {
                    value: '',
                    placeholder: 'Username...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                age: {
                    value: '',
                    placeholder: 'Age...',
                    valid: false,
                    touched: false,
                },
                address: {
                    value: '',
                    placeholder: 'Cluj, Zorilor, Str. Lalelelor 21...',
                    valid: false,
                    touched: false,
                },
                role: {
                    value: '',
                    placeholder: 'admin/client',
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

    registerUser(user) {
        return API_USERS.postUser(user, (result, status, error) => {
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
    deleteUser(id) {
        return API_USERS.deleteUser(id.id, (result, status, error) => {
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
    updateUser(user,id) {
        return API_USERS.updateUser(id.id,user, (result, status, error) => {
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
        let user = {
            name: this.state.formControls.name.value,
            username: this.state.formControls.username.value,
            password: this.state.formControls.password.value,
            address: this.state.formControls.address.value,
            age: this.state.formControls.age.value,
            role: this.state.formControls.role.value
        };

        console.log(user);
        this.registerUser(user);
    }
    handleSubmitUpdate() {
        let user = {
            name: this.state.formControls.name.value,
            username: this.state.formControls.username.value,
            password: this.state.formControls.password.value,
            address: this.state.formControls.address.value,
            age: this.state.formControls.age.value,
            role: this.state.formControls.role.value
        };
        let id={
            id: this.state.formControls.id.value
        }
        console.log(user);
        this.updateUser(user,id);
    }
    handleSubmitDelete() {

        let id={
            id: this.state.formControls.id.value
        }
        console.log(id);
        this.deleteUser(id);
    }

    render() {
        return (
            <div>
                <FormGroup id='id'>
                    <Label for='idField'> ID: </Label>
                    <Input name='id' id='idField' placeholder={this.state.formControls.name.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.name.value}
                           touched={this.state.formControls.name.touched? 1 : 0}
                           valid={this.state.formControls.name.valid}
                           required
                    />
                    {this.state.formControls.name.touched && !this.state.formControls.name.valid &&
                        <div className={"error-message row"}> * Name must have at least 3 characters </div>}
                </FormGroup>
                <FormGroup id='name'>
                    <Label for='nameField'> Name: </Label>
                    <Input name='name' id='nameField' placeholder={this.state.formControls.name.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.name.value}
                           touched={this.state.formControls.name.touched? 1 : 0}
                           valid={this.state.formControls.name.valid}
                           required
                    />
                    {this.state.formControls.name.touched && !this.state.formControls.name.valid &&
                    <div className={"error-message row"}> * Name must have at least 3 characters </div>}
                </FormGroup>

                <FormGroup id='username'>
                    <Label for='usernameField'> Username: </Label>
                    <Input name='username' id='usernameField' placeholder={this.state.formControls.username.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.username.value}
                           touched={this.state.formControls.username.touched? 1 : 0}
                           valid={this.state.formControls.username.valid}
                           required
                    />
                    {this.state.formControls.username.touched && !this.state.formControls.username.valid &&
                    <div className={"error-message"}> Username incorrect</div>}
                </FormGroup>
                <FormGroup id='password'>
                    <Label for='passwordField'> Password: </Label>
                    <Input name='password' id='passwordField' placeholder={this.state.formControls.password.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.password.value}
                           touched={this.state.formControls.password.touched? 1 : 0}
                           valid={this.state.formControls.password.valid}
                           required
                    />
                    {this.state.formControls.password.touched && !this.state.formControls.password.valid &&
                        <div className={"error-message"}> Password incorrect</div>}
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
                <FormGroup id='role'>
                    <Label for='roleField'> Role: </Label>
                    <Input name='role' id='roleField' placeholder={this.state.formControls.role.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.role.value}
                           touched={this.state.formControls.role.touched? 1 : 0}
                           valid={this.state.formControls.role.valid}
                           required
                    />
                </FormGroup>

                <FormGroup id='age'>
                    <Label for='ageField'> Age: </Label>
                    <Input name='age' id='ageField' placeholder={this.state.formControls.age.placeholder}
                           min={0} max={100} type="number"
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.age.value}
                           touched={this.state.formControls.age.touched? 1 : 0}
                           valid={this.state.formControls.age.valid}
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

export default UserForm;
