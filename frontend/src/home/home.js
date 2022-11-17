import React from 'react';

import BackgroundImg from '../commons/images/wp4546351.jpg';
import {Button, Container, Jumbotron} from 'reactstrap';
import Login from "../login/login";
import UserContainer from "../users/user-container";
import UserForm from "../users/components/user-form";

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "800px",
    color:'white',
    backgroundImage: `url(${BackgroundImg})`
};
const textStyle = {color: 'white', };

class Home extends React.Component {


    render() {


        return (

            <div>
                <Jumbotron fluid style={backgroundStyle}>
                    <Container fluid>
                       <h1> Welcome!</h1>
                        <Login />
                    </Container>
                </Jumbotron>

            </div>
        )
    };
}

export default Home
