import axios from "axios";

export default async function ComboData(props) {
    const comboDataURL = `${process.env.REACT_APP_API_BASE_URL}/combodata`
    let ret;
    await axios.put(comboDataURL, {
        header: {
            'Content-Type': 'application/json',
            token: props.loginData.token,
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
        ret = jsonData.data.data;
    }).catch((err) => {
        console.error(err);
        ret = {}
    })
    return ret;
}