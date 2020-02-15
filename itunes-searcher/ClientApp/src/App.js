import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import SearchEngine from './components/SearchEngine';
import ResultPage from './components/ResultPage';

export default class App extends Component {
    displayName = App.name

    render() {
        return (
            <Layout>
                <Route exact path='/' component={SearchEngine} />
                <Route path='/result' component={ResultPage} />
            </Layout>
        );
    }
}
