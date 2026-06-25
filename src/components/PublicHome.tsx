/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { getInstitution, getNotices, getTeachers, getGallery, getPrincipalTeacher, isFeatureEnabled } from '../data';
import { 
  Megaphone, Calendar, FileText, ArrowRight, User, 
  BookOpen, Users, Award, Clock, ChevronRight, ChevronLeft, 
  MapPin, Phone, Mail, FileDown, Image, ShieldAlert, Heart
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string, extraId?: number) => void;
}

export default function PublicHome({ onNavigate }: HomeProps) {
  const institution = getInstitution();
  const principalTeacher = getPrincipalTeacher();
  const principalName = principalTeacher?.name || institution.principal_name;
  const principalDesignation = principalTeacher?.designation || institution.principal_designation;
  const principalPhoto =
    principalTeacher?.photo_url ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(principalName)}`;
  const notices = getNotices().filter(n => n.is_active);
  const teachers = getTeachers().filter(t => t.is_active).sort((a, b) => a.sort_order - b.sort_order);
  const gallery = getGallery().filter(g => g.is_active);

  // Carousel slider state
  const [slideIndex, setSlideIndex] = useState(0);
  const slides = [
    {
      title: "মানসম্পন্ন শিক্ষার আলোকবর্তিকা",
      subtitle: `${institution.name_bn}-এ আপনাকে স্বাগতম। আধুনিক শিক্ষা, নৈতিকতা ও সৃজনশীলতায় ভরপুর ভবিষ্যৎ গড়তে আমরা প্রতিজ্ঞাবদ্ধ।`,
      img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200&h=450",
      action: "আমাদের সম্পর্কে জানুন",
      page: "about",
    },
    {
      title: "৫০ বছরের শিক্ষার গৌরবময় ইতিহাস",
      subtitle: `${institution.established_year} সালে প্রতিষ্ঠিত এই বিদ্যাপীঠ সুদীর্ঘকাল ধরে কৃতিত্বের সাথে মেধার বিকাশ ঘটিয়ে চলেছে।`,
      img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200&h=450",
      action: "ভর্তি ও তথ্য তালিকা",
      page: "downloads",
    },
    {
      title: "২০২৪ সালে এসএসসি পরীক্ষায় ৯৮% পাশের গৌরবজনক রেকর্ড",
      subtitle: "সুযোগ্য গভর্নিং বডি ও একনিষ্ঠ শিক্ষক মণ্ডলীর তত্ত্বাবধানে প্রতি বছরের ন্যায় বিগত পরীক্ষার চমকপ্রদ অর্জন।",
      img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1200&h=450",
      action: "শিক্ষার্থী পরিসংখ্যান দেখুন",
      page: "student_stats",
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setSlideIndex((slideIndex + 1) % slides.length);
  const prevSlide = () => setSlideIndex((slideIndex - 1 + slides.length) % slides.length);

  // Ticker state (running news ticker)
  const [tickerIndex, setTickerIndex] = useState(0);
  useEffect(() => {
    if (notices.length > 0) {
      const interval = setInterval(() => {
        setTickerIndex((prev) => (prev + 1) % notices.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [notices]);

  return (
    <div className="space-y-10">
      {/* 1. Carousel Slider Section */}
      <div className="relative overflow-hidden rounded-lg border border-gray-200 shadow-md bg-gray-900 text-white h-[250px] sm:h-[400px]">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 flex flex-col justify-end p-6 sm:p-12 ${
              idx === slideIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background image overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center mix-blend-multiply opacity-50 transition-transform duration-1000 scale-100"
              style={{ backgroundImage: `url(${slide.img})` }}
            />
            {/* Slide content overlay */}
            <div className="relative z-20 max-w-3xl space-y-2 sm:space-y-4">
              <span className="bg-red-700 text-white text-[10px] sm:text-xs px-2.5 py-1 rounded-full font-bold inline-block">
                GAHS গৌরবময় পথচলা
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold leading-tight tracking-wide">
                {slide.title}
              </h2>
              <p className="text-xs sm:text-base text-gray-200 leading-relaxed font-medium line-clamp-2 sm:line-clamp-none">
                {slide.subtitle}
              </p>
              <button
                onClick={() => onNavigate(slide.page)}
                className="bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs sm:text-sm py-2 px-5 rounded flex items-center gap-1.5 transition-all self-start shadow-md"
              >
                {slide.action} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {/* Carousel controls */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/60 p-1.5 sm:p-2 rounded-full text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/60 p-1.5 sm:p-2 rounded-full text-white transition-colors"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 h-6" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setSlideIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                idx === slideIndex ? "bg-red-600 w-6" : "bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>

      {/* 2. Scrolling Notice Ticker Section */}
      {isFeatureEnabled('notices') && notices.length > 0 && (
        <div className="bg-red-700 text-white rounded-md flex items-center shadow-sm overflow-hidden h-11 border border-red-800">
          <div className="bg-black/20 font-extrabold text-xs sm:text-sm px-4 shrink-0 flex items-center gap-1.5 h-full">
            <Megaphone className="w-4 h-4 text-amber-300 shrink-0" />
            সর্বশেষ নোটিশ:
          </div>
          <div className="flex-1 overflow-hidden px-4 relative h-full flex items-center">
            <div 
              onClick={() => onNavigate('notices', notices[tickerIndex].id)}
              className="font-bold text-xs sm:text-sm truncate hover:underline cursor-pointer flex items-center gap-2 animate-fade-in text-gray-50 hover:text-white"
            >
              <span className="bg-white/20 px-1.5 py-0.5 rounded text-[9px] font-bold">
                {notices[tickerIndex].published_date}
              </span>
              {notices[tickerIndex].title}
            </div>
          </div>
          <button 
            onClick={() => onNavigate('notices')}
            className="text-[10px] sm:text-xs font-bold px-4 hover:underline border-l border-white/20 shrink-0 h-full flex items-center"
          >
            সকল নোটিশ →
          </button>
        </div>
      )}

      {/* 3. 2-Column Notice board + Principal message Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Column: Latest Notices (3/5 width) */}
        {isFeatureEnabled('notices') && (
          <div className="lg:col-span-3 bg-white p-5 sm:p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-gray-150 pb-3 mb-4">
                <h3 className="font-extrabold text-gray-900 flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-blue-800" />
                  নোটিশ বোর্ড (Notice Board)
                </h3>
                <button
                  onClick={() => onNavigate('notices')}
                  className="text-xs font-bold text-blue-800 hover:underline flex items-center gap-0.5"
                >
                  সকল নোটিশ দেখুন <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {notices.length === 0 ? (
                <p className="text-sm text-gray-500 py-6 text-center">কোনো নোটিশ পাওয়া যায়নি।</p>
              ) : (
                <div className="divide-y divide-gray-100">
                  {notices.slice(0, 5).map((n) => (
                    <div key={n.id} className="py-3 flex items-start gap-3 hover:bg-gray-50/50 transition-colors p-1.5 rounded">
                      <div className="bg-blue-50 text-blue-800 text-center rounded p-1 w-14 shrink-0 border border-blue-100">
                        <span className="block text-[10px] uppercase font-bold text-gray-500">DATE</span>
                        <span className="block text-sm font-black leading-none mt-0.5">{n.published_date.split('-')[2]}</span>
                        <span className="block text-[8px] text-gray-400 font-bold mt-0.5">{n.published_date.split('-')[1]}</span>
                      </div>
                      <div className="space-y-1">
                        <h4 
                          onClick={() => onNavigate('notices', n.id)}
                          className="text-sm font-bold text-gray-800 hover:text-blue-800 cursor-pointer transition-colors leading-snug line-clamp-2"
                        >
                          {n.title}
                        </h4>
                        <span className="bg-gray-100 text-gray-500 text-[9px] px-1.5 py-0.2 rounded font-bold uppercase inline-block">
                          {n.category === 'Exam' ? 'পরীক্ষা' : n.category === 'Admission' ? 'ভর্তি' : n.category === 'Academic' ? 'একাডেমিক' : 'সাধারণ'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Right Column: Principal's Message (2/5 width) */}
        {isFeatureEnabled('principal_message') && (
          <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="border-b border-gray-150 pb-3 mb-4">
                <h3 className="font-extrabold text-gray-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-800" />
                  প্রধান শিক্ষকের বাণী
                </h3>
              </div>
              <div className="space-y-4 text-center sm:text-left flex flex-col sm:flex-row lg:flex-col items-center gap-4">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-blue-800 shadow-md shrink-0 bg-gray-100 flex items-center justify-center">
                  <img
                    src={principalPhoto}
                    alt={principalName}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(principalName)}`;
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <div className="text-center sm:text-left lg:text-center">
                    <h4 className="font-bold text-gray-900 text-base">{principalName}</h4>
                    <span className="text-xs bg-blue-50 text-blue-800 border border-blue-100 px-2.5 py-0.5 rounded font-bold uppercase inline-block mt-0.5">
                      {principalDesignation}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-justify line-clamp-4 lg:line-clamp-3">
                    "{institution.principal_message}"
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => onNavigate('about')}
              className="mt-4 w-full bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs py-2 px-4 rounded transition-colors text-center shadow-sm"
            >
              পূর্ণাঙ্গ বাণী পড়ুন
            </button>
          </div>
        )}
      </div>

      {/* 4. Quick Links (Icon Grid Section) */}
      <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg shadow-inner">
        <h3 className="text-center font-extrabold text-gray-900 text-lg mb-6">গুরুত্বপূর্ণ সেবা লিঙ্কসমূহ</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: "নোটিশ বোর্ড", icon: Megaphone, page: "notices", color: "text-red-700 bg-red-50 border-red-100" },
            { label: "শ্রেণি রুটিন", icon: Calendar, page: "routine", color: "text-green-700 bg-green-50 border-green-100" },
            { label: "সিলেবাস তালিকা", icon: BookOpen, page: "syllabus", color: "text-blue-700 bg-blue-50 border-blue-100" },
            { label: "শিক্ষকমণ্ডলী", icon: Users, page: "teachers", color: "text-indigo-700 bg-indigo-50 border-indigo-100" },
            { label: "ফটো গ্যালারি", icon: Image, page: "gallery", color: "text-purple-700 bg-purple-50 border-purple-100" },
            { label: "ডাউনলোড ফাইল", icon: FileDown, page: "downloads", color: "text-amber-700 bg-amber-50 border-amber-100" },
          ].map((link, idx) => (
            <button
              key={idx}
              onClick={() => onNavigate(link.page)}
              className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center text-center gap-2 group border-b-4 hover:border-b-blue-800"
            >
              <div className={`p-3 rounded-full border ${link.color} group-hover:scale-110 transition-transform`}>
                <link.icon className="w-5 h-5 shrink-0" />
              </div>
              <span className="font-extrabold text-xs text-gray-800 group-hover:text-blue-800 transition-colors">
                {link.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 5. Statistics Counters (Counter Cards Section) */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-950 text-white p-8 rounded-lg shadow-md grid grid-cols-2 md:grid-cols-4 gap-6 text-center border border-blue-900">
        <div className="space-y-1 border-r border-white/10 last:border-0">
          <Calendar className="w-6 h-6 mx-auto text-amber-400 mb-2" />
          <span className="text-2xl sm:text-3xl font-black block tracking-tight">{institution.established_year}</span>
          <span className="text-[10px] sm:text-xs text-blue-200 font-bold uppercase block">প্রতিষ্ঠাকাল</span>
        </div>
        <div className="space-y-1 border-r border-white/10 last:border-0">
          <Users className="w-6 h-6 mx-auto text-amber-400 mb-2" />
          <span className="text-2xl sm:text-3xl font-black block tracking-tight">৪৮০+</span>
          <span className="text-[10px] sm:text-xs text-blue-200 font-bold uppercase block">মোট শিক্ষার্থী</span>
        </div>
        <div className="space-y-1 border-r border-white/10 last:border-0">
          <User className="w-6 h-6 mx-auto text-amber-400 mb-2" />
          <span className="text-2xl sm:text-3xl font-black block tracking-tight">১৮ জন</span>
          <span className="text-[10px] sm:text-xs text-blue-200 font-bold uppercase block">শিক্ষক ও কর্মচারী</span>
        </div>
        <div className="space-y-1 last:border-0">
          <Award className="w-6 h-6 mx-auto text-amber-400 mb-2" />
          <span className="text-2xl sm:text-3xl font-black block tracking-tight">৯৮%</span>
          <span className="text-[10px] sm:text-xs text-blue-200 font-bold uppercase block">গড় পাশের হার</span>
        </div>
      </div>

      {/* 6. Academic Info (3 cards Section) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex gap-4 items-start">
          <div className="bg-blue-50 text-blue-800 p-2.5 rounded-lg border border-blue-100 shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="font-extrabold text-gray-900 text-sm sm:text-base">শ্রেণি ও পাঠ্যক্রম</h4>
            <p className="text-xs sm:text-sm text-gray-600">ষষ্ঠ শ্রেণি থেকে দশম শ্রেণি পর্যন্ত শিক্ষাদানের চমৎকার ব্যবস্থা। এনসিটিবি (NCTB) অনুমোদিত আধুনিক সিলেবাসের অনুকরণ।</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex gap-4 items-start">
          <div className="bg-green-50 text-green-800 p-2.5 rounded-lg border border-green-100 shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="font-extrabold text-gray-900 text-sm sm:text-base">পরীক্ষা ও গ্রুপসমূহ</h4>
            <p className="text-xs sm:text-sm text-gray-600">এসএসসি ও অর্ধবার্ষিক মূল্যায়ন। নবম-দশম শ্রেণিতে বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা গ্রুপে উচ্চশিক্ষার উপযুক্ত ভিত্তি প্রস্তুত।</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex gap-4 items-start">
          <div className="bg-amber-50 text-amber-800 p-2.5 rounded-lg border border-amber-100 shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="font-extrabold text-gray-900 text-sm sm:text-base">সময়সূচি ও শিফট</h4>
            <p className="text-xs sm:text-sm text-gray-600">একক শিফট কার্যক্রম। ক্লাস প্রতিদিন সকাল ৮:০০ টা হতে দুপুর ১২:৩০ টা পর্যন্ত পূর্ণ শৃঙ্খলার সহিত সম্পন্ন হয়।</p>
          </div>
        </div>
      </div>

      {/* 7. Teacher Spotlight Preview */}
      {isFeatureEnabled('teachers') && teachers.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-150 pb-3">
            <h3 className="font-extrabold text-gray-900 text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-800" />
              আমাদের শিক্ষক মণ্ডলী ( spotlight )
            </h3>
            <button
              onClick={() => onNavigate('teachers')}
              className="text-xs font-bold text-blue-800 hover:underline"
            >
              সকল শিক্ষক দেখুন →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {teachers.slice(0, 4).map((t) => (
              <div key={t.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col group">
                <div className="aspect-square bg-gray-100 overflow-hidden relative">
                  <img
                    src={t.photo_url}
                    alt={t.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${t.name}`;
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {t.is_mpo && (
                    <span className="absolute top-2 right-2 bg-green-700 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      MPO ভুক্ত
                    </span>
                  )}
                </div>
                <div className="p-3 text-center flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h4 className="font-bold text-gray-900 text-sm leading-tight group-hover:text-blue-800 transition-colors">{t.name}</h4>
                    <p className="text-xs text-blue-900 font-semibold">{t.designation}</p>
                    <p className="text-[10px] text-gray-400 font-medium">{t.subject}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. Gallery Highlights Preview */}
      {isFeatureEnabled('gallery') && gallery.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-150 pb-3">
            <h3 className="font-extrabold text-gray-900 text-lg flex items-center gap-2">
              <Image className="w-5 h-5 text-blue-800" />
              ক্যাম্পাস গ্যালারি (Gallery Highlights)
            </h3>
            <button
              onClick={() => onNavigate('gallery')}
              className="text-xs font-bold text-blue-800 hover:underline"
            >
              সম্পূর্ণ গ্যালারি দেখুন →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {gallery.slice(0, 6).map((g) => (
              <div 
                key={g.id} 
                onClick={() => onNavigate('gallery')}
                className="group relative aspect-square rounded-lg overflow-hidden border border-gray-200 cursor-pointer shadow-sm bg-gray-100"
              >
                <img
                  src={g.image_url}
                  alt={g.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                  <p className="text-[10px] sm:text-xs text-white leading-tight font-medium line-clamp-2">
                    {g.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
