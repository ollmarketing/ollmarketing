import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions'

export default (OriginalComponent) => {
    class MixedComponent extends Component {
        constructor(props) {
            super(props)

            this.state = {
                confirmation: null,
            }
        }
        
        async componentDidMount() {
            const id = this.props.match.params.id;
            const res = await this.props.emailConfirmation(id);

            let confirmation = res;

            if(res) {
                //this.props.isAuth = true;
            }

            this.setState({
                confirmation
            });
        }

        render() {
            return <OriginalComponent confirmation = {this.state.confirmation} {...this.props}/>
        }
    }

    function mapStateToProps(state) {
        return {
            isAuth: state.auth.isAuthenticated,
            jwt: state.auth.token,
        }
    }
    return connect(mapStateToProps, actions)(MixedComponent);
}
