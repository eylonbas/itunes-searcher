import React, { Component } from 'react';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
    displayName = Layout.name

    render() {
        return (
            <div className='layout'>
                <NavMenu />
                <div className='page-content'>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
