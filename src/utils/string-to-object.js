export const convertStringToObject = (listElementsString) => {
    if (!listElementsString) return []
    else if (listElementsString.indexOf(',') === -1) {
        const temp = listElementsString.split('$')
        return [{ id: temp[0], name: temp[1].replace(/ /g, '') }]
    }
    return listElementsString?.split(',')?.map((clubInfo) => {
        const temp = clubInfo.split('$')
        return { id: temp[0], name: temp[1] }
    })
}