import React from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';

import { fetchUsersInfo } from 'actions/index.actions';

import Spinner from 'components/spinner/Spinner.component';

import styles from './Loader.container.scss';

class Loader extends React.Component {
    componentDidMount() {
        this.props.fetchUsersInfo();
    }

    render() {
        return (
            <div styleName="ptt-loader">
                {this.props.appState.isFetchingUsersInfo ?
                    <div styleName="spinner-wrapper">
                        <Spinner />
                    </div>
                    :
                    <div>
                        {this.props.children}
                    </div>
                }
            </div>
        );
    }
}

Loader.propTypes = {
    children: React.PropTypes.node.isRequired,
    appState: React.PropTypes.shape({
        isFetchingUsersInfo: React.PropTypes.bool.isRequired,
    }),
    fetchUsersInfo: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    appState: {
        isFetchingUsersInfo: state.appState.isFetchingUsersInfo,
    },
});

export default connect(mapStateToProps, { fetchUsersInfo })(cssModules(Loader, styles, { allowMultiple: true }));
