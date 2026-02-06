
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Globe, 
  Menu, 
  X, 
  LayoutDashboard, 
  GraduationCap, 
  Users, 
  FileCheck, 
  MessageSquare, 
  Star,
  ChevronLeft,
  Code2,
  Mail,
  ShieldCheck,
  HardDrive,
  MapPin,
  Phone,
  Facebook,
  Linkedin,
  Settings,
  Image as ImageIcon,
  Trash2,
  Upload,
  Edit3
} from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { Language } from '../types';

interface LayoutProps {
  children: React.ReactNode;
}

const FB_URL = "https://www.facebook.com/ZagazigNationalUniversity?mibextid=wwXIfr";
const LI_URL = "https://www.linkedin.com/in/zagazig-national-university-znu-egypt-7159a4333/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app";
const DEV_LI_URL = "https://www.linkedin.com/in/mohamed-yasser-640654356/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [lang, setLang] = useState<Language>(Language.AR);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [universityLogo, setUniversityLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.dir = lang === Language.AR ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => {
    setLang(prev => prev === Language.AR ? Language.EN : Language.AR);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUniversityLogo(reader.result as string);
        setShowSettings(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteLogo = () => {
    if (window.confirm('هل أنت متأكد من حذف لوجو الجامعة والعودة للشعار الافتراضي؟')) {
      setUniversityLogo(null);
      setShowSettings(false);
    }
  };

  const getIcon = (path: string) => {
    const iconClass = "w-5 h-5 md:w-5 md:h-5";
    switch(path) {
      case '/': return <LayoutDashboard className={iconClass} />;
      case '/board': return <ShieldCheck className={iconClass} />;
      case '/faculties': return <GraduationCap className={iconClass} />;
      case '/academic-drive': return <HardDrive className={iconClass} />;
      case '/staff': return <Users className={iconClass} />;
      case '/results': return <FileCheck className={iconClass} />;
      case '/complaints': return <MessageSquare className={iconClass} />;
      case '/evaluation': return <Star className={iconClass} />;
      case '/contact': return <Mail className={iconClass} />;
      default: return <ChevronLeft className={iconClass} />;
    }
  };

  const LogoComponent = ({ className = "w-16 h-16 md:w-20 md:h-20", showEdit = false }: { className?: string, showEdit?: boolean }) => (
    <div className="relative group/logo">
      <div className={`${className} bg-blue-50 border border-blue-100 rounded-2xl md:rounded-3xl flex items-center justify-center shadow-sm overflow-hidden transition-all duration-500`}>
        {universityLogo ? (
          <img src={universityLogo} alt="University Logo" className="w-full h-full object-contain p-2" />
        ) : (
          <span className="text-blue-600 font-bold text-2xl md:text-3xl tracking-tighter">ZNU</span>
        )}
      </div>
      
      {showEdit && (
        <button 
          onClick={(e) => { e.preventDefault(); setShowSettings(true); }}
          className="absolute -top-1 -left-1 w-7 h-7 md:w-8 md:h-8 bg-slate-900 text-white rounded-lg md:rounded-xl flex items-center justify-center opacity-0 group-hover/logo:opacity-100 transition-opacity shadow-lg"
        >
          <Edit3 className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white text-slate-800 font-smooth-in overflow-x-hidden">
      
      {/* Mobile Header - More Compact */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b sticky top-0 z-50 bg-white/95 backdrop-blur-lg shadow-sm">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-[10px] overflow-hidden">
            {universityLogo ? <img src={universityLogo} className="w-full h-full object-cover" /> : "ZNU"}
          </div>
          <span className="font-bold text-sm text-slate-900">جامعة الزقازيق الأهلية</span>
        </Link>
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-600 active:bg-slate-50 rounded-full transition-colors">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 right-0 h-screen z-[60]
        transition-transform duration-500 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        w-72 md:w-80 shrink-0 flex flex-col bg-white border-l border-slate-100 shadow-2xl lg:shadow-none
      `}>
        <div className="p-8 lg:p-10 flex flex-col items-center">
          <div className="flex flex-col items-center gap-4">
            <LogoComponent showEdit={true} />
            <div className="text-center">
              <h1 className="text-md md:text-lg font-bold text-slate-900 leading-tight">جامعة الزقازيق الأهلية</h1>
              <p className="text-[9px] md:text-[10px] text-blue-500 font-bold tracking-[0.2em] mt-1 opacity-80 uppercase">ZAGAZIG NATIONAL UNIVERSITY</p>
            </div>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)} 
            className="lg:hidden absolute top-6 left-6 p-2 text-slate-400 hover:text-slate-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 md:px-6 space-y-1 overflow-y-auto py-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={`
                flex items-center gap-3 md:gap-4 px-5 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl text-[13px] md:text-[14px] font-bold transition-all duration-300
                ${location.pathname === item.path 
                  ? 'bg-blue-600 text-white shadow-lg md:shadow-xl shadow-blue-100' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-blue-600'}
              `}
            >
              <span className={`${location.pathname === item.path ? 'text-white' : 'text-blue-400'}`}>
                {getIcon(item.path)}
              </span>
              {lang === Language.AR ? item.labelAr : item.labelEn}
            </Link>
          ))}
        </nav>

        <div className="p-6 md:p-8 border-t border-slate-50 space-y-2">
          <button onClick={toggleLang} className="w-full flex items-center justify-center gap-2 py-3 bg-slate-50 text-slate-600 rounded-xl font-bold text-[11px] md:text-xs hover:bg-blue-50 hover:text-blue-600 transition-all">
            <Globe className="w-4 h-4" />
            {lang === Language.AR ? 'English' : 'العربية'}
          </button>
          
          <button 
            onClick={() => setShowSettings(true)}
            className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 text-white rounded-xl font-bold text-[11px] md:text-xs hover:bg-slate-800 transition-all shadow-md"
          >
            <Settings className="w-4 h-4" />
            إدارة الهوية
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative bg-white">
          {children}

          {/* Footer - More compact for mobile */}
          <footer className="bg-slate-50 border-t border-slate-100 pt-12 md:pt-20 pb-8 md:pb-12 px-5 md:px-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 text-right">
              
              <div className="space-y-4 md:space-y-6 order-1 lg:order-4">
                <div className="w-fit">
                   <LogoComponent className="w-14 h-14 md:w-16 md:h-16" />
                </div>
                <p className="text-[13px] md:text-sm text-slate-500 leading-relaxed font-medium">
                  مؤسسة تعليمية وطنية رائدة تهدف إلى بناء المستقبل من خلال العلم والابتكار والبحث العلمي في قلب مدينة العاشر من رمضان.
                </p>
                <div className="flex gap-4 md:gap-5 pt-1">
                  <a href={FB_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-11 md:h-11 bg-white border border-slate-100 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href={LI_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-11 md:h-11 bg-white border border-slate-100 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div className="order-2 lg:order-3">
                <h3 className="text-md md:text-lg font-bold text-slate-900 mb-4 md:mb-8 flex items-center gap-2">
                  روابط سريعة
                  <span className="w-8 md:w-10 h-1 bg-blue-500 rounded-full"></span>
                </h3>
                <ul className="space-y-3 md:space-y-4 text-[13px] md:text-[14px] text-slate-500 font-medium">
                  <li><Link to="/admission" className="hover:text-blue-600 transition-colors">القبول والتسجيل</Link></li>
                  <li><Link to="/faculties" className="hover:text-blue-600 transition-colors">الكليات والبرامج الأكاديمية</Link></li>
                  <li><Link to="/staff" className="hover:text-blue-600 transition-colors">الهيئة التدريسية</Link></li>
                  <li><Link to="/contact" className="hover:text-blue-600 transition-colors">اتصل بنا</Link></li>
                </ul>
              </div>

              <div className="order-3 lg:order-2">
                <h3 className="text-md md:text-lg font-bold text-slate-900 mb-4 md:mb-8 flex items-center gap-2">
                  معلومات التواصل
                  <span className="w-8 md:w-10 h-1 bg-emerald-500 rounded-full"></span>
                </h3>
                <ul className="space-y-4 md:space-y-5 text-[13px] md:text-[14px] text-slate-500 font-medium">
                  <li className="flex items-start gap-3 justify-start">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-blue-500 shrink-0" />
                    <span className="leading-relaxed">مدينة العاشر من رمضان، محافظة الشرقية</span>
                  </li>
                  <li className="flex items-center gap-3 justify-start">
                    <Mail className="w-4 h-4 md:w-5 md:h-5 text-emerald-500 shrink-0" />
                    <span>info@znu.edu.eg</span>
                  </li>
                </ul>
              </div>

              <div className="order-4 lg:order-1 bg-blue-600 p-8 md:p-10 rounded-2xl md:rounded-[2.5rem] text-white shadow-xl md:shadow-2xl shadow-blue-100">
                <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 leading-tight">النشرة الإخبارية</h3>
                <p className="text-xs md:text-sm text-blue-100 mb-6 md:mb-8 font-medium">اشترك لتصلك أحدث المستجدات الأكاديمية</p>
                <div className="flex gap-2">
                  <input type="text" placeholder="البريد الإلكتروني" className="bg-white/15 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder:text-blue-200 outline-none w-full text-xs font-medium" />
                  <button className="bg-white text-blue-600 p-2.5 rounded-xl hover:bg-blue-50 transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                </div>
              </div>

            </div>

            <div className="max-w-7xl mx-auto mt-12 md:mt-20 pt-8 md:pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 text-[11px] md:text-[12px] text-slate-400 font-bold uppercase tracking-wider text-center md:text-right">
              <p>© {new Date().getFullYear()} جامعة الزقازيق الأهلية - كافة الحقوق محفوظة</p>
              <div className="flex items-center gap-3">
                <a 
                  href={DEV_LI_URL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 text-xs md:text-sm hover:underline transition-all"
                >
                  تطوير م. محمد ياسر
                </a>
                <Code2 className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
              </div>
            </div>
          </footer>
        </main>
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>
      )}
    </div>
  );
};

export default Layout;
