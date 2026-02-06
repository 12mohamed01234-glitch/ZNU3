
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  BookOpen, 
  ShieldCheck, 
  User, 
  Settings2, 
  Plus, 
  Trash2, 
  Edit2, 
  X, 
  Upload, 
  Image as ImageIcon,
  CheckCircle,
  UserPlus
} from 'lucide-react';
import { BOARD_MEMBERS } from '../constants';
import { BoardMember } from '../types';

const Board: React.FC = () => {
  const [members, setMembers] = useState<BoardMember[]>(BOARD_MEMBERS);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState<BoardMember | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // New/Edit Member State
  const [formData, setFormData] = useState<Partial<BoardMember>>({
    name: '',
    title: '',
    description: '',
    image: ''
  });

  const handleToggleAdmin = () => {
    setIsAdminMode(!isAdminMode);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا العضو من مجلس الأمناء؟')) {
      setMembers(prev => prev.filter(m => m.id !== id));
    }
  };

  const handleOpenModal = (member?: BoardMember) => {
    if (member) {
      setEditingMember(member);
      setFormData(member);
    } else {
      setEditingMember(null);
      setFormData({ name: '', title: '', description: '', image: '' });
    }
    setShowModal(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember) {
      setMembers(prev => prev.map(m => m.id === editingMember.id ? (formData as BoardMember) : m));
    } else {
      const newMember: BoardMember = {
        ...(formData as BoardMember),
        id: Math.random().toString(36).substr(2, 9)
      };
      setMembers(prev => [newMember, ...prev]);
    }
    setShowModal(false);
  };

  return (
    <div className="animate-in fade-in duration-700 bg-slate-50 dark:bg-slate-950 min-h-screen">
      
      {/* Admin Control Toggle */}
      <div className="fixed top-24 left-8 z-[60]">
        <button 
          onClick={handleToggleAdmin}
          className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl font-black text-xs transition-all shadow-2xl active:scale-95 ${isAdminMode ? 'bg-emerald-600 text-white shadow-emerald-200' : 'bg-slate-900 text-white shadow-slate-200'}`}
        >
          {isAdminMode ? <CheckCircle className="w-4 h-4" /> : <Settings2 className="w-4 h-4" />}
          {isAdminMode ? 'حفظ وإغلاق التحرير' : 'تعديل بيانات المجلس'}
        </button>
      </div>

      {/* Centered Header Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#450a0a] py-20 md:py-32 px-5">
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-block px-4 py-1.5 bg-red-500/80 backdrop-blur-md rounded-full text-white text-xs font-bold shadow-lg">
            منذ 2022
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold text-white font-serif-ar leading-tight tracking-tight">
            مجلس الأمناء
          </h1>
          
          <p className="text-white/70 text-lg md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto">
            القيادة الحكيمة التي ترسم ملامح المستقبل الأكاديمي والبحثي لجامعة الزقازيق الأهلية.
          </p>
          
          <div className="flex flex-wrap justify-center gap-5 pt-10">
             <Link to="/faculties" className="bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-2xl flex items-center gap-3 font-bold text-base shadow-2xl transition-all hover:scale-105 active:scale-95">
                <BookOpen className="w-6 h-6" />
                استكشف البرامج الأكاديمية
             </Link>
             {isAdminMode && (
               <button 
                onClick={() => handleOpenModal()}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-2xl flex items-center gap-3 font-bold text-base shadow-2xl transition-all hover:scale-105 active:scale-95"
               >
                 <UserPlus className="w-6 h-6" />
                 إضافة عضو جديد
               </button>
             )}
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      </section>

      {/* Intro Section */}
      <section className="py-20 px-5 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-red-500 font-bold text-sm uppercase tracking-[0.3em] mb-4 block">نفخر بهم</span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8 font-serif-ar">تكوين المجلس</h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto"></div>
        </div>
      </section>

      {/* Members Grid */}
      <section className="pb-32 px-5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <div key={member.id} className="relative group bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 p-10 flex flex-col items-center text-center transition-all duration-500 hover:shadow-2xl">
               
               {isAdminMode && (
                 <div className="absolute top-6 left-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <button 
                      onClick={() => handleOpenModal(member)}
                      className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg hover:bg-blue-700 active:scale-90"
                    >
                      <Edit2 className="w-4.5 h-4.5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(member.id)}
                      className="w-10 h-10 bg-red-500 text-white rounded-xl flex items-center justify-center shadow-lg hover:bg-red-600 active:scale-90"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                 </div>
               )}

               {/* Member Image/Placeholder */}
               <div className="w-32 h-32 bg-slate-50 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center mb-8 border border-slate-100 dark:border-slate-700 overflow-hidden shadow-inner group-hover:scale-105 transition-transform duration-500">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-slate-300 dark:text-slate-600" />
                  )}
               </div>
               
               <h3 className="text-2xl font-bold text-[#1a365d] dark:text-blue-400 mb-3 font-serif-ar leading-snug">
                 {member.name}
               </h3>
               
               <div className="text-red-600 dark:text-red-400 font-black text-sm uppercase tracking-wider mb-6">
                 {member.title}
               </div>
               
               {member.description && (
                 <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed pt-6 border-t border-slate-100 dark:border-slate-800 w-full">
                   {member.description}
                 </p>
               )}

               <div className="mt-8 pt-6">
                 <ShieldCheck className="w-6 h-6 text-slate-100 dark:text-slate-800" />
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md animate-in fade-in zoom-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
            {/* Photo Section */}
            <div className="w-full md:w-2/5 bg-slate-50 p-10 flex flex-col items-center justify-center border-b md:border-b-0 md:border-l border-slate-100">
                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <div className="w-44 h-44 rounded-3xl bg-white flex items-center justify-center shadow-xl border-4 border-white overflow-hidden">
                    {formData.image ? (
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-12 h-12 text-slate-200" />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl">
                    <Upload className="w-10 h-10 text-white" />
                  </div>
                </div>
                <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleImageUpload} />
                <p className="mt-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">انقر لرفع صورة شخصية</p>
            </div>

            {/* Form Section */}
            <div className="w-full md:w-3/5 p-10 md:p-12">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-red-600" />
                  {editingMember ? 'تعديل بيانات العضو' : 'إضافة عضو للمجلس'}
                </h2>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-900 transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">الاسم بالكامل</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                    className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-red-500 font-bold text-sm" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">المنصب داخل المجلس</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.title} 
                    onChange={e => setFormData({...formData, title: e.target.value})} 
                    className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-red-500 font-bold text-sm" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">الوصف العلمي / الوظيفي</label>
                  <textarea 
                    rows={3}
                    value={formData.description} 
                    onChange={e => setFormData({...formData, description: e.target.value})} 
                    className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-red-500 font-bold text-sm resize-none" 
                  />
                </div>

                <button type="submit" className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm shadow-xl hover:bg-slate-800 transition-all mt-4 active:scale-95">
                  {editingMember ? 'حفظ التعديلات الحالية' : 'إدراج العضو في المجلس'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;
