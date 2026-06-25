/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { getNotices, getDownloads, getGallery, getComplaintOfficer, Notice, Download as DownloadType, GalleryImage, ComplaintOfficer } from '../data';
import { Search, Calendar, FileText, Download, Tag, Mail, Phone, MapPin, AlertCircle, Clock, ZoomIn, ShieldCheck } from 'lucide-react';

interface OtherProps {
  institutionName: string;
  onSelectNotice?: (id: number) => void;
  selectedNoticeId?: number | null;
  onBackToNotices?: () => void;
}

export function NoticeList({ institutionName, onSelectNotice }: OtherProps) {
  const notices = getNotices().filter(n => n.is_active);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'all' | 'Academic' | 'General' | 'Exam' | 'Admission' | 'Other'>('all');

  const filtered = notices.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase()) || n.body.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || n.category === category;
    return matchesSearch && matchesCategory;
  });

  const categoriesMap: { [key: string]: string } = {
    Academic: 'একাডেমিক',
    General: 'সাধারণ',
    Exam: 'পরীক্ষা',
    Admission: 'ভর্তি',
    Other: 'অন্যান্য',
  };

  const getCategoryColor = (cat: string) => {
    switch(cat) {
      case 'Exam': return 'bg-red-50 text-red-700 border-red-150';
      case 'Admission': return 'bg-purple-50 text-purple-700 border-purple-150';
      case 'Academic': return 'bg-blue-50 text-blue-700 border-blue-150';
      case 'General': return 'bg-green-50 text-green-700 border-green-150';
      default: return 'bg-gray-50 text-gray-700 border-gray-150';
    }
  };

  return (
    <div className="space-y-6" id="notices-section">
      <div className="border-l-4 border-blue-800 pl-4">
        <h2 className="text-2xl font-bold text-gray-900">বিজ্ঞপ্তি বোর্ড (Notice Board)</h2>
        <p className="text-sm text-gray-500">{institutionName}-এর জরুরি বিজ্ঞপ্তি ও নির্দেশনাসমূহ</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="বিজ্ঞপ্তি খুঁজুন..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-800 focus:border-blue-800 text-sm"
          />
        </div>
        <div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-800 focus:border-blue-800 text-sm bg-white"
          >
            <option value="all">সকল ক্যাটাগরি</option>
            <option value="Academic">একাডেমিক</option>
            <option value="General">সাধারণ বিজ্ঞপ্তি</option>
            <option value="Exam">পরীক্ষা সংক্রান্ত</option>
            <option value="Admission">ভর্তি বিজ্ঞপ্তি</option>
            <option value="Other">অন্যান্য</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-gray-50 p-12 text-center rounded-lg border border-gray-200">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h4 className="font-bold text-gray-700">কোনো বিজ্ঞপ্তি পাওয়া যায়নি।</h4>
          <p className="text-sm text-gray-500 mt-1">অনুগ্রহ করে ভিন্ন কোনো বানানে বা ক্যাটাগরি দিয়ে খুঁজুন।</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden divide-y divide-gray-150">
          {filtered.map((n) => (
            <div key={n.id} className="p-5 hover:bg-gray-50/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap gap-2 items-center text-xs">
                  <span className="flex items-center gap-1 text-gray-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {n.published_date}
                  </span>
                  <span className={`px-2 py-0.5 border rounded-full font-medium ${getCategoryColor(n.category)}`}>
                    {categoriesMap[n.category] || n.category}
                  </span>
                </div>
                <h3 
                  onClick={() => onSelectNotice && onSelectNotice(n.id)}
                  className="text-base font-bold text-gray-800 hover:text-blue-800 cursor-pointer transition-colors leading-relaxed"
                >
                  {n.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">{n.body}</p>
              </div>

              <div className="flex flex-row md:flex-col gap-2 shrink-0 justify-end">
                <button
                  onClick={() => onSelectNotice && onSelectNotice(n.id)}
                  className="bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100 px-4 py-1.5 rounded text-xs font-bold transition-colors"
                >
                  বিস্তারিত পড়ুন
                </button>
                {n.attachment_name && (
                  <button
                    onClick={() => alert(`ডাউনলোড শুরু হচ্ছে নোটিশ ফাইল: ${n.attachment_name}\n(আকার: ${n.attachment_size})`)}
                    className="flex items-center justify-center gap-1 bg-green-700 hover:bg-green-800 text-white px-4 py-1.5 rounded text-xs font-bold transition-colors shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    সংযুক্তি ({n.attachment_size})
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function NoticeDetail({ selectedNoticeId, onBackToNotices }: OtherProps) {
  const notice = getNotices().find(n => n.id === selectedNoticeId);

  if (!notice) {
    return (
      <div className="p-8 text-center bg-gray-50 rounded-lg">
        <h3 className="font-bold text-gray-700">দুঃখিত, বিজ্ঞপ্তিটি পাওয়া যায়নি।</h3>
        <button onClick={onBackToNotices} className="mt-4 bg-blue-800 text-white px-4 py-2 rounded text-sm font-bold">
          বিজ্ঞপ্তি বোর্ডে ফিরুন
        </button>
      </div>
    );
  }

  const categoriesMap: { [key: string]: string } = {
    Academic: 'একাডেমিক',
    General: 'সাধারণ',
    Exam: 'পরীক্ষা',
    Admission: 'ভর্তি',
    Other: 'অন্যান্য',
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 md:p-8 space-y-6" id="notice-detail-section">
      <button 
        onClick={onBackToNotices}
        className="text-sm font-bold text-blue-800 hover:text-blue-900 flex items-center gap-1 mb-4"
      >
        ← বিজ্ঞপ্তি বোর্ডে ফিরে যান
      </button>

      <div className="space-y-3 border-b border-gray-100 pb-5">
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1 text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded">
            <Calendar className="w-3.5 h-3.5 text-blue-800" />
            প্রকাশের তারিখ: {notice.published_date}
          </span>
          <span className="bg-blue-100 text-blue-800 font-bold px-2.5 py-1 rounded">
            {categoriesMap[notice.category] || notice.category}
          </span>
        </div>
        <h1 className="text-xl md:text-2xl font-extrabold text-gray-950 leading-relaxed">
          {notice.title}
        </h1>
      </div>

      <div className="text-gray-800 leading-relaxed text-base whitespace-pre-wrap">
        {notice.body}
      </div>

      {notice.attachment_name && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-red-50 text-red-700 p-2.5 rounded-lg border border-red-100">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-sm">{notice.attachment_name}</h4>
              <p className="text-xs text-gray-500">ফাইল টাইপ: PDF Document • ফাইল সাইজ: {notice.attachment_size}</p>
            </div>
          </div>
          <button
            onClick={() => alert(`ফাইল ডাউনলোড হচ্ছে: ${notice.attachment_name}`)}
            className="flex items-center justify-center gap-1.5 bg-green-700 hover:bg-green-800 text-white font-bold text-sm px-5 py-2 rounded shadow-sm transition-colors"
          >
            <Download className="w-4 h-4" />
            ফাইল ডাউনলোড করুন ({notice.attachment_size})
          </button>
        </div>
      )}
    </div>
  );
}

export function DownloadsView({ institutionName }: OtherProps) {
  const downloads = getDownloads().filter(d => d.is_active);
  const [tab, setTab] = useState<'all' | 'Admission' | 'Exam' | 'Complaint' | 'RTI' | 'Other'>('all');

  const filtered = downloads.filter(d => tab === 'all' || d.category === tab);

  const categoriesMap: { [key: string]: string } = {
    Admission: 'ভর্তি ফরম',
    Exam: 'পরীক্ষা',
    Complaint: 'অভিযোগ',
    RTI: 'তথ্য অধিকার',
    Other: 'অন্যান্য',
  };

  return (
    <div className="space-y-6" id="downloads-portal-section">
      <div className="border-l-4 border-blue-800 pl-4">
        <h2 className="text-2xl font-bold text-gray-900">ডাউনলোড কর্নার (Downloads Portal)</h2>
        <p className="text-sm text-gray-500">{institutionName}-এর সকল শিক্ষাগত ও প্রশাসনিক নির্ধারিত ফরমসমূহ ডাউনলোড করুন</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200">
        {(['all', 'Admission', 'Exam', 'Complaint', 'RTI', 'Other'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setTab(cat)}
            className={`px-4 py-1.5 rounded-md text-xs sm:text-sm font-bold transition-all ${
              tab === cat ? 'bg-blue-800 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {cat === 'all' ? 'সকল ডাউনলোড' : categoriesMap[cat] || cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-gray-50 p-12 text-center rounded-lg border border-gray-200">
          <AlertCircle className="w-11 h-11 text-gray-400 mx-auto mb-3" />
          <h4 className="font-bold text-gray-700">কোনো ফাইল পাওয়া যায়নি।</h4>
          <p className="text-sm text-gray-500 mt-1">এই ক্যাটাগরিতে বর্তমানে কোনো ডাউনলোডযোগ্য নথি আপলোড করা নেই।</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((d) => (
            <div key={d.id} className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm flex items-start justify-between gap-4 hover:border-blue-300 transition-colors">
              <div className="flex items-start gap-3">
                <div className="bg-blue-50 text-blue-800 p-2 rounded-lg mt-0.5 border border-blue-100">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm sm:text-base leading-snug">{d.title}</h3>
                  <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-400 font-medium">
                    <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                      {categoriesMap[d.category] || d.category}
                    </span>
                    <span>• {d.published_date}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => alert(`ফাইল ডাউনলোড হচ্ছে: ${d.attachment_name}\n(আকার: ${d.attachment_size})`)}
                className="flex items-center gap-1 bg-green-700 hover:bg-green-800 text-white text-xs font-bold py-1.5 px-3 rounded shrink-0 shadow-sm transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                {d.attachment_size}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function GalleryView({ institutionName }: OtherProps) {
  const images = getGallery().filter(g => g.is_active);
  const [filter, setFilter] = useState<'all' | 'events' | 'academics' | 'facilities' | 'sports'>('all');
  const [zoomImg, setZoomImg] = useState<GalleryImage | null>(null);

  const filtered = images.filter(g => filter === 'all' || g.category === filter);

  const filterNames: { [key: string]: string } = {
    all: 'সকল ছবি',
    events: 'অনুষ্ঠান ও উৎসব',
    academics: 'শ্রেণীকক্ষ ও একাডেমিক',
    facilities: 'অবকাঠামো ও সুবিধা',
    sports: 'খেলাধুলা ও শরীরচর্চা',
  };

  return (
    <div className="space-y-6" id="gallery-portfolio-section">
      <div className="border-l-4 border-blue-800 pl-4">
        <h2 className="text-2xl font-bold text-gray-900">ফটো গ্যালারি (Photo Gallery)</h2>
        <p className="text-sm text-gray-500">{institutionName}-এর আনন্দঘন মুহূর্ত ও ক্যাম্পাসের স্মৃতিচারণ</p>
      </div>

      {/* Tab Filter */}
      <div className="flex flex-wrap gap-2 justify-center sm:justify-start bg-gray-50 p-2 border border-gray-200 rounded-lg">
        {(['all', 'events', 'academics', 'facilities', 'sports'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-md text-xs sm:text-sm font-bold transition-all ${
              filter === f ? 'bg-blue-800 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {filterNames[f]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-gray-50 p-12 text-center rounded-lg border border-gray-200">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h4 className="font-bold text-gray-700">বর্তমানে কোনো ছবি আপলোড করা নেই।</h4>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((g) => (
            <div 
              key={g.id} 
              onClick={() => setZoomImg(g)}
              className="group bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full"
            >
              <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                <img 
                  src={g.image_url} 
                  alt={g.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ZoomIn className="text-white w-8 h-8" />
                </div>
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between">
                <p className="text-xs sm:text-sm font-bold text-gray-800 group-hover:text-blue-800 transition-colors leading-relaxed line-clamp-2">
                  {g.caption}
                </p>
                <span className="text-[10px] bg-blue-50 text-blue-800 border border-blue-100 px-2 py-0.5 rounded font-bold self-start mt-2">
                  {filterNames[g.category]}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {zoomImg && (
        <div 
          onClick={() => setZoomImg(null)}
          className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4"
        >
          <div className="relative max-w-4xl w-full flex flex-col items-center">
            <button 
              onClick={() => setZoomImg(null)}
              className="absolute -top-10 right-0 text-white font-extrabold text-xl hover:text-gray-300"
            >
              ✕ বন্ধ করুন
            </button>
            <img 
              src={zoomImg.image_url} 
              alt={zoomImg.caption}
              className="max-h-[80vh] object-contain rounded border border-gray-800 shadow-2xl"
            />
            <div className="bg-black/80 text-white p-4 rounded-lg mt-4 max-w-2xl text-center w-full">
              <p className="text-base font-bold leading-relaxed">{zoomImg.caption}</p>
              <span className="text-xs text-blue-300 font-semibold block mt-1.5">{filterNames[zoomImg.category]}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ContactView({ institutionName }: OtherProps) {
  const officer = getComplaintOfficer();

  return (
    <div className="space-y-8" id="contact-page-section">
      <div className="border-l-4 border-blue-800 pl-4">
        <h2 className="text-2xl font-bold text-gray-900">যোগাযোগ করুন (Contact Info)</h2>
        <p className="text-sm text-gray-500">{institutionName}-এর ঠিকানা, অবস্থান মানচিত্র ও জরুরি যোগাযোগ</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info Card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-6">
          <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-3">বিদ্যালয়ের কার্যালয়</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-800 mt-1 shrink-0" />
              <div>
                <h4 className="font-bold text-gray-700 text-sm">ঠিকানা (Address):</h4>
                <p className="text-sm text-gray-600 mt-0.5">বোর্ডবাজার, গাজীপুর সদর, গাজীপুর-১৭০০</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-blue-800 mt-1 shrink-0" />
              <div>
                <h4 className="font-bold text-gray-700 text-sm">টেলিফোন ও মোবাইল:</h4>
                <p className="text-sm text-gray-600 mt-0.5">টেলিফোন: ০২-৯২৬১xxx</p>
                <p className="text-sm text-gray-600">মোবাইল: ০১৭১১-xxxxxx</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-800 mt-1 shrink-0" />
              <div>
                <h4 className="font-bold text-gray-700 text-sm">ইমেইল ঠিকানা:</h4>
                <p className="text-sm text-gray-600 mt-0.5">gahs1975@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-800 mt-1 shrink-0" />
              <div>
                <h4 className="font-bold text-gray-700 text-sm">কার্যালয় সময়সূচি:</h4>
                <p className="text-sm text-gray-600 mt-0.5">শনিবার থেকে বৃহস্পতিবার: সকাল ৮:০০ টা হতে দুপুর ৩:০০ টা</p>
                <p className="text-xs text-red-500">শুক্রবার ও সরকারি ছুটির দিন কার্যালয় বন্ধ থাকে।</p>
              </div>
            </div>
          </div>
        </div>

        {/* Maps Embed Simulation */}
        <div className="bg-gray-100 border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col h-full justify-between min-h-[300px]">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h3 className="font-bold text-gray-800 text-sm sm:text-base">গুগল ম্যাপে আমাদের অবস্থান (Google Map Location)</h3>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-gray-400">
            <MapPin className="w-12 h-12 text-red-500 mb-2 animate-bounce" />
            <span className="font-bold text-gray-800">বোর্ডবাজার, গাজীপুর সদর</span>
            <span className="text-xs text-gray-500 mt-1">গুগল ম্যাপস লাইভ ভিউ রেন্ডার সম্পন্ন</span>
            {/* Real iframe container simulated beautifully */}
            <div className="w-full h-full min-h-[160px] bg-blue-50/50 mt-4 border border-blue-100 rounded flex items-center justify-center text-[11px] text-blue-900 px-4">
              [ Gazipur Boardbazar GPS Coordinates: 23.9515° N, 90.3813° E ]
            </div>
          </div>
        </div>
      </div>

      {/* Complaint Officer Quick Link box */}
      {officer.is_active && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-900">
              <ShieldCheck className="w-5 h-5 text-blue-800" />
              <h3 className="font-extrabold text-base sm:text-lg">তথ্য অধিকার ও অভিযোগ প্রতিকার সেল</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
              গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের তথ্য অধিকার আইন অনুযায়ী কোনো তথ্য বা কোনো দাপ্তরিক সেবায় কোনো বিষয়ে অসন্তুষ্টি থাকলে আপনি অভিযোগ কর্মকর্তা <span className="font-bold text-gray-800">{officer.name}</span>-এর নিকট অভিযোগ দাখিল করতে পারেন।
            </p>
          </div>
          <div className="shrink-0 flex gap-2">
            <div className="bg-white px-4 py-3 rounded-md border border-blue-150 shadow-sm text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-gray-800">
                <Phone className="w-3.5 h-3.5 text-blue-800" />
                {officer.phone}
              </div>
              <div className="flex items-center gap-1.5 font-medium text-gray-500">
                <Mail className="w-3.5 h-3.5 text-gray-400" />
                {officer.email}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ComplaintView({ institutionName }: OtherProps) {
  const officer = getComplaintOfficer();

  return (
    <div className="space-y-6" id="grievance-complaint-section">
      <div className="border-l-4 border-blue-800 pl-4">
        <h2 className="text-2xl font-bold text-gray-900">তথ্য ও অভিযোগ প্রতিকার কর্মকর্তা (Complaint Officer)</h2>
        <p className="text-sm text-gray-500">{institutionName}-এর তথ্য অধিকার (RTI) ও অভিযোগ নিরসন কর্মকর্তা সংক্রান্ত বিস্তারিত তথ্য</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 md:p-8 space-y-8">
        <div className="bg-blue-50/50 p-5 rounded-lg border border-blue-100 leading-relaxed text-sm text-gray-700">
          <p className="font-semibold text-blue-900 mb-1.5">সরকারি নির্দেশনা ও তথ্য অধিকার আইন (Right to Information):</p>
          শিক্ষা মন্ত্রণালয়ের নির্দেশনা ও তথ্য অধিকার আইন অনুযায়ী বিদ্যালয়ের সকল স্বচ্ছতা ও জবাবদিহিতা নিশ্চিত করার জন্য নিম্নলিখিত কর্মকর্তা দায়িত্ব পালন করছেন। বিদ্যালয়ের কোনো সেবা, কার্যক্রম বা নীতিমালায় কোনো অসঙ্গতি দেখলে নির্ধারিত ফরমে লিখিতভাবে সরাসরি অভিযোগ জানানোর অনুরোধ রইলো।
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Officer Card */}
          <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="bg-blue-800 text-white p-4 font-bold text-base">
              অভিযোগ কর্মকর্তা (Complaint Officer)
            </div>
            <div className="p-5 space-y-4">
              <div>
                <span className="text-xs text-gray-400 font-semibold block">কর্মকর্তার নাম:</span>
                <span className="font-bold text-gray-900 text-base">{officer.name}</span>
              </div>
              <div>
                <span className="text-xs text-gray-400 font-semibold block">পদবি:</span>
                <span className="font-bold text-blue-900 text-sm">{officer.designation}</span>
              </div>
              <div>
                <span className="text-xs text-gray-400 font-semibold block">যোগাযোগের নম্বর:</span>
                <span className="font-bold text-gray-800 text-sm flex items-center gap-1.5 mt-0.5">
                  <Phone className="w-4 h-4 text-blue-800" />
                  {officer.phone}
                </span>
              </div>
              <div>
                <span className="text-xs text-gray-400 font-semibold block">ইমেইল ঠিকানা:</span>
                <span className="font-semibold text-gray-700 text-sm flex items-center gap-1.5 mt-0.5">
                  <Mail className="w-4 h-4 text-blue-800" />
                  {officer.email}
                </span>
              </div>
              <div>
                <span className="text-xs text-gray-400 font-semibold block">সাক্ষাতের সময়সূচি:</span>
                <span className="font-medium text-gray-600 text-xs flex items-center gap-1.5 mt-0.5 leading-snug">
                  <Clock className="w-4 h-4 text-blue-800 shrink-0" />
                  {officer.office_hours}
                </span>
              </div>
            </div>
          </div>

          {/* Appealing Officer Card */}
          <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm flex flex-col justify-between">
            <div>
              <div className="bg-indigo-900 text-white p-4 font-bold text-base">
                আপিল কর্মকর্তা (Appeal Officer)
              </div>
              <div className="p-5 space-y-4">
                <p className="text-xs text-gray-500 leading-relaxed border-b border-gray-100 pb-2">
                  * অভিযোগ কর্মকর্তার সিদ্ধান্ত বা নিষ্পত্তিতে কোনো আপত্তি থাকলে আপনি আপিল কর্মকর্তার সাথে যোগাযোগ করতে পারেন।
                </p>
                <div>
                  <span className="text-xs text-gray-400 font-semibold block">আপিল কর্মকর্তার নাম:</span>
                  <span className="font-bold text-gray-900 text-base">{officer.appeal_officer_name}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-semibold block">পদবি:</span>
                  <span className="font-bold text-indigo-900 text-sm">{officer.appeal_officer_designation}</span>
                </div>
              </div>
            </div>

            <div className="p-5 bg-gray-50 border-t border-gray-100">
              <a
                href="#download-complaint-form"
                onClick={(e) => {
                  e.preventDefault();
                  alert("অভিযোগ দাখিল ফরমটি ডাউনলোড শুরু হচ্ছে।\n(ফাইল: form_complaint.pdf)");
                }}
                className="w-full flex items-center justify-center gap-1.5 bg-green-700 hover:bg-green-800 text-white text-xs font-bold py-2 px-4 rounded shadow-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                নির্ধারিত অভিযোগ ফরম ডাউনলোড করুন (PDF)
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
