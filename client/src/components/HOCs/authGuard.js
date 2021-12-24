import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions'

export default (OriginalComponent) => {
    class MixedComponent extends Component {
        
        async checkAuth() {
            if(!this.props.isAuth && !this.props.jwt) {
                this.props.history.push('/');
            }
        }
        async componentDidMount() {
                axios.defaults.headers.common["Authorization"] = localStorage.getItem('JWT');
                const res = await this.props.authCheck();
                if(res) {
                    this.checkAuth();
                } else {
                    this.props.history.push('/');
                }
            
        }

        componentDidUpdate() {
            this.checkAuth();
        }


        render() {
            return <OriginalComponent {...this.props}/>
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
