import {Route, Routes} from "react-router-dom";
import {AppRoutes} from './routes';
import React, {useCallback} from 'react';

export default function RouterManager(): React.JSX.Element {

    const mappedViews: () => React.JSX.Element[] = useCallback((): React.JSX.Element[] => {
        return Object.keys(AppRoutes).map((path: string): React.JSX.Element => {
            const RouteComponent: React.FunctionComponent<any> = AppRoutes[path];

            return (
                <Route key={path} path={path} element={<RouteComponent/>}/>
            );
        });
    }, []);

    return (
        <Routes>
            { mappedViews() }
        </Routes>
    );
};
