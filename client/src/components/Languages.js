import React, { Component } from 'react';
import { Container, Loader } from 'semantic-ui-react';
import Navigation from './Navigation';
import rp from 'request-promise';
import config from '../config';
import DynTable from './DynTable';

export default class Languages extends Component {
    constructor(props){
        super(props);
        this.state = {
            languages: []
        };
    }

    componentDidMount() {
        this.getAllLanguages();
    }

    buildUri = (path) => {
        return config.api.protocol + '://' + config.api.host + ':' + config.api.port + path; 
    }

    getAllLanguages = () => {
        var options = {
            uri: this.buildUri(this.props.location.pathname),
            headers: {
            'Content-Type': 'application/json'
            },
            json: true
        };
        
        rp(options)
            .then(lang => {
                this.setState({
                    languages: lang
                });
            })
            .catch(err => {
                console.log(err)
            });
    }

    render() {
        let headers = ['Name'];
        return(
            <Container>
                <Navigation/>
                <Container>
                {this.state.languages.length !== 0 ? <DynTable data={this.state.languages} headers={headers}/>:<Loader content="Loading Languages" active inline='centered' />}
                </Container>
            </Container>
        );
    }
}