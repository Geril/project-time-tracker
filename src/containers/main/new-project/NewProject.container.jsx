import React from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { createProject } from 'actions/index.actions';

import styles from './NewProject.container.scss';

class NewProject extends React.Component {
    submitHandler(values) {
        const name = values.name;
        const description = values.description;
        this.props.createProject(name, description, this.props.user.id);
    }
    render() {
        return (
            <div styleName="ptt-new-project">
                <h2>New Project</h2>
                <form onSubmit={this.props.handleSubmit(this.submitHandler.bind(this))}>
                    <div className="form-group">
                        <label htmlFor="name">Project Name</label>
                        <Field name="name" component="input" id="name" type="text" placeholder="Project Name" className="form-control" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Project Description</label>
                        <Field name="description" component="input" id="description" type="text" placeholder="Say something about your project" className="form-control" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Project Price</label>
                        <div className="input-group">
                            <div className="input-group-addon">&euro;</div>
                            <Field name="price" component="input" id="price" type="text" placeholder="Hourly rate for project" className="form-control" />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={this.props.pristine || this.props.submitting || this.props.appState.isCreatingProject}>Create</button>
                </form>
            </div>

        );
    }
}

NewProject.propTypes = {
    handleSubmit: React.PropTypes.func.isRequired,
    pristine: React.PropTypes.bool.isRequired,
    submitting: React.PropTypes.bool.isRequired,
    user: React.PropTypes.shape({
        id: React.PropTypes.number,
    }),
    appState: React.PropTypes.shape({
        isCreatingProject: React.PropTypes.bool.isRequired,
    }),
    createProject: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    user: {
        id: state.user.id,
    },
    appState: {
        isCreatingProject: state.appState.isCreatingProject,
    },
});

export default connect(mapStateToProps, { createProject })(reduxForm({
    form: 'NewProject',
})(cssModules(NewProject, styles, { allowMultiple: true })));
