import exlamationIcon from './exlamationIcon.svg';

export default function GroupExlamation(params) {
    function hasError() {
        if (!params?.errors) {
            return {};
        }

        let filteredErrors = Object.keys(params.errors).filter(key => (params.errors[key]));

        if (params?.fields) {
            filteredErrors = filteredErrors.filter(fieldName => {
                const field = params.fields.find(field => (field.name === fieldName))
                if (!field) {
                    return false;
                }

                if (params?.fieldGroups) {
                    if (!field?.fieldGroup) {
                        return false;
                    }

                    return params.fieldGroups.some(fieldGroup => (fieldGroup === field.fieldGroup));
                }
            })
        }

        return (filteredErrors.length > 0)
    }

    if (!hasError()) {
        return null;
    }

    return (
        <div className="groupExlamation">
            <img src={exlamationIcon} />
        </div>
    );
}