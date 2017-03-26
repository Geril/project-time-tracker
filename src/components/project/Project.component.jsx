import React from 'react';
import { Link } from 'react-router';
import cssModules from 'react-css-modules';

import styles from './Project.component.scss';

const Project = props => (
    <div className="list-group" styleName={`ptt-project ${props.isRecording ? 'bigger-padding' : ''}`}>
        <Link to={`/project/detail/${props.id}`} className="list-group-item">
            <h4 className="list-group-item-heading">{props.name}</h4>
            <p className="list-group-item-text">{props.description}</p>
            {props.isRecording &&
                <div styleName="recording"><span className="label label-warning">Logging</span></div>
            }
        </Link>
    </div>
);

Project.propTypes = {
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    isRecording: React.PropTypes.bool,
};

export default cssModules(Project, styles, { allowMultiple: true });
