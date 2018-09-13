import React, { Component } from 'react';
import { Input, Menu } from 'semantic-ui-react';
import logo from '../stylesheets/favicon.ico';

export default class Navigation extends Component {
    render() {
        let currentPathname = window.location.pathname;
        return (
            <Menu size='huge' stackable pointing secondary>
                <Menu.Item><img src={logo} alt='logo'/></Menu.Item>
                <Menu.Item 
                href='/'
                name='home' 
                active={currentPathname === '/'} 
                />
                <Menu.Item
                href='/resources'
                name='resources'
                active={currentPathname === '/resources'} 
                />
                <Menu.Item
                href='/frameworks'
                name='frameworks'
                active={currentPathname === '/frameworks'} 
                />
                <Menu.Item
                href='/languages'
                name='languages'
                active={currentPathname === '/languages'} 
                />
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Input icon='search' placeholder='Search...' />
                    </Menu.Item>
                    <Menu.Item
                        name='logout'
                        active={currentPathname === '/logout'}
                    />
                </Menu.Menu>
            </Menu>
        )
    }
}
