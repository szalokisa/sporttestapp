import axios from "axios";

function getComboArray(json) {
    let result = [];
    for (var i = 0; i < json.data.data.length; i++) {
        result.push(json.data.data[i].FieldValue)
    }
    return result;
}

export default async function GridComboData(props) {
    const comboDataURL = `${process.env.REACT_APP_API_BASE_URL}/data`
    let ret;

    await axios.get(comboDataURL, {
        headers: {
            'Content-Type': 'application/json',
            'token': props.token,
            'collection': props.collection,
            with0: props.with0,
        },

    }).then((jsonData) => {
        ret = jsonData;
    }).catch((err) => {
        console.error(err);
        ret = {}
    })

    ret = getComboArray(ret);
    return ret;
}