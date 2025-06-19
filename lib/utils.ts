import crypto from 'crypto';

export const formatDate = (rawDate?: Date) => {
    if (!rawDate) return '';
    const dObj = new Date(rawDate);
    const yyyy=String(dObj.getFullYear());
    const mm=String(dObj.getMonth() + 1).padStart(2, '0');
    const dd=String(dObj.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;
};

export const generateSaltedHash = (pw: string): string => {
    const pwSalt = process.env.PW_SALT;
    if(pwSalt === undefined) {
        throw new Error('PW_SALT is not set');
    }

    const hashedPassword = crypto.createHmac('sha256', pwSalt).update(pw).digest('hex');
    return hashedPassword;
}