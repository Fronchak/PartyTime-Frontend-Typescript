export const toDataFormated = (dateString: string): string => {
    let date = new Date(dateString);
    date = new Date(date.getTime() + 3 * 1000 * 60 * 60);
    return date.toLocaleDateString()
}