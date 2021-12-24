import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions'

export default (OriginalComponent) => {
    class MixedComponent extends Component {
        
        checkAuth() {
            if(!this.props.isAuth && !this.props.Jwt) {
                this.props.history.push('/');
            }
        }
        async componentDidMount() {
            try {
                const res = await this.props.adminAuthCheck();
                if(res) {
                    this.checkAuth();
                } else {
                    this.props.history.push('/');
                }
            } catch(err) {
                console.log(err);
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
