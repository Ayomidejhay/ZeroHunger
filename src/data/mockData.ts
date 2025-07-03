import { User, Donor, NGO, FoodItem, Notification } from '../types';

// Mock Users (Donors and NGOs)
export const mockUsers: (Donor | NGO)[] = [
  {
    id: 'donor-1',
    name: 'Fresh Harvest Market',
    email: 'info@freshharvestmarket.com',
    role: 'donor',
    location: 'New York, NY',
    profileImage: 'https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg?auto=compress&cs=tinysrgb&w=600',
    phoneNumber: '(212) 555-1234',
    createdAt: '2024-01-15T10:30:00Z',
    businessType: 'supermarket',
    businessName: 'Fresh Harvest Market',
    businessAddress: '123 Main St, New York, NY 10001',
    donationsCount: 27
  },
  {
    id: 'donor-2',
    name: 'Bistro Bella',
    email: 'contact@bistrobella.com',
    role: 'donor',
    location: 'San Francisco, CA',
    profileImage: 'https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg?auto=compress&cs=tinysrgb&w=600',
    phoneNumber: '(415) 555-6789',
    createdAt: '2024-02-10T15:45:00Z',
    businessType: 'restaurant',
    businessName: 'Bistro Bella',
    businessAddress: '456 Market St, San Francisco, CA 94105',
    donationsCount: 15
  },
  {
    id: 'ngo-1',
    name: 'Community Food Bank',
    email: 'info@communityfoodbank.org',
    role: 'ngo',
    location: 'Chicago, IL',
    profileImage: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600',
    phoneNumber: '(312) 555-4321',
    createdAt: '2024-01-05T09:15:00Z',
    organizationName: 'Community Food Bank',
    organizationAddress: '789 Oak St, Chicago, IL 60607',
    missionStatement: 'Providing healthy food to those in need throughout Chicago communities.',
    claimsCount: 42
  },
  {
    id: 'ngo-2',
    name: 'Hope Outreach Center',
    email: 'contact@hopeoutreach.org',
    role: 'ngo',
    location: 'Austin, TX',
    profileImage: 'https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=600',
    phoneNumber: '(512) 555-8765',
    createdAt: '2024-02-20T11:20:00Z',
    organizationName: 'Hope Outreach Center',
    organizationAddress: '321 Pine St, Austin, TX 78701',
    missionStatement: 'Connecting communities and distributing resources to those most vulnerable.',
    claimsCount: 18
  }
];

