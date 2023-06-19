import axios from "axios";

export default async function GridComboData(props) {
    const comboDataURL = `${process.env.REACT_APP_API_BASE_URL}/gridcombodata`
    let ret;
    await axios.put(comboDataURL, {
        header: {
            'Content-Type': 'application/json',
            token: props.token,
            from: props.from,
            select: props.select,
            language: props.language,
            top: props.top,
            where: props.where,
            groupby: props.groupby,
            orderby: props.orderby,
            with0: props.with0,
        },

    }).then((jsonData) => {
        ret = jsonData;
    }).catch((err) => {
        console.error(err);
        ret = {}
    })
    return ret;
}