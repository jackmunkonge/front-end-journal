import React, { Component } from 'react';
import { Loader, Table } from 'semantic-ui-react'

const Cells = props => {
    let arr = [];
    let properties = Object.keys(props.data);
    for(let i=1;i<props.cols;i++){
        arr.push(<Table.Cell key={Object.keys(properties)[i]}>{props.data[properties[i]]}</Table.Cell>);
    }
    return(arr);
}

export default class DynTableRow extends Component {
    render() {
        let colNum = Object.keys(this.props.data).length;
        return(
            this.props.data !== 0 ? 
            (<Table.Row><Cells cols={colNum} data={this.props.data}/></Table.Row>) 
            : (<Loader active inline='centered' />)
        );
    }
}