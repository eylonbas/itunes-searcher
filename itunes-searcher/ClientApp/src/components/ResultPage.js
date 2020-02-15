import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ResultPageBlock from './ResultPageBlock';

export default function ResultPage(props) {
    return (
        <Switch>
            <Route exact path='/result/:id' component={ResultPageBlock} />
        </Switch >
    );
}