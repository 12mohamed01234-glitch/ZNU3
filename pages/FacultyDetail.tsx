
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FACULTIES, STAFF_LIST } from '../constants';
import { ChevronLeft, GraduationCap, Users, BookOpen, Clock, MapPin, CheckCircle2 } from 'lucide-react';

const FacultyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const faculty = FACULTIES.find(f => f.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!faculty) {
      navigate('/faculties');
    }
  }, [faculty, navigate]);

  if (!faculty) return null;

  const getFacultyDuration = (fid: string) => {
    switch (fid) {
      case 'medicine': return '5 سنوات + سنتين امتياز';
      case 'pharmacy': return '5 سنوات + سنة امتياز';
      case 'dentistry': return '5 سنوات + سنة امتياز';
      case 'eng': return '5 سنوات دراسية';
      case 'nursing': return '4 سنوات دراسية';
      default: return '4 سنوات دراسية';
    }
  };

  return (
    <div className="animate-in fade-in duration-700 pb-20">
      {/* Header Banner */}
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img 
          src={faculty.image} 
          alt={faculty.nameAr} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        <div className="absolute bottom-10 right-10 left-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-6 mb-6">
            <div className="p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white">
              {faculty.logo}
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{faculty.nameAr}</h1>
              <p className="text-emerald-400 font-bold text-sm tracking-[0.2em] uppercase">{faculty.nameEn}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 md:px-10 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Info Side */}
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">نبذة عن الكلية</h2>
              <p className="text-slate-600 text-lg leading-[2] font-normal mb-10">
                {faculty.descriptionAr} تهدف الكلية إلى تقديم برامج تعليمية متميزة تواكب متطلبات العصر وتؤهل الطلاب لسوق العمل المحلي والدولي من خلال بيئة تعليمية محفزة للابتكار والبحث العلمي.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h3 className="font-bold text-slate-900 flex items-center gap-3 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    البرامج الأكاديمية
                  </h3>
                  <ul className="space-y-3">
                    {faculty.programsAr.map((prog, i) => (
                      <li key={i} className="text-sm font-bold text-slate-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                        {prog}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h3 className="font-bold text-slate-900 flex items-center gap-3 mb-4">
                    <Users className="w-5 h-5 text-blue-500" />
                    الهيئة التدريسية
                  </h3>
                  <p className="text-sm text-slate-500 mb-4 leading-relaxed">تضم الكلية نخبة من الأساتذة والخبراء في مختلف التخصصات العلمية والبحثية.</p>
                  <Link to="/staff" className="text-blue-600 font-bold text-xs hover:underline">عرض جميع أعضاء هيئة التدريس</Link>
                </div>
              </div>
            </div>

            {/* Curriculum Summary Section */}
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100">
               <h2 className="text-2xl font-bold text-slate-900 mb-8">نظام الدراسة</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-6 h-6 text-slate-400" />
                    </div>
                    <h4 className="font-bold text-sm mb-1">مدة الدراسة</h4>
                    <p className="text-xs text-slate-500">{getFacultyDuration(faculty.id)}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <GraduationCap className="w-6 h-6 text-slate-400" />
                    </div>
                    <h4 className="font-bold text-sm mb-1">الدرجة العلمية</h4>
                    <p className="text-xs text-slate-500">بكالوريوس {faculty.nameAr}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-6 h-6 text-slate-400" />
                    </div>
                    <h4 className="font-bold text-sm mb-1">المقر</h4>
                    <p className="text-xs text-slate-500">مبنى {faculty.id.toUpperCase()} - الحرم الرئيسي</p>
                  </div>
               </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            <div className="bg-[#1a365d] text-white p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full opacity-10">
                 <BookOpen className="w-40 h-40 -translate-x-10 translate-y-20 rotate-12" />
               </div>
               <div className="relative z-10">
                 <h3 className="text-xl font-bold mb-6 leading-tight">شروط القبول والالتحاق بالكلية</h3>
                 <ul className="space-y-4 text-sm font-medium text-slate-300">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full mt-1.5 shrink-0"></span>
                      الحصول على شهادة الثانوية العامة أو ما يعادلها.
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full mt-1.5 shrink-0"></span>
                      تحقيق الحد الأدنى للمجموع المطلوب للكلية.
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full mt-1.5 shrink-0"></span>
                      اجتياز اختبارات القدرات والمقابلة الشخصية.
                    </li>
                 </ul>
                 <Link to="/contact" className="mt-10 w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95">
                    طلب التحاق بالبرنامج
                 </Link>
               </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
               <h3 className="font-bold text-slate-900 mb-6">روابط هامة</h3>
               <div className="space-y-3">
                 <Link to="/academic-drive" className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                    <span className="text-sm font-bold">السحابة الأكاديمية</span>
                    <ChevronLeft className="w-4 h-4 text-slate-400" />
                 </Link>
                 <Link to="/results" className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                    <span className="text-sm font-bold">النتائج الدراسية</span>
                    <ChevronLeft className="w-4 h-4 text-slate-400" />
                 </Link>
                 <Link to="/staff" className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                    <span className="text-sm font-bold">هيئة التدريس</span>
                    <ChevronLeft className="w-4 h-4 text-slate-400" />
                 </Link>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FacultyDetail;
