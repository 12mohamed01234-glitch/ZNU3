
import React, { useState, useRef, useEffect } from 'react';
import { 
  Newspaper, 
  Calendar, 
  Plus, 
  Trash2, 
  Edit2, 
  Settings2, 
  Upload, 
  Image as ImageIcon, 
  FileText, 
  Video, 
  X, 
  CheckCircle, 
  Save,
  Download,
  ChevronLeft,
  Clock,
  Tag
} from 'lucide-react';
import { NewsPost } from '../types';

const News: React.FC = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<NewsPost | null>(null);
  
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [posts, setPosts] = useState<NewsPost[]>(() => {
    const saved = localStorage.getItem('znu_news_v1');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        title: 'اعتماد نتائج الفصل الدراسي الأول لكافة الكليات',
        content: 'تعلن جامعة الزقازيق الأهلية عن ظهور نتائج الطلاب بكافة الكليات والبرامج الأكاديمية عبر المنصة الإلكترونية الرسمية.',
        date: '15 فبراير 2024',
        category: 'شؤون طلابية',
        image: 'https://images.unsplash.com/photo-1523050853064-85572275ad28?auto=format&fit=crop&q=80&w=1200',
      }
    ];
  });

  const [formData, setFormData] = useState<Partial<NewsPost>>({
    title: '',
    content: '',
    category: 'أخبار عامة',
    date: new Date().toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }),
    image: '',
    video: '',
    attachment: undefined
  });

  useEffect(() => {
    localStorage.setItem('znu_news_v1', JSON.stringify(posts));
  }, [posts]);

  const handleFileUpload = (type: 'image' | 'video' | 'pdf', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (type === 'image') setFormData(prev => ({ ...prev, image: result }));
        if (type === 'video') setFormData(prev => ({ ...prev, video: result }));
        if (type === 'pdf') {
          setFormData(prev => ({ 
            ...prev, 
            attachment: { 
              name: file.name, 
              url: result, 
              size: (file.size / (1024 * 1024)).toFixed(2) + ' MB' 
            } 
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الخبر نهائياً؟')) {
      setPosts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleOpenModal = (post?: NewsPost) => {
    if (post) {
      setEditingPost(post);
      setFormData(post);
    } else {
      setEditingPost(null);
      setFormData({
        title: '',
        content: '',
        category: 'أخبار عامة',
        date: new Date().toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }),
        image: '',
        video: '',
        attachment: undefined
      });
    }
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPost) {
      setPosts(prev => prev.map(p => p.id === editingPost.id ? (formData as NewsPost) : p));
    } else {
      const newPost: NewsPost = {
        ...(formData as NewsPost),
        id: Date.now().toString()
      };
      setPosts(prev => [newPost, ...prev]);
    }
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-white animate-in fade-in duration-700">
      
      {/* Admin Control Toggle */}
      <div className="fixed top-16 md:top-24 left-4 md:left-8 z-[60]">
        <button 
          onClick={() => setIsAdminMode(!isAdminMode)}
          className={`flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3.5 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs transition-all shadow-2xl active:scale-95 ${isAdminMode ? 'bg-emerald-600 text-white shadow-emerald-200' : 'bg-slate-900 text-white shadow-slate-200'}`}
        >
          {isAdminMode ? <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4" /> : <Settings2 className="w-3.5 h-3.5 md:w-4 md:h-4" />}
          <span className="hidden xs:inline">{isAdminMode ? 'حفظ' : 'إدارة'}</span>
          <span className="xs:hidden">{isAdminMode ? 'حفظ' : 'إدارة'}</span>
        </button>
      </div>

      {/* Header */}
      <section className="bg-slate-50 py-16 md:py-20 px-5 text-center border-b border-slate-100">
        <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl shadow-xl flex items-center justify-center text-blue-600 mx-auto border border-slate-100">
             <Newspaper className="w-7 h-7 md:w-8 md:h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900">مركز الأخبار</h1>
          <p className="text-slate-500 font-bold text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
            المنصة الرسمية لمتابعة كافة المستجدات في جامعة الزقازيق الأهلية.
          </p>
          
          {isAdminMode && (
            <button 
              onClick={() => handleOpenModal()}
              className="mt-6 md:mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 md:px-10 py-3.5 md:py-4 rounded-xl md:rounded-2xl font-bold flex items-center gap-2 md:gap-3 mx-auto shadow-xl shadow-blue-100 active:scale-95 transition-all text-sm"
            >
              <Plus className="w-4 h-4 md:w-5 md:h-5" />
              إضافة خبر جديد
            </button>
          )}
        </div>
      </section>

      {/* News Feed */}
      <section className="py-12 md:py-20 px-4 md:px-5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {posts.map((post) => (
            <div key={post.id} className="group bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col relative">
               
               {isAdminMode && (
                 <div className="absolute top-4 left-4 flex gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleOpenModal(post)} className="w-9 h-9 md:w-10 md:h-10 bg-blue-600 text-white rounded-lg md:rounded-xl flex items-center justify-center shadow-lg"><Edit2 className="w-3.5 h-3.5 md:w-4 md:h-4" /></button>
                    <button onClick={() => handleDelete(post.id)} className="w-9 h-9 md:w-10 md:h-10 bg-red-500 text-white rounded-lg md:rounded-xl flex items-center justify-center shadow-lg"><Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" /></button>
                 </div>
               )}

               <div className="relative h-48 md:h-60 overflow-hidden bg-slate-100">
                 {post.image ? (
                   <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <ImageIcon className="w-10 h-10 md:w-12 md:h-12" />
                   </div>
                 )}
                 <div className="absolute bottom-4 right-4 md:bottom-5 md:right-5 bg-blue-600 text-white px-3 md:px-4 py-1 md:py-1.5 rounded-lg text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                   {post.category}
                 </div>
               </div>

               <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 md:gap-3 text-slate-400 text-[10px] md:text-[11px] font-bold mb-3 md:mb-5">
                    <Calendar className="w-3.5 h-3.5 text-blue-500" />
                    {post.date}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 md:mb-4 leading-snug">{post.title}</h3>
                  <p className="text-slate-500 text-[13px] md:text-sm leading-relaxed line-clamp-3 mb-6 md:mb-8 flex-1">{post.content}</p>
                  
                  <div className="space-y-3 md:space-y-4">
                    {post.video && (
                      <div className="rounded-xl md:rounded-2xl overflow-hidden border border-slate-100 aspect-video mb-3 md:mb-4">
                        <video src={post.video} controls className="w-full h-full object-cover" />
                      </div>
                    )}
                    
                    {post.attachment && (
                      <a 
                        href={post.attachment.url} 
                        download={post.attachment.name}
                        className="flex items-center justify-between p-3 md:p-4 bg-slate-50 rounded-xl md:rounded-2xl border border-slate-100 hover:bg-emerald-50 hover:border-emerald-200 transition-all group/file"
                      >
                         <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-emerald-600" />
                            <div className="text-right">
                               <div className="text-[10px] md:text-[11px] font-bold text-slate-900 line-clamp-1">{post.attachment.name}</div>
                               <div className="text-[9px] text-slate-400">{post.attachment.size}</div>
                            </div>
                         </div>
                         <Download className="w-4 h-4 text-slate-300 group-hover/file:text-emerald-600" />
                      </a>
                    )}
                  </div>

                  <button className="mt-6 md:mt-8 flex items-center gap-2 text-blue-600 font-bold text-[11px] md:text-xs hover:translate-x-[-4px] transition-transform">
                    اقرأ المزيد
                    <ChevronLeft className="w-4 h-4" />
                  </button>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add/Edit Modal - Responsive columns */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-slate-900/40 backdrop-blur-md animate-in fade-in zoom-in duration-300 overflow-y-auto">
          <div className="bg-white w-full max-w-4xl rounded-3xl md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
            
            {/* Media Upload Side */}
            <div className="w-full md:w-1/3 bg-slate-50 p-6 md:p-10 flex flex-col items-center border-b md:border-b-0 md:border-l border-slate-100 overflow-y-auto">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 md:mb-8 text-center">الوسائط</h4>
               
               <div className="space-y-4 md:space-y-6 w-full">
                  {/* Image */}
                  <div className="space-y-2 md:space-y-3">
                    <label className="text-[9px] font-black text-slate-400 uppercase">الصورة البارزة</label>
                    <div 
                      onClick={() => imageInputRef.current?.click()}
                      className="aspect-video bg-white rounded-xl md:rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-all overflow-hidden group"
                    >
                      {formData.image ? (
                        <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
                      ) : (
                        <div className="flex flex-col items-center gap-1.5 md:gap-2 text-slate-300 group-hover:text-blue-500">
                          <ImageIcon className="w-6 h-6 md:w-8 md:h-8" />
                          <span className="text-[9px] md:text-[10px] font-bold">رفع صورة</span>
                        </div>
                      )}
                    </div>
                    <input type="file" ref={imageInputRef} hidden accept="image/*" onChange={(e) => handleFileUpload('image', e)} />
                  </div>

                  {/* Video */}
                  <div className="space-y-2 md:space-y-3">
                    <label className="text-[9px] font-black text-slate-400 uppercase">فيديو (اختياري)</label>
                    <div 
                      onClick={() => videoInputRef.current?.click()}
                      className="aspect-video bg-white rounded-xl md:rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:border-amber-500 transition-all overflow-hidden group"
                    >
                      {formData.video ? (
                        <video src={formData.video} className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center gap-1.5 md:gap-2 text-slate-300 group-hover:text-amber-500">
                          <Video className="w-6 h-6 md:w-8 md:h-8" />
                          <span className="text-[9px] md:text-[10px] font-bold">رفع فيديو</span>
                        </div>
                      )}
                    </div>
                    <input type="file" ref={videoInputRef} hidden accept="video/*" onChange={(e) => handleFileUpload('video', e)} />
                  </div>

                  {/* PDF Attachment */}
                  <div className="space-y-2 md:space-y-3">
                    <label className="text-[9px] font-black text-slate-400 uppercase">مرفق PDF</label>
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-3 md:py-4 bg-white border-2 border-dashed border-slate-200 rounded-xl md:rounded-2xl flex items-center justify-center gap-2 md:gap-3 text-slate-400 hover:border-emerald-500 hover:text-emerald-500 transition-all"
                    >
                      {formData.attachment ? <CheckCircle className="w-4 h-4 md:w-5 md:h-5" /> : <FileText className="w-4 h-4 md:w-5 md:h-5" />}
                      <span className="text-[9px] md:text-[10px] font-bold">{formData.attachment ? 'تم الاختيار' : 'رفع PDF'}</span>
                    </button>
                    <input type="file" ref={fileInputRef} hidden accept=".pdf" onChange={(e) => handleFileUpload('pdf', e)} />
                  </div>
               </div>
            </div>

            {/* Form Side */}
            <div className="w-full md:w-2/3 p-6 md:p-12 overflow-y-auto">
               <div className="flex justify-between items-center mb-6 md:mb-10">
                 <h2 className="text-lg md:text-xl font-black text-slate-900 flex items-center gap-2 md:gap-3">
                    <Save className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                    {editingPost ? 'تعديل الخبر' : 'خبر جديد'}
                 </h2>
                 <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-900"><X className="w-5 h-5 md:w-6 md:h-6" /></button>
               </div>

               <form onSubmit={handleSave} className="space-y-5 md:space-y-6">
                  <div className="space-y-1.5 md:space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">عنوان الخبر</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.title} 
                      onChange={e => setFormData({...formData, title: e.target.value})} 
                      className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm" 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4">
                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">التصنيف</label>
                      <select 
                        value={formData.category} 
                        onChange={e => setFormData({...formData, category: e.target.value})}
                        className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm"
                      >
                        <option>أخبار عامة</option>
                        <option>شؤون طلابية</option>
                        <option>بحث علمي</option>
                        <option>فعاليات ومؤتمرات</option>
                      </select>
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">التاريخ</label>
                      <input 
                        type="text" 
                        value={formData.date} 
                        onChange={e => setFormData({...formData, date: e.target.value})}
                        className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 md:space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">محتوى الخبر</label>
                    <textarea 
                      required 
                      rows={5}
                      value={formData.content} 
                      onChange={e => setFormData({...formData, content: e.target.value})} 
                      className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm resize-none" 
                    />
                  </div>

                  <button type="submit" className="w-full py-4 md:py-5 bg-slate-900 text-white rounded-xl md:rounded-[1.5rem] font-black text-sm shadow-xl active:scale-95">
                    {editingPost ? 'حفظ' : 'نشر الخبر'}
                  </button>
               </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
