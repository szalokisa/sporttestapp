import { languageElements } from './ResToExGrid-languageElements';
import { reportParams } from './ResToExGrid-params';
import FunctionCell_EditDelete from '../../components/dataGrid/functionCells/editDelete/FunctionCell_EditDelete';
import GridReport from '../../components/gridReport/GridReport';

export default function ResToExGrid(props) {
    async function editResToEx(id) {
        props.edit(id);
        return;
    };

    async function deleteResToEx(id) {
        props.onDelete(id);
    }

    return (<div className="ResToExGrid">
        <h1>{props.view}</h1>
        <GridReport
            id="resToExGrid"
            refreshId={props.refreshId || 0}
            dataEndpoint={`${process.env.REACT_APP_API_BASE_URL}/data`}
            language={props.language}
            onAddNew={props.onAddNew}
            rowSelection={'ExerciseID = 1'}
            rowMultiSelectWithClick={props.rowMultiSelectWithClick}
            token={props.token}
            report={{
                reportId: "ResToExGrid",
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
                            pencilClicked: (id) => editResToEx(id),
                            trashClicked: (id) => deleteResToEx(id),
                        },
                    },
                ],
            }}
        />
    </div>)
}