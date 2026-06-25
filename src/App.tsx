/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  getInstitution, 
  getPrincipalTeacher,
  isFeatureEnabled, 
  getNotices, 
  initializeDB 
} from './data';
import PublicHome from './components/PublicHome';
import { 
  StudentStatsView, 
  RoutineView, 
  SyllabusView 
} from './components/AcademicViews';
import { 
  TeacherList, 
  CommitteeView 
} from './components/StaffViews';
import { 
  NoticeList, 
  NoticeDetail, 
  DownloadsView, 
  GalleryView, 
  ContactView, 
  ComplaintView 
} from './components/OtherViews';
import AdminPanel from './components/AdminPanel';
import { 
  School, Phone, Mail, MapPin, Menu, X, Lock, 
  ChevronDown, AlertOctagon, Heart, Calendar 
} from 'lucide-react';

export default function App() {
  // Initialize standard localStorage database on start
  useEffect(() => {
    initializeDB();
  }, []);

  const [institution, setInstitution] = useState(() => getInstitution());
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'notices' | 'teachers' | 'student_stats' | 'routine' | 'syllabus' | 'committee' | 'gallery' | 'downloads' | 'contact' | 'complaint' | 'admin'>('home');
  const [selectedNoticeId, setSelectedNoticeId] = useState<number | null>(null);
  
  // UI states
  const [academicDropdownOpen, setAcademicDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [siteKey, setSiteKey] = useState(0); // force rerender on DB changes

  const principalTeacher = getPrincipalTeacher();
  const principalName = principalTeacher?.name || institution.principal_name;
  const principalDesignation = principalTeacher?.designation || institution.principal_designation;
  const principalPhoto =
    principalTeacher?.photo_url ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(principalName)}`;

  const handleRefreshSite = () => {
    setInstitution(getInstitution());
    setSiteKey(prev => prev + 1);
  };

  // Guard routing checking feature settings
  const renderPageContent = () => {
    // 1. Feature ON/OFF checks
    const checkGates: { [key: string]: string } = {
      notices: 'notices',
      teachers: 'teachers',
      student_stats: 'student_stats',
      routine: 'routine',
      syllabus: 'syllabus',
      committee: 'committee',
      gallery: 'gallery',
      downloads: 'downloads',
      complaint: 'complaint',
    };

    if (currentPage in checkGates) {
      const dbKey = checkGates[currentPage];
      if (!isFeatureEnabled(dbKey)) {
        return (
          <div className="max-w-md mx-auto my-12 bg-white border border-gray-200 rounded-lg shadow-sm p-8 text-center space-y-4">
            <AlertOctagon className="w-16 h-16 text-amber-600 mx-auto animate-pulse" />
            <h2 className="text-xl font-bold text-gray-800">মডিউলটি সাময়িকভাবে বন্ধ আছে</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              দুঃখিত, তথ্য হালনাগাদের কারণে অথবা প্রশাসনিক সিদ্ধান্তে এই মডিউলটি বর্তমানে নিষ্ক্রিয় রয়েছে। অনুগ্রহ করে পরবর্তীতে পুনরায় চেষ্টা করুন।
            </p>
            <button
              onClick={() => setCurrentPage('home')}
              className="bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs py-2 px-5 rounded transition-colors shadow-sm"
            >
              হোমপেজে ফিরে যান
            </button>
          </div>
        );
      }
    }

    // 2. Normal Views Routing
    switch (currentPage) {
      case 'home':
        return (
          <PublicHome 
            onNavigate={(page, id) => {
              if (page === 'notices' && id) {
                setSelectedNoticeId(id);
                setCurrentPage('notices');
              } else {
                setCurrentPage(page as any);
                setSelectedNoticeId(null);
              }
              window.scrollTo(0, 0);
            }} 
          />
        );
      case 'about':
        return (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 sm:p-8 space-y-8">
            <div className="border-l-4 border-blue-800 pl-4">
              <h2 className="text-2xl font-bold text-gray-900">আমাদের সম্পর্কে (About Us)</h2>
              <p className="text-sm text-gray-500">{institution.name_bn}-এর ইতিহাস, লক্ষ্য ও উদ্দেশ্য</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <h3 className="font-bold text-gray-800 text-lg border-b pb-2">প্রতিষ্ঠানের গৌরবময় ইতিহাস</h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base text-justify">{institution.history}</p>
              </div>
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 text-sm space-y-3">
                <h4 className="font-bold text-gray-800 border-b pb-1">স্বীকৃতি ও পরিচিতি</h4>
                <div className="space-y-1.5 text-xs text-gray-600">
                  <p><strong>স্থাপিত বছর:</strong> {institution.established_year}</p>
                  <p><strong>EIIN কোড:</strong> {institution.eiin}</p>
                  <p><strong>ইনস্টিটিউট কোড:</strong> {institution.institute_code}</p>
                  <p><strong>ধরণ:</strong> {institution.type}</p>
                  <p><strong>স্বীকৃতি:</strong> {institution.recognition}</p>
                  <p><strong>এমপিও স্ট্যাটাস:</strong> {institution.mpo_status}</p>
                  <p><strong>এমপিও নম্বর:</strong> {institution.mpo_number}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-150 pt-6">
              <div className="bg-blue-50/50 p-5 rounded-lg border border-blue-100 space-y-2">
                <h4 className="font-extrabold text-blue-900 text-base flex items-center gap-1.5">🎯 আমাদের লক্ষ্য (Our Mission)</h4>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed text-justify">{institution.mission}</p>
              </div>
              <div className="bg-green-50/50 p-5 rounded-lg border border-green-100 space-y-2">
                <h4 className="font-extrabold text-green-900 text-base flex items-center gap-1.5">👁️ আমাদের ভিশন (Our Vision)</h4>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed text-justify">{institution.vision}</p>
              </div>
            </div>

            {isFeatureEnabled('principal_message') && (
              <div className="border-t border-gray-150 pt-6 space-y-4">
                <h3 className="font-bold text-gray-800 text-lg border-b pb-2">প্রধান শিক্ষকের বাণী (Principal Message)</h3>
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="w-28 h-28 rounded-full overflow-hidden shrink-0 border-2 border-blue-800 shadow-md mx-auto sm:mx-0 bg-gray-100 flex items-center justify-center">
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
                    <h4 className="font-bold text-gray-900">{principalName}</h4>
                    <span className="bg-blue-100 text-blue-800 font-bold text-[10px] px-2 py-0.5 rounded inline-block">{principalDesignation}</span>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-justify italic font-medium">
                      "{institution.principal_message}"
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case 'notices':
        if (selectedNoticeId) {
          return (
            <NoticeDetail 
              selectedNoticeId={selectedNoticeId} 
              onBackToNotices={() => setSelectedNoticeId(null)} 
              institutionName={institution.name_bn}
            />
          );
        }
        return (
          <NoticeList 
            institutionName={institution.name_bn} 
            onSelectNotice={(id) => {
              setSelectedNoticeId(id);
              window.scrollTo(0, 0);
            }} 
          />
        );
      case 'teachers':
        return <TeacherList institutionName={institution.name_bn} />;
      case 'student_stats':
        return <StudentStatsView institutionName={institution.name_bn} />;
      case 'routine':
        return <RoutineView institutionName={institution.name_bn} />;
      case 'syllabus':
        return <SyllabusView institutionName={institution.name_bn} />;
      case 'committee':
        return <CommitteeView institutionName={institution.name_bn} />;
      case 'gallery':
        return <GalleryView institutionName={institution.name_bn} />;
      case 'downloads':
        return <DownloadsView institutionName={institution.name_bn} />;
      case 'contact':
        return <ContactView institutionName={institution.name_bn} />;
      case 'complaint':
        return <ComplaintView institutionName={institution.name_bn} />;
      case 'admin':
        return (
          <AdminPanel 
            onLogout={() => {
              setCurrentPage('home');
              window.scrollTo(0, 0);
            }}
            onRefreshSite={handleRefreshSite}
          />
        );
      default:
        return <div className="text-center py-12 font-bold">পৃষ্ঠাটি লোড করা সম্ভব হয়নি।</div>;
    }
  };

  return (
    <div key={siteKey} className="min-h-screen bg-[#f5f7fa] flex flex-col justify-between font-sans text-gray-900 leading-normal tracking-normal">
      {/* 1. TOP BAR (চিকন স্ট্রিপ) */}
      <div className="bg-[#1a237e] text-white text-[11px] sm:text-xs py-2 px-4 shadow-inner border-b border-blue-900">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5 font-semibold">
          <div className="flex flex-wrap items-center justify-center gap-4 text-gray-200">
            <span>EIIN: <strong className="text-white">{institution.eiin}</strong></span>
            <span className="hidden xs:inline text-blue-400">|</span>
            <span>MPO No: <strong className="text-white">{institution.mpo_number}</strong></span>
            <span className="hidden sm:inline text-blue-400">|</span>
            <span>Established: <strong className="text-white">{institution.established_year}</strong></span>
          </div>
          <div className="flex items-center gap-4 text-gray-200">
            <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
              <Phone className="w-3.5 h-3.5 text-amber-400" /> {institution.phone}
            </span>
            <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
              <Mail className="w-3.5 h-3.5 text-amber-400" /> {institution.email}
            </span>
          </div>
        </div>
      </div>

      {/* 2. LOGO HEADER */}
      <header className="bg-white border-b border-blue-100 py-4 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Circular Logo Emblem */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-800 to-indigo-900 flex items-center justify-center text-white border-2 border-blue-800 shadow shadow-blue-100 shrink-0">
              <School className="w-9 h-9" />
            </div>
            <div className="space-y-0.5">
              <h1 className="text-xl sm:text-2xl font-black text-gray-950 tracking-tight leading-none">
                {institution.name_bn}
              </h1>
              <p className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wide font-mono">
                {institution.name_en}
              </p>
              <span className="text-[10px] sm:text-xs text-red-600 font-extrabold flex items-center justify-center sm:justify-start gap-1">
                <span className="w-2 h-2 rounded-full bg-red-600 inline-block animate-pulse" />
                {institution.tagline}
              </span>
            </div>
          </div>

          {/* National Flag Emblem decoration */}
          <div className="hidden md:flex items-center gap-3 bg-green-50/50 p-2.5 rounded-lg border border-green-100">
            <div className="w-10 h-7 rounded bg-[#006a4e] relative overflow-hidden flex items-center justify-center border border-green-700 shadow-sm">
              <div className="w-4 h-4 rounded-full bg-[#f42a41]" />
            </div>
            <div className="text-[10px] text-green-900 font-bold leading-tight">
              <span>গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</span>
              <p className="text-[9px] text-gray-400 font-semibold font-mono">Education Board Dhaka</p>
            </div>
          </div>
        </div>
      </header>

      {/* 3. NAVIGATION BAR */}
      <nav className="bg-[#1a237e] text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-12 px-4">
          
          {/* Hamburger Menu on Mobile */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1 rounded-md text-gray-200 hover:text-white hover:bg-white/10"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop Navigation list */}
          <ul className="hidden lg:flex items-center gap-1.5 text-xs font-bold h-full">
            <li>
              <button 
                onClick={() => { setCurrentPage('home'); setSelectedNoticeId(null); }} 
                className={`px-3 py-1.5 rounded transition-all ${currentPage === 'home' ? 'bg-red-700 text-white shadow-inner' : 'hover:bg-white/10'}`}
              >
                হোম (Home)
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentPage('about')} 
                className={`px-3 py-1.5 rounded transition-all ${currentPage === 'about' ? 'bg-red-700 text-white' : 'hover:bg-white/10'}`}
              >
                আমাদের সম্পর্কে
              </button>
            </li>
            {isFeatureEnabled('notices') && (
              <li>
                <button 
                  onClick={() => { setCurrentPage('notices'); setSelectedNoticeId(null); }} 
                  className={`px-3 py-1.5 rounded transition-all ${currentPage === 'notices' ? 'bg-red-700 text-white' : 'hover:bg-white/10'}`}
                >
                  নোটিশ
                </button>
              </li>
            )}
            {isFeatureEnabled('teachers') && (
              <li>
                <button 
                  onClick={() => setCurrentPage('teachers')} 
                  className={`px-3 py-1.5 rounded transition-all ${currentPage === 'teachers' ? 'bg-red-700 text-white' : 'hover:bg-white/10'}`}
                >
                  শিক্ষক-কর্মচারী
                </button>
              </li>
            )}

            {/* Academic Dropdown block */}
            <li className="relative">
              <button
                onClick={() => setAcademicDropdownOpen(!academicDropdownOpen)}
                className={`px-3 py-1.5 rounded transition-all flex items-center gap-1 ${
                  ['routine', 'syllabus', 'student_stats'].includes(currentPage) ? 'bg-red-700 text-white' : 'hover:bg-white/10'
                }`}
              >
                একাডেমিক <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {academicDropdownOpen && (
                <ul className="absolute top-10 left-0 bg-white text-gray-800 rounded shadow-lg border border-gray-150 py-1 w-44 z-50 animate-fade-in text-xs font-bold divide-y divide-gray-100">
                  {isFeatureEnabled('routine') && (
                    <li>
                      <button 
                        onClick={() => { setCurrentPage('routine'); setAcademicDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 hover:text-blue-800"
                      >
                        📅 শ্রেণি রুটিন
                      </button>
                    </li>
                  )}
                  {isFeatureEnabled('syllabus') && (
                    <li>
                      <button 
                        onClick={() => { setCurrentPage('syllabus'); setAcademicDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 hover:text-blue-800"
                      >
                        📚 সিলেবাস তালিকা
                      </button>
                    </li>
                  )}
                  {isFeatureEnabled('student_stats') && (
                    <li>
                      <button 
                        onClick={() => { setCurrentPage('student_stats'); setAcademicDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 hover:text-blue-800"
                      >
                        📈 শিক্ষার্থী পরিসংখ্যান
                      </button>
                    </li>
                  )}
                </ul>
              )}
            </li>

            {isFeatureEnabled('committee') && (
              <li>
                <button 
                  onClick={() => setCurrentPage('committee')} 
                  className={`px-3 py-1.5 rounded transition-all ${currentPage === 'committee' ? 'bg-red-700 text-white' : 'hover:bg-white/10'}`}
                >
                  পরিচালনা কমিটি
                </button>
              </li>
            )}
            {isFeatureEnabled('gallery') && (
              <li>
                <button 
                  onClick={() => setCurrentPage('gallery')} 
                  className={`px-3 py-1.5 rounded transition-all ${currentPage === 'gallery' ? 'bg-red-700 text-white' : 'hover:bg-white/10'}`}
                >
                  গ্যালারি
                </button>
              </li>
            )}
            {isFeatureEnabled('downloads') && (
              <li>
                <button 
                  onClick={() => setCurrentPage('downloads')} 
                  className={`px-3 py-1.5 rounded transition-all ${currentPage === 'downloads' ? 'bg-red-700 text-white' : 'hover:bg-white/10'}`}
                >
                  ডাউনলোড
                </button>
              </li>
            )}
            <li>
              <button 
                onClick={() => setCurrentPage('contact')} 
                className={`px-3 py-1.5 rounded transition-all ${currentPage === 'contact' ? 'bg-red-700 text-white' : 'hover:bg-white/10'}`}
              >
                যোগাযোগ
              </button>
            </li>
            {isFeatureEnabled('complaint') && (
              <li>
                <button 
                  onClick={() => setCurrentPage('complaint')} 
                  className={`px-3 py-1.5 rounded transition-all ${currentPage === 'complaint' ? 'bg-red-700 text-white' : 'hover:bg-white/10'}`}
                >
                  অভিযোগ সেল
                </button>
              </li>
            )}
          </ul>

          {/* Admin panel triggers (lock icon) */}
          <button 
            onClick={() => setCurrentPage('admin')}
            className={`px-4 py-1.5 rounded transition-all text-xs font-extrabold flex items-center gap-1 ${
              currentPage === 'admin' ? 'bg-green-700 text-white' : 'bg-white/10 hover:bg-white/20 text-teal-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5 shrink-0" /> এডমিন লগইন (ড্যাশবোর্ড)
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#151c66] border-t border-blue-900 py-3 px-4 text-xs font-bold space-y-2">
            <button onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); setSelectedNoticeId(null); }} className="w-full text-left py-2 px-3 hover:bg-white/10 rounded block">হোম (Home)</button>
            <button onClick={() => { setCurrentPage('about'); setMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 hover:bg-white/10 rounded block">আমাদের সম্পর্কে</button>
            {isFeatureEnabled('notices') && <button onClick={() => { setCurrentPage('notices'); setMobileMenuOpen(false); setSelectedNoticeId(null); }} className="w-full text-left py-2 px-3 hover:bg-white/10 rounded block">নোটিশ বোর্ড</button>}
            {isFeatureEnabled('teachers') && <button onClick={() => { setCurrentPage('teachers'); setMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 hover:bg-white/10 rounded block">শিক্ষক-কর্মচারী</button>}
            
            {/* Mobile Academics list */}
            <div className="pl-3 border-l-2 border-red-700 space-y-1">
              <span className="text-[10px] text-gray-400 block px-3 py-1 uppercase tracking-wider">একাডেমিক তথ্য:</span>
              {isFeatureEnabled('routine') && <button onClick={() => { setCurrentPage('routine'); setMobileMenuOpen(false); }} className="w-full text-left py-1.5 px-3 hover:bg-white/10 rounded block">📅 শ্রেণি রুটিন</button>}
              {isFeatureEnabled('syllabus') && <button onClick={() => { setCurrentPage('syllabus'); setMobileMenuOpen(false); }} className="w-full text-left py-1.5 px-3 hover:bg-white/10 rounded block">📚 সিলেবাস তালিকা</button>}
              {isFeatureEnabled('student_stats') && <button onClick={() => { setCurrentPage('student_stats'); setMobileMenuOpen(false); }} className="w-full text-left py-1.5 px-3 hover:bg-white/10 rounded block">📈 শিক্ষার্থী পরিসংখ্যান</button>}
            </div>

            {isFeatureEnabled('committee') && <button onClick={() => { setCurrentPage('committee'); setMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 hover:bg-white/10 rounded block">পরিচালনা কমিটি</button>}
            {isFeatureEnabled('gallery') && <button onClick={() => { setCurrentPage('gallery'); setMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 hover:bg-white/10 rounded block">ফটো গ্যালারি</button>}
            {isFeatureEnabled('downloads') && <button onClick={() => { setCurrentPage('downloads'); setMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 hover:bg-white/10 rounded block">ডাউনলোড</button>}
            <button onClick={() => { setCurrentPage('contact'); setMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 hover:bg-white/10 rounded block">যোগাযোগ</button>
            {isFeatureEnabled('complaint') && <button onClick={() => { setCurrentPage('complaint'); setMobileMenuOpen(false); }} className="w-full text-left py-2 px-3 hover:bg-white/10 rounded block">অভিযোগ সেল</button>}
          </div>
        )}
      </nav>

      {/* 4. MAIN CONTENT STAGE */}
      <main className="max-w-7xl w-full mx-auto p-4 sm:p-6 flex-1">
        {renderPageContent()}
      </main>

      {/* 5. FOOTER */}
      <footer className="bg-[#1a237e] text-white border-t border-blue-950 mt-12 py-10 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left text-sm">
          
          {/* Column 1: School Identity */}
          <div className="space-y-3">
            <div className="flex items-center justify-center md:justify-start gap-2 text-white">
              <School className="w-6 h-6 text-amber-400" />
              <h3 className="font-extrabold text-base tracking-wide">{institution.name_bn}</h3>
            </div>
            <p className="text-xs text-gray-300 font-medium font-mono uppercase tracking-wider">{institution.name_en}</p>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm mx-auto md:mx-0 text-justify">
              ১৯৭৫ সাল থেকে গাজীপুর জেলার অন্যতম শীর্ষস্থানীয় শিক্ষাপীঠ হিসেবে আমরা শিক্ষার্থীদের মাঝে নৈতিক শিক্ষা ও আধুনিক জ্ঞানের আলো ছড়িয়ে দিচ্ছি।
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-amber-400 text-sm tracking-wider">গুরুত্বপূর্ণ লিঙ্ক</h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-300 font-bold justify-items-center md:justify-items-start max-w-xs mx-auto">
              <button onClick={() => { setCurrentPage('home'); setSelectedNoticeId(null); }} className="hover:text-white hover:underline text-left">হোম (Home)</button>
              <button onClick={() => setCurrentPage('about')} className="hover:text-white hover:underline text-left">পরিচিতি</button>
              {isFeatureEnabled('notices') && <button onClick={() => { setCurrentPage('notices'); setSelectedNoticeId(null); }} className="hover:text-white hover:underline text-left">বিজ্ঞপ্তি</button>}
              {isFeatureEnabled('teachers') && <button onClick={() => setCurrentPage('teachers')} className="hover:text-white hover:underline text-left">শিক্ষকমণ্ডলী</button>}
              {isFeatureEnabled('downloads') && <button onClick={() => setCurrentPage('downloads')} className="hover:text-white hover:underline text-left">ডাউনলোড</button>}
              <button onClick={() => setCurrentPage('contact')} className="hover:text-white hover:underline text-left">যোগাযোগ</button>
            </div>
          </div>

          {/* Column 3: Contact & Support */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-amber-400 text-sm tracking-wider">জরুরি যোগাযোগ</h4>
            <div className="space-y-2 text-xs text-gray-300 max-w-xs mx-auto md:mx-0">
              <p className="flex items-start gap-2 justify-center md:justify-start">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>বোর্ডবাজার, গাজীপুর সদর, গাজীপুর-১৭০০</span>
              </p>
              <p className="flex items-center gap-2 justify-center md:justify-start">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>টেলিফোন: ০২-৯২৬১xxx, মোবাইল: ০১৭১১-xxxxxx</span>
              </p>
              <p className="flex items-center gap-2 justify-center md:justify-start">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>gahs1975@gmail.com</span>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright info block */}
       <div className="text-center text-sm text-gray-200">
          <p>
            © {new Date().getFullYear()} {institution.name_bn || institution.name_en}. সর্বস্বত্ব সংরক্ষিত।
          </p>
          <p className="mt-1">
            Developed by{" "}
            <a
              href="https://techxionbd.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white hover:text-green-300"
            >
              TechXion BD
            </a>
          </p>
       </div>
      </footer>
    </div>
  );
}
