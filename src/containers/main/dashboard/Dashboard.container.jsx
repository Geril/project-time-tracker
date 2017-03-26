import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import cssModules from 'react-css-modules';

import { fetchAllProjects } from 'actions/index.actions';

import Spinner from 'components/spinner/Spinner.component';
import Project from 'components/project/Project.component';

import styles from './Dashboard.container.scss';

const Dashboard = props => (
    <div styleName="ptt-dashboard">
        <h2>Your Projects</h2>
        <Link to="/project/">New Project</Link>
        {props.appState.isFetchingProjects ?
            <div styleName="spinner-wrapper">
                <Spinner isSmall />
            </div>
        :
            <div styleName="projects-list">
                {props.projects.projects.map((project, index) =>
                    <Project
                      id={project.id}
                      name={project.name}
                      description={project.description}
                      key={index}
                      isRecording={project.id === props.logs.activeLog.projectId}
                    />)
                }
            </div>
        }
    </div>
);

Dashboard.propTypes = {
    projects: React.PropTypes.shape({
        projects: React.PropTypes.array,
    }),
    logs: React.PropTypes.shape({
        activeLog: React.PropTypes.object,
    }),
    appState: React.PropTypes.shape({
        isFetchingProjects: React.PropTypes.bool.isRequired,
    }),
};

const mapStateToProps = state => ({
    projects: {
        projects: state.projects.projects,
    },
    logs: {
        activeLog: state.logs.activeLog,
    },
    appState: {
        isFetchingProjects: state.appState.isFetchingProjects,
        hasUserInfo: state.appState.hasUserInfo,
    },
});

export default connect(mapStateToProps, { fetchAllProjects })(cssModules(Dashboard, styles, { allowMultiple: true }));
