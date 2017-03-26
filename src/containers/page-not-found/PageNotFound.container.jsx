import React from 'react';
import cssModules from 'react-css-modules';

import styles from './PageNotFound.container.scss';

import darthVaderPng from './img/darth-vader.png';

const PageNotFound = () => (
    <div styleName="not-found">
        <h1>404 Page Not Found</h1>
        <img src={darthVaderPng} alt="" styleName="darth-vader" />
    </div>
);

export default cssModules(PageNotFound, styles, { allowMultiple: true });
