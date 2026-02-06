
import React, { useState } from 'react';
import { Shield, Send, CheckCircle2 } from 'lucide-react';
import { FACULTIES } from '../constants';

const Complaints: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="py-20 flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-8 animate-bounce">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-bold font-serif-ar mb-4">تم استلام طلبك بنجاح</h1>
        <p className="text-slate-600 max-w-md mx-auto mb-8">
          نشكرك على مساهمتك في تحسين جودة التعليم. نؤكد لك أن هويتك مجهولة تماماً وسيتم التعامل مع الشكوى بجدية تامة من قبل اللجان المختصة في جامعة الزقازيق الأهلية.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="bg-slate-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-slate-800 transition-all"
        >
          تقديم طلب آخر
        </button>
      </div>
    );
  }

  return (
    <div className="py-20 bg-slate-50 dark:bg-slate-900 min-h-[70vh] animate-in fade-in duration-500">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <div className="bg-[#2c5da7] text-white p-12 rounded-t-2xl shadow-xl relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <Shield className="w-96 h-96 -translate-x-1/2 -translate-y-1/2" />
           </div>
           <div className="relative z-10">
              <h1 className="text-4xl font-bold font-serif-ar mb-6">منصة المقترحات والشكاوى</h1>
              <p className="text-blue-50 text-lg leading-relaxed">
                تلتزم جامعة الزقازيق الأهلية بتوفير بيئة تعليمية آمنة وعادلة. يمكنك تقديم ملاحظاتك أو شكواك دون الحاجة للكشف عن هويتك. 
                سيصل صوتك مباشرة إلى الجهات الرقابية العليا في الجامعة.
              </p>
           </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-10 rounded-b-2xl shadow-xl border-x border-b border-slate-100 dark:border-slate-700">
           <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">جهة الشكوى / الكلية المعنية</label>
                  <select 
                    required
                    className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    <option value="">اختر الكلية...</option>
                    {FACULTIES.map(f => <option key={f.id} value={f.id}>{f.nameAr}</option>)}
                    <option value="admin">رئاسة الجامعة / الشؤون الإدارية</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">نوع الملاحظة</label>
                  <select 
                    required
                    className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    <option value="">اختر النوع...</option>
                    <option value="academic">أكاديمي / تدريسي</option>
                    <option value="admin">إداري / مالي</option>
                    <option value="facility">خدمات / مرافق الجامعة</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">تفاصيل الشكوى</label>
                <textarea 
                  required
                  rows={6}
                  placeholder="يرجى كتابة التفاصيل بوضوح مع ذكر التواريخ إن وجدت..."
                  className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                ></textarea>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl flex gap-4 items-start">
                 <div className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg shrink-0">
                    <Shield className="w-6 h-6" />
                 </div>
                 <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed text-right">
                   <strong>سياسة الخصوصية:</strong> جميع المعلومات المقدمة مشفرة ولا يتم تخزين أي بيانات تدل على المرسل. صوتك محمي ومحترم في جامعة الزقازيق الأهلية.
                 </p>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-[#2c5da7] hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-3"
              >
                {loading ? 'جاري الإرسال...' : (
                  <>
                    إرسال الشكوى رسمياً
                    <Send className="w-5 h-5 rtl:rotate-180" />
                  </>
                )}
              </button>
           </form>
        </div>
      </div>
    </div>
  );
};

export default Complaints;
