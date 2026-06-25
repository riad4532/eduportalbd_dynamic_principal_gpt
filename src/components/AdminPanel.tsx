/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  getInstitution, saveInstitution, 
  getFeatureSettings, saveFeatureSettings, FeatureSetting,
  getNotices, saveNotices, Notice,
  getTeachers, saveTeachers, Teacher,
  getStudentStats, saveStudentStats, StudentStat,
  getRoutines, saveRoutines, Routine,
  getSyllabuses, saveSyllabuses, Syllabus,
  getCommittee, saveCommittee, CommitteeMember,
  getDownloads, saveDownloads, Download,
  getGallery, saveGallery, GalleryImage,
  getComplaintOfficer, saveComplaintOfficer, ComplaintOfficer,
  seedDemo
} from '../data';
import { 
  Lock, User, LogOut, Search, Plus, Trash2, Edit2, 
  Check, Save, RefreshCw, Eye, Settings, FileText, 
  Users, Calendar, GraduationCap, ArrowLeft, Trash, ShieldAlert
} from 'lucide-react';

interface AdminProps {
  onLogout: () => void;
  onRefreshSite: () => void;
}

export default function AdminPanel({ onLogout, onRefreshSite }: AdminProps) {
  // Login credentials check
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(
    () => sessionStorage.getItem('edu_admin_auth') === 'true'
  );

  // Router within Admin
  const [activeModel, setActiveModel] = useState<string | null>(null); // e.g. 'notices', 'teachers', 'features', 'institution'
  const [editingId, setEditingId] = useState<number | null>(null); // number or -1 for New Row

  // Local component copy states loaded dynamically
  const [instForm, setInstForm] = useState(() => getInstitution());
  const [featuresList, setFeaturesList] = useState(() => getFeatureSettings());
  const [noticesList, setNoticesList] = useState(() => getNotices());
  const [teachersList, setTeachersList] = useState(() => getTeachers());
  const [studentStatsList, setStudentStatsList] = useState(() => getStudentStats());
  const [routinesList, setRoutinesList] = useState(() => getRoutines());
  const [syllabusesList, setSyllabusesList] = useState(() => getSyllabuses());
  const [committeeList, setCommitteeList] = useState(() => getCommittee());
  const [downloadsList, setDownloadsList] = useState(() => getDownloads());
  const [galleryList, setGalleryList] = useState(() => getGallery());
  const [officerForm, setOfficerForm] = useState(() => getComplaintOfficer());

  // Search/Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Editing forms state (dynamic record bindings)
  const [editNotice, setEditNotice] = useState<Partial<Notice>>({});
  const [editTeacher, setEditTeacher] = useState<Partial<Teacher>>({});
  const [editStat, setEditStat] = useState<Partial<StudentStat>>({});
  const [editRoutine, setEditRoutine] = useState<Partial<Routine>>({});
  const [editSyllabus, setEditSyllabus] = useState<Partial<Syllabus>>({});
  const [editCommittee, setEditCommittee] = useState<Partial<CommitteeMember>>({});
  const [editDownload, setEditDownload] = useState<Partial<Download>>({});
  const [editGallery, setEditGallery] = useState<Partial<GalleryImage>>({});

  // Perform Simulated Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin12345') {
      sessionStorage.setItem('edu_admin_auth', 'true');
      setIsAuthorized(true);
      setLoginError('');
      // Refresh form elements on load
      setInstForm(getInstitution());
      setFeaturesList(getFeatureSettings());
      setNoticesList(getNotices());
      setTeachersList(getTeachers());
      setStudentStatsList(getStudentStats());
      setRoutinesList(getRoutines());
      setSyllabusesList(getSyllabuses());
      setCommitteeList(getCommittee());
      setDownloadsList(getDownloads());
      setGalleryList(getGallery());
      setOfficerForm(getComplaintOfficer());
    } else {
      setLoginError('ভুল ব্যবহারকারীর নাম বা পাসওয়ার্ড! (Hint: admin / admin12345)');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('edu_admin_auth');
    setIsAuthorized(false);
    onLogout();
  };

  // Database Seed Action
  const handleResetData = () => {
    if (confirm("আপনি কি নিশ্চিতভাবে ডেমো ডাটা রিসেট করতে চান? আপনার নিজস্ব সকল এডিট মুছে যাবে।")) {
      seedDemo();
      setInstForm(getInstitution());
      setFeaturesList(getFeatureSettings());
      setNoticesList(getNotices());
      setTeachersList(getTeachers());
      setStudentStatsList(getStudentStats());
      setRoutinesList(getRoutines());
      setSyllabusesList(getSyllabuses());
      setCommitteeList(getCommittee());
      setDownloadsList(getDownloads());
      setGalleryList(getGallery());
      setOfficerForm(getComplaintOfficer());
      setEditingId(null);
      setActiveModel(null);
      onRefreshSite();
      alert("ডেমো ডাটা সফলভাবে রিসেট সম্পন্ন হয়েছে!");
    }
  };

  // CRUD Save Actions
  const saveNoticeForm = (e: React.FormEvent) => {
    e.preventDefault();
    let updated = [...noticesList];
    if (editingId === -1) {
      // New row
      const newNotice: Notice = {
        id: noticesList.length > 0 ? Math.max(...noticesList.map(n => n.id)) + 1 : 1,
        title: editNotice.title || "শিরোনামহীন বিজ্ঞপ্তি",
        category: editNotice.category || "General",
        body: editNotice.body || "",
        published_date: editNotice.published_date || new Date().toISOString().split('T')[0],
        attachment_name: editNotice.attachment_name || "",
        attachment_size: editNotice.attachment_name ? "150 KB" : "",
        is_active: editNotice.is_active !== undefined ? editNotice.is_active : true,
        institution_id: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      updated.push(newNotice);
    } else {
      // Editing row
      updated = noticesList.map(n => n.id === editingId ? { ...n, ...editNotice, updated_at: new Date().toISOString() } : n);
    }
    saveNotices(updated as Notice[]);
    setNoticesList(updated as Notice[]);
    setEditingId(null);
    onRefreshSite();
  };

  const saveTeacherForm = (e: React.FormEvent) => {
    e.preventDefault();
    let updated = [...teachersList];
    if (editingId === -1) {
      const newTeacher: Teacher = {
        id: teachersList.length > 0 ? Math.max(...teachersList.map(t => t.id)) + 1 : 1,
        name: editTeacher.name || "শিক্ষকের নাম",
        designation: editTeacher.designation || "সহকারী শিক্ষক",
        subject: editTeacher.subject || "সাধারণ",
        qualification: editTeacher.qualification || "B.A",
        join_date: editTeacher.join_date || "2020-01-01",
        is_mpo: editTeacher.is_mpo || false,
        photo_url: editTeacher.photo_url || "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
        staff_type: editTeacher.staff_type || "teaching",
        sort_order: editTeacher.sort_order || teachersList.length + 1,
        is_active: editTeacher.is_active !== undefined ? editTeacher.is_active : true,
        institution_id: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      updated.push(newTeacher);
    } else {
      updated = teachersList.map(t => t.id === editingId ? { ...t, ...editTeacher, updated_at: new Date().toISOString() } : t);
    }
    saveTeachers(updated as Teacher[]);
    setTeachersList(updated as Teacher[]);
    setEditingId(null);
    onRefreshSite();
  };

  const saveStudentStatForm = (e: React.FormEvent) => {
    e.preventDefault();
    let updated = [...studentStatsList];
    if (editingId === -1) {
      const newStat: StudentStat = {
        id: studentStatsList.length > 0 ? Math.max(...studentStatsList.map(s => s.id)) + 1 : 1,
        year: editStat.year || new Date().getFullYear(),
        class_6: Number(editStat.class_6) || 0,
        class_7: Number(editStat.class_7) || 0,
        class_8: Number(editStat.class_8) || 0,
        class_9: Number(editStat.class_9) || 0,
        class_10: Number(editStat.class_10) || 0,
        total: (Number(editStat.class_6)||0) + (Number(editStat.class_7)||0) + (Number(editStat.class_8)||0) + (Number(editStat.class_9)||0) + (Number(editStat.class_10)||0),
        ssc_pass_rate: editStat.ssc_pass_rate || "95%",
        is_active: editStat.is_active !== undefined ? editStat.is_active : true,
        institution_id: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      updated.push(newStat);
    } else {
      updated = studentStatsList.map(s => s.id === editingId ? { ...s, ...editStat, total: (Number(editStat.class_6||s.class_6)||0) + (Number(editStat.class_7||s.class_7)||0) + (Number(editStat.class_8||s.class_8)||0) + (Number(editStat.class_9||s.class_9)||0) + (Number(editStat.class_10||s.class_10)||0), updated_at: new Date().toISOString() } : s);
    }
    saveStudentStats(updated as StudentStat[]);
    setStudentStatsList(updated as StudentStat[]);
    setEditingId(null);
    onRefreshSite();
  };

  const saveRoutineForm = (e: React.FormEvent) => {
    e.preventDefault();
    let updated = [...routinesList];
    if (editingId === -1) {
      const newRoutine: Routine = {
        id: routinesList.length > 0 ? Math.max(...routinesList.map(r => r.id)) + 1 : 1,
        class_name: editRoutine.class_name || "ষষ্ঠ শ্রেণি",
        section: editRoutine.section || "ক",
        year: editRoutine.year || new Date().getFullYear(),
        effective_date: editRoutine.effective_date || "2025-01-01",
        attachment_name: editRoutine.attachment_name || "routine_file.pdf",
        attachment_size: editRoutine.attachment_name ? "140 KB" : "",
        is_active: editRoutine.is_active !== undefined ? editRoutine.is_active : true,
        institution_id: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      updated.push(newRoutine);
    } else {
      updated = routinesList.map(r => r.id === editingId ? { ...r, ...editRoutine, updated_at: new Date().toISOString() } : r);
    }
    saveRoutines(updated as Routine[]);
    setRoutinesList(updated as Routine[]);
    setEditingId(null);
    onRefreshSite();
  };

  const saveSyllabusForm = (e: React.FormEvent) => {
    e.preventDefault();
    let updated = [...syllabusesList];
    if (editingId === -1) {
      const newSyllabus: Syllabus = {
        id: syllabusesList.length > 0 ? Math.max(...syllabusesList.map(s => s.id)) + 1 : 1,
        class_name: editSyllabus.class_name || "ষষ্ঠ শ্রেণি",
        subject: editSyllabus.subject || "বাংলা",
        exam_type: editSyllabus.exam_type || "Annual",
        year: editSyllabus.year || new Date().getFullYear(),
        attachment_name: editSyllabus.attachment_name || "syllabus_file.pdf",
        attachment_size: editSyllabus.attachment_name ? "150 KB" : "",
        is_active: editSyllabus.is_active !== undefined ? editSyllabus.is_active : true,
        institution_id: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      updated.push(newSyllabus);
    } else {
      updated = syllabusesList.map(s => s.id === editingId ? { ...s, ...editSyllabus, updated_at: new Date().toISOString() } : s);
    }
    saveSyllabuses(updated as Syllabus[]);
    setSyllabusesList(updated as Syllabus[]);
    setEditingId(null);
    onRefreshSite();
  };

  const saveCommitteeForm = (e: React.FormEvent) => {
    e.preventDefault();
    let updated = [...committeeList];
    if (editingId === -1) {
      const newMember: CommitteeMember = {
        id: committeeList.length > 0 ? Math.max(...committeeList.map(c => c.id)) + 1 : 1,
        name: editCommittee.name || "সদস্যের নাম",
        designation: editCommittee.designation || "সদস্য",
        category: editCommittee.category || "স্থানীয় গণ্যমান্য",
        term: editCommittee.term || "২০২৩ - ২০২৬",
        photo_url: editCommittee.photo_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        is_active: editCommittee.is_active !== undefined ? editCommittee.is_active : true,
        institution_id: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      updated.push(newMember);
    } else {
      updated = committeeList.map(c => c.id === editingId ? { ...c, ...editCommittee, updated_at: new Date().toISOString() } : c);
    }
    saveCommittee(updated as CommitteeMember[]);
    setCommitteeList(updated as CommitteeMember[]);
    setEditingId(null);
    onRefreshSite();
  };

  const saveDownloadForm = (e: React.FormEvent) => {
    e.preventDefault();
    let updated = [...downloadsList];
    if (editingId === -1) {
      const newDownload: Download = {
        id: downloadsList.length > 0 ? Math.max(...downloadsList.map(d => d.id)) + 1 : 1,
        title: editDownload.title || "ডাউনলোড ফাইল",
        category: editDownload.category || "Other",
        attachment_name: editDownload.attachment_name || "form_file.pdf",
        attachment_size: editDownload.attachment_name ? "210 KB" : "",
        published_date: editDownload.published_date || new Date().toISOString().split('T')[0],
        is_active: editDownload.is_active !== undefined ? editDownload.is_active : true,
        institution_id: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      updated.push(newDownload);
    } else {
      updated = downloadsList.map(d => d.id === editingId ? { ...d, ...editDownload, updated_at: new Date().toISOString() } : d);
    }
    saveDownloads(updated as Download[]);
    setDownloadsList(updated as Download[]);
    setEditingId(null);
    onRefreshSite();
  };

  const saveGalleryForm = (e: React.FormEvent) => {
    e.preventDefault();
    let updated = [...galleryList];
    if (editingId === -1) {
      const newImg: GalleryImage = {
        id: galleryList.length > 0 ? Math.max(...galleryList.map(g => g.id)) + 1 : 1,
        caption: editGallery.caption || "ছবি ক্যাপশন",
        category: editGallery.category || "events",
        image_url: editGallery.image_url || "https://images.unsplash.com/photo-1511578314322-379afb476865",
        is_active: editGallery.is_active !== undefined ? editGallery.is_active : true,
        institution_id: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      updated.push(newImg);
    } else {
      updated = galleryList.map(g => g.id === editingId ? { ...g, ...editGallery, updated_at: new Date().toISOString() } : g);
    }
    saveGallery(updated as GalleryImage[]);
    setGalleryList(updated as GalleryImage[]);
    setEditingId(null);
    onRefreshSite();
  };

  const saveInstitutionForm = (e: React.FormEvent) => {
    e.preventDefault();
    saveInstitution(instForm);
    alert("প্রতিষ্ঠান প্রোফাইল সফলভাবে আপডেট করা হয়েছে!");
    onRefreshSite();
  };

  const saveComplaintOfficerForm = (e: React.FormEvent) => {
    e.preventDefault();
    saveComplaintOfficer(officerForm);
    alert("অভিযোগ কর্মকর্তা প্রোফাইল সফলভাবে আপডেট করা হয়েছে!");
    onRefreshSite();
  };

  const handleFeatureToggle = (key: string, enabled: boolean) => {
    const updated = featuresList.map(f => f.feature_key === key ? { ...f, is_enabled: enabled, updated_at: new Date().toISOString() } : f);
    saveFeatureSettings(updated);
    setFeaturesList(updated);
    onRefreshSite();
  };

  // Bulk Deletion Action
  const performBulkDelete = () => {
    if (selectedIds.length === 0) return;
    if (confirm(`আপনি কি নির্বাচিত ${selectedIds.length}টি রেকর্ড চিরতরে মুছে ফেলতে চান?`)) {
      if (activeModel === 'notices') {
        const filtered = noticesList.filter(n => !selectedIds.includes(n.id));
        saveNotices(filtered); setNoticesList(filtered);
      } else if (activeModel === 'teachers') {
        const filtered = teachersList.filter(t => !selectedIds.includes(t.id));
        saveTeachers(filtered); setTeachersList(filtered);
      } else if (activeModel === 'student_stats') {
        const filtered = studentStatsList.filter(s => !selectedIds.includes(s.id));
        saveStudentStats(filtered); setStudentStatsList(filtered);
      } else if (activeModel === 'routines') {
        const filtered = routinesList.filter(r => !selectedIds.includes(r.id));
        saveRoutines(filtered); setRoutinesList(filtered);
      } else if (activeModel === 'syllabuses') {
        const filtered = syllabusesList.filter(s => !selectedIds.includes(s.id));
        saveSyllabuses(filtered); setSyllabusesList(filtered);
      } else if (activeModel === 'committee') {
        const filtered = committeeList.filter(c => !selectedIds.includes(c.id));
        saveCommittee(filtered); setCommitteeList(filtered);
      } else if (activeModel === 'downloads') {
        const filtered = downloadsList.filter(d => !selectedIds.includes(d.id));
        saveDownloads(filtered); setDownloadsList(filtered);
      } else if (activeModel === 'gallery') {
        const filtered = galleryList.filter(g => !selectedIds.includes(g.id));
        saveGallery(filtered); setGalleryList(filtered);
      }
      setSelectedIds([]);
      onRefreshSite();
    }
  };

  // Checkbox bulk selector helper
  const toggleSelectId = (id: number) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  // 1. If not logged in, render the classic Django-style Login Panel
  if (!isAuthorized) {
    return (
      <div className="min-h-[500px] flex items-center justify-center bg-[#f4f4f4] py-12 px-4" id="django-admin-login">
        <div className="max-w-md w-full bg-white border border-gray-200 rounded shadow-md overflow-hidden">
          {/* Classic Django administration Header */}
          <div className="bg-[#417690] px-6 py-4 text-white">
            <h1 className="text-xl font-bold tracking-wide">Django Administration</h1>
            <p className="text-xs text-blue-100 mt-0.5 font-medium">গাজীপুর আদর্শ উচ্চ বিদ্যালয় পোর্টাল</p>
          </div>

          <form onSubmit={handleLogin} className="p-6 space-y-5">
            {loginError && (
              <div className="bg-red-50 text-red-700 p-3 rounded text-xs font-bold border border-red-100 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" />
                {loginError}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">ইউজারনেম (Username)</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  required
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#417690] focus:border-[#417690]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">পাসওয়ার্ড (Password)</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#417690] focus:border-[#417690]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#417690] hover:bg-[#305a6f] text-white py-2 px-4 rounded font-bold text-sm transition-colors shadow-sm flex items-center justify-center gap-1"
            >
              লগইন করুন (Log In)
            </button>
          </form>

          <div className="bg-gray-50 px-6 py-3 border-t border-gray-150 text-center">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">EduPortalBD White-Label Engine v1.0</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. Render Django Admin Dashboard or Models listings
  return (
    <div className="min-h-[600px] bg-[#f8f8f8] border border-gray-200 rounded-lg overflow-hidden shadow-sm flex flex-col" id="django-admin-panel">
      {/* Django Admin Topbar Header */}
      <div className="bg-[#417690] px-4 py-3 sm:px-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="bg-[#2e5467] px-2 py-1 rounded text-xs font-bold tracking-widest text-teal-200">DJANGO</span>
          <h1 className="text-base sm:text-lg font-bold tracking-wide">গাজীপুর আদর্শ উচ্চ বিদ্যালয় — Administration</h1>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="font-semibold text-teal-100">স্বাগতম, <strong className="text-white">admin</strong> (সুপারইউজার)</span>
          <span className="text-teal-300">|</span>
          <button onClick={handleResetData} className="hover:underline flex items-center gap-0.5 text-amber-300 font-bold">
            <RefreshCw className="w-3 h-3" /> রিসেট ডেমো
          </button>
          <span className="text-teal-300">|</span>
          <button onClick={handleLogout} className="hover:underline flex items-center gap-0.5 text-red-200 font-bold">
            <LogOut className="w-3.5 h-3.5" /> লগআউট
          </button>
        </div>
      </div>

      {/* Django Admin Green Breadcrumbs sub-header bar */}
      <div className="bg-[#79aec8] px-4 py-2 sm:px-6 text-white text-xs font-semibold flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="cursor-pointer hover:underline" onClick={() => { setActiveModel(null); setEditingId(null); }}>Home</span>
          {activeModel && (
            <>
              <span>›</span>
              <span className="cursor-pointer hover:underline capitalize" onClick={() => setEditingId(null)}>{activeModel}</span>
            </>
          )}
          {editingId !== null && (
            <>
              <span>›</span>
              <span>{editingId === -1 ? 'Add New' : 'Change Record'}</span>
            </>
          )}
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider text-blue-900">স্থানীয় ডেমো ডাটাবেজ (SQLite)</span>
      </div>

      {/* Main Admin Console Container */}
      <div className="flex-1 p-4 sm:p-6">
        {/* MODEL EDITING SCREEN */}
        {editingId !== null ? (
          <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden p-6 max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between border-b border-gray-150 pb-3">
              <h2 className="text-lg font-bold text-gray-800">
                {editingId === -1 ? 'নতুন তথ্য যোগ করুন' : 'তথ্য পরিবর্তন করুন (Change Record)'} — {activeModel}
              </h2>
              <button 
                onClick={() => setEditingId(null)}
                className="text-xs font-bold text-gray-500 hover:text-gray-800 flex items-center gap-0.5"
              >
                <ArrowLeft className="w-4 h-4" /> তালিকায় ফিরুন
              </button>
            </div>

            {/* FORM CONDITIONAL RENDERING FOR NOTICES */}
            {activeModel === 'notices' && (
              <form onSubmit={saveNoticeForm} className="space-y-4 text-sm">
                <div className="space-y-1">
                  <label className="font-bold text-gray-600 block">বিজ্ঞপ্তির শিরোনাম *</label>
                  <input
                    type="text"
                    required
                    value={editNotice.title || ''}
                    onChange={(e) => setEditNotice({ ...editNotice, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#417690]"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-gray-600 block">ক্যাটাগরি</label>
                    <select
                      value={editNotice.category || 'General'}
                      onChange={(e) => setEditNotice({ ...editNotice, category: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white"
                    >
                      <option value="General">General (সাধারণ)</option>
                      <option value="Academic">Academic (একাডেমিক)</option>
                      <option value="Exam">Exam (পরীক্ষা)</option>
                      <option value="Admission">Admission (ভর্তি)</option>
                      <option value="Other">Other (অন্যান্য)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-600 block">প্রকাশের তারিখ</label>
                    <input
                      type="date"
                      required
                      value={editNotice.published_date || ''}
                      onChange={(e) => setEditNotice({ ...editNotice, published_date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#417690]"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-gray-600 block">সংযুক্তি ফাইল নাম (PDF attachment)</label>
                  <input
                    type="text"
                    placeholder="E.g. exam_routine.pdf"
                    value={editNotice.attachment_name || ''}
                    onChange={(e) => setEditNotice({ ...editNotice, attachment_name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-gray-600 block">বিজ্ঞপ্তির বর্ণনা (Body Content)</label>
                  <textarea
                    rows={6}
                    value={editNotice.body || ''}
                    onChange={(e) => setEditNotice({ ...editNotice, body: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#417690]"
                  />
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="notice-is-active"
                    checked={editNotice.is_active !== undefined ? editNotice.is_active : true}
                    onChange={(e) => setEditNotice({ ...editNotice, is_active: e.target.checked })}
                    className="rounded text-[#417690] focus:ring-[#417690] h-4 w-4"
                  />
                  <label htmlFor="notice-is-active" className="font-bold text-gray-700 text-sm cursor-pointer">সক্রিয় রয়েছে (Is Active)</label>
                </div>

                <div className="pt-4 border-t border-gray-150 flex justify-end gap-3">
                  <button type="button" onClick={() => setEditingId(null)} className="px-4 py-2 border border-gray-300 rounded font-bold text-gray-600 hover:bg-gray-50">বাতিল</button>
                  <button type="submit" className="px-5 py-2 bg-[#417690] hover:bg-[#305a6f] text-white rounded font-bold shadow-sm">সংরক্ষণ করুন (Save)</button>
                </div>
              </form>
            )}

            {/* FORM CONDITIONAL RENDERING FOR TEACHERS */}
            {activeModel === 'teachers' && (
              <form onSubmit={saveTeacherForm} className="space-y-4 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-gray-600 block">শিক্ষকের নাম *</label>
                    <input
                      type="text"
                      required
                      value={editTeacher.name || ''}
                      onChange={(e) => setEditTeacher({ ...editTeacher, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-600 block">পদবি *</label>
                    <input
                      type="text"
                      required
                      value={editTeacher.designation || ''}
                      onChange={(e) => setEditTeacher({ ...editTeacher, designation: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-gray-600 block">প্রধান বিষয় (Subject)</label>
                    <input
                      type="text"
                      value={editTeacher.subject || ''}
                      onChange={(e) => setEditTeacher({ ...editTeacher, subject: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-600 block">শিক্ষাগত যোগ্যতা *</label>
                    <input
                      type="text"
                      required
                      value={editTeacher.qualification || ''}
                      onChange={(e) => setEditTeacher({ ...editTeacher, qualification: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-gray-600 block">যোগদানের তারিখ</label>
                    <input
                      type="date"
                      required
                      value={editTeacher.join_date || ''}
                      onChange={(e) => setEditTeacher({ ...editTeacher, join_date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-600 block">জনবল ক্যাটাগরি</label>
                    <select
                      value={editTeacher.staff_type || 'teaching'}
                      onChange={(e) => setEditTeacher({ ...editTeacher, staff_type: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white"
                    >
                      <option value="teaching">Teaching (শিক্ষক)</option>
                      <option value="non-teaching">Non-Teaching (কর্মচারী)</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-gray-600 block">সাজানোর ক্রম (Sort Order)</label>
                    <input
                      type="number"
                      value={editTeacher.sort_order || ''}
                      onChange={(e) => setEditTeacher({ ...editTeacher, sort_order: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-600 block">ছবি লিংক (Unsplash Photo URL)</label>
                    <input
                      type="text"
                      value={editTeacher.photo_url || ''}
                      onChange={(e) => setEditTeacher({ ...editTeacher, photo_url: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-6 pt-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="teacher-is-mpo"
                      checked={editTeacher.is_mpo || false}
                      onChange={(e) => setEditTeacher({ ...editTeacher, is_mpo: e.target.checked })}
                      className="rounded text-[#417690] h-4 w-4"
                    />
                    <label htmlFor="teacher-is-mpo" className="font-bold text-gray-700 text-sm cursor-pointer">এমপিওভুক্ত (Is MPO)</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="teacher-is-active"
                      checked={editTeacher.is_active !== undefined ? editTeacher.is_active : true}
                      onChange={(e) => setEditTeacher({ ...editTeacher, is_active: e.target.checked })}
                      className="rounded text-[#417690] h-4 w-4"
                    />
                    <label htmlFor="teacher-is-active" className="font-bold text-gray-700 text-sm cursor-pointer">সক্রিয় রয়েছে (Is Active)</label>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-150 flex justify-end gap-3">
                  <button type="button" onClick={() => setEditingId(null)} className="px-4 py-2 border border-gray-300 rounded font-bold text-gray-600">বাতিল</button>
                  <button type="submit" className="px-5 py-2 bg-[#417690] hover:bg-[#305a6f] text-white rounded font-bold shadow-sm">সংরক্ষণ করুন (Save)</button>
                </div>
              </form>
            )}

            {/* FALLBACK SAVERS FOR GENERAL FIELDS - PREVENTS CODES BLOWN */}
            {['student_stats', 'routines', 'syllabuses', 'committee', 'downloads', 'gallery'].includes(activeModel || '') && (
              <div className="space-y-4">
                <p className="text-xs text-gray-500">নিম্নলিখিত ফর্মটি পূরণ করে সরাসরি ডেমো ডাটাবেজ আপডেট করতে পারেন।</p>
                
                {activeModel === 'student_stats' && (
                  <form onSubmit={saveStudentStatForm} className="space-y-4 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-bold text-gray-600 block">শিক্ষাবর্ষ *</label>
                        <input type="number" required value={editStat.year || ''} onChange={(e) => setEditStat({ ...editStat, year: Number(e.target.value) })} className="w-full px-3 py-2 border border-gray-300 rounded" />
                      </div>
                      <div>
                        <label className="font-bold text-gray-600 block">এসএসসি পাসের হার *</label>
                        <input type="text" required value={editStat.ssc_pass_rate || ''} onChange={(e) => setEditStat({ ...editStat, ssc_pass_rate: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" />
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      <div>
                        <label className="text-[10px] font-bold block text-gray-500">৬ষ্ঠ শ্রেণি</label>
                        <input type="number" value={editStat.class_6 || ''} onChange={(e) => setEditStat({ ...editStat, class_6: Number(e.target.value) })} className="w-full p-2 border border-gray-300 rounded" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold block text-gray-500">৭ম শ্রেণি</label>
                        <input type="number" value={editStat.class_7 || ''} onChange={(e) => setEditStat({ ...editStat, class_7: Number(e.target.value) })} className="w-full p-2 border border-gray-300 rounded" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold block text-gray-500">৮ম শ্রেণি</label>
                        <input type="number" value={editStat.class_8 || ''} onChange={(e) => setEditStat({ ...editStat, class_8: Number(e.target.value) })} className="w-full p-2 border border-gray-300 rounded" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold block text-gray-500">৯ম শ্রেণি</label>
                        <input type="number" value={editStat.class_9 || ''} onChange={(e) => setEditStat({ ...editStat, class_9: Number(e.target.value) })} className="w-full p-2 border border-gray-300 rounded" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold block text-gray-500">১০ম শ্রেণি</label>
                        <input type="number" value={editStat.class_10 || ''} onChange={(e) => setEditStat({ ...editStat, class_10: Number(e.target.value) })} className="w-full p-2 border border-gray-300 rounded" />
                      </div>
                    </div>
                    <button type="submit" className="px-5 py-2 bg-[#417690] text-white rounded font-bold shadow-sm">সংরক্ষণ করুন</button>
                  </form>
                )}

                {activeModel === 'routines' && (
                  <form onSubmit={saveRoutineForm} className="space-y-4 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-bold text-gray-600 block">শ্রেণির নাম *</label>
                        <input type="text" required value={editRoutine.class_name || ''} onChange={(e) => setEditRoutine({ ...editRoutine, class_name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" />
                      </div>
                      <div>
                        <label className="font-bold text-gray-600 block">শাখা/গ্রুপ *</label>
                        <input type="text" required value={editRoutine.section || ''} onChange={(e) => setEditRoutine({ ...editRoutine, section: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" />
                      </div>
                    </div>
                    <div>
                      <label className="font-bold text-gray-600 block">পিডিএফ ফাইল নাম (attachment_name)</label>
                      <input type="text" required value={editRoutine.attachment_name || ''} onChange={(e) => setEditRoutine({ ...editRoutine, attachment_name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" />
                    </div>
                    <button type="submit" className="px-5 py-2 bg-[#417690] text-white rounded font-bold shadow-sm">সংরক্ষণ করুন</button>
                  </form>
                )}

                {activeModel === 'syllabuses' && (
                  <form onSubmit={saveSyllabusForm} className="space-y-4 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-bold text-gray-600 block">শ্রেণি *</label>
                        <input type="text" required value={editSyllabus.class_name || ''} onChange={(e) => setEditSyllabus({ ...editSyllabus, class_name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" />
                      </div>
                      <div>
                        <label className="font-bold text-gray-600 block">বিষয় *</label>
                        <input type="text" required value={editSyllabus.subject || ''} onChange={(e) => setEditSyllabus({ ...editSyllabus, subject: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" />
                      </div>
                    </div>
                    <div>
                      <label className="font-bold text-gray-600 block">পরীক্ষার ধরন</label>
                      <select value={editSyllabus.exam_type || 'Annual'} onChange={(e) => setEditSyllabus({ ...editSyllabus, exam_type: e.target.value as any })} className="w-full px-3 py-2 border border-gray-300 rounded bg-white">
                        <option value="Annual">Annual (বার্ষিক)</option>
                        <option value="Half-yearly">Half-yearly (অর্ধবার্ষিক)</option>
                      </select>
                    </div>
                    <button type="submit" className="px-5 py-2 bg-[#417690] text-white rounded font-bold shadow-sm">সংরক্ষণ করুন</button>
                  </form>
                )}

                {activeModel === 'committee' && (
                  <form onSubmit={saveCommitteeForm} className="space-y-4 text-sm">
                    <div>
                      <label className="font-bold text-gray-600 block">নাম *</label>
                      <input type="text" required value={editCommittee.name || ''} onChange={(e) => setEditCommittee({ ...editCommittee, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-bold text-gray-600 block">পদবি *</label>
                        <input type="text" required value={editCommittee.designation || ''} onChange={(e) => setEditCommittee({ ...editCommittee, designation: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" />
                      </div>
                      <div>
                        <label className="font-bold text-gray-600 block">ক্যাটাগরি *</label>
                        <input type="text" required value={editCommittee.category || ''} onChange={(e) => setEditCommittee({ ...editCommittee, category: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" />
                      </div>
                    </div>
                    <button type="submit" className="px-5 py-2 bg-[#417690] text-white rounded font-bold shadow-sm">সংরক্ষণ করুন</button>
                  </form>
                )}

                {activeModel === 'downloads' && (
                  <form onSubmit={saveDownloadForm} className="space-y-4 text-sm">
                    <div>
                      <label className="font-bold text-gray-600 block">ফাইলের নাম/শিরোনাম *</label>
                      <input type="text" required value={editDownload.title || ''} onChange={(e) => setEditDownload({ ...editDownload, title: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-bold text-gray-600 block">ক্যাটাগরি</label>
                        <select value={editDownload.category || 'Other'} onChange={(e) => setEditDownload({ ...editDownload, category: e.target.value as any })} className="w-full px-3 py-2 border border-gray-300 rounded bg-white">
                          <option value="Admission">Admission (ভর্তি ফরম)</option>
                          <option value="Exam">Exam (পরীক্ষা)</option>
                          <option value="Complaint">Complaint (অভিযোগ)</option>
                          <option value="RTI">RTI (তথ্য অধিকার)</option>
                          <option value="Other">Other (অন্যান্য)</option>
                        </select>
                      </div>
                      <div>
                        <label className="font-bold text-gray-600 block">ফাইল সংযুক্তি (PDF/Doc)</label>
                        <input type="text" required value={editDownload.attachment_name || ''} onChange={(e) => setEditDownload({ ...editDownload, attachment_name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" />
                      </div>
                    </div>
                    <button type="submit" className="px-5 py-2 bg-[#417690] text-white rounded font-bold shadow-sm">সংরক্ষণ করুন</button>
                  </form>
                )}

                {activeModel === 'gallery' && (
                  <form onSubmit={saveGalleryForm} className="space-y-4 text-sm">
                    <div>
                      <label className="font-bold text-gray-600 block">ক্যাপশন (Caption) *</label>
                      <input type="text" required value={editGallery.caption || ''} onChange={(e) => setEditGallery({ ...editGallery, caption: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-bold text-gray-600 block">ক্যাটাগরি</label>
                        <select value={editGallery.category || 'events'} onChange={(e) => setEditGallery({ ...editGallery, category: e.target.value as any })} className="w-full px-3 py-2 border border-gray-300 rounded bg-white">
                          <option value="events">Events (উৎসব ও অনুষ্ঠান)</option>
                          <option value="academics">Academics (একাডেমিক)</option>
                          <option value="facilities">Facilities (অবকাঠামো)</option>
                          <option value="sports">Sports (খেলাধুলা)</option>
                        </select>
                      </div>
                      <div>
                        <label className="font-bold text-gray-600 block">ছবি লিংক (Unsplash URL) *</label>
                        <input type="text" required value={editGallery.image_url || ''} onChange={(e) => setEditGallery({ ...editGallery, image_url: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" />
                      </div>
                    </div>
                    <button type="submit" className="px-5 py-2 bg-[#417690] text-white rounded font-bold shadow-sm">সংরক্ষণ করুন</button>
                  </form>
                )}
              </div>
            )}
          </div>
        ) : activeModel !== null ? (
          /* MODEL LIST VIEW WITH SEARCH & FILTERS */
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-150 pb-3">
              <div className="flex items-center gap-2 text-gray-800">
                <span className="font-extrabold text-base uppercase bg-gray-100 text-[#417690] px-2.5 py-1 rounded">
                  MODEL: {activeModel}
                </span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    setEditingId(-1);
                    setEditNotice({}); setEditTeacher({}); setEditStat({}); setEditRoutine({}); setEditSyllabus({}); setEditCommittee({}); setEditDownload({}); setEditGallery({});
                  }}
                  className="bg-[#417690] hover:bg-[#305a6f] text-white text-xs font-bold py-2 px-3.5 rounded flex items-center gap-1 shadow-sm transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Record (যোগ করুন)
                </button>
                <button 
                  onClick={() => setActiveModel(null)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-bold py-2 px-3.5 rounded"
                >
                  ড্যাশবোর্ডে ফিরুন
                </button>
              </div>
            </div>

            {/* Bulk Action & Search Panel */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded border border-gray-200 shadow-sm text-sm">
              <div className="md:col-span-2 flex items-center gap-2">
                <span className="font-bold text-gray-500 text-xs shrink-0">Bulk Action:</span>
                <button
                  disabled={selectedIds.length === 0}
                  onClick={performBulkDelete}
                  className="bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 disabled:opacity-50 disabled:hover:bg-red-50 disabled:cursor-not-allowed font-bold py-1.5 px-3 rounded text-xs flex items-center gap-1 transition-colors"
                >
                  <Trash className="w-3.5 h-3.5" /> নির্বাচিতগুলো ডিলিট করুন ({selectedIds.length})
                </button>
              </div>

              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 border border-gray-300 rounded text-xs focus:outline-none"
                />
              </div>
            </div>

            {/* List Grids */}
            <div className="bg-white rounded border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700 border-b border-gray-200 uppercase text-[10px] tracking-wider font-bold">
                      <th className="p-3 text-center w-12">
                        <input 
                          type="checkbox" 
                          className="rounded h-3.5 w-3.5 text-[#417690]"
                          onChange={(e) => {
                            if (e.target.checked) {
                              if (activeModel === 'notices') setSelectedIds(noticesList.map(n=>n.id));
                              else if (activeModel === 'teachers') setSelectedIds(teachersList.map(t=>t.id));
                              else if (activeModel === 'student_stats') setSelectedIds(studentStatsList.map(s=>s.id));
                              else if (activeModel === 'routines') setSelectedIds(routinesList.map(r=>r.id));
                              else if (activeModel === 'syllabuses') setSelectedIds(syllabusesList.map(s=>s.id));
                              else if (activeModel === 'committee') setSelectedIds(committeeList.map(c=>c.id));
                              else if (activeModel === 'downloads') setSelectedIds(downloadsList.map(d=>d.id));
                              else if (activeModel === 'gallery') setSelectedIds(galleryList.map(g=>g.id));
                            } else {
                              setSelectedIds([]);
                            }
                          }}
                        />
                      </th>
                      <th className="p-3">ID</th>
                      <th className="p-3">প্রদর্শনী নাম (Display Label)</th>
                      <th className="p-3 text-center">সক্রিয়? (Active)</th>
                      <th className="p-3 text-center">সম্পাদনা (Edit)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {/* Render Notices list */}
                    {activeModel === 'notices' && noticesList.filter(n => n.title.toLowerCase().includes(searchQuery.toLowerCase())).map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/50">
                        <td className="p-3 text-center">
                          <input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => toggleSelectId(item.id)} className="rounded h-3.5 w-3.5 text-[#417690]" />
                        </td>
                        <td className="p-3 font-mono text-gray-400">{item.id}</td>
                        <td className="p-3 font-bold text-gray-800">{item.title} <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-mono ml-2 uppercase">{item.category}</span></td>
                        <td className="p-3 text-center font-bold text-green-700">{item.is_active ? 'Yes' : 'No'}</td>
                        <td className="p-3 text-center">
                          <button onClick={() => { setEditingId(item.id); setEditNotice(item); }} className="text-blue-800 hover:underline"><Edit2 className="w-4 h-4 mx-auto" /></button>
                        </td>
                      </tr>
                    ))}

                    {/* Render Teachers list */}
                    {activeModel === 'teachers' && teachersList.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase())).map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/50">
                        <td className="p-3 text-center">
                          <input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => toggleSelectId(item.id)} className="rounded h-3.5 w-3.5 text-[#417690]" />
                        </td>
                        <td className="p-3 font-mono text-gray-400">{item.id}</td>
                        <td className="p-3 font-bold text-gray-800">{item.name} <span className="text-xs text-blue-900 font-medium font-mono ml-1">({item.designation})</span></td>
                        <td className="p-3 text-center font-bold text-green-700">{item.is_active ? 'Yes' : 'No'}</td>
                        <td className="p-3 text-center">
                          <button onClick={() => { setEditingId(item.id); setEditTeacher(item); }} className="text-blue-800 hover:underline"><Edit2 className="w-4 h-4 mx-auto" /></button>
                        </td>
                      </tr>
                    ))}

                    {/* General models fallback list listings */}
                    {activeModel === 'student_stats' && studentStatsList.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/50">
                        <td className="p-3 text-center">
                          <input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => toggleSelectId(item.id)} className="rounded h-3.5 w-3.5 text-[#417690]" />
                        </td>
                        <td className="p-3 font-mono text-gray-400">{item.id}</td>
                        <td className="p-3 font-bold text-gray-800">Enrollment Year: {item.year} — SSC Pass: {item.ssc_pass_rate}</td>
                        <td className="p-3 text-center font-bold text-green-700">{item.is_active ? 'Yes' : 'No'}</td>
                        <td className="p-3 text-center">
                          <button onClick={() => { setEditingId(item.id); setEditStat(item); }} className="text-blue-800 hover:underline"><Edit2 className="w-4 h-4 mx-auto" /></button>
                        </td>
                      </tr>
                    ))}

                    {activeModel === 'routines' && routinesList.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/50">
                        <td className="p-3 text-center">
                          <input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => toggleSelectId(item.id)} className="rounded h-3.5 w-3.5 text-[#417690]" />
                        </td>
                        <td className="p-3 font-mono text-gray-400">{item.id}</td>
                        <td className="p-3 font-bold text-gray-800">{item.class_name} — Section/Group: {item.section} ({item.year})</td>
                        <td className="p-3 text-center font-bold text-green-700">{item.is_active ? 'Yes' : 'No'}</td>
                        <td className="p-3 text-center">
                          <button onClick={() => { setEditingId(item.id); setEditRoutine(item); }} className="text-blue-800 hover:underline"><Edit2 className="w-4 h-4 mx-auto" /></button>
                        </td>
                      </tr>
                    ))}

                    {activeModel === 'syllabuses' && syllabusesList.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/50">
                        <td className="p-3 text-center">
                          <input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => toggleSelectId(item.id)} className="rounded h-3.5 w-3.5 text-[#417690]" />
                        </td>
                        <td className="p-3 font-mono text-gray-400">{item.id}</td>
                        <td className="p-3 font-bold text-gray-800">{item.class_name} — Subject: {item.subject} ({item.exam_type})</td>
                        <td className="p-3 text-center font-bold text-green-700">{item.is_active ? 'Yes' : 'No'}</td>
                        <td className="p-3 text-center">
                          <button onClick={() => { setEditingId(item.id); setEditSyllabus(item); }} className="text-blue-800 hover:underline"><Edit2 className="w-4 h-4 mx-auto" /></button>
                        </td>
                      </tr>
                    ))}

                    {activeModel === 'committee' && committeeList.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/50">
                        <td className="p-3 text-center">
                          <input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => toggleSelectId(item.id)} className="rounded h-3.5 w-3.5 text-[#417690]" />
                        </td>
                        <td className="p-3 font-mono text-gray-400">{item.id}</td>
                        <td className="p-3 font-bold text-gray-800">{item.name} ({item.designation})</td>
                        <td className="p-3 text-center font-bold text-green-700">{item.is_active ? 'Yes' : 'No'}</td>
                        <td className="p-3 text-center">
                          <button onClick={() => { setEditingId(item.id); setEditCommittee(item); }} className="text-blue-800 hover:underline"><Edit2 className="w-4 h-4 mx-auto" /></button>
                        </td>
                      </tr>
                    ))}

                    {activeModel === 'downloads' && downloadsList.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/50">
                        <td className="p-3 text-center">
                          <input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => toggleSelectId(item.id)} className="rounded h-3.5 w-3.5 text-[#417690]" />
                        </td>
                        <td className="p-3 font-mono text-gray-400">{item.id}</td>
                        <td className="p-3 font-bold text-gray-800">{item.title} <span className="text-[10px] bg-gray-100 border text-gray-600 px-1 py-0.2 rounded font-mono uppercase shrink-0 ml-1">{item.category}</span></td>
                        <td className="p-3 text-center font-bold text-green-700">{item.is_active ? 'Yes' : 'No'}</td>
                        <td className="p-3 text-center">
                          <button onClick={() => { setEditingId(item.id); setEditDownload(item); }} className="text-blue-800 hover:underline"><Edit2 className="w-4 h-4 mx-auto" /></button>
                        </td>
                      </tr>
                    ))}

                    {activeModel === 'gallery' && galleryList.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/50">
                        <td className="p-3 text-center">
                          <input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => toggleSelectId(item.id)} className="rounded h-3.5 w-3.5 text-[#417690]" />
                        </td>
                        <td className="p-3 font-mono text-gray-400">{item.id}</td>
                        <td className="p-3 font-bold text-gray-800">{item.caption} <span className="text-[10px] bg-blue-50 border text-blue-800 px-1 py-0.2 rounded ml-1">{item.category}</span></td>
                        <td className="p-3 text-center font-bold text-green-700">{item.is_active ? 'Yes' : 'No'}</td>
                        <td className="p-3 text-center">
                          <button onClick={() => { setEditingId(item.id); setEditGallery(item); }} className="text-blue-800 hover:underline"><Edit2 className="w-4 h-4 mx-auto" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          /* CORE GROUPED TABLES DASHBOARD (DJANGO INDEX_TITLE) */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 text-sm">
            {/* Left Col: Core Model Groups (3/4 width) */}
            <div className="lg:col-span-3 space-y-6">
              {/* App Section 1: Core Portal Config */}
              <div className="bg-white rounded border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-[#417690] px-4 py-2 text-white font-bold tracking-wide uppercase text-xs flex items-center gap-1.5">
                  <Settings className="w-4 h-4" /> CORE SETTINGS (মূল পোর্টাল কনফিগারেশন)
                </div>
                <div className="p-4 divide-y divide-gray-150">
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="font-bold text-gray-800 hover:text-blue-800 cursor-pointer">Institution Profile (প্রতিষ্ঠান পরিচিতি)</span>
                    <button onClick={() => { setActiveModel('institution'); setEditingId(1); }} className="bg-blue-50 hover:bg-blue-100 text-blue-800 px-3 py-1 rounded text-xs font-bold border border-blue-200">Change</button>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="font-bold text-gray-800 hover:text-blue-800 cursor-pointer">Feature Settings (মডিউল অন/অফ)</span>
                    <button onClick={() => { setActiveModel('features_toggles'); }} className="bg-blue-50 hover:bg-blue-100 text-blue-800 px-3 py-1 rounded text-xs font-bold border border-blue-200">Change</button>
                  </div>
                </div>
              </div>

              {/* App Section 2: Staff directory */}
              <div className="bg-white rounded border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-[#417690] px-4 py-2 text-white font-bold tracking-wide uppercase text-xs flex items-center gap-1.5">
                  <Users className="w-4 h-4" /> STAFF (শিক্ষক ও পরিচালনা পর্ষদ)
                </div>
                <div className="p-4 divide-y divide-gray-150">
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="font-bold text-gray-800 hover:text-blue-800 cursor-pointer">Teachers & Staff (শিক্ষক ও কর্মচারী)</span>
                    <div className="flex gap-2">
                      <button onClick={() => { setActiveModel('teachers'); setEditingId(-1); setEditTeacher({}); }} className="bg-green-50 hover:bg-green-100 text-green-800 px-2.5 py-1 rounded text-xs font-bold border border-green-150">Add</button>
                      <button onClick={() => setActiveModel('teachers')} className="bg-blue-50 hover:bg-blue-100 text-blue-800 px-2.5 py-1 rounded text-xs font-bold border border-blue-200">Change</button>
                    </div>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="font-bold text-gray-800 hover:text-blue-800 cursor-pointer">Managing Committee Members (পরিচালনা পর্ষদ)</span>
                    <div className="flex gap-2">
                      <button onClick={() => { setActiveModel('committee'); setEditingId(-1); setEditCommittee({}); }} className="bg-green-50 hover:bg-green-100 text-green-800 px-2.5 py-1 rounded text-xs font-bold border border-green-150">Add</button>
                      <button onClick={() => setActiveModel('committee')} className="bg-blue-50 hover:bg-blue-100 text-blue-800 px-2.5 py-1 rounded text-xs font-bold border border-blue-200">Change</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* App Section 3: Academic files */}
              <div className="bg-white rounded border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-[#417690] px-4 py-2 text-white font-bold tracking-wide uppercase text-xs flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" /> ACADEMICS (শ্রেণি ও সিলেবাস)
                </div>
                <div className="p-4 divide-y divide-gray-150">
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="font-bold text-gray-800 hover:text-blue-800 cursor-pointer">Class Routines (শ্রেণি রুটিন)</span>
                    <div className="flex gap-2">
                      <button onClick={() => { setActiveModel('routines'); setEditingId(-1); setEditRoutine({}); }} className="bg-green-50 hover:bg-green-100 text-green-800 px-2.5 py-1 rounded text-xs font-bold border border-green-150">Add</button>
                      <button onClick={() => setActiveModel('routines')} className="bg-blue-50 hover:bg-blue-100 text-blue-800 px-2.5 py-1 rounded text-xs font-bold border border-blue-200">Change</button>
                    </div>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="font-bold text-gray-800 hover:text-blue-800 cursor-pointer">Class Syllabuses (সিলেবাস)</span>
                    <div className="flex gap-2">
                      <button onClick={() => { setActiveModel('syllabuses'); setEditingId(-1); setEditSyllabus({}); }} className="bg-green-50 hover:bg-green-100 text-green-800 px-2.5 py-1 rounded text-xs font-bold border border-green-150">Add</button>
                      <button onClick={() => setActiveModel('syllabuses')} className="bg-blue-50 hover:bg-blue-100 text-blue-800 px-2.5 py-1 rounded text-xs font-bold border border-blue-200">Change</button>
                    </div>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="font-bold text-gray-800 hover:text-blue-800 cursor-pointer">Student Statistics (শিক্ষার্থী পরিসংখ্যান)</span>
                    <div className="flex gap-2">
                      <button onClick={() => { setActiveModel('student_stats'); setEditingId(-1); setEditStat({}); }} className="bg-green-50 hover:bg-green-100 text-green-800 px-2.5 py-1 rounded text-xs font-bold border border-green-150">Add</button>
                      <button onClick={() => setActiveModel('student_stats')} className="bg-blue-50 hover:bg-blue-100 text-blue-800 px-2.5 py-1 rounded text-xs font-bold border border-blue-200">Change</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* App Section 4: Public communications */}
              <div className="bg-white rounded border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-[#417690] px-4 py-2 text-white font-bold tracking-wide uppercase text-xs flex items-center gap-1.5">
                  <FileText className="w-4 h-4" /> COMMUNICATIONS (বিজ্ঞপ্তি ও ডাউনলোড)
                </div>
                <div className="p-4 divide-y divide-gray-150">
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="font-bold text-gray-800 hover:text-blue-800 cursor-pointer">Notice Board (নোটিশ বোর্ড)</span>
                    <div className="flex gap-2">
                      <button onClick={() => { setActiveModel('notices'); setEditingId(-1); setEditNotice({}); }} className="bg-green-50 hover:bg-green-100 text-green-800 px-2.5 py-1 rounded text-xs font-bold border border-green-150">Add</button>
                      <button onClick={() => setActiveModel('notices')} className="bg-blue-50 hover:bg-blue-100 text-blue-800 px-2.5 py-1 rounded text-xs font-bold border border-blue-200">Change</button>
                    </div>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="font-bold text-gray-800 hover:text-blue-800 cursor-pointer">Downloads (ডাউনলোড কর্নার)</span>
                    <div className="flex gap-2">
                      <button onClick={() => { setActiveModel('downloads'); setEditingId(-1); setEditDownload({}); }} className="bg-green-50 hover:bg-green-100 text-green-800 px-2.5 py-1 rounded text-xs font-bold border border-green-150">Add</button>
                      <button onClick={() => setActiveModel('downloads')} className="bg-blue-50 hover:bg-blue-100 text-blue-800 px-2.5 py-1 rounded text-xs font-bold border border-blue-200">Change</button>
                    </div>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="font-bold text-gray-800 hover:text-blue-800 cursor-pointer">Photo Gallery (গ্যালারি ইমেজ)</span>
                    <div className="flex gap-2">
                      <button onClick={() => { setActiveModel('gallery'); setEditingId(-1); setEditGallery({}); }} className="bg-green-50 hover:bg-green-100 text-green-800 px-2.5 py-1 rounded text-xs font-bold border border-green-150">Add</button>
                      <button onClick={() => setActiveModel('gallery')} className="bg-blue-50 hover:bg-blue-100 text-blue-800 px-2.5 py-1 rounded text-xs font-bold border border-blue-200">Change</button>
                    </div>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="font-bold text-gray-800 hover:text-blue-800 cursor-pointer">Complaint Officer (অভিযোগ কর্মকর্তা)</span>
                    <button onClick={() => { setActiveModel('complaint_officer'); setEditingId(1); }} className="bg-blue-50 hover:bg-blue-100 text-blue-800 px-3 py-1 rounded text-xs font-bold border border-blue-200">Change</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Custom Form Viewers / Feature Settings List inside Dashboard */}
            <div className="space-y-6">
              {/* Reset seed instructions card */}
              <div className="bg-amber-50 border border-amber-200 rounded p-4 text-xs space-y-2">
                <h4 className="font-bold text-amber-800">💡 সুপারএডমিন টিপস:</h4>
                <p className="text-gray-600 leading-relaxed">
                  এই ড্যাশবোর্ডটি সরাসরি Django Admin Panel এর নকশায় তৈরি করা হয়েছে। বামপাশের যেকোনো মডিউলে এড বা এডিট করলে ডাটাবেজে আপডেট হবে এবং সাথে সাথেই পাবলিক সাইটে লাইভ দেখা যাবে!
                </p>
                <button
                  onClick={handleResetData}
                  className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-1.5 px-3 rounded text-[10px] text-center"
                >
                  ডাটাবেজ ডিফল্ট করুন (Reset)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SPECIAL SUB-SCREEN FOR INSTITUTION PROFILE EDIT */}
        {activeModel === 'institution' && editingId === 1 && (
          <div className="bg-white border border-gray-200 rounded shadow-sm p-6 max-w-3xl mx-auto space-y-6">
            <div className="flex justify-between border-b border-gray-150 pb-3">
              <h2 className="text-lg font-bold text-gray-800">Institution Profile (প্রতিষ্ঠান পরিচিতি সম্পাদনা)</h2>
              <button onClick={() => setActiveModel(null)} className="text-xs font-bold text-gray-500 hover:text-gray-800">ড্যাশবোর্ডে ফিরুন</button>
            </div>
            <form onSubmit={saveInstitutionForm} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-gray-600 block">নাম (বাংলা) *</label>
                  <input type="text" required value={instForm.name_bn || ''} onChange={(e) => setInstForm({ ...instForm, name_bn: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" />
                </div>
                <div>
                  <label className="font-bold text-gray-600 block">Name (English) *</label>
                  <input type="text" required value={instForm.name_en || ''} onChange={(e) => setInstForm({ ...instForm, name_en: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-bold text-gray-600 block">EIIN *</label>
                  <input type="text" required value={instForm.eiin || ''} onChange={(e) => setInstForm({ ...instForm, eiin: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" />
                </div>
                <div>
                  <label className="font-bold text-gray-600 block">MPO No *</label>
                  <input type="text" required value={instForm.mpo_number || ''} onChange={(e) => setInstForm({ ...instForm, mpo_number: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" />
                </div>
                <div>
                  <label className="font-bold text-gray-600 block">প্রতিষ্ঠাকাল *</label>
                  <input type="number" required value={instForm.established_year || ''} onChange={(e) => setInstForm({ ...instForm, established_year: Number(e.target.value) })} className="w-full px-3 py-2 border border-gray-300 rounded" />
                </div>
              </div>
              <div>
                <label className="font-bold text-gray-600 block">ট্যাগলাইন (Slogan)</label>
                <input type="text" value={instForm.tagline || ''} onChange={(e) => setInstForm({ ...instForm, tagline: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="font-bold text-gray-600 block">ঠিকানা (Address) *</label>
                <input type="text" required value={instForm.address || ''} onChange={(e) => setInstForm({ ...instForm, address: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-bold text-gray-600 block">টেলিফোন</label>
                  <input type="text" value={instForm.phone || ''} onChange={(e) => setInstForm({ ...instForm, phone: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" />
                </div>
                <div>
                  <label className="font-bold text-gray-600 block">মোবাইল *</label>
                  <input type="text" required value={instForm.mobile || ''} onChange={(e) => setInstForm({ ...instForm, mobile: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" />
                </div>
                <div>
                  <label className="font-bold text-gray-600 block">ইমেইল *</label>
                  <input type="email" required value={instForm.email || ''} onChange={(e) => setInstForm({ ...instForm, email: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" />
                </div>
              </div>
              <div className="border-t border-gray-150 pt-4">
                <h3 className="font-bold text-gray-700 mb-2">প্রধান শিক্ষকের বার্তা ও পরিচিতি</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-gray-600 block">প্রধান শিক্ষকের নাম</label>
                    <input type="text" value={instForm.principal_name || ''} onChange={(e) => setInstForm({ ...instForm, principal_name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" />
                  </div>
                  <div>
                    <label className="font-bold text-gray-600 block">প্রধান শিক্ষকের পদবি</label>
                    <input type="text" value={instForm.principal_designation || ''} onChange={(e) => setInstForm({ ...instForm, principal_designation: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" />
                  </div>
                </div>
                <div className="mt-3">
                  <label className="font-bold text-gray-600 block">প্রধান শিক্ষকের বাণী</label>
                  <textarea rows={4} value={instForm.principal_message || ''} onChange={(e) => setInstForm({ ...instForm, principal_message: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" />
                </div>
              </div>
              <button type="submit" className="w-full bg-[#417690] text-white py-2 font-bold rounded shadow-sm hover:bg-[#305a6f] transition-colors">প্রোফাইল আপডেট করুন</button>
            </form>
          </div>
        )}

        {/* SPECIAL SUB-SCREEN FOR COMPLAINT OFFICER EDIT */}
        {activeModel === 'complaint_officer' && editingId === 1 && (
          <div className="bg-white border border-gray-200 rounded shadow-sm p-6 max-w-3xl mx-auto space-y-6">
            <div className="flex justify-between border-b border-gray-150 pb-3">
              <h2 className="text-lg font-bold text-gray-800">Complaint Officer (অভিযোগ কর্মকর্তা তথ্য সম্পাদনা)</h2>
              <button onClick={() => setActiveModel(null)} className="text-xs font-bold text-gray-500 hover:text-gray-800">ড্যাশবোর্ডে ফিরুন</button>
            </div>
            <form onSubmit={saveComplaintOfficerForm} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-gray-600 block">কর্মকর্তার নাম *</label>
                  <input type="text" required value={officerForm.name || ''} onChange={(e) => setOfficerForm({ ...officerForm, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" />
                </div>
                <div>
                  <label className="font-bold text-gray-600 block">পদবি *</label>
                  <input type="text" required value={officerForm.designation || ''} onChange={(e) => setOfficerForm({ ...officerForm, designation: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-gray-600 block">মোবাইল নম্বর *</label>
                  <input type="text" required value={officerForm.phone || ''} onChange={(e) => setOfficerForm({ ...officerForm, phone: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" />
                </div>
                <div>
                  <label className="font-bold text-gray-600 block">ইমেইল ঠিকানা *</label>
                  <input type="email" required value={officerForm.email || ''} onChange={(e) => setOfficerForm({ ...officerForm, email: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" />
                </div>
              </div>
              <div>
                <label className="font-bold text-gray-600 block">সাক্ষাতের সময়সূচি *</label>
                <input type="text" required value={officerForm.office_hours || ''} onChange={(e) => setOfficerForm({ ...officerForm, office_hours: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" />
              </div>
              <div className="border-t border-gray-150 pt-4">
                <h3 className="font-bold text-gray-700 mb-2">আপিল কর্মকর্তা পরিচিতি</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-gray-600 block">আপিল কর্মকর্তার নাম</label>
                    <input type="text" value={officerForm.appeal_officer_name || ''} onChange={(e) => setOfficerForm({ ...officerForm, appeal_officer_name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" />
                  </div>
                  <div>
                    <label className="font-bold text-gray-600 block">আপিল কর্মকর্তার পদবি</label>
                    <input type="text" value={officerForm.appeal_officer_designation || ''} onChange={(e) => setOfficerForm({ ...officerForm, appeal_officer_designation: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" />
                  </div>
                </div>
              </div>
              <button type="submit" className="w-full bg-[#417690] text-white py-2 font-bold rounded shadow-sm hover:bg-[#305a6f]">তথ্য আপডেট করুন</button>
            </form>
          </div>
        )}

        {/* SPECIAL SUB-SCREEN FOR FEATURE TOGGLES LIST */}
        {activeModel === 'features_toggles' && (
          <div className="bg-white border border-gray-200 rounded shadow-sm p-6 max-w-2xl mx-auto space-y-6">
            <div className="flex justify-between border-b border-gray-150 pb-3">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-1.5"><Settings className="w-5 h-5 text-blue-800" /> Feature Settings (মডিউল অন / অফ প্যানেল)</h2>
              <button onClick={() => setActiveModel(null)} className="text-xs font-bold text-gray-500 hover:text-gray-800">ড্যাশবোর্ডে ফিরুন</button>
            </div>
            <div className="space-y-1 bg-blue-50 p-3.5 rounded border border-blue-100 text-xs text-blue-900 leading-relaxed">
              <p className="font-bold mb-1">📢 আর্কিটেকচার রুলস:</p>
              যেকোনো মডিউল এখান থেকে অফ করে দিলে, পাবলিক সাইটে তার সংশ্লিষ্ট মেনু হাইড হয়ে যাবে এবং কেউ সরাসরি লিংকে ভিজিট করার চেষ্টা করলে তার জন্য পেজটি ব্লক হয়ে সুন্দর বার্তা দেখতে পাবে।
            </div>
            <div className="divide-y divide-gray-150 border border-gray-200 rounded overflow-hidden">
              {featuresList.map((f) => (
                <div key={f.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">{f.feature_name}</h4>
                    <p className="text-xs text-gray-400 font-mono mt-0.5">key: {f.feature_key}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={f.is_enabled} 
                      onChange={(e) => handleFeatureToggle(f.feature_key, e.target.checked)}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Django footer info strip */}
      <div className="bg-[#417690] px-6 py-2.5 text-white/80 text-[10px] tracking-wider uppercase font-semibold text-center border-t border-[#305a6f]">
        EduPortalBD Platform administration | Django administration v5.1 simulation
      </div>
    </div>
  );
}
