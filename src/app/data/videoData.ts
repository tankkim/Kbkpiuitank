export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number; // in seconds
  category: string;
  uploadedBy: string;
  uploadedDate: string;
  viewCount: number;
  isRequired: boolean;
}

export interface VideoWatchRecord {
  videoId: string;
  employeeId: string;
  employeeName: string;
  position: string;
  branch: string;
  watchedAt: string;
  watchDuration: number; // how long they watched in seconds
  completionRate: number; // percentage
  watchCount: number; // how many times they watched
}

export const trainingVideos: Video[] = [
  {
    id: 'v1',
    title: 'KPI System Overview',
    description: 'Comprehensive introduction to the KB Indonesia Bank KPI management system',
    thumbnailUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: 840, // 14 minutes
    category: 'Orientation',
    uploadedBy: 'HR Department',
    uploadedDate: '2026-01-02',
    viewCount: 245,
    isRequired: true,
  },
  {
    id: 'v2',
    title: 'Sales Target Achievement Strategies',
    description: 'Best practices for meeting and exceeding your sales targets',
    thumbnailUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: 1200, // 20 minutes
    category: 'Sales',
    uploadedBy: 'Sales Training Team',
    uploadedDate: '2026-01-05',
    viewCount: 189,
    isRequired: true,
  },
  {
    id: 'v3',
    title: 'Customer Service Excellence',
    description: 'Delivering exceptional customer service in banking',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: 960, // 16 minutes
    category: 'Customer Service',
    uploadedBy: 'Customer Experience Team',
    uploadedDate: '2026-01-03',
    viewCount: 203,
    isRequired: false,
  },
  {
    id: 'v4',
    title: 'Compliance & Risk Management',
    description: 'Understanding regulatory requirements and risk mitigation',
    thumbnailUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: 1380, // 23 minutes
    category: 'Compliance',
    uploadedBy: 'Compliance Department',
    uploadedDate: '2025-12-28',
    viewCount: 312,
    isRequired: true,
  },
  {
    id: 'v5',
    title: 'Digital Banking Products',
    description: 'Introduction to our digital banking solutions and services',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: 720, // 12 minutes
    category: 'Product Knowledge',
    uploadedBy: 'Product Team',
    uploadedDate: '2026-01-06',
    viewCount: 156,
    isRequired: false,
  },
  {
    id: 'v6',
    title: 'Effective Team Collaboration',
    description: 'Building strong teams and improving collaboration',
    thumbnailUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: 900, // 15 minutes
    category: 'Leadership',
    uploadedBy: 'Leadership Development',
    uploadedDate: '2026-01-04',
    viewCount: 178,
    isRequired: false,
  },
];

export const videoWatchRecords: VideoWatchRecord[] = [
  {
    videoId: 'v1',
    employeeId: 'E001',
    employeeName: 'John Doe',
    position: 'Branch Manager',
    branch: 'Jakarta Central',
    watchedAt: '2026-01-08 09:30:00',
    watchDuration: 840,
    completionRate: 100,
    watchCount: 2,
  },
  {
    videoId: 'v1',
    employeeId: 'E002',
    employeeName: 'Jane Smith',
    position: 'Sales Officer',
    branch: 'Jakarta Central',
    watchedAt: '2026-01-08 14:15:00',
    watchDuration: 420,
    completionRate: 50,
    watchCount: 1,
  },
  {
    videoId: 'v2',
    employeeId: 'E001',
    employeeName: 'John Doe',
    position: 'Branch Manager',
    branch: 'Jakarta Central',
    watchedAt: '2026-01-07 10:00:00',
    watchDuration: 1200,
    completionRate: 100,
    watchCount: 1,
  },
  {
    videoId: 'v2',
    employeeId: 'E003',
    employeeName: 'Mike Johnson',
    position: 'Customer Service',
    branch: 'Surabaya',
    watchedAt: '2026-01-06 16:45:00',
    watchDuration: 900,
    completionRate: 75,
    watchCount: 1,
  },
  {
    videoId: 'v3',
    employeeId: 'E003',
    employeeName: 'Mike Johnson',
    position: 'Customer Service',
    branch: 'Surabaya',
    watchedAt: '2026-01-05 11:20:00',
    watchDuration: 960,
    completionRate: 100,
    watchCount: 1,
  },
  {
    videoId: 'v4',
    employeeId: 'E001',
    employeeName: 'John Doe',
    position: 'Branch Manager',
    branch: 'Jakarta Central',
    watchedAt: '2026-01-04 13:30:00',
    watchDuration: 1380,
    completionRate: 100,
    watchCount: 1,
  },
];

// Mock current user's watch records
export const myVideoWatchRecords: { [videoId: string]: VideoWatchRecord } = {
  'v1': {
    videoId: 'v1',
    employeeId: 'E001',
    employeeName: 'John Doe',
    position: 'Branch Manager',
    branch: 'Jakarta Central',
    watchedAt: '2026-01-08 09:30:00',
    watchDuration: 840,
    completionRate: 100,
    watchCount: 2,
  },
  'v2': {
    videoId: 'v2',
    employeeId: 'E001',
    employeeName: 'John Doe',
    position: 'Branch Manager',
    branch: 'Jakarta Central',
    watchedAt: '2026-01-07 10:00:00',
    watchDuration: 1200,
    completionRate: 100,
    watchCount: 1,
  },
  'v4': {
    videoId: 'v4',
    employeeId: 'E001',
    employeeName: 'John Doe',
    position: 'Branch Manager',
    branch: 'Jakarta Central',
    watchedAt: '2026-01-04 13:30:00',
    watchDuration: 1380,
    completionRate: 100,
    watchCount: 1,
  },
};
