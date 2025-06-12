import { useState } from "react";
import GridForm from "../../components/gridform/gridForm";
import GridOrganisations from "./gridOrganisations";
function PageOrganisations(props) {
    const [formState, setFormState] = useState('HBASE')
    return (
        <div>
            <GridForm
                setFormState={setFormState}
                formState={formState}
            >
            </GridForm>
            <h4>Egyesületek, szervezetek</h4>
            <GridOrganisations
                setFormState={setFormState}
                formState={formState}
                token={props.token}
                userName={props.userName}
                setOrganisationsComboData={props.setOrganisationsComboData}
            >
            </GridOrganisations>
        </div>

    )
}
export default PageOrganisations;