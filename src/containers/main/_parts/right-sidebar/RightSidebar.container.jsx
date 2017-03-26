import React from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import moment from 'moment';
import { Field, reduxForm } from 'redux-form';

import { startLog, stopLog, fetchRunningLog } from 'actions/index.actions';

import Spinner from 'components/spinner/Spinner.component';

import styles from './RightSidebar.container.scss';

class RightSidebar extends React.Component {
    componentDidMount() {
        if (this.props.appState.hasUserInfo) {
            this.props.fetchRunningLog(this.props.user.id);
        }
    }

    submitHandler(values) {
        const projectId = values.projectId;
        this.props.startLog(projectId, this.props.user.id);
    }
    render() {
        return (
            <div styleName="ptt-right-sidebar">
                <h2>Timer</h2>
                <div className="panel panel-default" styleName="timer-wrapper">
                    <div className="panel-body">
                        {this.props.appState.isFetchingCurrentLog || this.props.appState.isStoppingLog || !this.props.projects.projects.length ?
                            <div styleName="spinner-wrapper">
                                <Spinner isSmall />
                            </div>
                        :
                            <div>
                                {Object.keys(this.props.logs.activeLog).length !== 0 ?
                                    <div>
                                        <h4>Logging Since:</h4>
                                        {moment(Number(this.props.logs.activeLog.from)).format('DD.MM.YYYY - HH:mm:ss')}
                                        <h4>Project:</h4>
                                        {this.props.projects.projects.find(item => item.id === this.props.logs.activeLog.projectId).name}
                                        <div styleName="button-wrapper">
                                            <button onClick={this.props.stopLog.bind(this, this.props.logs.activeLog)} className="btn btn-primary">Stop</button>
                                        </div>
                                    </div>
                                :
                                    <div styleName="form-wrapper">
                                        <div>Currently there is no timer running</div>
                                        <form onSubmit={this.props.handleSubmit(this.submitHandler.bind(this))}>
                                            <div className="form-group">
                                                <label htmlFor="project">Select Project</label>
                                                <Field name="projectId" id="project" component="select" className="form-control">
                                                    <option />
                                                    {this.props.projects.projects.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)}

                                                </Field>
                                            </div>
                                            <div styleName="button-wrapper">
                                                <button type="submit" className="btn btn-primary" disabled={this.props.pristine || this.props.submitting || this.props.appState.isStartingLog}>Start Logging</button>
                                            </div>
                                        </form>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}


RightSidebar.propTypes = {
    handleSubmit: React.PropTypes.func.isRequired,
    pristine: React.PropTypes.bool.isRequired,
    submitting: React.PropTypes.bool.isRequired,
    projects: React.PropTypes.shape({
        projects: React.PropTypes.array,
    }),

    user: React.PropTypes.shape({
        id: React.PropTypes.number,
    }),
    logs: React.PropTypes.shape({
        activeLog: React.PropTypes.object,
    }),
    appState: React.PropTypes.shape({
        isStartingLog: React.PropTypes.bool.isRequired,
        isStoppingLog: React.PropTypes.bool.isRequired,
        isFetchingCurrentLog: React.PropTypes.bool.isRequired,
        hasUserInfo: React.PropTypes.bool.isRequired,
    }),
    startLog: React.PropTypes.func.isRequired,
    stopLog: React.PropTypes.func.isRequired,
    fetchRunningLog: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    projects: {
        projects: state.projects.projects,
    },
    user: {
        id: state.user.id,
    },
    logs: {
        activeLog: state.logs.activeLog,
    },
    appState: {
        isStartingLog: state.appState.isStartingLog,
        isStoppingLog: state.appState.isStartingLog,
        isFetchingCurrentLog: state.appState.isFetchingCurrentLog,
        hasUserInfo: state.appState.hasUserInfo,
    },
});

export default connect(mapStateToProps, { startLog, stopLog, fetchRunningLog })(reduxForm({
    form: 'StartLog',
})(cssModules(RightSidebar, styles, { allowMultiple: true })));
