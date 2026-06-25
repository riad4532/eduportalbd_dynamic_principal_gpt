/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Institution {
  id: number;
  name_bn: string;
  name_en: string;
  short_name: string;
  eiin: string;
  institute_code: string;
  type: string;
  recognition: string;
  mpo_status: string;
  mpo_number: string;
  established_year: number;
  tagline: string;
  address: string;
  phone: string;
  mobile: string;
  email: string;
  website: string;
  postal_code: string;
  history: string;
  mission: string;
  vision: string;
  principal_name: string;
  principal_designation: string;
  principal_message: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FeatureSetting {
  id: number;
  feature_key: string;
  feature_name: string;
  is_enabled: boolean;
  institution_id: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Notice {
  id: number;
  title: string;
  category: 'Academic' | 'General' | 'Exam' | 'Admission' | 'Other';
  body: string;
  published_date: string;
  attachment_name: string;
  attachment_size: string;
  is_active: boolean;
  institution_id: number;
  created_at: string;
  updated_at: string;
}

export interface Teacher {
  id: number;
  name: string;
  designation: string;
  subject: string;
  qualification: string;
  join_date: string;
  is_mpo: boolean;
  photo_url: string;
  staff_type: 'teaching' | 'non-teaching';
  sort_order: number;
  is_active: boolean;
  institution_id: number;
  created_at: string;
  updated_at: string;
}

export interface StudentStat {
  id: number;
  year: number;
  class_6: number;
  class_7: number;
  class_8: number;
  class_9: number;
  class_10: number;
  total: number;
  ssc_pass_rate: string;
  is_active: boolean;
  institution_id: number;
  created_at: string;
  updated_at: string;
}

export interface Routine {
  id: number;
  class_name: string;
  section: string;
  year: number;
  effective_date: string;
  attachment_name: string;
  attachment_size: string;
  is_active: boolean;
  institution_id: number;
  created_at: string;
  updated_at: string;
}

export interface Syllabus {
  id: number;
  class_name: string;
  subject: string;
  exam_type: 'Half-yearly' | 'Annual' | 'Other';
  year: number;
  attachment_name: string;
  attachment_size: string;
  is_active: boolean;
  institution_id: number;
  created_at: string;
  updated_at: string;
}

export interface CommitteeMember {
  id: number;
  name: string;
  designation: string;
  category: string;
  term: string;
  photo_url: string;
  is_active: boolean;
  institution_id: number;
  created_at: string;
  updated_at: string;
}

export interface Download {
  id: number;
  title: string;
  category: 'Admission' | 'Exam' | 'Complaint' | 'RTI' | 'Other';
  attachment_name: string;
  attachment_size: string;
  published_date: string;
  is_active: boolean;
  institution_id: number;
  created_at: string;
  updated_at: string;
}

export interface GalleryImage {
  id: number;
  caption: string;
  category: 'events' | 'academics' | 'facilities' | 'sports';
  image_url: string;
  is_active: boolean;
  institution_id: number;
  created_at: string;
  updated_at: string;
}

export interface ComplaintOfficer {
  id: number;
  name: string;
  designation: string;
  phone: string;
  email: string;
  office_hours: string;
  appeal_officer_name: string;
  appeal_officer_designation: string;
  is_active: boolean;
  institution_id: number;
  created_at: string;
  updated_at: string;
}

// Pre-seeded Institution Profile
const defaultInstitution: Institution = {
  id: 1,
  name_bn: "গাজীপুর আদর্শ উচ্চ বিদ্যালয়",
  name_en: "Gazipur Adarsha High School",
  short_name: "GAHS",
  eiin: "108541",
  institute_code: "6102",
  type: "School (SSC Level)",
  recognition: "DSHE Recognized (মাধ্যমিক ও উচ্চশিক্ষা অধিদপ্তর)",
  mpo_status: "MPO Enlisted (এমপিওভুক্ত)",
  mpo_number: "9102345",
  established_year: 1975,
  tagline: "জ্ঞান, নৈতিকতা ও উৎকর্ষের পথে",
  address: "বোর্ডবাজার, গাজীপুর সদর, গাজীপুর-১৭০০",
  phone: "০২-৯২৬১xxx",
  mobile: "০১৭১১-xxxxxx",
  email: "gahs1975@gmail.com",
  website: "www.gahs.edu.bd",
  postal_code: "১৭০০",
  history: "গাজীপুর আদর্শ উচ্চ বিদ্যালয় ১৯৭৫ সালে স্থানীয় শিক্ষানুরাগী ব্যক্তিবর্গের উদ্যোগে প্রতিষ্ঠিত হয়। প্রতিষ্ঠার পর থেকে বিদ্যালয়টি ধারাবাহিকভাবে ভালো ফলাফল অর্জন করে আসছে। ১৯৮২ সালে বিদ্যালয়টি এমপিওভুক্ত হয় এবং ১৯৯০ সালে ঢাকা শিক্ষা বোর্ড কর্তৃক স্বীকৃতিপ্রাপ্ত হয়। শিক্ষার্থীদের সুপ্ত প্রতিভা বিকাশ ও দেশপ্রেমিক নাগরিক হিসেবে গড়ে তুলতে আমাদের প্রচেষ্টা অব্যাহত রয়েছে।",
  mission: "মানবিক মূল্যবোধ সম্পন্ন, আধুনিক জ্ঞানে সমৃদ্ধ এবং দেশপ্রেমিক নাগরিক তৈরি করা। বিদ্যালয়ের প্রতিটি শিক্ষার্থীকে সুশিক্ষিত ও যুগোপযোগী প্রযুক্তিতে দক্ষ করে গড়ে তোলা আমাদের মূল ব্রত।",
  vision: "বাংলাদেশের অন্যতম সেরা মাধ্যমিক বিদ্যালয় হিসেবে নিজেদের প্রতিষ্ঠিত করা এবং শিক্ষার্থীদের আন্তর্জাতিক মানের শিক্ষায় দীক্ষিত করা।",
  principal_name: "মোঃ আবদুল করিম",
  principal_designation: "প্রধান শিক্ষক",
  principal_message: "আমাদের বিদ্যালয়ে স্বাগতম। আমরা বিশ্বাস করি প্রতিটি শিক্ষার্থী অনন্য এবং তাদের সম্ভাবনা বিকাশে আমরা প্রতিশ্রুতিবদ্ধ। মানসম্পন্ন শিক্ষা, নৈতিক মূল্যবোধ এবং আধুনিক জ্ঞান-বিজ্ঞানের সমন্বয়ে আমরা আগামীর বাংলাদেশ গড়তে চাই। আমাদের দক্ষ শিক্ষক ও অভিভাবক মণ্ডলীর যৌথ প্রচেষ্টায় শিক্ষার্থীরা কেবল মেধার স্বাক্ষর রাখছে না, সাথে সাথে চমৎকার নৈতিক চরিত্রের অধিকারীও হচ্ছে। শুভকামনা সকল শুভানুধ্যায়ী ও শিক্ষার্থীবৃন্দের জন্য।",
  is_active: true,
  created_at: "2020-01-01T00:00:00Z",
  updated_at: "2026-06-24T00:00:00Z",
};

// Pre-seeded Features Settings
const defaultFeatureSettings: FeatureSetting[] = [
  { id: 1, feature_key: 'notices', feature_name: 'Notice Board (নোটিশ বোর্ড)', is_enabled: true, institution_id: 1, is_active: true, created_at: "", updated_at: "" },
  { id: 2, feature_key: 'teachers', feature_name: 'Teacher Directory (শিক্ষক তালিকা)', is_enabled: true, institution_id: 1, is_active: true, created_at: "", updated_at: "" },
  { id: 3, feature_key: 'routine', feature_name: 'Class Routine (শ্রেণি রুটিন)', is_enabled: true, institution_id: 1, is_active: true, created_at: "", updated_at: "" },
  { id: 4, feature_key: 'syllabus', feature_name: 'Syllabus (সিলেবাস)', is_enabled: true, institution_id: 1, is_active: true, created_at: "", updated_at: "" },
  { id: 5, feature_key: 'student_stats', feature_name: 'Student Statistics (শিক্ষার্থী পরিসংখ্যান)', is_enabled: true, institution_id: 1, is_active: true, created_at: "", updated_at: "" },
  { id: 6, feature_key: 'gallery', feature_name: 'Photo Gallery (ফটো গ্যালারি)', is_enabled: true, institution_id: 1, is_active: true, created_at: "", updated_at: "" },
  { id: 7, feature_key: 'downloads', feature_name: 'Downloads (ডাউনলোড)', is_enabled: true, institution_id: 1, is_active: true, created_at: "", updated_at: "" },
  { id: 8, feature_key: 'committee', feature_name: 'Committee (ম্যানেজিং কমিটি)', is_enabled: true, institution_id: 1, is_active: true, created_at: "", updated_at: "" },
  { id: 9, feature_key: 'complaint', feature_name: 'Complaint / Grievance (অভিযোগ কর্মকর্তা)', is_enabled: true, institution_id: 1, is_active: true, created_at: "", updated_at: "" },
  { id: 10, feature_key: 'principal_message', feature_name: 'Principal Message (প্রধান শিক্ষকের বাণী)', is_enabled: true, institution_id: 1, is_active: true, created_at: "", updated_at: "" },
  { id: 11, feature_key: 'achievement', feature_name: 'Achievement / Recognition (সাফল্য ও স্বীকৃতি)', is_enabled: true, institution_id: 1, is_active: true, created_at: "", updated_at: "" },
];

// Pre-seeded Notices
const defaultNotices: Notice[] = [
  {
    id: 1,
    title: "২০২৫ সালের এসএসসি পরীক্ষার প্রস্তুতি ও বিশেষ ক্লাসের সময়সূচি বিজ্ঞপ্তি",
    category: "Exam",
    body: "২০২৫ সালের এসএসসি পরীক্ষার্থীদের অবগতির জন্য জানানো যাচ্ছে যে, আগামী ১৫ জুলাই ২০২৫ থেকে গণিত ও বিজ্ঞান বিষয়ের ওপর বিশেষ ক্লাস শুরু হবে। সকল নিয়মিত ও অনিয়মিত পরীক্ষার্থীদের ক্লাসে উপস্থিত থাকা বাধ্যতামূলক। বিস্তারিত সময়সূচি নিচের সংযুক্ত পিডিএফ ফাইলে দেওয়া হলো। অভিভাবকবৃন্দের সহযোগিতা একান্তভাবে কাম্য।",
    published_date: "2025-06-20",
    attachment_name: "ssc_prep_notice_2025.pdf",
    attachment_size: "356 KB",
    is_active: true,
    institution_id: 1,
    created_at: "2025-06-20T10:00:00Z",
    updated_at: "2025-06-20T10:00:00Z",
  },
  {
    id: 2,
    title: "বার্ষিক ক্রীড়া ও সাংস্কৃতিক প্রতিযোগিতা ২০২৫ আয়োজন সংক্রান্ত বিজ্ঞপ্তি",
    category: "General",
    body: "আমাদের বিদ্যালয়ের বার্ষিক ক্রীড়া ও সাংস্কৃতিক প্রতিযোগিতা আগামী ৩০ ও ৩১ জুলাই ২০২৫ তারিখে বিদ্যালয় মাঠে অনুষ্ঠিত হবে। প্রতিযোগিতায় অংশগ্রহণে ইচ্ছুক শিক্ষার্থীদেরকে আগামী ২৫ জুলাইয়ের মধ্যে স্ব-স্ব শ্রেণি শিক্ষকের কাছে নাম জমা দেওয়ার জন্য অনুরোধ করা যাচ্ছে। ক্রীড়া ইভেন্টসমূহের তালিকা নোটিশ বোর্ডে টাঙিয়ে দেওয়া হয়েছে।",
    published_date: "2025-06-18",
    attachment_name: "sports_competition_notice_2025.pdf",
    attachment_size: "412 KB",
    is_active: true,
    institution_id: 1,
    created_at: "2025-06-18T11:00:00Z",
    updated_at: "2025-06-18T11:00:00Z",
  },
  {
    id: 3,
    title: "বার্ষিক পরীক্ষার প্রথম ও দ্বিতীয় সাময়িক ফি পরিশোধের নির্দেশনা",
    category: "Academic",
    body: "বিদ্যালয়ের সকল শিক্ষার্থীদের জানানো যাচ্ছে যে, অর্ধবার্ষিক ও প্রথম সাময়িক পরীক্ষা বাবদ বকেয়া মাসিক বেতন ও অন্যান্য ফি আগামী ৫ জুলাই ২০২৫ তারিখের মধ্যে বিদ্যালয়ের অফিস কাউন্টারে অথবা অনলাইনে পরিশোধ করতে হবে। ফি পরিশোধ সাপেক্ষে পরীক্ষার প্রবেশপত্র আগামী ১০ জুলাই হতে দেওয়া হবে।",
    published_date: "2025-06-15",
    attachment_name: "fee_payment_instruction_2025.pdf",
    attachment_size: "180 KB",
    is_active: true,
    institution_id: 1,
    created_at: "2025-06-15T09:00:00Z",
    updated_at: "2025-06-15T09:00:00Z",
  },
  {
    id: 4,
    title: "জাতীয় শোক দিবস ও আলোচনা সভা ২০২৫ পালন কর্মসূচি",
    category: "Other",
    body: "আগামী ১৫ আগস্ট ২০২৫ জাতীয় শোক দিবস ও জাতির পিতা বঙ্গবন্ধু শেখ মুজিবুর রহমান-এর শাহাদাত বার্ষিকী উপলক্ষে বিদ্যালয়ে আলোচনা সভা, চিত্রাঙ্কন প্রতিযোগিতা ও দোয়া মাহফিলের আয়োজন করা হয়েছে। সকাল ৮:৩০ মিনিটে জাতীয় পতাকা অর্ধনমিতকরণের মাধ্যমে কর্মসূচি শুরু হবে। সকল শিক্ষার্থীকে বিদ্যালয় ইউনিফর্মে যথাসময়ে উপস্থিত থাকার নির্দেশ দেওয়া হলো।",
    published_date: "2025-06-10",
    attachment_name: "shok_dibosh_program_2025.pdf",
    attachment_size: "245 KB",
    is_active: true,
    institution_id: 1,
    created_at: "2025-06-10T12:00:00Z",
    updated_at: "2025-06-10T12:00:00Z",
  },
  {
    id: 5,
    title: "অর্ধ-বার্ষিক পরীক্ষা ২০২৫ এর রুটিন ও আসন বিন্যাস প্রকাশ",
    category: "Exam",
    body: "বিদ্যালয়ের ষষ্ঠ থেকে দশম শ্রেণির শিক্ষার্থীদের অর্ধবার্ষিক পরীক্ষা ২০২৫ আগামী ৩ জুলাই থেকে শুরু হবে। পরীক্ষার রুটিন এবং শিক্ষার্থীদের রোল নম্বর ভিত্তিক আসন বিন্যাস প্রকাশ করা হয়েছে। সকল শিক্ষার্থীকে নির্ধারিত সময়ের ৩০ মিনিট পূর্বে পরীক্ষা কক্ষে প্রবেশ করতে হবে। কোন প্রকার ইলেকট্রনিক ডিভাইস বা অতিরিক্ত কাগজ পরীক্ষার হলে আনা যাবে না।",
    published_date: "2025-06-05",
    attachment_name: "half_yearly_routine_2025.pdf",
    attachment_size: "520 KB",
    is_active: true,
    institution_id: 1,
    created_at: "2025-06-05T08:30:00Z",
    updated_at: "2025-06-05T08:30:00Z",
  },
  {
    id: 6,
    title: "আন্তঃবিদ্যালয় বিতর্ক প্রতিযোগিতায় আমাদের বিদ্যালয়ের দল গঠন বিজ্ঞপ্তি",
    category: "General",
    body: "গাজীপুর জেলা পর্যায়ে আয়োজিত আন্তঃবিদ্যালয় বিতর্ক প্রতিযোগিতায় অংশগ্রহণের জন্য বিদ্যালয় বিতর্ক দল গঠন করা হবে। আগ্রহী শিক্ষার্থীদের মধ্য থেকে আগামী ২২ জুন দুপুর ২:০০ টায় মিলনায়তনে প্রাথমিক বাছাই পরীক্ষা অনুষ্ঠিত হবে। ৯ম ও ১০ম শ্রেণির আগ্রহী বিতার্কিকদের উপস্থিত থাকার জন্য আহ্বান করা হচ্ছে।",
    published_date: "2025-06-01",
    attachment_name: "debate_club_selection_2025.pdf",
    attachment_size: "195 KB",
    is_active: true,
    institution_id: 1,
    created_at: "2025-06-01T15:00:00Z",
    updated_at: "2025-06-01T15:00:00Z",
  },
  {
    id: 7,
    title: "নতুন শিক্ষাবর্ষে ষষ্ঠ ও নবম শ্রেণীতে অতিরিক্ত শূন্য আসনে ভর্তি বিজ্ঞপ্তি",
    category: "Admission",
    body: "বিদ্যালয়ে কিছু খালি আসনে সীমিত সংখ্যক কোটায় শিক্ষার্থী ভর্তি করা হবে। আগামী ২০ জুন ২০২৫ তারিখের মধ্যে ভর্তি ফরম ডাউনলোড করে বিদ্যালয়ে জমা দিতে হবে। ভর্তি পরীক্ষা আগামী ২৫ জুন অনুষ্ঠিত হবে। বিজ্ঞান ও সাধারণ শাখায় আসন খালি রয়েছে।",
    published_date: "2025-05-25",
    attachment_name: "admission_notice_mid_session.pdf",
    attachment_size: "625 KB",
    is_active: true,
    institution_id: 1,
    created_at: "2025-05-25T10:00:00Z",
    updated_at: "2025-05-25T10:00:00Z",
  },
  {
    id: 8,
    title: "বিজ্ঞান মেলা ও খুদে বিজ্ঞানী উদ্ভাবনী মেলা ২০২৫ আয়োজন সংক্রান্ত",
    category: "Academic",
    body: "আমাদের বিদ্যালয়ে আগামী ২৮ জুন একটি বিজ্ঞান মেলার আয়োজন করা হয়েছে। শিক্ষার্থীরা পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান এবং পরিবেশ বিজ্ঞানের নানা উদ্ভাবনী প্রজেক্ট উপস্থাপন করতে পারবে। প্রজেক্ট সাবমিশনের শেষ তারিখ ২৪ জুন ২০২৫। প্রথম ৩টি সেরা প্রজেক্টকে আকর্ষণীয় পুরষ্কার ও সার্টিফিকেট দেওয়া হবে।",
    published_date: "2025-05-20",
    attachment_name: "science_fair_guide_2025.pdf",
    attachment_size: "320 KB",
    is_active: true,
    institution_id: 1,
    created_at: "2025-05-20T11:00:00Z",
    updated_at: "2025-05-20T11:00:00Z",
  },
  {
    id: 9,
    title: "মে মাসের অভিভাবক সমাবেশের তারিখ ও সময় পরিবর্তন সংক্রান্ত জরুরি বিজ্ঞপ্তি",
    category: "General",
    body: "অনিবার্য কারণবশত আগামী ২৮ মে'র নির্ধারিত অভিভাবক সমাবেশ পিছিয়ে ৩০ মে, শুক্রবার সকাল ১০:০০ টায় বিদ্যালয়ের মাল্টিমিডিয়া ক্লাসরুমে অনুষ্ঠিত হবে। সকল অভিভাবকবৃন্দকে নির্ধারিত সময়ে উপস্থিত থেকে শিক্ষার্থীদের পড়াশোনা ও আচরণগত উন্নয়নে গুরুত্বপূর্ণ পরামর্শ প্রদানের জন্য অনুরোধ করা হলো।",
    published_date: "2025-05-15",
    attachment_name: "parents_meeting_rescheduled.pdf",
    attachment_size: "154 KB",
    is_active: true,
    institution_id: 1,
    created_at: "2025-05-15T09:00:00Z",
    updated_at: "2025-05-15T09:00:00Z",
  },
  {
    id: 10,
    title: "বিশ্ব শিক্ষক দিবস ২০২৫ উদযাপন ও আলোচনা সভা কর্মসূচি",
    category: "Other",
    body: "বিদ্যালয়ের শিক্ষক ও কর্মচারীদের সম্মানার্থে বিশ্ব শিক্ষক দিবস উদযাপন করা হবে। উক্ত অনুষ্ঠানে স্থানীয় শিক্ষা কর্মকর্তারা উপস্থিত থাকবেন। সকল শিক্ষার্থীদের এই মিলনমেলায় যথাসময়ে যোগদানের অনুরোধ রইলো।",
    published_date: "2025-05-05",
    attachment_name: "teachers_day_program_2025.pdf",
    attachment_size: "185 KB",
    is_active: true,
    institution_id: 1,
    created_at: "2025-05-05T08:00:00Z",
    updated_at: "2025-05-05T08:00:00Z",
  },
];

// Pre-seeded Teachers
const defaultTeachers: Teacher[] = [
  {
    id: 1,
    name: "মোঃ আবদুল করিম",
    designation: "প্রধান শিক্ষক",
    subject: "বাংলা ও প্রশাসন",
    qualification: "M.A (Bangla), B.Ed (First Class)",
    join_date: "1998-03-12",
    is_mpo: true,
    photo_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200", // Will fallback/render beautifully
    staff_type: "teaching",
    sort_order: 1,
    is_active: true,
    institution_id: 1,
    created_at: "1998-03-12T00:00:00Z",
    updated_at: "2026-06-24T00:00:00Z",
  },
  {
    id: 2,
    name: "মোসাম্মৎ রাহেলা বেগম",
    designation: "সহকারী প্রধান শিক্ষক",
    subject: "বাংলা",
    qualification: "M.A (Bangla), M.Ed",
    join_date: "2002-09-01",
    is_mpo: true,
    photo_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200",
    staff_type: "teaching",
    sort_order: 2,
    is_active: true,
    institution_id: 1,
    created_at: "2002-09-01T00:00:00Z",
    updated_at: "2026-06-24T00:00:00Z",
  },
  {
    id: 3,
    name: "মোঃ রফিকুল ইসলাম",
    designation: "সহকারী শিক্ষক (গণিত)",
    subject: "উচ্চতর গণিত ও বিজ্ঞান",
    qualification: "B.Sc (Hons) in Mathematics, B.Ed",
    join_date: "2005-01-15",
    is_mpo: true,
    photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200",
    staff_type: "teaching",
    sort_order: 3,
    is_active: true,
    institution_id: 1,
    created_at: "2005-01-15T00:00:00Z",
    updated_at: "2026-06-24T00:00:00Z",
  },
  {
    id: 4,
    name: "সুমাইয়া আক্তার",
    designation: "সহকারী শিক্ষক (ইংরেজি)",
    subject: "ইংরেজি সাহিত্য ও ব্যাকরণ",
    qualification: "B.A (Hons), M.A in English Literature",
    join_date: "2008-04-10",
    is_mpo: true,
    photo_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200",
    staff_type: "teaching",
    sort_order: 4,
    is_active: true,
    institution_id: 1,
    created_at: "2008-04-10T00:00:00Z",
    updated_at: "2026-06-24T00:00:00Z",
  },
  {
    id: 5,
    name: "মোঃ কামরুজ্জামান",
    designation: "সহকারী শিক্ষক (বিজ্ঞান)",
    subject: "পদার্থবিজ্ঞান ও রসায়ন",
    qualification: "B.Sc (Physics), B.Ed",
    join_date: "2010-11-05",
    is_mpo: true,
    photo_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200",
    staff_type: "teaching",
    sort_order: 5,
    is_active: true,
    institution_id: 1,
    created_at: "2010-11-05T00:00:00Z",
    updated_at: "2026-06-24T00:00:00Z",
  },
  {
    id: 6,
    name: "নাসরিন সুলতানা",
    designation: "সহকারী শিক্ষক (ধর্ম)",
    subject: "ইসলাম ও নৈতিক শিক্ষা",
    qualification: "B.A (Islamic Studies), Kamil",
    join_date: "2012-02-18",
    is_mpo: true,
    photo_url: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200&h=200",
    staff_type: "teaching",
    sort_order: 6,
    is_active: true,
    institution_id: 1,
    created_at: "2012-02-18T00:00:00Z",
    updated_at: "2026-06-24T00:00:00Z",
  },
  {
    id: 7,
    name: "মোঃ শরিফুল হক",
    designation: "অফিস সহকারী",
    subject: "প্রশাসন ও তথ্য সেল",
    qualification: "H.S.C Pass, Diploma in Computer Application",
    join_date: "2003-05-10",
    is_mpo: false,
    photo_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200",
    staff_type: "non-teaching",
    sort_order: 7,
    is_active: true,
    institution_id: 1,
    created_at: "2003-05-10T00:00:00Z",
    updated_at: "2026-06-24T00:00:00Z",
  },
  {
    id: 8,
    name: "রেহানা বেগম",
    designation: "আয়া ও সাহায্যকারী",
    subject: "বিদ্যালয় রক্ষণাবেক্ষণ",
    qualification: "J.S.C Pass",
    join_date: "2015-08-01",
    is_mpo: false,
    photo_url: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=200&h=200",
    staff_type: "non-teaching",
    sort_order: 8,
    is_active: true,
    institution_id: 1,
    created_at: "2015-08-01T00:00:00Z",
    updated_at: "2026-06-24T00:00:00Z",
  },
];

// Pre-seeded Student Statistics
const defaultStudentStats: StudentStat[] = [
  { id: 1, year: 2020, class_6: 85, class_7: 78, class_8: 82, class_9: 90, class_10: 88, total: 423, ssc_pass_rate: "94%", is_active: true, institution_id: 1, created_at: "", updated_at: "" },
  { id: 2, year: 2021, class_6: 90, class_7: 85, class_8: 80, class_9: 85, class_10: 90, total: 430, ssc_pass_rate: "96%", is_active: true, institution_id: 1, created_at: "", updated_at: "" },
  { id: 3, year: 2022, class_6: 95, class_7: 88, class_8: 85, class_9: 82, class_10: 88, total: 438, ssc_pass_rate: "95%", is_active: true, institution_id: 1, created_at: "", updated_at: "" },
  { id: 4, year: 2023, class_6: 100, class_7: 95, class_8: 90, class_9: 88, class_10: 85, total: 458, ssc_pass_rate: "97%", is_active: true, institution_id: 1, created_at: "", updated_at: "" },
  { id: 5, year: 2024, class_6: 105, class_7: 100, class_8: 95, class_9: 90, class_10: 90, total: 480, ssc_pass_rate: "98%", is_active: true, institution_id: 1, created_at: "", updated_at: "" },
];

// Pre-seeded Routines
const defaultRoutines: Routine[] = [
  { id: 1, class_name: "ষষ্ঠ শ্রেণি (Class 6)", section: "ক (Section A)", year: 2025, effective_date: "২০২৫-০১-০১", attachment_name: "routine_class6_2025.pdf", attachment_size: "185 KB", is_active: true, institution_id: 1, created_at: "", updated_at: "" },
  { id: 2, class_name: "সপ্তম শ্রেণি (Class 7)", section: "ক (Section A)", year: 2025, effective_date: "২০২৫-০১-০১", attachment_name: "routine_class7_2025.pdf", attachment_size: "185 KB", is_active: true, institution_id: 1, created_at: "", updated_at: "" },
  { id: 3, class_name: "অষ্টম শ্রেণি (Class 8)", section: "ক (Section A)", year: 2025, effective_date: "২০২৫-০১-০১", attachment_name: "routine_class8_2025.pdf", attachment_size: "192 KB", is_active: true, institution_id: 1, created_at: "", updated_at: "" },
  { id: 4, class_name: "নবম শ্রেণি (Class 9)", section: "বিজ্ঞান (Science)", year: 2025, effective_date: "২০২৫-০১-০১", attachment_name: "routine_class9_science_2025.pdf", attachment_size: "210 KB", is_active: true, institution_id: 1, created_at: "", updated_at: "" },
  { id: 5, class_name: "দশম শ্রেণি (Class 10)", section: "বিজ্ঞান (Science)", year: 2025, effective_date: "২০২৫-০১-০১", attachment_name: "routine_class10_science_2025.pdf", attachment_size: "215 KB", is_active: true, institution_id: 1, created_at: "", updated_at: "" },
];

// Pre-seeded Syllabus
const defaultSyllabus: Syllabus[] = [
  { id: 1, class_name: "ষষ্ঠ শ্রেণি (Class 6)", subject: "বাংলা (Bangla)", exam_type: "Annual", year: 2025, attachment_name: "syllabus_class6_bangla.pdf", attachment_size: "124 KB", is_active: true, institution_id: 1, created_at: "", updated_at: "" },
  { id: 2, class_name: "সপ্তম শ্রেণি (Class 7)", subject: "ইংরেজি (English)", exam_type: "Annual", year: 2025, attachment_name: "syllabus_class7_english.pdf", attachment_size: "142 KB", is_active: true, institution_id: 1, created_at: "", updated_at: "" },
  { id: 3, class_name: "অষ্টম শ্রেণি (Class 8)", subject: "গণিত (Math)", exam_type: "Annual", year: 2025, attachment_name: "syllabus_class8_math.pdf", attachment_size: "210 KB", is_active: true, institution_id: 1, created_at: "", updated_at: "" },
  { id: 4, class_name: "নবম শ্রেণি (Class 9)", subject: "সাধারণ বিজ্ঞান (Science)", exam_type: "Half-yearly", year: 2025, attachment_name: "syllabus_class9_science.pdf", attachment_size: "185 KB", is_active: true, institution_id: 1, created_at: "", updated_at: "" },
];

// Pre-seeded Managing Committee
const defaultCommittee: CommitteeMember[] = [
  { id: 1, name: "জনাব মোঃ সিরাজুল ইসলাম", designation: "সভাপতি", category: "স্থানীয় গণ্যমান্য ব্যক্তি", term: "২০২৩ - ২০২৬", photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150", is_active: true, institution_id: 1, created_at: "", updated_at: "" },
  { id: 2, name: "মোঃ আবদুল করিম", designation: "সদস্য সচিব (প্রধান শিক্ষক)", category: "পদাধিকার বলে", term: "২০২৩ - ২০২৬", photo_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150", is_active: true, institution_id: 1, created_at: "", updated_at: "" },
  { id: 3, name: "জনাব আব্দুর রহমান", designation: "সহ-সভাপতি", category: "অভিভাবক প্রতিনিধি", term: "২০২৩ - ২০২৬", photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150", is_active: true, institution_id: 1, created_at: "", updated_at: "" },
  { id: 4, name: "জনাব নুরুল হুদা", designation: "সদস্য", category: "দাতা সদস্য", term: "২০২৩ - ২০২৬", photo_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150", is_active: true, institution_id: 1, created_at: "", updated_at: "" },
  { id: 5, name: "মোসাম্মৎ ফিরোজা বেগম", designation: "সদস্য", category: "মহিলা অভিভাবক প্রতিনিধি", term: "২০২৩ - ২০২৬", photo_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150", is_active: true, institution_id: 1, created_at: "", updated_at: "" },
  { id: 6, name: "জনাব মোঃ কামাল হোসেন", designation: "সদস্য", category: "শিক্ষক প্রতিনিধি", term: "২০২৩ - ২০২৬", photo_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150", is_active: true, institution_id: 1, created_at: "", updated_at: "" },
  { id: 7, name: "জনাব মোঃ রেজাউল করিম", designation: "সদস্য", category: "স্থানীয় সরকার প্রতিনিধি", term: "২০২৩ - ২০২৬", photo_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150", is_active: true, institution_id: 1, created_at: "", updated_at: "" },
];

// Pre-seeded Downloads
const defaultDownloads: Download[] = [
  { id: 1, title: "২০২৫ শিক্ষাবর্ষে ষষ্ঠ থেকে নবম শ্রেণীতে ভর্তি আবেদন ফরম", category: "Admission", attachment_name: "admission_form_2025.pdf", attachment_size: "245 KB", published_date: "2025-05-10", is_active: true, institution_id: 1, created_at: "", updated_at: "" },
  { id: 2, title: "শিক্ষার্থীদের বিদ্যালয় ছাড়পত্র / টিসি (TC) আবেদনের নির্ধারিত ফরম", category: "Other", attachment_name: "transfer_certificate_form.pdf", attachment_size: "180 KB", published_date: "2025-04-15", is_active: true, institution_id: 1, created_at: "", updated_at: "" },
  { id: 3, title: "বিদ্যালয় তথ্যচিত্র ও প্রসপেক্টাস ২০২৪-২০২৫ সংস্করণ", category: "Other", attachment_name: "school_prospectus_2024_2025.pdf", attachment_size: "2.4 MB", published_date: "2025-01-10", is_active: true, institution_id: 1, created_at: "", updated_at: "" },
  { id: 4, title: "তথ্য অধিকার (RTI) আইন অনুযায়ী তথ্য প্রাপ্তির আবেদন ফরম", category: "RTI", attachment_name: "rti_request_form_bangladesh.pdf", attachment_size: "320 KB", published_date: "2025-02-12", is_active: true, institution_id: 1, created_at: "", updated_at: "" },
  { id: 5, title: "যেকোনো অভিযোগ দাখিলের জন্য নির্ধারিত সরকারি অভিযোগ ফরম", category: "Complaint", attachment_name: "govt_complaint_form_gahs.pdf", attachment_size: "215 KB", published_date: "2025-03-05", is_active: true, institution_id: 1, created_at: "", updated_at: "" },
  { id: 6, title: "অর্ধ-বার্ষিক পরীক্ষা ২০২৫ এর পূর্ণাঙ্গ সময়সূচি ও নিয়মাবলী", category: "Exam", attachment_name: "half_yearly_exam_schedule_2025.pdf", attachment_size: "420 KB", published_date: "2025-06-05", is_active: true, institution_id: 1, created_at: "", updated_at: "" },
];

// Pre-seeded Gallery Images
const defaultGalleryImages: GalleryImage[] = [
  { id: 1, caption: "বার্ষিক পুরস্কার বিতরণী অনুষ্ঠান ২০২৪ — প্রধান অতিথির বক্তৃতা", category: "events", image_url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800&h=600", is_active: true, institution_id: 1, created_at: "", updated_at: "" },
  { id: 2, caption: "আন্তঃবিদ্যালয় ক্রিকেট টুর্নামেন্ট ২০২৪ — চুরান্ত খেলায় আমাদের বিজয়", category: "sports", image_url: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800&h=600", is_active: true, institution_id: 1, created_at: "", updated_at: "" },
  { id: 3, caption: "বিজ্ঞান মেলা ২০২৩ — খুদে বিজ্ঞানীদের পরিবেশবান্ধব জ্বালানী প্রজেক্ট", category: "academics", image_url: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800&h=600", is_active: true, institution_id: 1, created_at: "", updated_at: "" },
  { id: 4, caption: "মহান স্বাধীনতা দিবস উদযাপন ২০২৪ — বীর শহীদদের শ্রদ্ধা জ্ঞাপন", category: "events", image_url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800&h=600", is_active: true, institution_id: 1, created_at: "", updated_at: "" },
  { id: 5, caption: "মাল্টিমিডিয়া ক্লাসরুম — আধুনিক পরিবেশে বিজ্ঞান ক্লাস", category: "academics", image_url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800&h=600", is_active: true, institution_id: 1, created_at: "", updated_at: "" },
  { id: 6, caption: "আমাদের কম্পিউটার ল্যাবরেটরি — হাতেকলমে আইসিটি প্রশিক্ষণ", category: "facilities", image_url: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800&h=600", is_active: true, institution_id: 1, created_at: "", updated_at: "" },
  { id: 7, caption: "বিদ্যালয় সমৃদ্ধ গ্রন্থাগার — বই পড়ার চমৎকার আবহ", category: "facilities", image_url: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800&h=600", is_active: true, institution_id: 1, created_at: "", updated_at: "" },
  { id: 8, caption: "বিশাল খেলার মাঠ ও শিক্ষার্থীদের সকালের শরীরচর্চা সমাবেশ", category: "sports", image_url: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=800&h=600", is_active: true, institution_id: 1, created_at: "", updated_at: "" },
];

// Pre-seeded Complaint Officer
const defaultComplaintOfficer: ComplaintOfficer = {
  id: 1,
  name: "মোঃ শরিফুল হক",
  designation: "অফিস সহকারী (তথ্য ও অভিযোগ কর্মকর্তা)",
  phone: "০১৭১২-xxxxxx",
  email: "info.gahs@gmail.com",
  office_hours: "শনিবার–বৃহস্পতিবার, সকাল ৯:০০ টা – বিকাল ৪:০০ টা",
  appeal_officer_name: "মোঃ আবদুল করিম",
  appeal_officer_designation: "প্রধান শিক্ষক (আপিল কর্মকর্তা)",
  is_active: true,
  institution_id: 1,
  created_at: "",
  updated_at: "",
};

// Initialize localStorage with dummy data if not already exists
export function initializeDB(forceReset = false) {
  if (forceReset || !localStorage.getItem('edu_institution')) {
    localStorage.setItem('edu_institution', JSON.stringify(defaultInstitution));
    localStorage.setItem('edu_feature_settings', JSON.stringify(defaultFeatureSettings));
    localStorage.setItem('edu_notices', JSON.stringify(defaultNotices));
    localStorage.setItem('edu_teachers', JSON.stringify(defaultTeachers));
    localStorage.setItem('edu_student_stats', JSON.stringify(defaultStudentStats));
    localStorage.setItem('edu_routines', JSON.stringify(defaultRoutines));
    localStorage.setItem('edu_syllabus', JSON.stringify(defaultSyllabus));
    localStorage.setItem('edu_committee', JSON.stringify(defaultCommittee));
    localStorage.setItem('edu_downloads', JSON.stringify(defaultDownloads));
    localStorage.setItem('edu_gallery', JSON.stringify(defaultGalleryImages));
    localStorage.setItem('edu_complaint_officer', JSON.stringify(defaultComplaintOfficer));
  }
}

// Seed function resembling the manage.py seed_demo command
export function seedDemo() {
  initializeDB(true);
}

// DB Accessors
export function getInstitution(): Institution {
  initializeDB();
  return JSON.parse(localStorage.getItem('edu_institution') || '{}');
}

export function saveInstitution(inst: Institution) {
  localStorage.setItem('edu_institution', JSON.stringify(inst));
}

export function getFeatureSettings(): FeatureSetting[] {
  initializeDB();
  return JSON.parse(localStorage.getItem('edu_feature_settings') || '[]');
}

export function saveFeatureSettings(settings: FeatureSetting[]) {
  localStorage.setItem('edu_feature_settings', JSON.stringify(settings));
}

export function isFeatureEnabled(key: string): boolean {
  const settings = getFeatureSettings();
  const found = settings.find(s => s.feature_key === key);
  return found ? found.is_enabled : true;
}

export function getNotices(): Notice[] {
  initializeDB();
  return JSON.parse(localStorage.getItem('edu_notices') || '[]');
}

export function saveNotices(notices: Notice[]) {
  localStorage.setItem('edu_notices', JSON.stringify(notices));
}

export function getTeachers(): Teacher[] {
  initializeDB();
  return JSON.parse(localStorage.getItem('edu_teachers') || '[]');
}

export function getPrincipalTeacher(): Teacher | null {
  const institution = getInstitution();
  const teachers = getTeachers().filter((teacher) => teacher.is_active);
  const principalName = institution.principal_name.trim().toLowerCase();

  const teacherByInstitutionName = teachers.find(
    (teacher) => teacher.name.trim().toLowerCase() === principalName
  );

  if (teacherByInstitutionName) {
    return teacherByInstitutionName;
  }

  return (
    teachers.find((teacher) => {
      const designation = teacher.designation.toLowerCase();

      return (
        teacher.designation.includes("প্রধান শিক্ষক") ||
        teacher.designation.includes("অধ্যক্ষ") ||
        designation.includes("head teacher") ||
        designation.includes("principal")
      );
    }) || null
  );
}

export function saveTeachers(teachers: Teacher[]) {
  localStorage.setItem('edu_teachers', JSON.stringify(teachers));
}

export function getStudentStats(): StudentStat[] {
  initializeDB();
  return JSON.parse(localStorage.getItem('edu_student_stats') || '[]');
}

export function saveStudentStats(stats: StudentStat[]) {
  localStorage.setItem('edu_student_stats', JSON.stringify(stats));
}

export function getRoutines(): Routine[] {
  initializeDB();
  return JSON.parse(localStorage.getItem('edu_routines') || '[]');
}

export function saveRoutines(routines: Routine[]) {
  localStorage.setItem('edu_routines', JSON.stringify(routines));
}

export function getSyllabuses(): Syllabus[] {
  initializeDB();
  return JSON.parse(localStorage.getItem('edu_syllabus') || '[]');
}

export function saveSyllabuses(syllabuses: Syllabus[]) {
  localStorage.setItem('edu_syllabus', JSON.stringify(syllabuses));
}

export function getCommittee(): CommitteeMember[] {
  initializeDB();
  return JSON.parse(localStorage.getItem('edu_committee') || '[]');
}

export function saveCommittee(members: CommitteeMember[]) {
  localStorage.setItem('edu_committee', JSON.stringify(members));
}

export function getDownloads(): Download[] {
  initializeDB();
  return JSON.parse(localStorage.getItem('edu_downloads') || '[]');
}

export function saveDownloads(downloads: Download[]) {
  localStorage.setItem('edu_downloads', JSON.stringify(downloads));
}

export function getGallery(): GalleryImage[] {
  initializeDB();
  return JSON.parse(localStorage.getItem('edu_gallery') || '[]');
}

export function saveGallery(images: GalleryImage[]) {
  localStorage.setItem('edu_gallery', JSON.stringify(images));
}

export function getComplaintOfficer(): ComplaintOfficer {
  initializeDB();
  return JSON.parse(localStorage.getItem('edu_complaint_officer') || '{}');
}

export function saveComplaintOfficer(officer: ComplaintOfficer) {
  localStorage.setItem('edu_complaint_officer', JSON.stringify(officer));
}
