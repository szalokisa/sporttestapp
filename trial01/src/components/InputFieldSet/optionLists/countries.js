import {countries} from '../../localDb';

export const optionListCountries = countries.map(country => ({value: country.code, text: `${country.code} - ${country.name}`, textForGrid: `${country.code}`}));
