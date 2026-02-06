
import React, { useState, useRef, useEffect } from 'react';
import { 
  HardDrive, 
  Lock, 
  Folder, 
  FileText, 
  ChevronLeft, 
  Download, 
  Search,
  Filter,
  GraduationCap,
  Layers,
  BookOpen,
  Info,
  Eye,
  EyeOff,
  Settings2,
  Plus,
  Trash2,
  Save,
  Upload,
  X,
  FilePlus,
  Loader2
} from 'lucide-react';
import { FACULTIES } from '../constants';

interface FileEntry {
  id: string;
  name: string;
  size: string;
  date: string;
  type: string;
  url: string;
}

interface SubjectEntry {
  id: string;
  name: string;
  files: FileEntry[];
}

interface LevelEntry {
  id: string;
  name: string;
  subjects: SubjectEntry[];
}

const AcademicDrive: React.FC = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [step, setStep] = useState<'faculties' | 'levels' | 'subjects' | 'files'>('faculties');
  
  const [selectedFacultyId, setSelectedFacultyId] = useState('');
  const [selectedLevelId, setSelectedLevelId] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState('');

  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Persistence logic for the entire drive structure
  const [driveData, setDriveData] = useState<Record<string, LevelEntry[]>>(() => {
    const saved = localStorage.getItem('znu_drive_data_v3');
    if (saved) return JSON.parse(saved);
    
    // Initial Seed Data
    const initial: Record<string, LevelEntry[]> = {};
    FACULTIES.forEach(f => {
      initial[f.id] = [
        { 
          id: 'l1', name: 'المستوى الأول', 
          subjects: [
            { id: 's1', name: 'مقدمة في الحاسب', files: [] },
            { id: 's2', name: 'رياضيات 1', files: [] }
          ] 
        }
      ];
    });
    return initial;
  });

  useEffect(() => {
    localStorage.setItem('znu_drive_data_v3', JSON.stringify(driveData));
  }, [driveData]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId || !password) return;
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setIsLoggedIn(true);
    }, 1200);
  };

  // Admin Actions
  const addLevel = () => {
    const name = prompt('أدخل اسم المستوى الجديد (مثال: المستوى الثالث):');
    if (name && selectedFacultyId) {
      const newLevel: LevelEntry = { id: Date.now().toString(), name, subjects: [] };
      setDriveData(prev => ({
        ...prev,
        [selectedFacultyId]: [...(prev[selectedFacultyId] || []), newLevel]
      }));
    }
  };

  const deleteLevel = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المستوى؟')) {
      setDriveData(prev => ({
        ...prev,
        [selectedFacultyId]: prev[selectedFacultyId].filter(l => l.id !== id)
      }));
    }
  };

  const addSubject = () => {
    const name = prompt('أدخل اسم المساق الجديد:');
    if (name && selectedFacultyId && selectedLevelId) {
      const newSubject: SubjectEntry = { id: Date.now().toString(), name, files: [] };
      setDriveData(prev => ({
        ...prev,
        [selectedFacultyId]: prev[selectedFacultyId].map(l => 
          l.id === selectedLevelId ? { ...l, subjects: [...l.subjects, newSubject] } : l
        )
      }));
    }
  };

  const deleteSubject = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المساق؟')) {
      setDriveData(prev => ({
        ...prev,
        [selectedFacultyId]: prev[selectedFacultyId].map(l => 
          l.id === selectedLevelId ? { ...l, subjects: l.subjects.filter(s => s.id !== id) } : l
        )
      }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedFacultyId && selectedLevelId && selectedSubjectId) {
      if (file.type !== 'application/pdf') {
        alert('يرجى اختيار ملف بصيغة PDF فقط.');
        return;
      }

      setUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const newFile: FileEntry = {
          id: Date.now().toString(),
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
          date: new Date().toLocaleDateString('ar-EG'),
          type: 'pdf',
          url: reader.result as string
        };

        setDriveData(prev => ({
          ...prev,
          [selectedFacultyId]: prev[selectedFacultyId].map(l => 
            l.id === selectedLevelId ? {
              ...l,
              subjects: l.subjects.map(s => 
                s.id === selectedSubjectId ? { ...s, files: [...s.files, newFile] } : s
              )
            } : l
          )
        }));
        setUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteFile = (fileId: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الملف؟')) {
      setDriveData(prev => ({
        ...prev,
        [selectedFacultyId]: prev[selectedFacultyId].map(l => 
          l.id === selectedLevelId ? {
            ...l,
            subjects: l.subjects.map(s => 
              s.id === selectedSubjectId ? { ...s, files: s.files.filter(f => f.id !== fileId) } : s
            )
          } : l
        )
      }));
    }
  };

  // Nav Helpers
  const currentLevels = driveData[selectedFacultyId] || [];
  const currentLevel = currentLevels.find(l => l.id === selectedLevelId);
  const currentSubjects = currentLevel?.subjects || [];
  const currentSubject = currentSubjects.find(s => s.id === selectedSubjectId);
  const currentFiles = currentSubject?.files || [];

  if (!isLoggedIn) {
    return (
      <div className="bg-[#f0f0f0] min-h-screen animate-in fade-in duration-500 pb-10">
        <div className="bg-[#2c5da7] text-white py-10 px-5 shadow-md">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">خدمات السحابة الأكاديمية</h1>
            <h2 className="text-lg md:text-xl font-medium opacity-90">جامعة الزقازيق الأهلية</h2>
          </div>
        </div>
        <div className="max-w-2xl mx-auto px-4 -mt-5">
          <div className="bg-white border border-gray-300 rounded-xl p-6 md:p-10 shadow-lg">
            <h3 className="text-xl font-bold text-right mb-8 border-b border-gray-100 pb-4">بيانات الدخول للسحابة</h3>
            <form onSubmit={handleLogin} className="space-y-6">
              <input type="text" value={studentId} placeholder="كود الطالب الجامعي" onChange={(e) => setStudentId(e.target.value)} className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-right font-semibold" />
              <div className="relative">
                <input type={showPassword ? "text" : "password"} placeholder="كلمة السر" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-gray-300 p-4 pl-12 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-right" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
              </div>
              <button type="submit" className="w-full bg-[#2c5da7] text-white py-4 rounded-xl font-bold shadow-md">دخول السحابة</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 animate-in fade-in duration-700 pb-20">
      
      {/* Admin Toggle */}
      <div className="fixed top-24 left-8 z-[60]">
        <button 
          onClick={() => setIsAdminMode(!isAdminMode)}
          className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl font-black text-xs transition-all shadow-2xl active:scale-95 ${isAdminMode ? 'bg-emerald-600 text-white shadow-emerald-200' : 'bg-slate-900 text-white shadow-slate-200'}`}
        >
          {isAdminMode ? <Save className="w-4 h-4" /> : <Settings2 className="w-4 h-4" />}
          {isAdminMode ? 'حفظ وإغلاق التحرير' : 'تحرير مجلدات السحابة'}
        </button>
      </div>

      {/* Header Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 py-5 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-emerald-600 text-white rounded-2xl">
              <HardDrive className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 leading-tight">المستودع الرقمي</h2>
              <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                <span className="cursor-pointer hover:text-emerald-500" onClick={() => setStep('faculties')}>الرئيسية</span>
                {selectedFacultyId && <><ChevronLeft className="w-3 h-3" /> <span className="text-emerald-500">{FACULTIES.find(f => f.id === selectedFacultyId)?.nameAr}</span></>}
                {selectedLevelId && <><ChevronLeft className="w-3 h-3" /> <span className="text-emerald-500">{currentLevel?.name}</span></>}
                {selectedSubjectId && <><ChevronLeft className="w-3 h-3" /> <span className="text-emerald-500">{currentSubject?.name}</span></>}
              </div>
            </div>
          </div>
          <button onClick={() => setIsLoggedIn(false)} className="px-6 py-2.5 bg-red-50 text-red-600 font-bold text-sm rounded-xl">تسجيل خروج</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8 md:p-12">
        
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3">
             {step === 'faculties' && 'اختر الكلية'}
             {step === 'levels' && 'المستويات الدراسية'}
             {step === 'subjects' && 'المواد الدراسية (المساقات)'}
             {step === 'files' && 'الملفات والمرفقات'}
          </h3>
          {step !== 'faculties' && (
            <button onClick={() => {
              if (step === 'levels') setStep('faculties');
              if (step === 'subjects') setStep('levels');
              if (step === 'files') setStep('subjects');
            }} className="flex items-center gap-2 text-sm font-bold text-emerald-600">
              <ChevronLeft className="w-4 h-4 rotate-180" /> العودة
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {step === 'faculties' && FACULTIES.map(faculty => (
            <button 
              key={faculty.id}
              onClick={() => { setSelectedFacultyId(faculty.id); setStep('levels'); }}
              className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 text-right group hover:border-emerald-500 transition-all"
            >
              <div className="w-16 h-16 bg-slate-50 text-slate-400 group-hover:bg-emerald-600 group-hover:text-white rounded-[1.5rem] flex items-center justify-center mb-8 transition-all">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-900 text-xl mb-3">{faculty.nameAr}</h4>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">عرض مستويات الكلية</p>
            </button>
          ))}

          {step === 'levels' && (
            <>
              {currentLevels.map(level => (
                <div key={level.id} className="relative group">
                  <button 
                    onClick={() => { setSelectedLevelId(level.id); setStep('subjects'); }}
                    className="w-full bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 text-right hover:border-emerald-500 transition-all"
                  >
                    <div className="w-16 h-16 bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white rounded-[1.5rem] flex items-center justify-center mb-8 transition-all">
                      <Layers className="w-8 h-8" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-xl mb-3">{level.name}</h4>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{level.subjects.length} مواد مسجلة</p>
                  </button>
                  {isAdminMode && (
                    <button onClick={() => deleteLevel(level.id)} className="absolute top-4 left-4 p-2 bg-red-50 text-red-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              {isAdminMode && (
                <button onClick={addLevel} className="bg-slate-100 p-10 rounded-[2.5rem] border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-3 text-slate-400 hover:bg-slate-200 transition-all">
                  <Plus className="w-10 h-10" />
                  <span className="text-xs font-bold uppercase tracking-widest">إضافة مستوى</span>
                </button>
              )}
            </>
          )}

          {step === 'subjects' && (
            <>
              {currentSubjects.map(subject => (
                <div key={subject.id} className="relative group">
                  <button 
                    onClick={() => { setSelectedSubjectId(subject.id); setStep('files'); }}
                    className="w-full bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 text-right hover:border-emerald-500 transition-all"
                  >
                    <div className="w-16 h-16 bg-slate-50 text-slate-400 group-hover:bg-amber-600 group-hover:text-white rounded-[1.5rem] flex items-center justify-center mb-8 transition-all">
                      <BookOpen className="w-8 h-8" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-xl mb-3">{subject.name}</h4>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{subject.files.length} ملفات</p>
                  </button>
                  {isAdminMode && (
                    <button onClick={() => deleteSubject(subject.id)} className="absolute top-4 left-4 p-2 bg-red-50 text-red-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              {isAdminMode && (
                <button onClick={addSubject} className="bg-slate-100 p-10 rounded-[2.5rem] border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-3 text-slate-400 hover:bg-slate-200 transition-all">
                  <Plus className="w-10 h-10" />
                  <span className="text-xs font-bold uppercase tracking-widest">إضافة مادة</span>
                </button>
              )}
            </>
          )}
        </div>

        {step === 'files' && (
          <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-6 duration-500">
             <div className="p-10 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="font-bold text-xl text-slate-900 mb-2">{currentSubject?.name}</h4>
                  <p className="text-sm text-slate-500 font-medium">إجمالي {currentFiles.length} ملفات متاحة للتحميل</p>
                </div>
                {isAdminMode && (
                  <>
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="flex items-center gap-3 px-8 py-3.5 bg-emerald-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-emerald-100 active:scale-95 transition-all disabled:opacity-50"
                    >
                      {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <FilePlus className="w-5 h-5" />}
                      {uploading ? 'جارٍ الرفع...' : 'رفع ملف PDF من جهازك'}
                    </button>
                    <input type="file" ref={fileInputRef} hidden accept=".pdf" onChange={handleFileUpload} />
                  </>
                )}
             </div>
             
             <div className="divide-y divide-slate-50">
               {currentFiles.map((file) => (
                 <div key={file.id} className="p-8 flex items-center justify-between hover:bg-slate-50 transition-all group">
                    <div className="flex items-center gap-8">
                       <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-red-50 text-red-600">
                          <FileText className="w-7 h-7" />
                       </div>
                       <div>
                          <h5 className="font-bold text-slate-900 text-lg mb-2">{file.name}</h5>
                          <div className="flex items-center gap-4 text-[11px] text-slate-400 font-bold uppercase tracking-widest">
                            <span>{file.size}</span>
                            <span className="w-1.5 h-1.5 bg-slate-200 rounded-full"></span>
                            <span>{file.date}</span>
                          </div>
                       </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {isAdminMode && (
                        <button onClick={() => deleteFile(file.id)} className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-all">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                      <a 
                        href={file.url} 
                        download={file.name}
                        className="w-14 h-14 bg-white text-slate-900 border border-slate-200 rounded-2xl flex items-center justify-center hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all shadow-md active:scale-95"
                      >
                         <Download className="w-6 h-6" />
                      </a>
                    </div>
                 </div>
               ))}
               {currentFiles.length === 0 && !uploading && (
                 <div className="py-24 text-center text-slate-400">
                   <Folder className="w-20 h-20 mx-auto mb-6 opacity-10" />
                   <p className="font-bold">لا توجد ملفات مرفوعة حالياً</p>
                 </div>
               )}
               {uploading && (
                 <div className="py-12 flex flex-col items-center justify-center text-emerald-600 gap-4">
                   <Loader2 className="w-10 h-10 animate-spin" />
                   <span className="font-bold animate-pulse">يتم الآن معالجة الملف المختار...</span>
                 </div>
               )}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicDrive;
