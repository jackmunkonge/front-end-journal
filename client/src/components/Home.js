import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';
import Navigation from './Navigation';

export default class Home extends Component {
    render() {
        return (
            <Container>
                <Navigation/>
                <Header 
                as='h1'
                content="Jack's Journal App"
                subheader='Talks to journal API and displays information in HTML'
                />
            </Container>
        );
    }
}