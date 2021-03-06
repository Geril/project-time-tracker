import React from 'react';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';

import {
    fetchProjectLogs,
    clearCurrentProject,
    deleteProject,
    deleteLog,
} from 'actions/index.actions';

import Spinner from 'components/spinner/Spinner.component';

import styles from './ProjectDetail.container.scss';

class ProjectDetail extends React.Component {
    componentDidMount() {
        if (this.props.appState.hasUserInfo) {
            this.props.fetchProjectLogs(this.props.params.projectId);
        }
    }
    componentWillUnmount() {
        this.props.clearCurrentProject();
    }
    render() {
        const { projectId } = this.props.params;
        const currentProject = this.props.projects.projects.find(project => project.id === projectId);
        return (
            <div styleName="ptt-project-detail">
                {currentProject ?
                    <div styleName="detail-wrapper">
                        <h2>{currentProject.name}</h2>
                        <p>{currentProject.description}</p>
                        <div styleName="actions">
                            <button onClick={this.props.deleteProject.bind(null, currentProject.id)} className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                :
                    <div styleName="spinner-wrapper">
                        <Spinner isSmall />
                    </div>
                }
                { this.props.appState.isFetchingProjectLogs || !this.props.logs.currentProjectTotal ?
                    <div styleName="spinner-wrapper">
                        <Spinner isSmall />
                    </div>
                :
                    <div className="panel panel-default" styleName="logs-panel">
                        <div className="panel-heading"><strong>Total:</strong> {this.props.logs.currentProjectTotal}</div>
                        <div className="panel-body">
                            <p>All logs for this project</p>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Duration</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.logs.currentProjectLogs.map((item, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.from}</td>
                                        <td>{item.to}</td>
                                        <td>{item.humanDuration}</td>
                                        <td>
                                            <button
                                              type="button"
                                              className="btn btn-danger btn-xs"
                                              onClick={this.props.deleteLog.bind(null, item.id, currentProject.id)}
                                              disabled={this.props.appState.isDeletingLog}
                                            >
                                              Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        );
    }
}

ProjectDetail.propTypes = {
    projects: React.PropTypes.shape({
        projects: React.PropTypes.array,
    }),
    params: React.PropTypes.shape({
        projectId: React.PropTypes.string,
    }),
    logs: React.PropTypes.shape({
        currentProjectLogs: React.PropTypes.array,
        currentProjectTotal: React.PropTypes.string,
    }),
    appState: React.PropTypes.shape({
        isFetchingProjectLogs: React.PropTypes.bool.isRequired,
        isDeletingLog: React.PropTypes.bool.isRequired,
        hasUserInfo: React.PropTypes.bool.isRequired,
    }),
    fetchProjectLogs: React.PropTypes.func.isRequired,
    clearCurrentProject: React.PropTypes.func.isRequired,
    deleteProject: React.PropTypes.func.isRequired,
    deleteLog: React.PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
    projects: {
        projects: state.projects.projects,
    },
    logs: {
        currentProjectLogs: state.logs.currentProjectLogs,
        currentProjectTotal: state.logs.currentProjectTotal,
    },
    appState: {
        isFetchingProjectLogs: state.appState.isFetchingProjects,
        isDeletingLog: state.appState.isDeletingLog,
        hasUserInfo: state.appState.hasUserInfo,
    },
});

export default connect(mapStateToProps, {
    fetchProjectLogs,
    clearCurrentProject,
    deleteProject,
    deleteLog,
})(cssModules(ProjectDetail, styles, { allowMultiple: true }));
