import GridComboData from "./comboData/gridcomboData";

export default async function initComboData(props) {
    const comboAbilitiesProps = {
        token: props.token,
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
        token: props.token,
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
        token: props.token,
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
        token: props.token,
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
        token: props.token,
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
        token: props.token,
        from: 'persons_view_gridCombo',
        select: 'FieldValue',
        language: props.language,
        top: '500',
        where: '',
        groupby: '',
        orderby: 'FieldValue',
        with0: 'true',
    }

    const comboTestTemplatesProps = {
        token: props.token,
        from: 'templates_view_gridCombo',
        select: 'FieldValue',
        language: props.language,
        top: '500',
        where: '',
        groupby: '',
        orderby: 'FieldValue',
        with0: 'true',
    }

    let returnData;
    if (props.comboCode === "Abilities") {
        returnData = await GridComboData(comboAbilitiesProps);
    }
    if (props.comboCode === "Unit") {
        returnData = await GridComboData(comboUnitProps);
    }
    if (props.comboCode === "Organisations") {
        returnData = await GridComboData(comboOrganisationsProps);
    }
    if (props.comboCode === "Gendesr") {
        returnData = await GridComboData(comboGendersProps);
    }
    if (props.comboCode === "Exercises") {
        returnData = await GridComboData(comboExercisesProps);
    }
    if (props.comboCode === "Persons") {
        returnData = await GridComboData(comboPersonsProps);
    }
    if (props.comboCode === "TestTemplates") {
        returnData = await GridComboData(comboTestTemplatesProps);
    }
    return returnData;
}