import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './home/home';
import UserContainer from "./users/user-container";
import DeviceContainer from "./device/device-container";
import MeasurementContainer from "./measurements/measurement-container";

import ErrorPage from './commons/errorhandling/error-page';
import styles from './commons/styles/project-style.css';
import Client from "./client/client";
import Admin from "./admin/admin";
import Login from "./login/login";
import MyDeviceContainer from "./device/mydevices-container";
import DeviceUser from "./device/device-user";

class App extends React.Component {


    render() {


        return (
            <div className={styles.back}>
            <Router>
                <div>
                    <Switch>

                        <Route
                            exact
                            path='/'
                            render={() => <Home/>}
                        />

                        <Route
                            exact
                            path='/client'
                            render={() => <Client/>}
                        />
                        <Route
                            exact
                            path='/admin'
                            render={() => <Admin/>}
                        />

                        <Route
                            exact
                            path='/login'
                            render={() => <Login/>}
                        />
                        {/*Error*/}
                        <Route
                            exact
                            path='/error'
                            render={() => <ErrorPage/>}
                        />
                        <Route
                            exact
                            path='/client/users'
                            render={() => <UserContainer/>}
                        />
                        <Route
                            exact
                            path='/client/device'
                            render={() => <MyDeviceContainer/>}
                        />
                        <Route
                            exact
                            path='/client/measurements'
                            render={() => <MeasurementContainer/>}
                        />

                        {/*Error*/}
                        <Route
                            exact
                            path='/client/error'
                            render={() => <ErrorPage/>}
                        />
                        />
                        <Route
                            exact
                            path='/admin/users'
                            render={() => <UserContainer/>}
                        />
                        <Route
                            exact
                            path='/admin/device'
                            render={() => <DeviceContainer/>}
                        />
                        <Route
                            exact
                            path='/admin/mydevice'
                            render={() => <MyDeviceContainer/>}
                        />
                        <Route
                            exact
                            path='/admin/measurements'
                            render={() => <MeasurementContainer/>}
                        />
                        <Route
                            exact
                            path='/admin/addDeviceToUser'
                            render={() => <DeviceUser/>}
                        />

                        {/*Error*/}
                        <Route
                            exact
                            path='/admin/error'
                            render={() => <ErrorPage/>}
                        />
                        {/* public routes */}

                        <Route render={() =><ErrorPage/>} />
                    </Switch>
                </div>
            </Router>
            </div>
        )
    };
}

export default App
