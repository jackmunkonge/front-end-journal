import React, { Component } from 'react';
import { Container, Loader } from 'semantic-ui-react';
import Navigation from './Navigation';
import rp from 'request-promise';
import config from '../config';
import DynTable from './DynTable';

export default class Frameworks extends Component {
    constructor(props){
        super(props);
        this.state = {
            frameworks: []
        };
    }

    componentDidMount() {
        this.getAllFrameworks();
    }

    buildUri = (path) => {
        return config.api.protocol + '://' + config.api.host + ':' + config.api.port + path; 
    }

    format = (frame) => {
        for(let i=0;i<frame.length;i++){
            frame[i].language = frame[i].language.name;
        }
        return frame;
    }

    getAllFrameworks = () => {
        var options = {
            uri: this.buildUri(this.props.location.pathname),
            headers: {
            'Content-Type': 'application/json'
            },
            json: true
        };
        
        rp(options)
            .then(frame => {
                let formattedFrame = this.format(frame);
                return formattedFrame;
            })
            .then(frame => {
                this.setState({
                    frameworks: frame
                });
            })
            .catch(err => {
                console.log(err)
            });
    }

    render() {
        let headers = ['Name', 'Language'];
        return(
            <Container>
                <Navigation/>
                <Container>
                    {this.state.frameworks.length !== 0 ? <DynTable data={this.state.frameworks} headers={headers}/>:<Loader content="Loading Frameworks" active inline='centered' />}
                </Container>
            </Container>
        );
    }
}