export function isFunction(variable) {
    return variable && {}.toString.call(variable) === '[object Function]'
}

export function ucWords(text) {
    return text.toLowerCase().
        split(' ').
        map((s) => s.charAt(0).toUpperCase() + s.substring(1)).
        join(' ')
}

export function nameToLabel(text) {
    
    return ucWords(text.replace('_', ' ').replace('-', ' '))
}
