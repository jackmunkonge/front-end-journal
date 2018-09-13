import React, { Component } from 'react';
import { Loader, Table } from 'semantic-ui-react';

const Cells = props => {
    let arr = [];
    let properties = Object.keys(props.data);
    for(let i=1;i<props.cols;i++){
        props.clickables[i-1] ?
        arr.push(<Table.Cell key={Object.keys(properties)[i]}><a href={props.data[properties[i]]} target="_blank" rel="noopener noreferrer">{props.data[properties[i]]}</a></Table.Cell>)
        :
        arr.push(<Table.Cell key={Object.keys(properties)[i]}>{props.data[properties[i]]}</Table.Cell>)
    }
    return(arr);
}

export default class DynTableRow extends Component {
    render() {
        let colNum = Object.keys(this.props.data).length;
        return(
            this.props.data !== 0 && this.props.clickables !== undefined? 
            (<Table.Row><Cells cols={colNum} data={this.props.data} clickables={this.props.clickables}/></Table.Row>) 
            : (<Loader active inline='centered' />)
        );
    }
}