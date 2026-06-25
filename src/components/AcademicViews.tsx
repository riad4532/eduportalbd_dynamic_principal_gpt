/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { getStudentStats, getRoutines, getSyllabuses, StudentStat, Routine, Syllabus } from '../data';
import { Download, Calendar, BookOpen, AlertCircle } from 'lucide-react';

interface AcademicProps {
  institutionName: string;
}

export function StudentStatsView({ institutionName }: AcademicProps) {
  const stats = getStudentStats().filter(s => s.is_active);

  // Calculate totals and averages
  const latestStat = stats[stats.length - 1];
  const totalClasses = latestStat ? (latestStat.class_6 + latestStat.class_7 + latestStat.class_8 + latestStat.class_9 + latestStat.class_10) : 0;

  return (
    <div className="space-y-8" id="student-stats-section">
      <div className="border-l-4 border-blue-800 pl-4">
        <h2 className="text-2xl font-bold text-gray-900">শিক্ষার্থী পরিসংখ্যান (Student Statistics)</h2>
        <p className="text-sm text-gray-500">{institutionName}-এর বছরভিত্তিক শিক্ষার্থী তথ্য ও পরীক্ষার ফলাফল</p>
      </div>

      {latestStat && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center">
            <span className="text-gray-500 text-sm block mb-1">চলতি শিক্ষাবর্ষ ({latestStat.year})</span>
            <span className="text-3xl font-extrabold text-blue-800">{totalClasses} জন</span>
            <span className="text-xs text-gray-400 block mt-2">মোট অধ্যয়নরত শিক্ষার্থী</span>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center">
            <span className="text-gray-500 text-sm block mb-1">গড় পাসের হার (SSC)</span>
            <span className="text-3xl font-extrabold text-green-700">{latestStat.ssc_pass_rate}</span>
            <span className="text-xs text-gray-400 block mt-2">বিগত এসএসসি পরীক্ষা</span>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center">
            <span className="text-gray-500 text-sm block mb-1">মোট শ্রেণি</span>
            <span className="text-3xl font-extrabold text-indigo-800">৫টি</span>
            <span className="text-xs text-gray-400 block mt-2">শ্রেণি ৬ষ্ঠ থেকে ১০ম</span>
          </div>
        </div>
      )}

      {/* Visual Custom Chart */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-6 text-center">বিগত ৫ বছরের শিক্ষার্থী সংখ্যা বৃদ্ধি চিত্র</h3>
        <div className="h-64 flex items-end justify-between gap-4 px-4 pt-4 border-b border-gray-300">
          {stats.map((s) => {
            const classSum = s.class_6 + s.class_7 + s.class_8 + s.class_9 + s.class_10;
            const heightPercent = Math.min(100, Math.max(10, (classSum / 500) * 100));
            return (
              <div key={s.id} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer h-full justify-end">
                <div className="text-xs font-semibold text-blue-800 opacity-0 group-hover:opacity-100 transition-opacity mb-1 bg-blue-50 px-1.5 py-0.5 rounded shadow-sm">
                  {classSum} জন
                </div>
                <div 
                  style={{ height: `${heightPercent}%` }} 
                  className="w-full max-w-[48px] bg-blue-700 hover:bg-blue-800 rounded-t-md transition-all duration-500 shadow-inner flex items-center justify-center text-white text-[10px] font-bold"
                >
                  <span className="hidden sm:inline rotate-90 sm:rotate-0">{s.ssc_pass_rate}</span>
                </div>
                <span className="text-sm font-bold text-gray-600 mt-2">{s.year}</span>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-gray-400 text-center mt-3">* স্তম্ভের ভেতর বিগত বছরের এসএসসি পরীক্ষার পাসের হার প্রদর্শিত রয়েছে</p>
      </div>

      {/* Statistics Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h3 className="font-bold text-gray-800">বছরভিত্তিক বিস্তারিত তালিকা (Detailed Enrollments)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-800 text-white">
                <th className="p-3 text-center font-semibold">শিক্ষাবর্ষ</th>
                <th className="p-3 text-center font-semibold">৬ষ্ঠ শ্রেণি</th>
                <th className="p-3 text-center font-semibold">৭ম শ্রেণি</th>
                <th className="p-3 text-center font-semibold">৮ম শ্রেণি</th>
                <th className="p-3 text-center font-semibold">৯ম শ্রেণি</th>
                <th className="p-3 text-center font-semibold">১০ম শ্রেণি</th>
                <th className="p-3 text-center font-semibold bg-blue-900">মোট শিক্ষার্থী</th>
                <th className="p-3 text-center font-semibold bg-green-800">এসএসসি পাসের হার</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {stats.map((s, idx) => {
                const rowTotal = s.class_6 + s.class_7 + s.class_8 + s.class_9 + s.class_10;
                return (
                  <tr key={s.id} className={idx % 2 === 0 ? "bg-white hover:bg-gray-50" : "bg-gray-50/50 hover:bg-gray-50"}>
                    <td className="p-3 text-center font-bold text-gray-900">{s.year}</td>
                    <td className="p-3 text-center text-gray-700">{s.class_6} জন</td>
                    <td className="p-3 text-center text-gray-700">{s.class_7} জন</td>
                    <td className="p-3 text-center text-gray-700">{s.class_8} জন</td>
                    <td className="p-3 text-center text-gray-700">{s.class_9} জন</td>
                    <td className="p-3 text-center text-gray-700">{s.class_10} জন</td>
                    <td className="p-3 text-center font-bold text-blue-900 bg-blue-50/50">{rowTotal} জন</td>
                    <td className="p-3 text-center font-bold text-green-800 bg-green-50/30">{s.ssc_pass_rate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function RoutineView({ institutionName }: AcademicProps) {
  const routines = getRoutines().filter(r => r.is_active);

  return (
    <div className="space-y-6" id="class-routine-section">
      <div className="border-l-4 border-blue-800 pl-4">
        <h2 className="text-2xl font-bold text-gray-900">শ্রেণি রুটিন (Class Routine)</h2>
        <p className="text-sm text-gray-500">{institutionName}-এর নিয়মিত সাপ্তাহিক ক্লাস রুটিন ডাউনলোড করুন</p>
      </div>

      {routines.length === 0 ? (
        <div className="bg-blue-50 p-6 rounded-lg text-center text-blue-800 border border-blue-100 flex flex-col items-center">
          <AlertCircle className="w-12 h-12 mb-3" />
          <h4 className="font-bold">বর্তমানে কোনো ক্লাস রুটিন আপলোড করা নেই।</h4>
          <p className="text-sm mt-1">অনুগ্রহ করে পরবর্তীতে আবার পরীক্ষা করুন অথবা বিদ্যালয়ের কার্যালয়ে যোগাযোগ করুন।</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routines.map((r) => (
            <div key={r.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col">
              <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white p-4">
                <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full font-medium inline-block mb-2">
                  শিক্ষাবর্ষ: {r.year}
                </span>
                <h3 className="text-lg font-bold">{r.class_name}</h3>
                <p className="text-xs text-blue-100 mt-1">শাখা/গ্রুপ: {r.section}</p>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                <div className="text-xs text-gray-500 space-y-1">
                  <div className="flex justify-between border-b border-gray-100 pb-1">
                    <span>কার্যকরী তারিখ:</span>
                    <span className="font-semibold text-gray-700">{r.effective_date}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-1 pt-1">
                    <span>ফাইল টাইপ:</span>
                    <span className="font-semibold text-gray-700">PDF Document</span>
                  </div>
                </div>

                <a
                  href={`#download-${r.attachment_name}`}
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`ডাউনলোড শুরু হচ্ছে: ${r.attachment_name}\n(আকার: ${r.attachment_size})`);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded font-bold text-sm transition-colors shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  ডাউনলোড রুটিন ({r.attachment_size})
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function SyllabusView({ institutionName }: AcademicProps) {
  const syllabuses = getSyllabuses().filter(s => s.is_active);

  // Group syllabuses by class
  const grouped: { [key: string]: Syllabus[] } = {};
  syllabuses.forEach(s => {
    if (!grouped[s.class_name]) {
      grouped[s.class_name] = [];
    }
    grouped[s.class_name].push(s);
  });

  const [openClass, setOpenClass] = useState<string | null>(
    Object.keys(grouped).length > 0 ? Object.keys(grouped)[0] : null
  );

  return (
    <div className="space-y-6" id="syllabus-section">
      <div className="border-l-4 border-blue-800 pl-4">
        <h2 className="text-2xl font-bold text-gray-900">পাঠ্যসূচি (Syllabus)</h2>
        <p className="text-sm text-gray-500">{institutionName}-এর শ্রেণি ও সাময়িকী ভিত্তিক বিস্তারিত সিলেবাস</p>
      </div>

      {Object.keys(grouped).length === 0 ? (
        <div className="bg-blue-50 p-6 rounded-lg text-center text-blue-800 border border-blue-100 flex flex-col items-center">
          <AlertCircle className="w-12 h-12 mb-3" />
          <h4 className="font-bold">বর্তমানে কোনো সিলেবাস আপলোড করা নেই।</h4>
          <p className="text-sm mt-1">শ্রেণিভিত্তিক সিলেবাসের কাজ চলমান রয়েছে, খুব শীঘ্রই প্রকাশ করা হবে।</p>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(grouped).map(([className, items]) => {
            const isOpen = openClass === className;
            return (
              <div key={className} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenClass(isOpen ? null : className)}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors border-b border-gray-200 text-left"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-blue-800" />
                    <span className="font-bold text-gray-800 text-base">{className}</span>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-bold">
                    {items.length}টি বিষয়
                  </span>
                </button>

                {isOpen && (
                  <div className="p-4 divide-y divide-gray-100 bg-white">
                    {items.map((item) => (
                      <div key={item.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 first:pt-0 last:pb-0">
                        <div>
                          <h4 className="font-bold text-gray-800">{item.subject}</h4>
                          <p className="text-xs text-gray-500 mt-0.5">
                            পরীক্ষা: {item.exam_type === 'Annual' ? 'বার্ষিক পরীক্ষা' : item.exam_type === 'Half-yearly' ? 'অর্ধবার্ষিক পরীক্ষা' : 'শ্রেণি পরীক্ষা'} • শিক্ষাবর্ষ: {item.year}
                          </p>
                        </div>
                        <button
                          onClick={() => alert(`ডাউনলোড হচ্ছে সিলেবাস: ${item.attachment_name}\n(আকার: ${item.attachment_size})`)}
                          className="flex items-center justify-center gap-1.5 self-start sm:self-center bg-green-700 hover:bg-green-800 text-white text-xs px-3 py-1.5 rounded font-bold shadow-sm transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          ডাউনলোড ({item.attachment_size})
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
