import "./PageLogin.scss";
import Infobox from '../../components/infobox/Infobox';
import LoginForm from "./FormLogin";
import GridComboData from "../../components/comboData/gridcomboData";

export default function PageLogin(props) {
    function onLogin(newLoginData) {
        props.onLogin(newLoginData)
        initCombo(newLoginData)
    }

    async function initCombo(loginData) {
        const comboAbilitiesProps = {
            token: loginData.token,
            from: 'sportabilities_view_gridCombo',
            select: 'FieldValue',
            language: props.language,
            top: '500',
            where: '',
            groupby: '',
            orderby: 'FieldValue',
            with0: 'true',
        };

        const comboUnitProps = {
            token: loginData.token,
            from: 'units_view_gridCombo',
            select: 'FieldValue',
            language: props.language,
            top: '500',
            where: '',
            groupby: '',
            orderby: 'FieldValue',
            with0: 'true',
        }

        const comboOrganisationsProps = {
            token: loginData.token,
            from: 'organisations_view_gridCombo',
            select: 'FieldValue',
            language: props.language,
            top: '500',
            where: '',
            groupby: '',
            orderby: 'FieldValue',
            with0: 'true',
        }

        const comboGendersProps = {
            token: loginData.token,
            from: 'genders_view_gridCombo',
            select: 'FieldValue',
            language: props.language,
            top: '500',
            where: '',
            groupby: '',
            orderby: 'FieldValue',
            with0: 'true',
        }

        const comboExercisesProps = {
            token: loginData.token,
            from: 'exercises_view_gridCombo',
            select: 'FieldValue',
            language: props.language,
            top: '500',
            where: '',
            groupby: '',
            orderby: 'FieldValue',
            with0: 'true',
        }

        const comboPersonsProps = {
            token: loginData.token,
            from: 'persons_view_gridCombo',
            select: 'FieldValue',
            language: props.language,
            top: '500',
            where: '',
            groupby: '',
            orderby: 'FieldValue',
            with0: 'true',
        }

        const combotestTemplatesProps = {
            token: loginData.token,
            from: 'templates_view_gridCombo',
            select: 'FieldValue',
            language: props.language,
            top: '500',
            where: '',
            groupby: '',
            orderby: 'FieldValue',
            with0: 'true',
        }
        const sportAbilitiesComboData = await GridComboData(comboAbilitiesProps);
        const unitComboData = await GridComboData(comboUnitProps);
        const gendersComboData = await GridComboData(comboGendersProps);
        const organisationsComboData = await GridComboData(comboOrganisationsProps);
        const exercisesComboData = await GridComboData(comboExercisesProps);
        const personsComboData = await GridComboData(comboPersonsProps);
        const testTemplatesComboData = await GridComboData(combotestTemplatesProps);
        props.setSportAbilitiesComboData(sportAbilitiesComboData);
        props.setUnitComboData(unitComboData);
        props.setGendersComboData(gendersComboData);
        props.setOrganisationsComboData(organisationsComboData);
        props.setExercisesComboData(exercisesComboData);
        props.setpersonsComboData(personsComboData);
        props.settestTemplatesComboData(testTemplatesComboData);
        return sportAbilitiesComboData;
    }

    const infobox =
        <LoginForm
            language={props.language}
            settings={props.settings}
            loginData={props.loginData}
            onLogin={newLoginData => onLogin(newLoginData)}
        />

    return (
        <div className="page-login">
            <main>
                <Infobox
                    left={"150px"}
                    top={"50px"}
                    info={infobox}
                />
            </main>
        </div>
    )
}
