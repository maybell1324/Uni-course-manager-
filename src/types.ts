export type Role = 'Author' | 'Reviewer' | 'HOD';

export type WorkflowStatus = 'Draft' | 'Submitted' | 'Under Review' | 'Returned' | 'Pending HOD' | 'Approved';

export type TemplateType = 'Integrated' | 'Non-Lab';

export type BloomsLevel = 'L1 Remember' | 'L2 Understand' | 'L3 Apply' | 'L4 Analyze' | 'L5 Evaluate' | 'L6 Create';

export interface CourseOutcome {
  id: string; // e.g. "CO1"
  statement: string;
  bloomsLevel: BloomsLevel;
  actionVerb: string;
  source: 'blueprint' | 'existing_spec' | 'ai_corrected';
  wasModified?: boolean;
  modificationNote?: string;
}

export interface SyllabusUnit {
  unitNumber: number; // 1 to 5
  title: string;
  hours: number;
  topics: string;
  source: 'blueprint' | 'existing_spec';
  wasModified?: boolean;
  modificationNote?: string;
}

export interface LabExperiment {
  week: number;
  title: string;
  mappedCOs: string[];
  hours: number;
}

export interface AssessmentComponent {
  id: string;
  component: string;
  category: 'CIE' | 'SEE';
  modality: string;
  mappedCOs: string[];
  weightage: number; // percentage
  wasModified?: boolean;
}

export interface MatrixCell {
  level: 0 | 1 | 2 | 3; // 0=None, 1=Slight/Moderate, 2=Moderate/Strong, 3=Substantial/Very Strong
  reason: string;
  confidence?: number;
  nbaTag?: string;
  warning?: string;
}

export type COPOMatrix = Record<string, Record<string, MatrixCell>>;

export interface ProgramOutcome {
  code: string; // e.g. "PO1"
  title: string;
  description: string;
}

export interface ProgramSpecificOutcome {
  code: string; // e.g. "PSO1"
  title: string;
  description: string;
}

export interface DefectItem {
  id: string;
  code: string;
  severity: 'High' | 'Medium' | 'Low';
  section: 'co' | 'assessment' | 'credit' | 'syllabus' | 'template';
  location: string;
  issue: string;
  rule: string;
  proposedFix: string;
  appliedFix: string;
  status: 'Open' | 'Auto-Fixed' | 'Reviewed' | 'Dismissed';
}

export interface ValidationCheck {
  id: string;
  name: string;
  category: string;
  status: 'PASS' | 'FAIL' | 'WARN';
  message: string;
  details?: string;
}

export interface ValidationReport {
  timestamp: string;
  allPassed: boolean;
  passRate: number;
  totalChecks: number;
  passedCount: number;
  failedCount: number;
  warningCount: number;
  checks: ValidationCheck[];
}

export interface WorkflowAuditRecord {
  id: string;
  timestamp: string;
  status: WorkflowStatus;
  role: Role;
  user: string;
  userRoleTitle: string;
  action: string;
  comment?: string;
}

export interface CourseSpecification {
  id: string;
  courseCode: string;
  courseTitle: string;
  regulation: string;
  department: string;
  semester: string;
  degree: string;
  credits: {
    lecture: number; // L
    tutorial: number; // T
    practical: number; // P
    totalCredits: number;
    ltpString: string; // e.g. "3-1-0" or "3-0-1"
  };
  templateType: TemplateType;
  totalLectureHours: number;
  totalPracticalHours?: number;
  courseSummary: string;
  prerequisites: string[];
  courseOutcomes: CourseOutcome[];
  units: SyllabusUnit[];
  labExperiments?: LabExperiment[];
  teachingMethods: {
    title: string;
    description: string;
    icon: string;
  }[];
  assessment: {
    components: AssessmentComponent[];
    cieTotal: number;
    seeTotal: number;
    grandTotal: number;
  };
  textbooks: {
    type: 'Primary' | 'Reference';
    citation: string;
    details: string;
    isbn?: string;
  }[];
  copoMap: COPOMatrix;
  copoAverages: Record<string, number>;
  governance: {
    author: { name: string; title: string; signedAt?: string };
    reviewer: { name: string; title: string; signedAt?: string };
    hod: { name: string; title: string; signedAt?: string };
  };
  workflowStatus: WorkflowStatus;
  history: WorkflowAuditRecord[];
  defects: DefectItem[];
  validationReport: ValidationReport;
  rawFiles?: {
    specFileName?: string;
    blueprintFileName?: string;
    specTextSnippet?: string;
    blueprintTextSnippet?: string;
  };
}

export interface SpecForgeOutputJson {
  specforge_version: string;
  generated_at: string;
  course_info: {
    course_code: string;
    course_title: string;
    regulation: string;
    template_type: TemplateType;
    credits_ltp: string;
    total_credits: number;
    total_contact_hours: number;
  };
  summary: string;
  course_outcomes: {
    id: string;
    statement: string;
    blooms_level: string;
    action_verb: string;
    source: string;
  }[];
  units: {
    unit_number: number;
    title: string;
    hours: number;
    topics: string;
  }[];
  assessment_scheme: {
    total_weightage: number;
    cie_weightage: number;
    see_weightage: number;
    components: {
      component: string;
      modality: string;
      weightage: number;
      mapped_cos: string[];
    }[];
  };
  co_po_pso_matrix: {
    scale: {
      "3": "Substantial / High",
      "2": "Moderate / Medium",
      "1": "Slight / Low",
      "0": "None"
    };
    mapping: Record<string, Record<string, { level: number; reason: string }>>;
    average_attainments: Record<string, number>;
  };
  validation_report: {
    passed: boolean;
    pass_rate_percentage: number;
    audit_checks: {
      name: string;
      status: 'PASS' | 'FAIL' | 'WARN';
      message: string;
    }[];
  };
  governance: {
    status: WorkflowStatus;
    signoffs: {
      author: { name: string; status: string; date?: string };
      reviewer: { name: string; status: string; date?: string };
      hod: { name: string; status: string; date?: string };
    };
  };
}
