export const required = value => (value || typeof value === 'number' ? undefined : 'Required');

const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined;

const minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined;

export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined;

export const tooYoung = value =>
    value && value < 13
        ? 'You do not meet the minimum age requirement!'
        : undefined;

export const maxLength15= maxLength(15);
export const maxLength100= maxLength(100);

export const minLength2= minLength(2);