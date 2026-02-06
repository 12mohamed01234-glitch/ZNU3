
import React, { useState } from 'react';
import { Star, MessageSquare, CheckCircle } from 'lucide-react';
import { STAFF_LIST, FACULTIES } from '../constants';

const Evaluation: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="py-32 flex flex-col items-center justify-center text-center px-4">
        <CheckCircle className="w-20 h-20 text-emerald-600 mb-6" />
        <h1 className="text-3xl font-bold font-serif-ar mb-4">نشكرك على مشاركتك</h1>
        <p className="text-slate-600 max-w-md mx-auto">سيتم استخدام هذا التقييم في تقارير جودة التعليم السنوية لجامعة الزقازيق الأهلية.</p>
        <button onClick={() => setSubmitted(false)} className="mt-8 text-emerald-700 font-bold border-b border-emerald-700">تقييم تدريسي آخر</button>
      </div>
    );
  }

  return (
    <div className="py-20 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold font-serif-ar text-slate-900 dark:text-white mb-4">تقييم الكادر التدريسي</h1>
          <p className="text-slate-600 dark:text-slate-400">تقييمك هو حجر الأساس في عملية تطوير المناهج وتحسين أداء الهيئة التدريسية بجامعة الزقازيق الأهلية. التقييم مجهول تماماً لضمان الشفافية.</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700">
           <form onSubmit={handleSubmit}>
              <div className="p-8 md:p-12 space-y-10">
                {/* Selection Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">اختر الكلية</label>
                    <select required className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">اختر الكلية...</option>
                      {FACULTIES.map(f => <option key={f.id} value={f.id}>{f.nameAr}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">اسم التدريسي</label>
                    <select required className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">اختر الاسم من القائمة...</option>
                      {STAFF_LIST.map(s => <option key={s.id} value={s.id}>{s.nameAr}</option>)}
                    </select>
                  </div>
                </div>

                {/* Star Rating Section */}
                <div className="text-center py-10 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                  <h3 className="text-lg font-bold mb-6 text-slate-700 dark:text-slate-300">ما هو تقييمك العام لأداء الأستاذ؟</h3>
                  <div className="flex items-center justify-center gap-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="transition-transform hover:scale-125 focus:outline-none"
                        onMouseEnter={() => setHovered(star)}
                        onMouseLeave={() => setHovered(0)}
                        onClick={() => setRating(star)}
                      >
                        <Star 
                          className={`w-12 h-12 ${
                            (hovered || rating) >= star 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-slate-300 dark:text-slate-700'
                          } transition-colors`}
                        />
                      </button>
                    ))}
                  </div>
                  <p className="mt-4 text-sm font-bold text-slate-400">
                    {rating === 5 ? 'ممتاز' : rating === 4 ? 'جيد جداً' : rating === 3 ? 'جيد' : rating === 2 ? 'مقبول' : rating === 1 ? 'ضعيف' : 'يرجى تحديد التقييم'}
                  </p>
                </div>

                {/* Feedback Section */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    ملاحظات إضافية (اختياري)
                  </label>
                  <textarea 
                    rows={4}
                    placeholder="اكتب أي ملاحظات قد تساعد في تحسين تجربة التعلم..."
                    className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                <div className="p-6 border-t border-slate-100 dark:border-slate-700 flex flex-col md:flex-row items-center justify-between gap-6">
                   <div className="text-sm text-slate-500 text-center md:text-right">
                     هذا التقييم خاضع لقوانين الخصوصية في جامعة الزقازيق الأهلية ولا يطلع عليه التدريسي بشكل مباشر.
                   </div>
                   <button 
                    type="submit"
                    className="px-12 py-4 bg-blue-700 hover:bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-900/20 transition-all"
                   >
                     تأكيد التقييم
                   </button>
                </div>
              </div>
           </form>
        </div>
      </div>
    </div>
  );
};

export default Evaluation;
