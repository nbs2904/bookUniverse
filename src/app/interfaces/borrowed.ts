import { Book } from "./book";

export interface Borrowed {
    _id: string,
    startDate: string;
    startDateFormatted?: string,
    endDate: string;
    endDateFormatted?: string,
    progress: any;
    book: Book;
}
