export interface NotificationType {
    id: number;
    type: "promotion" | "price_drop" | "reminder" | "";
    productName: string;
    offerType: string;
    store: string;
    isRead: boolean;
    date: string;
}
