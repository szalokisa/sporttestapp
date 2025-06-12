import { useState } from "react";
import GridForm from "../../components/gridform/gridForm";
import GridPersons from "./gridPersons";
function PagePerons(props) {
    const [formState, setFormState] = useState('HBASE')
    return (
        <div>
            <GridForm
                setFormState={setFormState}
                formState={formState}
            >
            </GridForm>
            <h4>Sportolók, személyek</h4>
            <GridPersons
                setFormState={setFormState}
                formState={formState}
                token={props.token}
                language={props.language}
                userName={props.userName}
                setPersonsComboData={props.setPersonsComboData}
                gendersComboData={props.gendersComboData}
                organisationsComboData={props.organisationsComboData}
            >
            </GridPersons>
        </div>

    )
}
export default PagePerons;