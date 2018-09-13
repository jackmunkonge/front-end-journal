import React, { Component } from 'react';
import { Loader, Table, Button, Icon } from 'semantic-ui-react';
import _ from 'lodash';
import DynTableRow from './DynTableRow';



export default class DynTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            column: null,
            data: this.props.data,
            direction: 'ascending'
        }
    }

    setHeaders = () => {
        const { column, direction } = this.state;
        const { headers } = this.props;
        let arr = [];
        
        for(let i=0;i<headers.length;i++){
            arr.push(<Table.HeaderCell 
                sorted={column === headers[i] ? direction : 'descending'}
                onClick={()=> this.handleSort(headers[i])}
                key={headers[i]}
                >{headers[i]}
                </Table.HeaderCell>);
        }
        return(arr);
    }
    
    rows = () => {
        const { data } = this.state;
            return(
                data.map(resource => {
                    let resId = resource[Object.keys(resource)[0]];
                        return <DynTableRow key={resId} data={resource}/>
                    })
            )
    }

    handleSort = (clickedColumn)  => {
        const { column, data, direction } = this.state
        let index = this.props.headers.indexOf(clickedColumn) + 1;
        if (column !== clickedColumn) {
            this.setState({
            column: clickedColumn,
            data: _.sortBy(data, [Object.keys(data[0])[index]]),
            direction: 'ascending',
            })
    
            return
        }
        
        if (column === clickedColumn) {
            this.setState({
                data: data.reverse(),
                direction: direction === 'ascending' ? 'descending' : 'ascending',
            })

            return
        }
    }

    render() {
        const { data } = this.state;
        return(
            <Table celled sortable>
                <Table.Header>
                    <Table.Row>
                        {this.setHeaders()}
                    </Table.Row>
                </Table.Header>
                <Table.Body> 
                    {data.length !== 0 ? this.rows():<Loader active inline='centered' />}
                </Table.Body> 
                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell colSpan={this.props.headers.length}>
                        <Button  href="/" color="green" floated='right' icon labelPosition='right' size='small'>
                            <Icon name='plus circle' /> Add Item
                        </Button>
                        <Button.Group>
                            <Button href="/" size='small'>Edit</Button>
                            <Button href="/" disabled size='small'>Save Changes</Button>
                        </Button.Group>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );   
    }
}
  