// Mock Food Items
export const mockFoodItems: FoodItem[] = [
  {
    id: 'food-1',
    donorId: 'donor-1',
    donorName: 'Fresh Harvest Market',
    title: 'Assorted Fresh Produce',
    description: 'Variety of fruits and vegetables including apples, bananas, carrots, and lettuce. All items are still fresh but won\'t make it to the next day of sales.',
    category: 'Produce',
    quantity: 25,
    quantityUnit: 'kg',
    expiryDate: '2025-07-15T23:59:59Z',
    pickupAddress: '123 Main St, New York, NY 10001',
    pickupInstructions: 'Please use the service entrance at the back of the store. Ask for Manager on duty.',
    pickupTimeStart: '2025-07-14T17:00:00Z',
    pickupTimeEnd: '2025-07-14T19:00:00Z',
    images: [
      'https://images.pexels.com/photos/1458694/pexels-photo-1458694.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2733918/pexels-photo-2733918.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    status: 'available',
    createdAt: '2025-07-14T10:30:00Z',
    updatedAt: '2025-07-14T10:30:00Z'
  },
  {
    id: 'food-2',
    donorId: 'donor-2',
    donorName: 'Bistro Bella',
    title: 'Prepared Meals - Pasta and Salad',
    description: 'Leftover prepared pasta dishes and fresh salad from catering event. Food has been properly stored and refrigerated. Enough to feed approximately 15-20 people.',
    category: 'Prepared Meals',
    quantity: 10,
    quantityUnit: 'meals',
    expiryDate: '2025-07-15T12:00:00Z',
    pickupAddress: '456 Market St, San Francisco, CA 94105',
    pickupInstructions: 'Come to the main entrance and ask for Chef Maria.',
    pickupTimeStart: '2025-07-14T21:00:00Z',
    pickupTimeEnd: '2025-07-14T22:00:00Z',
    images: [
      'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    status: 'claimed',
    claimedBy: 'ngo-1',
    claimedAt: '2025-07-14T12:45:00Z',
    createdAt: '2025-07-14T11:30:00Z',
    updatedAt: '2025-07-14T12:45:00Z'
  },
  {
    id: 'food-3',
    donorId: 'donor-1',
    donorName: 'Fresh Harvest Market',
    title: 'Bakery Items - Bread and Pastries',
    description: 'Day-old bread, rolls, and various pastries. All items are still good quality but won\'t be sold the next day.',
    category: 'Bakery',
    quantity: 15,
    quantityUnit: 'kg',
    expiryDate: '2025-07-16T23:59:59Z',
    pickupAddress: '123 Main St, New York, NY 10001',
    pickupInstructions: 'Please use the service entrance at the back of the store. Ask for Manager on duty.',
    pickupTimeStart: '2025-07-15T17:00:00Z',
    pickupTimeEnd: '2025-07-15T19:00:00Z',
    images: [
      'https://images.pexels.com/photos/1756061/pexels-photo-1756061.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    status: 'completed',
    claimedBy: 'ngo-2',
    claimedAt: '2025-07-15T09:15:00Z',
    completedAt: '2025-07-15T18:30:00Z',
    createdAt: '2025-07-15T08:30:00Z',
    updatedAt: '2025-07-15T18:30:00Z'
  },
  {
    id: 'food-4',
    donorId: 'donor-2',
    donorName: 'Bistro Bella',
    title: 'Surplus Soups and Stews',
    description: 'Homemade vegetable soup and beef stew. Properly stored and ready for immediate pickup.',
    category: 'Prepared Meals',
    quantity: 20,
    quantityUnit: 'liters',
    expiryDate: '2025-07-16T12:00:00Z',
    pickupAddress: '456 Market St, San Francisco, CA 94105',
    pickupInstructions: 'Come to the main entrance and ask for Chef Maria.',
    pickupTimeStart: '2025-07-15T21:00:00Z',
    pickupTimeEnd: '2025-07-15T22:00:00Z',
    images: [
      'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    status: 'available',
    createdAt: '2025-07-15T14:00:00Z',
    updatedAt: '2025-07-15T14:00:00Z'
  },
  {
    id: 'food-5',
    donorId: 'donor-1',
    donorName: 'Fresh Harvest Market',
    title: 'Dairy Products',
    description: 'Assorted dairy products including milk, yogurt, and cheese with approaching sell-by dates. All items still good for consumption.',
    category: 'Dairy',
    quantity: 12,
    quantityUnit: 'kg',
    expiryDate: '2025-07-17T23:59:59Z',
    pickupAddress: '123 Main St, New York, NY 10001',
    pickupInstructions: 'Please use the service entrance at the back of the store. Ask for Manager on duty.',
    pickupTimeStart: '2025-07-16T17:00:00Z',
    pickupTimeEnd: '2025-07-16T19:00:00Z',
    images: [
      'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    status: 'expired',
    createdAt: '2025-07-16T08:30:00Z',
    updatedAt: '2025-07-18T00:00:01Z'
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notification-1',
    userId: 'ngo-1',
    title: 'New Food Donation Available',
    message: 'Fresh Harvest Market has posted new food items: Assorted Fresh Produce',
    read: false,
    type: 'new-listing',
    relatedItemId: 'food-1',
    createdAt: '2025-07-14T10:35:00Z'
  },
  {
    id: 'notification-2',
    userId: 'donor-2',
    title: 'Your Donation Has Been Claimed',
    message: 'Community Food Bank has claimed your donation: Prepared Meals - Pasta and Salad',
    read: true,
    type: 'claim',
    relatedItemId: 'food-2',
    createdAt: '2025-07-14T12:50:00Z'
  },
  {
    id: 'notification-3',
    userId: 'ngo-2',
    title: 'Pickup Reminder',
    message: 'Don\'t forget to pick up your claimed items from Fresh Harvest Market today between 5:00 PM and 7:00 PM.',
    read: false,
    type: 'pickup-reminder',
    relatedItemId: 'food-3',
    createdAt: '2025-07-15T10:00:00Z'
  },
  {
    id: 'notification-4',
    userId: 'donor-1',
    title: 'Donation Successfully Completed',
    message: 'Hope Outreach Center has completed the pickup of your donation: Bakery Items - Bread and Pastries',
    read: false,
    type: 'system',
    relatedItemId: 'food-3',
    createdAt: '2025-07-15T18:35:00Z'
  },
  {
    id: 'notification-5',
    userId: 'ngo-1',
    title: 'New Food Donation Available',
    message: 'Bistro Bella has posted new food items: Surplus Soups and Stews',
    read: false,
    type: 'new-listing',
    relatedItemId: 'food-4',
    createdAt: '2025-07-15T14:05:00Z'
  }
];