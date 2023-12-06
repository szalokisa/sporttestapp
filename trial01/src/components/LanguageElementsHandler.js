export default class LanguageElementsHandler {
    constructor(languageElements, currentLanguage) {
        this.setLanguageElements(languageElements);
        this.setLanguage(currentLanguage);
    }

    setLanguage(language) {
        this.currentLanguage = language;
    }

    setLanguageElements(languageElements) {
        this.languageElements = languageElements;
    }

    get(key) {
        let element = this.languageElements?.['items']?.[key]?.[this.currentLanguage];
        return element === undefined ? `###_${key}` : element;
    }
}
