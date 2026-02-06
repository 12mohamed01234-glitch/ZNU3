
import React, { useState, useRef } from 'react';
import { 
  Search, 
  Mail, 
  Filter, 
  Phone, 
  GraduationCap, 
  Plus, 
  Trash2, 
  Settings2, 
  Image as ImageIcon, 
  X,
  CheckCircle,
  UserPlus
} from 'lucide-react';
import { STAFF_LIST, FACULTIES } from '../constants';
import { Staff as StaffType } from '../types';

const Staff: React.FC = () => {
  const [staff, setStaff] = useState<StaffType[]>(STAFF_LIST);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('all');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // New Staff State
  const [newDoctor, setNewDoctor] = useState<Partial<StaffType>>({
    nameAr: '',
    nameEn: '',
    titleAr: '',
    titleEn: '',
    facultyId: '',
    email: '',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400'
  });

  const filteredStaff = staff.filter(s => {
    const matchesSearch = s.nameAr.includes(searchTerm) || s.nameEn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFaculty = selectedFaculty === 'all' || s.facultyId === selectedFaculty;
    return matchesSearch && matchesFaculty;
  });

  const handleDelete = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا العضو من الهيئة التدريسية؟')) {
      setStaff(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewDoctor(prev => ({ ...prev, image: imageUrl }));
    }
  };

  const handleAddDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    const doctorToAdd: StaffType = {
      ...newDoctor as StaffType,
      id: Math.random().toString(36).substr(2, 9)
    };
    setStaff(prev => [doctorToAdd, ...prev]);
    setShowAddForm(false);
    setNewDoctor({
      nameAr: '',
      nameEn: '',
      titleAr: '',
      titleEn: '',
      facultyId: '',
      email: '',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400'
    });
  };

  return (
    <div className="py-24 bg-white animate-in fade-in duration-500 min-h-screen">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        
        {/* Header & Main Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900">الهيئة التدريسية</h1>
            <p className="text-slate-500 text-lg font-medium leading-relaxed">نخبة من الأكاديميين والباحثين المتخصصين بجامعة الزقازيق الأهلية.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button 
              onClick={() => setIsAdminMode(!isAdminMode)}
              className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-xs font-black transition-all shadow-md active:scale-95 ${isAdminMode ? 'bg-emerald-600 text-white shadow-emerald-100' : 'bg-slate-900 text-white shadow-slate-100'}`}
            >
              {isAdminMode ? <CheckCircle className="w-4 h-4" /> : <Settings2 className="w-4 h-4" />}
              {isAdminMode ? 'حفظ وإغلاق التحرير' : 'لوحة تحكم الإدارة'}
            </button>
            
            {isAdminMode && (
              <button 
                onClick={() => setShowAddForm(true)}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 text-white rounded-2xl text-xs font-black hover:bg-blue-700 transition-all shadow-md shadow-blue-100 active:scale-95"
              >
                <Plus className="w-4 h-4" />
                إضافة دكتور جديد
              </button>
            )}
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row gap-5 mb-12 bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="ابحث بالاسم أو التخصص..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-12 pl-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none font-bold text-sm shadow-sm"
            />
          </div>
          <div className="relative">
            <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
            <select 
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
              className="appearance-none pr-12 pl-12 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none cursor-pointer font-black text-sm shadow-sm"
            >
              <option value="all">كافة الكليات</option>
              {FACULTIES.map(f => (
                <option key={f.id} value={f.id}>{f.nameAr}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Add Doctor Form Overlay */}
        {showAddForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-5 md:p-10 bg-slate-900/40 backdrop-blur-md animate-in fade-in zoom-in duration-300">
            <div className="bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
              {/* Left Side: Photo Upload */}
              <div className="w-full md:w-1/3 bg-slate-50 p-10 flex flex-col items-center justify-center border-b md:border-b-0 md:border-l border-slate-100">
                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <img 
                    src={newDoctor.image} 
                    alt="Preview" 
                    className="w-40 h-40 rounded-3xl object-cover shadow-2xl border-4 border-white group-hover:opacity-75 transition-all"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ImageIcon className="w-10 h-10 text-white" />
                  </div>
                </div>
                <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleImageUpload} />
                <p className="mt-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">انقر لتغيير الصورة الشخصية</p>
              </div>

              {/* Right Side: Form Details */}
              <div className="w-full md:w-2/3 p-10 md:p-12">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                    <UserPlus className="w-6 h-6 text-blue-600" />
                    إضافة عضو هيئة تدريس
                  </h2>
                  <button onClick={() => setShowAddForm(false)} className="text-slate-400 hover:text-slate-900 transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleAddDoctor} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">الاسم (عربي)</label>
                      <input required type="text" value={newDoctor.nameAr} onChange={e => setNewDoctor({...newDoctor, nameAr: e.target.value})} className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Name (English)</label>
                      <input required type="text" value={newDoctor.nameEn} onChange={e => setNewDoctor({...newDoctor, nameEn: e.target.value})} className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm text-left" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">الدرجة العلمية</label>
                      <input required type="text" value={newDoctor.titleAr} onChange={e => setNewDoctor({...newDoctor, titleAr: e.target.value})} className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">الكلية</label>
                      <select required value={newDoctor.facultyId} onChange={e => setNewDoctor({...newDoctor, facultyId: e.target.value})} className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm">
                        <option value="">اختر الكلية...</option>
                        {FACULTIES.map(f => <option key={f.id} value={f.id}>{f.nameAr}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">البريد الجامعي الرسمي</label>
                    <input required type="email" value={newDoctor.email} onChange={e => setNewDoctor({...newDoctor, email: e.target.value})} className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm text-left" placeholder="example@znu.edu.eg" />
                  </div>

                  <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all mt-4">
                    إدراج العضو في قاعدة البيانات
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Staff Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredStaff.map((staffMember) => (
            <div key={staffMember.id} className="relative group">
              {isAdminMode && (
                <button 
                  onClick={() => handleDelete(staffMember.id)}
                  className="absolute -top-3 -right-3 z-20 w-10 h-10 bg-red-500 text-white rounded-xl flex items-center justify-center shadow-lg hover:bg-red-600 transition-all active:scale-90"
                  title="حذف الدكتور"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
              
              <div className={`bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 hover:shadow-2xl transition-all duration-500 ${isAdminMode ? 'ring-2 ring-blue-500/20' : ''}`}>
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative shrink-0">
                    <img 
                      src={staffMember.image} 
                      alt={staffMember.nameAr} 
                      className="w-24 h-24 rounded-2xl object-cover shadow-xl border-2 border-slate-50"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg border-2 border-white">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-black text-xl text-slate-900 mb-1.5 leading-tight">
                      {staffMember.nameAr}
                    </h3>
                    <div className="text-blue-600 text-[9px] font-black uppercase tracking-[0.2em] mb-3 opacity-90">
                      {staffMember.nameEn}
                    </div>
                    <div className="text-slate-500 text-xs font-bold leading-relaxed">
                      {staffMember.titleAr}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 pt-8 border-t border-slate-50">
                   <div className="flex items-center gap-4 text-slate-500 hover:text-blue-600 transition-colors cursor-pointer text-xs font-bold">
                     <div className="p-2 bg-slate-50 rounded-lg"><Mail className="w-4 h-4" /></div>
                     <span className="truncate">{staffMember.email}</span>
                   </div>
                   <div className="flex items-center gap-4 text-slate-500 hover:text-blue-600 transition-colors cursor-pointer text-xs font-bold">
                     <div className="p-2 bg-slate-50 rounded-lg"><Phone className="w-4 h-4" /></div>
                     رقم داخلي: 30{staffMember.id.slice(0, 2)}
                   </div>
                </div>
                
                <button className="w-full mt-10 py-4 bg-slate-50 text-slate-900 rounded-2xl text-xs font-black hover:bg-blue-600 hover:text-white transition-all shadow-sm border border-slate-100">
                  عرض الملف الأكاديمي والبحثي
                </button>
              </div>
            </div>
          ))}
          
          {filteredStaff.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-slate-200" />
              </div>
              <h3 className="text-xl font-bold text-slate-400">لا توجد نتائج مطابقة لبحثك</h3>
              <button onClick={() => {setSearchTerm(''); setSelectedFaculty('all');}} className="mt-4 text-blue-600 font-bold hover:underline">إعادة ضبط المرشحات</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Staff;
