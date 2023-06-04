export const isBlank = (text: string | undefined) => {
    return text?.trim() ? false : true;
}

export const cleanString = (text: string) => {
    return text.trim().replace(/\s{2,}/g, " ");
}

export const isEmail = (text: string | undefined) => {
    const match = text?.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
    return match ? true : false;
}