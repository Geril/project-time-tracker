import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router';
import cssModules from 'react-css-modules';

import styles from './Navbar.container.scss';

const Navbar = props => (
    <div>
        <nav className="navbar navbar-default" styleName="ptt-navbar">
            <div className="container">
                <div className="navbar-header" styleName="site-name">
                    <Link className="navbar-brand" to="/">Project Time Tracking</Link>
                </div>
                <p className="navbar-text navbar-right" styleName="user-info">Signed in as {props.user.nickName}</p>
            </div>
        </nav>
    </div>
);

Navbar.propTypes = {
    user: React.PropTypes.shape({
        nickName: React.PropTypes.string.isRequired,
    }),
};

const mapStateToProps = state => ({
    user: {
        nickName: state.user.nickName,
    },
});

export default connect(mapStateToProps, {})(cssModules(Navbar, styles, { allowMultiple: true }));
