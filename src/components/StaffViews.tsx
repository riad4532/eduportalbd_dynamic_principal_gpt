/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { getTeachers, getCommittee, Teacher, CommitteeMember } from '../data';
import { Search, ShieldAlert, Award, Calendar, AlertCircle } from 'lucide-react';

interface StaffProps {
  institutionName: string;
}

export function TeacherList({ institutionName }: StaffProps) {
  const allTeachers = getTeachers()
    .filter(t => t.is_active)
    .sort((a, b) => a.sort_order - b.sort_order);

  const [activeTab, setActiveTab] = useState<'all' | 'teaching' | 'non-teaching'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter teachers based on tab and query
  const filtered = allTeachers.filter(t => {
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'teaching' && t.staff_type === 'teaching') ||
      (activeTab === 'non-teaching' && t.staff_type === 'non-teaching');

    const matchesSearch = 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6" id="teachers-directory-section">
      <div className="border-l-4 border-blue-800 pl-4">
        <h2 className="text-2xl font-bold text-gray-900">শিক্ষক ও কর্মচারী তালিকা (Teachers & Staff)</h2>
        <p className="text-sm text-gray-500">{institutionName}-এর একনিষ্ঠ ও নিবেদিতপ্রাণ শিক্ষক-কর্মচারীবৃন্দ</p>
      </div>

      {/* Tabs and Search Grid */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex bg-gray-100 p-1 rounded-md self-start">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
              activeTab === 'all' ? 'bg-blue-800 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            সকল জনবল ({allTeachers.length})
          </button>
          <button
            onClick={() => setActiveTab('teaching')}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
              activeTab === 'teaching' ? 'bg-blue-800 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            শিক্ষকমণ্ডলী ({allTeachers.filter(t => t.staff_type === 'teaching').length})
          </button>
          <button
            onClick={() => setActiveTab('non-teaching')}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${
              activeTab === 'non-teaching' ? 'bg-blue-800 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            কর্মচারীবৃন্দ ({allTeachers.filter(t => t.staff_type === 'non-teaching').length})
          </button>
        </div>

        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="নাম, পদবি বা বিষয় দিয়ে খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-800 focus:border-blue-800"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-gray-50 p-12 text-center rounded-lg border border-gray-200">
          <ShieldAlert className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h4 className="font-bold text-gray-700">খোঁজ করা শিক্ষক বা কর্মচারীর সন্ধান পাওয়া যায়নি।</h4>
          <p className="text-sm text-gray-500 mt-1">অনুগ্রহ করে ভিন্ন কোনো বানানে বা শব্দ দিয়ে চেষ্টা করুন।</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((t) => (
            <div key={t.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col group">
              <div className="relative bg-gray-100 aspect-square overflow-hidden flex items-center justify-center border-b border-gray-200">
                <img
                  src={t.photo_url || "https://images.unsplash.com/photo-1544005313-94ddf0286df2"}
                  alt={t.name}
                  onError={(e) => {
                    // Fallback block background with initials if image fails
                    (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${t.name}`;
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {t.is_mpo && (
                  <span className="absolute top-2 right-2 bg-green-700 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                    MPO ভুক্ত
                  </span>
                )}
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-800 transition-colors text-base">{t.name}</h3>
                  <p className="text-sm text-blue-900 font-semibold">{t.designation}</p>
                  {t.staff_type === 'teaching' && (
                    <p className="text-xs text-gray-600">
                      <span className="font-medium text-gray-800">মূল বিষয়:</span> {t.subject}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    <span className="font-medium text-gray-700">যোগ্যতা:</span> {t.qualification}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    যোগদান: {new Date(t.join_date).getFullYear()}
                  </span>
                  <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-medium">
                    {t.staff_type === 'teaching' ? 'শিক্ষক' : 'কর্মচারী'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function CommitteeView({ institutionName }: StaffProps) {
  const committee = getCommittee().filter(c => c.is_active);

  return (
    <div className="space-y-6" id="managing-committee-section">
      <div className="border-l-4 border-blue-800 pl-4">
        <h2 className="text-2xl font-bold text-gray-900">ম্যানেজিং কমিটি (Managing Committee)</h2>
        <p className="text-sm text-gray-500">{institutionName} সুষ্ঠুভাবে পরিচালনার দায়িত্বে নিয়োজিত পরিচালনা পর্ষদ</p>
      </div>

      {committee.length === 0 ? (
        <div className="bg-blue-50 p-6 rounded-lg text-center text-blue-800 border border-blue-100 flex flex-col items-center">
          <AlertCircle className="w-12 h-12 mb-3" />
          <h4 className="font-bold">বর্তমানে কোনো পরিচালনা কমিটি নথিভুক্ত নেই।</h4>
          <p className="text-sm mt-1">বিদ্যালয়ের নতুন কার্যনির্বাহী পরিষদ গঠনে কাজ চলছে।</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h3 className="font-bold text-gray-800">বর্তমান পরিচালনা পর্ষদের সদস্য তালিকা</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-800 text-white">
                  <th className="p-3 text-center w-16">ছবি</th>
                  <th className="p-3 font-semibold">নাম</th>
                  <th className="p-3 font-semibold">পদবি</th>
                  <th className="p-3 font-semibold">শ্রেণি/ক্যাটাগরি</th>
                  <th className="p-3 text-center font-semibold">কার্যকাল</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {committee.map((c, idx) => (
                  <tr key={c.id} className={idx % 2 === 0 ? "bg-white hover:bg-gray-50" : "bg-gray-50/50 hover:bg-gray-50"}>
                    <td className="p-2 text-center">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 mx-auto bg-gray-100 flex items-center justify-center">
                        <img
                          src={c.photo_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"}
                          alt={c.name}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${c.name}`;
                          }}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="p-3 font-bold text-gray-900">{c.name}</td>
                    <td className="p-3 font-semibold text-blue-900">{c.designation}</td>
                    <td className="p-3 text-gray-700">{c.category}</td>
                    <td className="p-3 text-center font-medium text-gray-600 text-sm">{c.term}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
