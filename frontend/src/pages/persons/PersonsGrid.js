import GridReport from '../../components/gridReport/GridReport';
import { languageElements } from './PersonsForm-languageElements';
import { reportParams } from './PersonsGrid-params';
import FunctionCell_EditDelete from '../../components/dataGrid/functionCells/editDelete/FunctionCell_EditDelete';

export default function PersonsGrid(props) {
    async function editPerson(id) {
        props.edit(id);
        return;
    };

    async function deletePerson(id) {
        props.onDelete(id);
    }

    return (<div className="PersonsGrid">
        <GridReport
            id="personsGrid"
            refreshId={props.refreshId || 0}
            dataEndpoint={`${process.env.REACT_APP_API_BASE_URL}/data`}
            language={props.language}
            onAddNew={props.onAddNew}
            rowSelection={props.rowSelection}
            rowMultiSelectWithClick={props.rowMultiSelectWithClick}
            token={props.token}
            report={{
                reportId: "PersonsGrid",
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
                            pencilClicked: (id) => editPerson(id),
                            trashClicked: (id) => deletePerson(id),
                        },
                    },
                ],
            }}
        />
    </div>)
}