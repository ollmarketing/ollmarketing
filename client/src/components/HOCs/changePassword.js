import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions'

export default (OriginalComponent) => {
    class MixedComponent extends Component {
        constructor(props) {
            super(props)

            this.state = {
                userId: undefined,
            }
        }
        
        async componentDidMount() {
            const id = this.props.match.params.id;
            const userId = await this.props.changePasswordViaEmail(id);

            this.setState({
                userId,
            })
        }

        render() {
            return <OriginalComponent userId = {this.state.userId} {...this.props}/>
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
