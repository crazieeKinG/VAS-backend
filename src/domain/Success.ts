export default interface Success<T> {
    data?: T | T[];
    message: string;
}
