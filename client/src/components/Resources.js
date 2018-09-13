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
            if(res[i].framework == null && res[i].language != null){
                let tempName = res[i].language.name;
                delete res[i].language;
                res[i].framework = "N/A";
                res[i].language = tempName;
            } else if(res[i].framework == null && res[i].language == null){
                res[i].framework = "N/A";
                res[i].language = "N/A";
            } else {  
                res[i].framework = res[i].framework.name;
                res[i].language = res[i].language.name;
            }
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
        // Boolean indicates data is clickable link
        let headers = {'Name': false,'Url': true,'Framework': false,'Language': false};
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