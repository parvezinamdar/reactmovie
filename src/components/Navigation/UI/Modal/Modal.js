import React, { Component } from 'react';

import './Modal.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState){
        // console.log('[Modal this.props.show]',this.props.show);
        // console.log('[Modal nextProps.show]', nextProps.show);
        // console.log('[Modal nextProps.show !== this.props.show]', nextProps.show !== this.props.show);

        return nextProps.show !== this.props.show;
    }

    // componentDidUpdate(){
    //     console.log('[Modal] didUpdate');
    // }
    
    render () {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    className="Modal"
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal;