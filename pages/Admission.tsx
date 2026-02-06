
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  ClipboardList, 
  UserCheck, 
  ShieldCheck, 
  ChevronLeft, 
  GraduationCap, 
  Building2,
  Clock,
  Wallet,
  Settings2,
  CheckCircle
} from 'lucide-react';
import { ACADEMIC_PROGRAMS } from '../constants';
import { AcademicProgram } from '../types';

const Admission: React.FC = () => {
  const [programs, setPrograms] = useState<AcademicProgram[]>(ACADEMIC_PROGRAMS);
  const [isAdminMode, setIsAdminMode] = useState(false);
  
  const steps = [
    { title: 'التسجيل الإلكتروني', desc: 'تعبئة استمارة التقديم.', icon: <FileText className="w-4 h-4" />, color: 'blue' },
    { title: 'رفع المستندات', desc: 'إرفاق صور الشهادات.', icon: <ClipboardList className="w-4 h-4" />, color: 'emerald' },
    { title: 'سداد الرسوم', desc: 'دفع الرسوم بنكياً.', icon: <ShieldCheck className="w-4 h-4" />, color: 'amber' },
    { title: 'المقابلة الشخصية', desc: 'حضور المقابلة.', icon: <UserCheck className="w-4 h-4" />, color: 'rose' },
  ];

  const handleUpdateProgram = (id: string, field: keyof AcademicProgram, value: string) => {
    setPrograms(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  return (
    <div className="animate-in fade-in duration-700 pb-20 bg-white min-h-screen">
      
      {/* Light Header - Smaller padding */}
      <section className="bg-slate-50 py-16 px-8 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100/40 rounded-full blur-[80px] -translate-y-1/2"></div>
        <div className="relative z-10">
          <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-blue-600 mx-auto mb-5 border border-slate-100">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">القبول والتسجيل</h1>
          <p className="text-xs text-slate-500 max-w-sm mx-auto font-bold uppercase tracking-tight">بوابة الالتحاق بالعام الجامعي الجديد</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-5 -mt-8 relative z-20">
        
        {/* Roadmap - Compact */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-100 p-8 md:p-10 border border-slate-50 mb-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative text-center space-y-3">
                <div className={`w-10 h-10 mx-auto rounded-xl flex items-center justify-center text-${step.color}-600 bg-${step.color}-50 shadow-inner transition-transform`}>
                  {step.icon}
                </div>
                <h3 className="font-bold text-slate-900 text-xs">{step.title}</h3>
                <p className="text-[10px] text-slate-400 font-bold leading-tight">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Programs Grid */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div className="text-right">
              <h2 className="text-2xl font-black text-slate-900 mb-1">البرامج المتاحة</h2>
              <p className="text-slate-500 font-bold text-[11px]">اختر برنامجك الدراسي المفضل وابدأ التقديم</p>
            </div>
            
            <button onClick={() => setIsAdminMode(!isAdminMode)} className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black hover:bg-slate-200 transition-all">
              {isAdminMode ? <CheckCircle className="w-3 h-3" /> : <Settings2 className="w-3 h-3" />}
              {isAdminMode ? 'حفظ التعديلات' : 'وضع التحرير'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => (
              <div key={program.id} className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-100 flex flex-col group hover:shadow-xl transition-all">
                <div className="relative h-44 overflow-hidden">
                  <img src={program.image} alt={program.nameAr} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-[9px] font-black text-blue-600 shadow-sm uppercase tracking-tighter">
                    {program.id.split('-')[0]}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  {isAdminMode ? (
                    <input className="text-base font-bold text-slate-900 mb-3 bg-slate-50 border p-1.5 rounded-lg w-full" value={program.nameAr} onChange={(e) => handleUpdateProgram(program.id, 'nameAr', e.target.value)} />
                  ) : (
                    <h3 className="text-base font-bold text-slate-900 mb-4 leading-snug h-10 flex items-center">{program.nameAr}</h3>
                  )}

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-slate-500 font-bold text-[10px]">
                      <Building2 className="w-3.5 h-3.5 text-blue-500" />
                      <span className="truncate">{program.facultyAr}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 font-bold text-[10px]">
                      <Clock className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{program.durationAr}</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600 font-black text-[11px] bg-blue-50 w-fit px-2 py-0.5 rounded-md">
                      <Wallet className="w-3.5 h-3.5" />
                      <span>{program.feesAr}</span>
                    </div>
                  </div>

                  <Link to={`/faculties/${program.facultyId}`} className="mt-auto bg-slate-900 text-white py-2.5 rounded-xl font-bold text-[11px] flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-md active:scale-95">
                    تفاصيل القبول
                    <ChevronLeft className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admission;