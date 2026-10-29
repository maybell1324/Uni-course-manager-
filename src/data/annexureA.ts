import { ProgramOutcome, ProgramSpecificOutcome, BloomsLevel } from '../types';

export const PROGRAM_OUTCOMES: ProgramOutcome[] = [
  {
    code: 'PO1',
    title: 'Engineering Knowledge',
    description: 'Apply knowledge of mathematics, science, engineering fundamentals, and computer engineering principles to solve complex engineering problems.'
  },
  {
    code: 'PO2',
    title: 'Problem Analysis',
    description: 'Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions using first principles of mathematics, natural sciences, and engineering sciences.'
  },
  {
    code: 'PO3',
    title: 'Design/Development of Solutions',
    description: 'Design solutions for complex engineering problems and design system components or processes that meet specified needs with appropriate consideration for public health and safety, and cultural, societal, and environmental considerations.'
  },
  {
    code: 'PO4',
    title: 'Conduct Investigations of Complex Problems',
    description: 'Use research-based knowledge and research methods including design of experiments, analysis and interpretation of data, and synthesis of information to provide valid conclusions.'
  },
  {
    code: 'PO5',
    title: 'Modern Tool Usage',
    description: 'Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools including prediction and modeling to complex engineering activities with an understanding of limitations.'
  },
  {
    code: 'PO6',
    title: 'The Engineer and Society',
    description: 'Apply reasoning informed by contextual knowledge to assess societal, health, safety, legal, and cultural issues and the consequent responsibilities relevant to professional engineering practice.'
  },
  {
    code: 'PO7',
    title: 'Environment and Sustainability',
    description: 'Understand the impact of professional engineering solutions in societal and environmental contexts, and demonstrate knowledge of and need for sustainable development.'
  },
  {
    code: 'PO8',
    title: 'Ethics',
    description: 'Apply ethical principles and commit to professional ethics and responsibilities and norms of the engineering practice.'
  },
  {
    code: 'PO9',
    title: 'Individual and Team Work',
    description: 'Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings.'
  },
  {
    code: 'PO10',
    title: 'Communication',
    description: 'Communicate effectively on complex engineering activities with the engineering community and with society at large, such as being able to comprehend and write effective reports and design documentation, make effective presentations, and give and receive clear instructions.'
  },
  {
    code: 'PO11',
    title: 'Project Management and Finance',
    description: 'Demonstrate knowledge and understanding of engineering and management principles and apply these to one’s own work, as a member and leader in a team, to manage projects and in multidisciplinary environments.'
  },
  {
    code: 'PO12',
    title: 'Life-long Learning',
    description: 'Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change.'
  }
];

export const PROGRAM_SPECIFIC_OUTCOMES: ProgramSpecificOutcome[] = [
  {
    code: 'PSO1',
    title: 'Algorithmic Problem Solving & Foundations',
    description: 'Demonstrate ability to design, implement, and benchmark algorithmic structures, abstract data types, and discrete mathematical logic for high-performance computing systems.'
  },
  {
    code: 'PSO2',
    title: 'Software Systems Architecture & Engineering',
    description: 'Apply software engineering lifecycle disciplines, systems programming, and modern frameworks to engineer robust, scalable, and secure application platforms.'
  },
  {
    code: 'PSO3',
    title: 'Distributed Intelligence & Applied Data Systems',
    description: 'Architect, evaluate, and deploy intelligent algorithms, distributed cloud topologies, and machine learning models for real-world enterprise automation.'
  }
];

export const BLOOMS_TAXONOMY: Record<string, { level: BloomsLevel; verbs: string[]; recommendedMinLevel: boolean }> = {
  L1: {
    level: 'L1 Remember',
    verbs: ['Define', 'Recall', 'List', 'State', 'Identify', 'Name', 'Recognize'],
    recommendedMinLevel: false
  },
  L2: {
    level: 'L2 Understand',
    verbs: ['Describe', 'Explain', 'Summarize', 'Paraphrase', 'Illustrate', 'Classify'],
    recommendedMinLevel: false
  },
  L3: {
    level: 'L3 Apply',
    verbs: ['Apply', 'Implement', 'Formulate', 'Compute', 'Solve', 'Execute', 'Demonstrate'],
    recommendedMinLevel: true
  },
  L4: {
    level: 'L4 Analyze',
    verbs: ['Analyze', 'Compare', 'Contrast', 'Differentiate', 'Deconstruct', 'Examine', 'Benchmark'],
    recommendedMinLevel: true
  },
  L5: {
    level: 'L5 Evaluate',
    verbs: ['Evaluate', 'Assess', 'Validate', 'Justify', 'Appraise', 'Defend', 'Critique'],
    recommendedMinLevel: true
  },
  L6: {
    level: 'L6 Create',
    verbs: ['Design', 'Synthesize', 'Construct', 'Formulate', 'Devise', 'Architect', 'Produce'],
    recommendedMinLevel: true
  }
};
