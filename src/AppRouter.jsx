import React from 'react';
import {
    Router,
    Route,
    browserHistory,
    IndexRoute,
} from 'react-router';

import Loader from 'containers/loader/Loader.container';

import MainLayout from 'layouts/main/Main.layout';

import Dashboard from 'containers/main/dashboard/Dashboard.container';
import NewProject from 'containers/main/new-project/NewProject.container';
import ProjectDetail from 'containers/main/project-detail/ProjectDetail.container';

import RightSidebar from 'containers/main/_parts/right-sidebar/RightSidebar.container';

import PageNotFound from 'containers/page-not-found/PageNotFound.container';

const AppRouter = () => (
    <Router history={browserHistory}>
        <Route component={Loader}>
            <Route path="/" component={MainLayout}>
                <IndexRoute components={{ rightSidebar: RightSidebar, main: Dashboard }} />
                <Route path="project">
                    <IndexRoute components={{ rightSidebar: RightSidebar, main: NewProject }} />
                    <Route path="detail/:projectId" components={{ rightSidebar: RightSidebar, main: ProjectDetail }} />
                </Route>
            </Route>
        </Route>
        <Route path="*" component={PageNotFound} />
    </Router>
);

export default AppRouter;
