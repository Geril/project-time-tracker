import React from 'react';
import cssModules from 'react-css-modules';

import styles from './Spinner.component.scss';

const Spinner = props => (
    <div styleName={`ptt-loader ${props.isSmall ? 'small' : ''}`} />
);

Spinner.propTypes = {
    isSmall: React.PropTypes.bool,
};

export default cssModules(Spinner, styles, { allowMultiple: true });
