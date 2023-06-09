import GridReport from '../../components/gridReport/GridReport';
import { languageElements } from './SportAbilitiesForm-languageElements';
import { reportParams } from './SportAbilitiesGrid-params';
import FunctionCell_EditDelete from '../../components/dataGrid/functionCells/editDelete/FunctionCell_EditDelete';

export default function SportAbilitiesGrid(props) {
    async function editSportAbility(id) {
        props.edit(id);
        return;
    };

    async function deleteSportAbility(id) {
        props.onDelete(id);
    }

    return (<div className="SportAbilitiesGrid">
        <GridReport
            id="sportAbilitiesGrid"
            refreshId={props.refreshId || 0}
            dataEndpoint={`${process.env.REACT_APP_API_BASE_URL}/data`}
            language={props.language}
            onAddNew={props.onAddNew}
            rowSelection={props.rowSelection}
            rowMultiSelectWithClick={props.rowMultiSelectWithClick}
            token={props.token}
            report={{
                reportId: "SportAbilitiesGrid",
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
                            pencilClicked: (id) => editSportAbility(id),
                            trashClicked: (id) => deleteSportAbility(id),
                        },
                    },
                ],
            }}
        />
    </div>)
}