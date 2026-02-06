
import React from 'react';

export interface Service {
  id: string;
  titleAr: string;
  titleEn: string;
  icon?: React.ReactNode;
  imageUrl?: string;
  path: string;
  description: string;
}

export interface NewsPost {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
  image?: string;
  video?: string;
  attachment?: {
    name: string;
    url: string;
    size: string;
  };
}

export interface AcademicProgram {
  id: string;
  nameAr: string;
  facultyAr: string;
  durationAr: string;
  feesAr: string;
  descriptionAr: string;
  image: string;
  facultyId: string;
}

export interface Faculty {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  image: string;
  logo: React.ReactNode;
  programsAr: string[];
}

export interface Staff {
  id: string;
  nameAr: string;
  nameEn: string;
  titleAr: string;
  titleEn: string;
  facultyId: string;
  image: string;
  email: string;
}

export interface BoardMember {
  id: string;
  name: string;
  title: string;
  description?: string;
  image: string;
}

export enum Language {
  AR = 'ar',
  EN = 'en'
}

export interface NavItem {
  labelAr: string;
  labelEn: string;
  path: string;
}
