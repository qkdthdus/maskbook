export const formatDate = (rawDate?: Date) => {
    if (!rawDate) return '';
    const dObj = new Date(rawDate);
    const yyyy=String(dObj.getFullYear());
    const mm=String(dObj.getMonth() + 1).padStart(2, '0');
    const dd=String(dObj.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;
};