export interface ExpenseEntry {
    id: number;
    item: string;
    category: string;
    location: string;
    amount: number;
    spentOn: Date;
    createdOn: Date;
}
