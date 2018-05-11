const defaultFilters = {
    dateRange: {
        from: null,
        to: null
    }
}
export default function(filters = defaultFilters, action) {
    const {type, payload} = action;
    switch (type) {
        case 'CHANGERANGE': return {
           dateRange: payload
        }
    }

    return filters;
}