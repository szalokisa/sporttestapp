import apiRouter from './api.routes';
import docsRouter from './docs.routes';
import dataRouter from './data.routes';
import usersRouter from './users.routes';
import personsRouter from './persons.routes';
import combodataRouter from './combodata.routes';
import gridcombodataRouter from './gridcombodata.routes';
import sportabilitiesRouter from './sportabilities.routes';
import exercisesRouter from './exercises.routes';
import delrecRouter from './delrec.routes';
import sttlinestoheadRouter from './sttlinestohead.routes';
import tokenRouter from './tokenRouter';


export const api = apiRouter;
export const docs = docsRouter;
export const data = dataRouter;
export const users = usersRouter;
export const persons = personsRouter;
export const combodata = combodataRouter;
export const gridcombodata = gridcombodataRouter;
export const sportabilities = sportabilitiesRouter;
export const exercises = exercisesRouter;
export const token = tokenRouter;
export const delrec = delrecRouter;
export const sttlinestohead = sttlinestoheadRouter;