export interface Book {
    _id: string;
    title: string;
    subtitle?: string;
    pageCount: number;
    ISBN13: string;
    coverUrl: string;
    authors: string[];
    language: string;
    description: string;
    genres?:  string[];
}