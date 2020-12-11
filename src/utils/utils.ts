export const formatNumber = (val: string | number): string => {
    if (typeof val === 'number') val = val.toString()
    if (val === '') return val

    return '$' + val
}

export const currency = (val: string | number): string => {
    if (typeof val === 'number') val = val.toString()
    if (val === '') return val

    return val.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export const formatCurrency = (val: string | number): string => {
    val = typeof val === 'number' ? val.toFixed(2) : parseFloat(val).toFixed(2)

    return currency(formatNumber(val))
}

export const underscore = (str: string): string => {
    return str.replace(/[\w]([A-Z])/g, (m: string) => m[0] + '_' + m[1]).toLowerCase()
}

export const scrollTo = (id: string): void => {
    let el = document.getElementById(id)

    if (!el) {
        const classList = document.getElementsByClassName(id)
        if (classList.length > 0) el = classList[0] as HTMLElement
    }

    if (el) {
        console.log(el.offsetTop)
        console.log(window.scrollY)
        // el.scrollIntoView({ behavior: 'smooth' })
        window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
    }
}

export const normaliseCurrency = (amount: string) => {
    return amount.replace(/[$,]+/g, '').replace(/(\.\d{2})(\d+)/g, '$1')
}

export const getCookie = (name: string) => {
    const pair = document.cookie.match(new RegExp(name + '=([^;]+)'))
    return pair ? pair[1] : null
}
