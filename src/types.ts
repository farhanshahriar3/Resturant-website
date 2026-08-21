export type MenuCategoryId = 'all' | 'breakfast' | 'sweets' | 'bistro' | 'beverages' | 'specials' | 'vegan';

export interface MenuItem {
  id: string;
  name: string;
  hindiName?: string;
  category: MenuCategoryId;
  price: number;
  description: string;
  image: string;
  isSpecial?: boolean;
  isVeg?: boolean;
  isVegan?: boolean;
  preparationTime?: string;
  rating?: number;
  reviewCount?: number;
  tags?: string[];
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  favoriteDish: string;
  verifiedVisit: boolean;
}

export interface TableReservation {
  name: string;
  email: string;
  phone?: string;
  guests: number;
  date: string;
  time: string;
  seatingArea: 'indoor' | 'patio' | 'private_lounge' | 'any';
  occasion?: string;
  specialRequests?: string;
}
