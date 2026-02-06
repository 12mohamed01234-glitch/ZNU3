
import React, { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Settings2, Upload, Trash2, Save, Image as ImageIcon, X } from 'lucide-react';

const Contact: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Persistence for Contact Page Content
  const [content, setContent] = useState(() => {
    const saved = localStorage.getItem('znu_contact_content');
    return saved ? JSON.parse(saved) : {
      title: "اتصل بنا",
      subtitle: "بوابة التواصل الرسمية لجامعة الزقازيق الأهلية. نحن هنا للإجابة على تساؤلاتكم وتقديم الدعم اللازم.",
      image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1200",
      email: "info@znu.edu.eg",
      supportLabel: "ZNU Support",
      address: "مدينة المعرفة، العاشر من رمضان، الشرقية، جمهورية مصر العربية.",
      workingHours: "تستقبل الجامعة الزيارات الرسمية والاستفسارات الميدانية من الأحد إلى الخميس، من ٩ صباحاً وحتى ٣ عصراً."
    };
  });

  useEffect(() => {
    localStorage.setItem('znu_contact_content', JSON.stringify(content));
  }, [content]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setContent((prev: any) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteImage = () => {
    if (window.confirm('هل أنت متأكد من حذف الصورة؟')) {
      setContent((prev: any) => ({ ...prev, image: '' }));
    }
  };

  const updateField = (field: string, value: string) => {
    setContent((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="animate-in fade-in duration-700 bg-slate-50 dark:bg-slate-950 min-h-screen pb-20">
      
      {/* Admin Toggle */}
      <div className="fixed top-24 left-8 z-50">
        <button 
          onClick={() => setIsAdminMode(!isAdminMode)}
          className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl font-black text-xs transition-all shadow-2xl active:scale-95 ${isAdminMode ? 'bg-emerald-600 text-white shadow-emerald-200' : 'bg-slate-900 text-white shadow-slate-100'}`}
        >
          {isAdminMode ? <Save className="w-4 h-4" /> : <Settings2 className="w-4 h-4" />}
          {isAdminMode ? 'حفظ تعديلات الصفحة' : 'تعديل محتوى الصفحة'}
        </button>
      </div>

      {/* Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#2c5da7] py-16 md:py-28 px-5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          
          {/* Content Side */}
          <div className="w-full md:w-1/2 text-center md:text-right space-y-6">
            {isAdminMode ? (
              <div className="space-y-4">
                <input 
                  value={content.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-xl p-4 text-3xl md:text-5xl font-bold text-white text-right outline-none"
                />
                <textarea 
                  value={content.subtitle}
                  onChange={(e) => updateField('subtitle', e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-xl p-4 text-sm md:text-lg text-white/70 text-right outline-none"
                  rows={3}
                />
              </div>
            ) : (
              <>
                <h1 className="text-5xl md:text-7xl font-bold text-white font-serif-ar leading-tight">{content.title}</h1>
                <p className="text-white/70 text-lg md:text-xl font-medium leading-relaxed max-w-lg md:ml-0 md:mr-0">
                  {content.subtitle}
                </p>
              </>
            )}
            
            <div className="flex flex-wrap justify-center md:justify-end gap-3 pt-6">
               <div className="bg-white/5 backdrop-blur-md border border-white/10 px-6 py-3.5 rounded-2xl flex items-center gap-3 text-white">
                  <Mail className="w-5 h-5 text-emerald-400" />
                  {isAdminMode ? (
                    <input 
                      value={content.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className="bg-transparent border-none outline-none text-sm font-bold text-white w-32"
                    />
                  ) : (
                    <span className="text-sm font-bold tracking-wide">{content.email}</span>
                  )}
               </div>
               <div className="bg-white/5 backdrop-blur-md border border-white/10 px-6 py-3.5 rounded-2xl flex items-center gap-3 text-white">
                  <Phone className="w-5 h-5 text-emerald-400" />
                  {isAdminMode ? (
                    <input 
                      value={content.supportLabel}
                      onChange={(e) => updateField('supportLabel', e.target.value)}
                      className="bg-transparent border-none outline-none text-sm font-bold text-white w-24"
                    />
                  ) : (
                    <span className="text-sm font-bold">{content.supportLabel}</span>
                  )}
               </div>
            </div>
          </div>

          {/* Image Side (Admin controllable) */}
          <div className="w-full md:w-1/2 relative">
            {/* Smart Adaptable Container: maintain fixed aspect ratio to prevent stretching */}
            <div className="relative aspect-[16/10] md:aspect-video border-[6px] border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-800/50 min-h-[300px] flex items-center justify-center group">
               {content.image ? (
                 <img 
                   src={content.image} 
                   alt="جامعة الزقازيق الأهلية" 
                   className="w-full h-full object-cover" 
                 />
               ) : (
                 <div className="flex flex-col items-center gap-3 text-slate-500">
                    <ImageIcon className="w-12 h-12 opacity-20" />
                    <span className="text-xs font-bold uppercase tracking-widest opacity-30">لا توجد صورة</span>
                 </div>
               )}

               {isAdminMode && (
                 <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 rounded-xl font-bold text-xs"
                    >
                      <Upload className="w-4 h-4" /> رفع صورة جديدة
                    </button>
                    {content.image && (
                      <button 
                        onClick={deleteImage}
                        className="flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-xl font-bold text-xs"
                      >
                        <Trash2 className="w-4 h-4" /> حذف الصورة
                      </button>
                    )}
                    <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleImageUpload} />
                 </div>
               )}
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/10 blur-[80px] rounded-full"></div>
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-5 -mt-10 md:-mt-16 relative z-30">
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row">
          
          {/* Info Side */}
          <div className="w-full md:w-1/3 bg-slate-50 dark:bg-slate-800/50 p-10 md:p-14 border-b md:border-b-0 md:border-l border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold mb-10 text-slate-900 dark:text-white border-r-4 border-emerald-500 pr-4">قنوات التواصل</h3>
            
            <div className="space-y-10">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white dark:bg-slate-700 rounded-2xl flex items-center justify-center text-slate-900 dark:text-white shadow-sm border border-slate-100 dark:border-slate-600 shrink-0">
                  <MapPin className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-400 text-[10px] uppercase tracking-[0.2em] mb-2">المقر الرئيسي</h4>
                  {isAdminMode ? (
                    <textarea 
                      value={content.address}
                      onChange={(e) => updateField('address', e.target.value)}
                      className="w-full bg-white border border-slate-200 p-2 rounded-lg text-sm font-bold text-slate-800 outline-none"
                      rows={2}
                    />
                  ) : (
                    <p className="text-slate-800 dark:text-slate-200 font-bold text-sm leading-relaxed">
                      {content.address}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white dark:bg-slate-700 rounded-2xl flex items-center justify-center text-slate-900 shadow-sm border border-slate-100 dark:border-slate-600 shrink-0">
                  <Mail className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-400 text-[10px] uppercase tracking-[0.2em] mb-2">المراسلات الرسمية</h4>
                  <p className="text-slate-800 dark:text-slate-200 font-bold text-sm">{content.email}</p>
                </div>
              </div>
            </div>

            <div className="mt-14 p-8 bg-emerald-50 dark:bg-emerald-900/10 rounded-[2rem] border border-emerald-100 dark:border-emerald-800/50">
              {isAdminMode ? (
                <textarea 
                  value={content.workingHours}
                  onChange={(e) => updateField('workingHours', e.target.value)}
                  className="w-full bg-white/50 border border-emerald-200 p-2 rounded-lg text-[13px] text-emerald-900 font-bold outline-none"
                  rows={4}
                />
              ) : (
                <p className="text-[13px] text-emerald-900 dark:text-emerald-300 leading-loose font-bold">
                  {content.workingHours}
                </p>
              )}
            </div>
          </div>

          {/* Form Side */}
          <div className="w-full md:w-2/3 p-10 md:p-14">
            {!success ? (
              <>
                <h3 className="text-2xl font-bold mb-10 text-slate-900 dark:text-white">نموذج الاستفسارات الإلكتروني</h3>
                <form onSubmit={handleSend} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">الاسم بالكامل</label>
                      <input 
                        type="text" 
                        required
                        placeholder="أدخل الاسم الرباعي"
                        className="w-full p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-right font-medium"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">البريد الإلكتروني</label>
                      <input 
                        type="email" 
                        required
                        placeholder="username@domain.com"
                        className="w-full p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-left font-medium"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">نوع الطلب</label>
                    <select className="w-full p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-bold text-slate-700 dark:text-slate-300">
                      <option>استفسارات القبول والتسجيل</option>
                      <option>النتائج والشهادات</option>
                      <option>شؤون الطلاب والخدمات</option>
                      <option>أخرى</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">محتوى الرسالة</label>
                    <textarea 
                      required
                      rows={5}
                      placeholder="يرجى كتابة استفسارك بوضوح..."
                      className="w-full p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-right font-medium"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto px-16 py-4 bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 text-white rounded-2xl font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95"
                  >
                    {loading ? 'جارٍ المعالجة...' : (
                      <>
                        إرسال الطلب
                        <Send className="w-5 h-5 rtl:rotate-180" />
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 mb-8">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">تم استلام رسالتك</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed mb-8 font-medium">
                  شكراً لتواصلك مع جامعة الزقازيق الأهلية. سيتم الرد على استفسارك عبر البريد الإلكتروني خلال يومي عمل.
                </p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="text-emerald-600 font-bold hover:underline"
                >
                  إرسال استفسار آخر
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
