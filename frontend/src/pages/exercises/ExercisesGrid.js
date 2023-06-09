import GridReport from '../../components/gridReport/GridReport';
import { languageElements } from './ExercisesForm-languageElements';
import { reportParams } from './ExercisesGrid-params';
import FunctionCell_EditDelete from '../../components/dataGrid/functionCells/editDelete/FunctionCell_EditDelete';

export default function ExercisesGrid(props) {
    console.log('+++ ExercisesGrid.js (line: 7)',props);
    async function editExercises(id) {
        console.log('+++ ExercisesGrid.js (line: 8)',id);
        props.edit(id);
        return;
    };

    async function deleteExercises(id) {
        props.onDelete(id);
    }

    return (<div className="ExercisesGrid">
        <GridReport
            id="exercisesGrid"
            refreshId={props.refreshId || 0}
            dataEndpoint={`${process.env.REACT_APP_API_BASE_URL}/data`}
            language={props.language}
            onAddNew={props.onAddNew}
            rowSelection={props.rowSelection}
            rowMultiSelectWithClick={props.rowMultiSelectWithClick}
            token={props.token}
            report={{
                reportId: "ExercisesGrid",
                reportParams,
                languageElements,
                frameWorkComponents: {
                    FunctionCell_EditDelete,
                },
                cellRenderers: [
                    {
                        field: "Message_File_ID",
                        cellRenderer: "FunctionCell_EditDelete",
                        cellRendererParams: {
                            pencilClicked: (id) => editExercises(id),
                            trashClicked: (id) => deleteExercises(id),
                        },
                    },
                ],
            }}
        />
    </div>)
}