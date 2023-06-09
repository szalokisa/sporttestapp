import GridReport from '../../components/gridReport/GridReport';
import { languageElements } from './OrganisationsForm-languageElements';
import { reportParams } from './OrganisationsGrid-params';
import FunctionCell_EditDelete from '../../components/dataGrid/functionCells/editDelete/FunctionCell_EditDelete';

export default function OrganisationsGrid(props) {
    async function editOrganisation(id) {
        props.edit(id);
        return;
    };

    async function deleteOrganisation(id) {
        props.onDelete(id);
    }
    return (<div className="OrganisationsGrid">
        <GridReport
            id="organisationsGrid"
            refreshId={props.refreshId || 0}
            dataEndpoint={`${process.env.REACT_APP_API_BASE_URL}/data`}
            language={props.language}
            onAddNew={props.onAddNew}
            rowSelection={props.rowSelection}
            rowMultiSelectWithClick={props.rowMultiSelectWithClick}
            token={props.token}
            report={{
                reportId: "OrganisationsGrid",
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
                            pencilClicked: (id) => editOrganisation(id),
                            trashClicked: (id) => deleteOrganisation(id),
                        },
                    },
                ],
            }}
        />
    </div>)
}