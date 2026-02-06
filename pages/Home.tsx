
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  ChevronLeft, 
  Sparkles, 
  Settings2, 
  Upload, 
  Trash2, 
  Plus, 
  Edit2, 
  Save, 
  Newspaper, 
  Calendar,
  ExternalLink,
  Link as LinkIcon,
  Image as ImageIcon,
  X,
  Layers,
  Users,
  Book,
  LayoutDashboard,
  Award,
  Type
} from 'lucide-react';
import { SERVICES } from '../constants';
import { NewsPost, Service } from '../types';

interface Stat {
  id: string;
  label: string;
  value: string;
  iconType: 'students' | 'faculties' | 'programs' | 'graduates';
}

const Home: React.FC = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingStat, setEditingStat] = useState<Stat | null>(null);
  
  const [content, setContent] = useState(() => {
    const saved = localStorage.getItem('znu_home_content_v2');
    return saved ? JSON.parse(saved) : {
      heroTitle: "مرحباً بك في جامعة الزقازيق الأهلية",
      heroSubtitle: "نحو مستقبل أفضل من خلال التعليم المتميز",
      servicesTitle: "الخدمات الالكترونية",
      servicesSub: "بوابتك الموحدة لكافة الخدمات الجامعية الرقمية"
    };
  });

  const [servicesList, setServicesList] = useState<Service[]>(() => {
    const saved = localStorage.getItem('znu_services_v2');
    return saved ? JSON.parse(saved) : SERVICES;
  });

  const [posts, setPosts] = useState<NewsPost[]>(() => {
    const saved = localStorage.getItem('znu_news_v1');
    return saved ? JSON.parse(saved) : [];
  });

  const [heroMedia, setHeroMedia] = useState<{ type: 'image' | 'video', url: string }>(() => {
    const saved = localStorage.getItem('znu_hero_media');
    return saved ? JSON.parse(saved) : {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1523240693567-510e807b9400?auto=format&fit=crop&q=80&w=1200'
    };
  });
  
  const [stats, setStats] = useState<Stat[]>(() => {
    const saved = localStorage.getItem('znu_stats_v2');
    return saved ? JSON.parse(saved) : [
      { id: '1', label: 'طالب', value: '4625', iconType: 'students' },
      { id: '2', label: 'كليات', value: '7', iconType: 'faculties' },
      { id: '3', label: 'برنامج أكاديمي', value: '11', iconType: 'programs' },
      { id: '4', label: 'خريج', value: '-', iconType: 'graduates' },
    ];
  });

  const serviceImageInputRef = useRef<HTMLInputElement>(null);
  const heroFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('znu_home_content_v2', JSON.stringify(content));
    localStorage.setItem('znu_services_v2', JSON.stringify(servicesList));
    localStorage.setItem('znu_hero_media', JSON.stringify(heroMedia));
    localStorage.setItem('znu_stats_v2', JSON.stringify(stats));
  }, [content, servicesList, heroMedia, stats]);

  const handleServiceImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingService) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingService({ ...editingService, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const saveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    if (servicesList.find(s => s.id === editingService.id)) {
      setServicesList(prev => prev.map(s => s.id === editingService.id ? editingService : s));
    } else {
      setServicesList(prev => [...prev, editingService]);
    }
    setShowServiceModal(false);
    setEditingService(null);
  };

  const deleteService = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الخدمة؟')) {
      setServicesList(prev => prev.filter(s => s.id !== id));
    }
  };

  const getStatIcon = (type: string) => {
    const className = "w-6 h-6 md:w-10 md:h-10 text-white opacity-90";
    switch(type) {
      case 'students': return <Users className={className} />;
      case 'faculties': return <LayoutDashboard className={className} />;
      case 'programs': return <Book className={className} />;
      case 'graduates': return <Award className={className} />;
      default: return <Users className={className} />;
    }
  };

  const StatEditModal = () => {
    if (!editingStat) return null;
    const [val, setVal] = useState(editingStat.value);
    const [lbl, setLbl] = useState(editingStat.label);

    return (
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
        <div className="bg-white w-full max-w-sm rounded-3xl md:rounded-[2.5rem] shadow-2xl p-8 md:p-10 border border-slate-100">
          <h3 className="text-lg md:text-xl font-black mb-6 md:mb-8 text-slate-900">تعديل الإحصائية</h3>
          <div className="space-y-4 md:space-y-6">
            <div className="space-y-1 md:space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">القيمة (الرقم)</label>
              <input type="text" value={val} onChange={e => setVal(e.target.value)} className="w-full p-3 md:p-4 bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
            </div>
            <div className="space-y-1 md:space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">العنوان</label>
              <input type="text" value={lbl} onChange={e => setLbl(e.target.value)} className="w-full p-3 md:p-4 bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
            </div>
            <div className="pt-4 flex gap-3">
              <button onClick={() => {
                setStats(prev => prev.map(s => s.id === editingStat.id ? { ...s, value: val, label: lbl } : s));
                setEditingStat(null);
              }} className="flex-1 py-3 md:py-4 bg-blue-600 text-white rounded-xl md:rounded-2xl font-bold shadow-lg shadow-blue-100">حفظ</button>
              <button onClick={() => setEditingStat(null)} className="flex-1 py-3 md:py-4 bg-slate-100 text-slate-600 rounded-xl md:rounded-2xl font-bold">إلغاء</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="animate-in fade-in duration-700 bg-white">
      
      {/* Admin Toggle - Compact on Mobile */}
      <div className="fixed top-16 md:top-24 left-4 md:left-8 z-50">
        <button 
          onClick={() => setIsAdminMode(!isAdminMode)}
          className={`flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3.5 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs transition-all shadow-xl active:scale-95 ${isAdminMode ? 'bg-emerald-600 text-white shadow-emerald-200' : 'bg-slate-900 text-white shadow-slate-100'}`}
        >
          {isAdminMode ? <Save className="w-3.5 h-3.5 md:w-4 md:h-4" /> : <Settings2 className="w-3.5 h-3.5 md:w-4 md:h-4" />}
          <span className="hidden xs:inline">{isAdminMode ? 'حفظ' : 'تحرير'}</span>
          <span className="xs:hidden">{isAdminMode ? 'حفظ' : 'تحرير'}</span>
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-28 lg:pb-36 overflow-hidden px-4 md:px-5">
        <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="text-center lg:text-right space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] md:text-xs font-bold">
              <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5" />
              بوابة المستقبل الأكاديمي
            </div>
            
            {isAdminMode ? (
              <div className="space-y-4">
                <textarea 
                  value={content.heroTitle}
                  onChange={(e) => setContent({...content, heroTitle: e.target.value})}
                  className="w-full bg-slate-50 border-2 border-dashed border-blue-300 rounded-xl p-3 text-2xl md:text-5xl font-bold text-slate-900 outline-none"
                  rows={2}
                />
              </div>
            ) : (
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.2] md:leading-[1.15] tracking-tight">
                {content.heroTitle}
              </h1>
            )}
            
            <p className="text-md md:text-xl text-slate-500 font-bold leading-relaxed px-4 md:px-0">{content.heroSubtitle}</p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start px-6 md:px-0">
              <Link to="/faculties" className="bg-blue-600 text-white px-8 md:px-10 py-3.5 md:py-4 rounded-xl md:rounded-2xl font-bold shadow-xl active:scale-95 text-center text-sm">استكشف الكليات</Link>
            </div>
          </div>

          <div className="relative aspect-[16/10] md:aspect-video rounded-3xl md:rounded-[3rem] overflow-hidden shadow-xl md:shadow-2xl border-[6px] md:border-[10px] border-white bg-slate-100 mx-4 md:mx-0">
             <img src={heroMedia.url} className="w-full h-full object-cover" alt="Hero" />
          </div>
        </div>
      </section>

      {/* Stats Section - Improved for Mobile */}
      <section className="px-4 md:px-5 -mt-10 md:-mt-16 relative z-30 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#1a3a6d] rounded-3xl md:rounded-[3.5rem] p-6 md:p-14 shadow-2xl border border-white/5 relative overflow-hidden group/stats">
            <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-blue-500/10 rounded-full blur-[60px] md:blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 relative z-10">
              {stats.map((stat) => (
                <div key={stat.id} className="relative flex flex-col items-center text-center gap-4 md:gap-6 group">
                  {isAdminMode && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setEditingStat(stat)} className="p-1.5 bg-blue-600 text-white rounded-md shadow-xl"><Edit2 className="w-3 h-3" /></button>
                    </div>
                  )}
                  
                  <div className="w-12 h-12 md:w-20 md:h-20 bg-white/10 backdrop-blur-xl rounded-xl md:rounded-[1.5rem] flex items-center justify-center border border-white/10 shadow-inner group-hover:bg-white/20 transition-all duration-500">
                    {getStatIcon(stat.iconType)}
                  </div>
                  
                  <div className="space-y-0.5 md:space-y-1">
                    <div className="text-2xl md:text-5xl font-black text-white tracking-tighter">
                      {stat.value}
                    </div>
                    <div className="text-[9px] md:text-xs font-bold text-white/60 uppercase tracking-widest">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid - Better Mobile Card sizes */}
      <section className="py-16 md:py-24 px-4 md:px-5 bg-slate-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 md:mb-14 flex items-center justify-between px-2">
            <div className="text-right">
               <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-1 md:mb-2">
                 {isAdminMode ? (
                   <input 
                     value={content.servicesTitle} 
                     onChange={e => setContent({...content, servicesTitle: e.target.value})}
                     className="bg-transparent border-b-2 border-dashed border-blue-300 outline-none w-full"
                   />
                 ) : (
                   <>الخدمات <span className="text-red-600">الالكترونية</span></>
                 )}
               </h2>
               <p className="text-slate-500 font-bold text-[11px] md:text-sm">{content.servicesSub}</p>
            </div>
            {isAdminMode && (
              <button 
                onClick={() => {
                  setEditingService({ id: Date.now().toString(), titleAr: '', titleEn: '', description: '', path: '', imageUrl: '' });
                  setShowServiceModal(true);
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-[10px] md:text-sm shadow-xl"
              >
                <Plus className="w-4 h-4" /> <span className="hidden xs:inline">إضافة</span>
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {servicesList.map((service) => (
              <div key={service.id} className="relative group">
                {isAdminMode && (
                  <div className="absolute top-2 left-2 flex gap-1.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => { setEditingService(service); setShowServiceModal(true); }} className="p-1.5 bg-blue-600 text-white rounded-lg shadow-lg"><Edit2 className="w-3 h-3" /></button>
                    <button onClick={() => deleteService(service.id)} className="p-1.5 bg-red-500 text-white rounded-lg shadow-lg"><Trash2 className="w-3 h-3" /></button>
                  </div>
                )}

                <a 
                  href={service.path.startsWith('http') ? service.path : '#'} 
                  target={service.path.startsWith('http') ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="block h-full bg-white p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-500 text-center flex flex-col items-center justify-between gap-4 md:gap-6"
                >
                  <div className="w-14 h-14 md:w-20 md:h-20 flex items-center justify-center p-1 md:p-2">
                    {service.imageUrl ? (
                      <img src={service.imageUrl} className="w-full h-full object-contain" alt={service.titleAr} />
                    ) : (
                      <ImageIcon className="w-8 h-8 md:w-12 md:h-12 text-slate-200" />
                    )}
                  </div>
                  <h3 className="font-bold text-slate-900 text-[11px] md:text-sm leading-relaxed mb-1 md:mb-4 line-clamp-2">{service.titleAr}</h3>
                  <div className="w-8 md:w-10 h-1 bg-slate-50 rounded-full group-hover:bg-blue-600 transition-colors"></div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Preview - Smaller gaps on mobile */}
      {posts.length > 0 && (
        <section className="py-16 md:py-24 px-4 md:px-5 bg-slate-50/30">
          <div className="max-w-6xl mx-auto">
             <div className="flex items-center justify-between mb-8 md:mb-12 px-2">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2 md:gap-3">
                   <Newspaper className="w-5 h-5 md:w-6 md:h-6 text-blue-600" /> أحدث الأخبار
                </h2>
                <Link to="/news" className="text-blue-600 font-bold text-[11px] md:text-sm flex items-center gap-1 hover:underline">عرض الكل <ChevronLeft className="w-3.5 h-3.5" /></Link>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {posts.slice(0, 3).map((post) => (
                  <Link key={post.id} to="/news" className="group bg-white rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm p-3 md:p-4 hover:shadow-xl transition-all">
                     <div className="aspect-[16/9] md:aspect-video rounded-xl md:rounded-2xl overflow-hidden mb-4 md:mb-6">
                        <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="News" />
                     </div>
                     <div className="px-1 md:px-2">
                        <div className="flex items-center gap-2 text-[9px] md:text-[10px] text-slate-400 font-bold mb-2 md:mb-3"><Calendar className="w-3 h-3" /> {post.date}</div>
                        <h3 className="font-bold text-slate-900 text-sm md:text-base leading-tight line-clamp-2">{post.title}</h3>
                     </div>
                  </Link>
                ))}
             </div>
          </div>
        </section>
      )}

      {/* CTA Section - Responsive padding */}
      <section className="py-16 md:py-24 px-4 md:px-5">
        <div className="max-w-6xl mx-auto bg-slate-900 rounded-3xl md:rounded-[4rem] p-10 md:p-16 text-center text-white relative overflow-hidden">
          <div className="relative z-10 space-y-6 md:space-y-8">
            <h2 className="text-2xl md:text-5xl font-black tracking-tight leading-snug">ابدأ رحلتك الأكاديمية اليوم</h2>
            <p className="text-slate-400 max-w-2xl mx-auto font-bold text-sm md:text-lg">بوابة التقديم الإلكتروني للعام الجامعي الجديد مفتوحة الآن.</p>
            <div className="pt-4 md:pt-6">
              <Link to="/admission" className="bg-blue-600 text-white px-8 md:px-12 py-4 md:py-5 rounded-xl md:rounded-[2rem] font-bold text-sm md:text-lg shadow-2xl active:scale-95 inline-block">سجل الآن إلكترونياً</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service Modal - Responsive width */}
      {showServiceModal && editingService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-5 bg-slate-900/40 backdrop-blur-md animate-in fade-in zoom-in duration-300">
           <div className="bg-white w-full max-w-2xl rounded-3xl md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border border-slate-100 max-h-[90vh]">
              <div className="p-6 md:p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <h2 className="text-lg md:text-xl font-black text-slate-900 flex items-center gap-2 md:gap-3">
                   <Settings2 className="w-5 h-5 md:w-6 md:h-6 text-blue-600" /> إدارة الخدمة
                 </h2>
                 <button onClick={() => setShowServiceModal(false)} className="text-slate-400 hover:text-slate-900"><X className="w-5 h-5 md:w-6 md:h-6" /></button>
              </div>

              <div className="p-6 md:p-10 overflow-y-auto">
                 <form onSubmit={saveService} className="space-y-6 md:space-y-8">
                    <div className="flex flex-col items-center gap-4 md:gap-6 p-6 md:p-8 bg-slate-50 rounded-2xl md:rounded-[2.5rem] border-2 border-dashed border-slate-200">
                       <div className="w-20 h-20 md:w-32 md:h-32 bg-white rounded-2xl md:rounded-3xl flex items-center justify-center shadow-inner overflow-hidden border border-slate-100">
                          {editingService.imageUrl ? (
                            <img src={editingService.imageUrl} className="w-full h-full object-contain p-3 md:p-4" alt="Preview" />
                          ) : (
                            <ImageIcon className="w-8 h-8 md:w-12 md:h-12 text-slate-200" />
                          )}
                       </div>
                       <button 
                        type="button" 
                        onClick={() => serviceImageInputRef.current?.click()}
                        className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-white text-slate-900 rounded-lg md:rounded-xl font-bold text-[10px] md:text-xs shadow-md"
                       >
                         <Upload className="w-3.5 h-3.5 md:w-4 md:h-4" /> رفع أيقونة
                       </button>
                       <input type="file" ref={serviceImageInputRef} hidden accept="image/*" onChange={handleServiceImageUpload} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                       <div className="space-y-1.5 md:space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">اسم الخدمة (عربي)</label>
                          <input required type="text" value={editingService.titleAr} onChange={e => setEditingService({...editingService, titleAr: e.target.value})} className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm" />
                       </div>
                       <div className="space-y-1.5 md:space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Service Name (English)</label>
                          <input required type="text" value={editingService.titleEn} onChange={e => setEditingService({...editingService, titleEn: e.target.value})} className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm text-left" />
                       </div>
                    </div>

                    <div className="space-y-1.5 md:space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
                         <LinkIcon className="w-3 h-3 text-blue-500" /> رابط الخدمة (URL)
                       </label>
                       <input 
                        required 
                        type="text" 
                        value={editingService.path} 
                        onChange={e => setEditingService({...editingService, path: e.target.value})} 
                        placeholder="https://example.com/service"
                        className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm text-left" 
                       />
                    </div>

                    <button type="submit" className="w-full py-4 md:py-5 bg-slate-900 text-white rounded-xl md:rounded-[1.5rem] font-black text-sm shadow-xl active:scale-95">
                      حفظ الخدمة
                    </button>
                 </form>
              </div>
           </div>
        </div>
      )}

      {/* Stat Modal */}
      <StatEditModal />
    </div>
  );
};

export default Home;
