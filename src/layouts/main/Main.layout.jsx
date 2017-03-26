import React from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';

import { fetchAllProjects } from 'actions/index.actions';

import Navbar from './_parts/navbar/Navbar.container';
import styles from './Main.layout.scss';

class MainLayout extends React.Component {
    componentDidMount() {
        if (this.props.appState.hasUserInfo) {
            this.props.fetchAllProjects();
        }
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-6 col-lg-8">
                            {this.props.main}
                        </div>
                        <div className="col-xs-12 col-md-6 col-lg-4">
                            {this.props.rightSidebar}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

MainLayout.propTypes = {
    main: React.PropTypes.node.isRequired,
    rightSidebar: React.PropTypes.node,
    appState: React.PropTypes.shape({
        hasUserInfo: React.PropTypes.bool.isRequired,
    }),
    fetchAllProjects: React.PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
    appState: {
        hasUserInfo: state.appState.hasUserInfo,
    },
});


export default connect(mapStateToProps, { fetchAllProjects })(cssModules(MainLayout, styles, { allowMultiple: true }));
