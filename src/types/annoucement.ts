export interface Announcement {
  id: string;
  title: string;
  body: string;
  imageUrl?: string;
  isRead?: boolean;
  targetCategories?: string[] | null;
  targetType?: string;
  targetUserIds?: string[] | null;
  timestamp?: any;
}