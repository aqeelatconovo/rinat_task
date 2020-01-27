import React, { Component } from 'react';
import './App.css';
import {connect} from "react-redux";
import { history } from './helpers/index';
import { Router } from 'react-router';
import {Route, Redirect, Switch} from "react-router-dom";
import { ChartsPageComponent  } from './components/Charts/charts.components';
//Bootstarp
import 'bootstrap/dist/css/bootstrap.min.css';
//Bootstarp end

class App extends Component {
    constructor(props) {
        super(props);
        history.listen((location, action) => {
        });
    }

    render() {
        return (
            <Router history={history}>
                <div>

                    <Switch>
                        <Route exact path="/" component={ChartsPageComponent}/>
                        <Route exact path="*" render={props => (
                            <Redirect to="/"/>
                        )}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert,state
    };
}

export default connect(mapStateToProps)(App);
