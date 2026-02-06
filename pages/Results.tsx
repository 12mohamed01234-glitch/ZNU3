
import React, { useState } from 'react';
import { Printer, CheckCircle, Facebook, Info, Eye, EyeOff } from 'lucide-react';

const FB_URL = "https://www.facebook.com/ZagazigNationalUniversity?mibextid=wwXIfr";
const GET_CODE_URL = "http://www.militaryeducation.zu.edu.eg/Views/General/GetStudInfo";

const Results: React.FC = () => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId || !password) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowResults(true);
    }, 1200);
  };

  return (
    <div className="bg-[#f0f0f0] min-h-screen animate-in fade-in duration-500 pb-10">
      {/* Header with Title */}
      <div className="bg-[#2c5da7] text-white py-10 px-5 shadow-md">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">خدمات التسجيل الالكتروني</h1>
          <h2 className="text-lg md:text-xl font-medium opacity-90">جامعة الزقازيق الأهلية</h2>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-5">
        {!showResults ? (
          <div className="flex flex-col gap-4">
            {/* FB Link */}
            <div className="flex justify-center md:justify-end">
              <a href={FB_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-800 font-bold hover:underline text-[13px] bg-white px-4 py-2 rounded-full shadow-sm">
                الصفحة الرسمية لجامعة الزقازيق الأهلية
                <Facebook className="w-4 h-4 fill-blue-800 text-white" />
              </a>
            </div>

            {/* Login Box */}
            <div className="bg-white border border-gray-300 rounded-xl p-6 md:p-10 shadow-lg">
              <h3 className="text-xl font-bold text-right mb-8 border-b border-gray-100 pb-4">بيانات الدخول للنظام</h3>
              
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-right font-bold text-gray-600 text-sm">كود الطالب</label>
                  <input 
                    type="text" 
                    value={studentId}
                    placeholder="مثال: 20230001"
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-inner text-right"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-right font-bold text-gray-600 text-sm">كلمة السر</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="الرقم القومى أو الرقم السرى"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border border-gray-300 p-4 pl-12 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-inner text-right"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#2c5da7] text-white py-4 rounded-xl hover:bg-blue-700 transition-all font-bold text-lg active:scale-95 shadow-md"
                  >
                    {loading ? 'جارى التحميل...' : 'تسجيل دخول'}
                  </button>
                </div>
              </form>

              <div className="mt-10 flex flex-col items-center gap-4 border-t pt-8">
                <a 
                  href={GET_CODE_URL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-700 font-bold text-sm hover:underline"
                >
                  الحصول على الكود بالرقم القومي
                </a>
                <a href="#" className="text-blue-700 font-bold text-sm hover:underline">
                  تسجيل الاستبيان السنوي
                </a>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-5 rounded-xl flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-[12px] text-blue-800 leading-relaxed text-right">
                تنبيه: في حالة نسيان كلمة السر، يرجى مراجعة إدارة شؤون الطلاب بمبنى الجامعة الرئيسي في الزقازيق.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-in slide-in-from-bottom duration-500">
            <div className="p-6 bg-slate-900 text-white flex flex-col items-center text-center gap-3">
               <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center">
                 <CheckCircle className="text-white w-10 h-10" />
               </div>
               <div>
                 <h3 className="font-bold text-lg">أحمد محمد عبد الرحمن</h3>
                 <p className="text-xs opacity-70">جامعة الزقازيق الأهلية - كلية الحاسبات</p>
               </div>
            </div>

            <div className="p-4 overflow-x-auto">
               <table className="w-full text-right">
                 <thead>
                   <tr className="text-slate-500 text-xs font-bold border-b">
                     <th className="p-3">المادة</th>
                     <th className="p-3 text-center">الدرجة</th>
                     <th className="p-3 text-center">التقدير</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                   {[
                     { name: 'هندسة البرمجيات', score: 89, grade: 'امتياز' },
                     { name: 'هياكل البيانات', score: 94, grade: 'امتياز' },
                     { name: 'تصميم الويب', score: 96, grade: 'امتياز' }
                   ].map((item, i) => (
                     <tr key={i} className="text-sm">
                       <td className="p-3 font-medium">{item.name}</td>
                       <td className="p-3 text-center font-bold text-blue-600">{item.score}</td>
                       <td className="p-3 text-center text-xs">{item.grade}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            </div>

            <div className="p-6 flex flex-col gap-3 border-t">
              <button className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 rounded-xl font-bold text-sm">
                <Printer className="w-4 h-4" /> طباعة النتائج
              </button>
              <button 
                onClick={() => setShowResults(false)}
                className="w-full py-3 text-blue-700 font-bold text-sm"
              >
                رجوع
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;
