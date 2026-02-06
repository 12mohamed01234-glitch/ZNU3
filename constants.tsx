
import React from 'react';
import { 
  UserCircle, 
  FileText, 
  HardDrive, 
  GraduationCap, 
  Stethoscope, 
  Activity, 
  Cpu,
  Newspaper,
  CreditCard,
  Mail,
  Search,
  Book,
  ClipboardCheck,
  Award,
  Users2,
  LifeBuoy
} from 'lucide-react';
import { Service, Faculty, Staff, NavItem, BoardMember, AcademicProgram } from './types';

export const NAV_ITEMS: NavItem[] = [
  { labelAr: 'الرئيسية', labelEn: 'Home', path: '/' },
  { labelAr: 'أخبار الجامعة', labelEn: 'University News', path: '/news' },
  { labelAr: 'مجلس الأمناء', labelEn: 'Board of Trustees', path: '/board' },
  { labelAr: 'الكليات', labelEn: 'Faculties', path: '/faculties' },
  { labelAr: 'السحابة الأكاديمية', labelEn: 'Academic Drive', path: '/academic-drive' },
  { labelAr: 'الهيئة التدريسية', labelEn: 'Staff Directory', path: '/staff' },
  { labelAr: 'النتائج الدراسية', labelEn: 'Results', path: '/results' },
  { labelAr: 'اتصل بنا', labelEn: 'Contact Us', path: '/contact' },
];

export const SERVICES: Service[] = [
  {
    id: 'student-portal',
    titleAr: 'بوابة الخدمات الطلابية الكود الجامعي',
    titleEn: 'Student Services Portal',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135810.png',
    path: '/services/student',
    description: 'الدخول الموحد للخدمات الطلابية'
  },
  {
    id: 'international-admin',
    titleAr: 'إدارة الوافدين',
    titleEn: 'International Students',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/921/921430.png',
    path: 'https://admission.study-in-egypt.gov.eg/',
    description: 'خدمات الطلاب الأجانب والوافدين'
  },
  {
    id: 'unified-info',
    titleAr: 'نظم المعلومات الموحد',
    titleEn: 'Unified Info Systems',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png',
    path: '#',
    description: 'قواعد البيانات المركزية للجامعة'
  },
  {
    id: 'student-results',
    titleAr: 'نتائج الطلاب',
    titleEn: 'Student Results',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/1903/1903162.png',
    path: '/results',
    description: 'الاستعلام عن النتائج الدراسية'
  },
  {
    id: 'payment-platform',
    titleAr: 'منصة الدفع الالكتروني الطلابية',
    titleEn: 'E-Payment Platform',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/2489/2489756.png',
    path: '#',
    description: 'سداد الرسوم الجامعية إلكترونياً'
  },
  {
    id: 'student-email',
    titleAr: 'بريد الطالب الالكتروني',
    titleEn: 'Student Email',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/732/732200.png',
    path: 'https://outlook.office.com/',
    description: 'البريد الجامعي الرسمي للطلاب'
  },
  {
    id: 'elearning-unit',
    titleAr: 'وحدة التعليم الالكتروني والاختبارات',
    titleEn: 'E-Learning Unit',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/2436/2436702.png',
    path: '#',
    description: 'منصة الامتحانات والتعلم عن بعد'
  },
  {
    id: 'surveys',
    titleAr: 'استبيانات الطلاب',
    titleEn: 'Student Surveys',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/2666/2666505.png',
    path: '/evaluation',
    description: 'استطلاع رأي الطلاب في العملية التعليمية'
  },
  {
    id: 'egyptian-kb',
    titleAr: 'بنك المعرفة المصري',
    titleEn: 'Egyptian Knowledge Bank',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/2232/2232688.png',
    path: 'https://www.ekb.eg/',
    description: 'المكتبة الرقمية والبحث العلمي'
  },
  {
    id: 'staff-services',
    titleAr: 'خدمات اعضاء هيئة التدريس',
    titleEn: 'Staff Services',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/3429/3429433.png',
    path: '/staff',
    description: 'البوابة الموحدة للكادر الأكاديمي'
  }
];

export const ACADEMIC_PROGRAMS: AcademicProgram[] = [
  {
    id: 'med-1',
    nameAr: 'برنامج الطب البشرى والجراحة',
    facultyAr: 'كلية الطب البشرى',
    durationAr: '5 سنوات + سنتين امتياز',
    feesAr: 'EGP 150,000 سنوياً',
    descriptionAr: 'تأهيل جيل من الأطباء المبدعين القادرين على المنافسة محلياً ودولياً في مجالات الطب والجراحة.',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1200',
    facultyId: 'medicine'
  }
];

export const FACULTIES: Faculty[] = [
  {
    id: 'medicine',
    nameAr: 'كلية الطب البشري',
    nameEn: 'Faculty of Human Medicine',
    descriptionAr: 'برنامج تعليمي متكامل يهدف لتخريج أطباء مؤهلين لتقديم الرعاية الصحية المتقدمة.',
    descriptionEn: 'Integrated educational program for graduating qualified physicians.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200',
    logo: <Stethoscope className="w-8 h-8" />,
    programsAr: ['برنامج الطب والجراحة']
  }
];

export const STAFF_LIST: Staff[] = [
  {
    id: '1',
    nameAr: 'د. أحمد المحمدي',
    nameEn: 'Dr. Ahmed Al-Mohammadi',
    titleAr: 'أستاذ مشارك - هندسة الحاسوب',
    titleEn: 'Associate Professor - Computer Engineering',
    facultyId: 'computers',
    image: 'https://picsum.photos/seed/staff1/400/500',
    email: 'a.mohammadi@znu.edu.eg'
  }
];

export const BOARD_MEMBERS: BoardMember[] = [
  {
    id: '1',
    name: 'أ.د. محمود إبراهيم ابوالعيون',
    title: 'رئيس مجلس الأمناء',
    description: 'الأستاذ المتفرغ بكلية التجارة جامعة الزقازيق، محافظ البنك المركزي سابقاً',
    image: ''
  }
];
