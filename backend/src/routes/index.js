import apiRouter from './api.routes';
import docsRouter from './docs.routes';
import dataRouter from './data.routes';
import usersRouter from './users.routes';
import personsRouter from './persons.routes';
import organisationsRouter from './organisations.routes';
import combodataRouter from './combodata.routes';
import gridcombodataRouter from './gridcombodata.routes';
import sportabilitiesRouter from './sportabilities.routes';
import exercisesRouter from './exercises.routes';
import subgriddataRouter from './subgriddata.routes';
import delrecRouter from './delrec.routes';

export const api = apiRouter;
export const docs = docsRouter;
export const data = dataRouter;
export const users = usersRouter;
export const persons = personsRouter;
export const organisations = organisationsRouter;
export const combodata = combodataRouter;
export const gridcombodata = gridcombodataRouter;
export const sportabilities = sportabilitiesRouter;
export const exercises = exercisesRouter;
export const subgriddata = subgriddataRouter;
export const delrec = delrecRouter
