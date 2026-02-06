
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ExternalLink, 
  ChevronLeft, 
  BookmarkCheck, 
  Settings2, 
  Plus, 
  Trash2, 
  X, 
  Upload, 
  Image as ImageIcon,
  CheckCircle,
  GraduationCap,
  Stethoscope,
  Activity,
  HeartPulse,
  Settings as GearIcon,
  Pill,
  BarChart3,
  Cpu
} from 'lucide-react';
import { FACULTIES } from '../constants';
import { Faculty } from '../types';

const Faculties: React.FC = () => {
  const [faculties, setFaculties] = useState<Faculty[]>(FACULTIES);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [newFaculty, setNewFaculty] = useState<Partial<Faculty>>({
    nameAr: '',
    nameEn: '',
    descriptionAr: '',
    descriptionEn: '',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200',
    programsAr: ['']
  });

  const handleDelete = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الكلية نهائياً؟ سيتم حذف كافة البيانات المرتبطة بها.')) {
      setFaculties(prev => prev.filter(f => f.id !== id));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewFaculty(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProgram = () => {
    setNewFaculty(prev => ({
      ...prev,
      programsAr: [...(prev.programsAr || []), '']
    }));
  };

  const handleProgramChange = (index: number, value: string) => {
    const updatedPrograms = [...(newFaculty.programsAr || [])];
    updatedPrograms[index] = value;
    setNewFaculty(prev => ({ ...prev, programsAr: updatedPrograms }));
  };

  const handleSaveFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    const facultyToAdd: Faculty = {
      ...newFaculty as Faculty,
      id: Math.random().toString(36).substr(2, 9),
      logo: <GraduationCap className="w-8 h-8" /> // Default logo for new faculties
    };
    setFaculties(prev => [facultyToAdd, ...prev]);
    setShowAddModal(false);
    setNewFaculty({
      nameAr: '',
      nameEn: '',
      descriptionAr: '',
      descriptionEn: '',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200',
      programsAr: ['']
    });
  };

  return (
    <div className="py-16 md:py-24 bg-white animate-in fade-in duration-500">
      <div className="max-w-5xl mx-auto px-5">
        
        {/* Admin Toggle Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="text-center lg:text-right">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">كليات جامعة الزقازيق الأهلية</h1>
            <p className="text-slate-500 max-w-2xl lg:mr-0 text-sm leading-relaxed font-medium">
              استكشف البرامج الأكاديمية المتخصصة التي تقدمها الجامعة، والمصممة وفقاً لأحدث المعايير العالمية.
            </p>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => setIsAdminMode(!isAdminMode)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-black transition-all shadow-xl active:scale-95 ${isAdminMode ? 'bg-emerald-600 text-white shadow-emerald-100' : 'bg-slate-900 text-white shadow-slate-100'}`}
            >
              {isAdminMode ? <CheckCircle className="w-4 h-4" /> : <Settings2 className="w-4 h-4" />}
              {isAdminMode ? 'حفظ التغييرات' : 'تعديل الكليات'}
            </button>
            
            {isAdminMode && (
              <button 
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl text-xs font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-95"
              >
                <Plus className="w-4 h-4" />
                إضافة كلية جديدة
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {faculties.map((faculty) => (
            <div 
              key={faculty.id} 
              className="relative flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 group hover:shadow-xl transition-all duration-500"
            >
              {isAdminMode && (
                <button 
                  onClick={() => handleDelete(faculty.id)}
                  className="absolute top-4 left-4 z-20 w-10 h-10 bg-red-500 text-white rounded-xl flex items-center justify-center shadow-lg hover:bg-red-600 transition-all active:scale-90"
                  title="حذف الكلية"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}

              <div className="relative h-48 md:h-52 overflow-hidden">
                <img 
                  src={faculty.image} 
                  alt={faculty.nameAr} 
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
                
                <div className="absolute bottom-6 right-6 left-6 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl flex items-center justify-center text-white shadow-xl">
                    {React.isValidElement(faculty.logo) ? React.cloneElement(faculty.logo as React.ReactElement, { className: 'w-6 h-6' }) : <GraduationCap className="w-6 h-6" />}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg md:text-xl font-bold text-white leading-tight">
                      {faculty.nameAr}
                    </h2>
                    <div className="text-emerald-400 font-bold text-[9px] uppercase tracking-[0.2em] mt-1 opacity-90">
                      {faculty.nameEn}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <p className="text-xs text-slate-500 leading-relaxed mb-6 font-medium line-clamp-3">
                  {faculty.descriptionAr}
                </p>

                <div className="space-y-3 mb-8">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                    <BookmarkCheck className="w-4 h-4 text-emerald-500" />
                    الأقسام والبرامج:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {faculty.programsAr.map((prog, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-slate-50 text-slate-700 rounded-lg text-[10px] font-bold border border-slate-100 transition-colors">
                        {prog}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
                   <Link 
                    to={`/faculties/${faculty.id}`}
                    className="inline-flex items-center gap-2 text-emerald-600 font-bold text-xs hover:translate-x-[-4px] transition-transform"
                   >
                     التفاصيل وشروط التقديم
                     <ChevronLeft className="w-4 h-4" />
                   </Link>
                   <div className="p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-emerald-500 transition-colors cursor-pointer border border-transparent shadow-sm">
                     <ExternalLink className="w-4 h-4" />
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Faculty Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-5 md:p-10 bg-slate-900/40 backdrop-blur-md animate-in fade-in zoom-in duration-300">
          <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
            
            {/* Left Side: Media & Settings */}
            <div className="w-full md:w-1/3 bg-slate-50 p-10 flex flex-col items-center border-b md:border-b-0 md:border-l border-slate-100 overflow-y-auto">
                <div className="relative group cursor-pointer w-full aspect-video rounded-3xl overflow-hidden shadow-xl border-4 border-white mb-8" onClick={() => fileInputRef.current?.click()}>
                  <img src={newFaculty.image} alt="Preview" className="w-full h-full object-cover group-hover:opacity-80 transition-all" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                    <Upload className="w-10 h-10 text-white" />
                  </div>
                </div>
                <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleImageUpload} />
                
                <div className="w-full space-y-4">
                  <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 text-center">اختيار الأيقونة</h4>
                    <div className="grid grid-cols-4 gap-3">
                       {[GraduationCap, Stethoscope, Activity, HeartPulse, GearIcon, Pill, BarChart3, Cpu].map((Icon, idx) => (
                         <button key={idx} type="button" className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center">
                           <Icon className="w-5 h-5" />
                         </button>
                       ))}
                    </div>
                  </div>
                  
                  <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100">
                    <p className="text-[10px] text-blue-700 leading-relaxed font-bold text-center">
                      تأكد من رفع صورة عالية الجودة (1200x800) لتعبر عن هوية الكلية بشكل احترافي.
                    </p>
                  </div>
                </div>
            </div>

            {/* Right Side: Faculty Details Form */}
            <div className="w-full md:w-2/3 p-10 md:p-12 overflow-y-auto">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                  <Plus className="w-6 h-6 text-blue-600" />
                  إضافة كلية جديدة
                </h2>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-900 transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSaveFaculty} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">اسم الكلية (عربي)</label>
                    <input required type="text" value={newFaculty.nameAr} onChange={e => setNewFaculty({...newFaculty, nameAr: e.target.value})} className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm" placeholder="مثال: كلية الذكاء الاصطناعي" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Name (English)</label>
                    <input required type="text" value={newFaculty.nameEn} onChange={e => setNewFaculty({...newFaculty, nameEn: e.target.value})} className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm text-left" placeholder="Faculty of AI" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">وصف الكلية (عربي)</label>
                  <textarea required rows={3} value={newFaculty.descriptionAr} onChange={e => setNewFaculty({...newFaculty, descriptionAr: e.target.value})} className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm resize-none" placeholder="اكتب نبذة مختصرة عن الكلية وأهدافها..." />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">البرامج الأكاديمية</label>
                    <button type="button" onClick={handleAddProgram} className="text-blue-600 text-[10px] font-black flex items-center gap-1 hover:underline">
                      <Plus className="w-3 h-3" /> إضافة برنامج
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {newFaculty.programsAr?.map((prog, idx) => (
                      <input 
                        key={idx} 
                        type="text" 
                        value={prog} 
                        onChange={(e) => handleProgramChange(idx, e.target.value)} 
                        className="p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-xs" 
                        placeholder={`البرنامج ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <button type="submit" className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 active:scale-95">
                    إدراج الكلية في الموقع الرسمي
                    <CheckCircle className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Faculties;
