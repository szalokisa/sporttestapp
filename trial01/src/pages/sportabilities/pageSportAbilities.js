import { useState } from "react";
import GridForm from "../../components/gridform/gridForm";
import GridSportAbilities from "./gridSportAbilities";
function PageSportAbilities(props) {
    const [formState, setFormState] = useState('HBASE')
    return (
        <div>
            <GridForm
                setFormState={setFormState}
                formState={formState}
            >
            </GridForm>
            <h4>Sport képességek</h4>
            <GridSportAbilities
                setFormState={setFormState}
                formState={formState}
                token={props.token}
                userName={props.userName}
                setSportAbilitiesComboData={props.setSportAbilitiesComboData}
            >
            </GridSportAbilities>
        </div>

    )
}
export default PageSportAbilities;