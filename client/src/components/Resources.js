import React, { Component } from 'react';
import { Container, Loader } from 'semantic-ui-react';
import Navigation from './Navigation';
import rp from 'request-promise';
import config from '../config';
import DynTable from './DynTable';

export default class Resources extends Component {
    constructor(props){
        super(props);
        this.state = {
            resources: []
        };
    }

    componentDidMount(){
        this.getAllResources();
    }

    buildUri = (path) => {
        return config.api.protocol + '://' + config.api.host + ':' + config.api.port + path; 
    }

    format = (res) => {
        for(let i=0;i<res.length;i++){
            res[i].framework = res[i].framework.name;
            res[i].language = res[i].language.name;
        }
        return res;
    }

    getAllResources = () => {
        var options = {
            uri: this.buildUri(this.props.location.pathname),
            headers: {
            'Content-Type': 'application/json'
            },
            json: true
        };
        
        rp(options)
            .then(res => {
                let formattedRes = this.format(res);
                return formattedRes;
            })
            .then(res => {
                this.setState({
                    resources: res
                });
            })
            .catch(err => {
                console.log(err)
            });
    }

    render() {
        let headers = ['Name','Url','Framework','Language'];
        return(
            <Container>
                <Navigation/>
                <Container>
                    {this.state.resources.length !== 0 ? <DynTable data={this.state.resources} headers={headers}/>:<Loader content="Loading Resources" active inline='centered' />}
                </Container>
            </Container>
                
        );
    }
}