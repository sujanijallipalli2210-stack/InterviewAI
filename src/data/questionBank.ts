import { JobRole, ExperienceLevel, InterviewType, InterviewQuestion } from '../types';

export const DEFAULT_QUESTIONS_BY_ROLE: Record<JobRole, InterviewQuestion[]> = {
  'Software Developer': [
    {
      id: 'sd-1',
      questionNumber: 1,
      category: 'HR',
      question: 'Tell me about yourself and what drew you into software engineering.',
      contextOrTips: 'Keep it structured: background, recent achievements, key technical passions, and why this role fits.',
      expectedKeyPoints: ['Brief education/coding background', 'Key tech stack & project impact', 'Passion for solving real problems'],
      modelAnswer: 'I am a software engineer focused on building robust web applications. Over the past few years, I have architected responsive frontends and resilient API services, optimizing database latency and delivering user-centric features. I am drawn to solving architectural trade-offs and scaling clean codebases.'
    },
    {
      id: 'sd-2',
      questionNumber: 2,
      category: 'Technical',
      question: 'Can you explain the difference between synchronous and asynchronous code execution, and how the JavaScript event loop works?',
      contextOrTips: 'Highlight the call stack, web APIs, microtask queue (Promises), and macrotask queue (setTimeout).',
      expectedKeyPoints: ['Single-threaded execution', 'Call stack vs Task queue', 'Non-blocking I/O with Event Loop'],
      modelAnswer: 'JavaScript executes code single-threadedly using a Call Stack. Synchronous code blocks subsequent execution until finished. Asynchronous operations delegate tasks to browser APIs or Node background threads. When resolved, their callbacks enter the Microtask Queue or Macrotask Queue. The Event Loop continuously checks if the stack is clear and pushes queued tasks.'
    },
    {
      id: 'sd-3',
      questionNumber: 3,
      category: 'Technical',
      question: 'How do you optimize the performance of a slow web application?',
      contextOrTips: 'Discuss frontend metrics (Core Web Vitals, code splitting, asset caching) and backend bottlenecks (DB indexing, queries, CDN).',
      expectedKeyPoints: ['Profiling & measurement with DevTools', 'Bundle optimization & lazy loading', 'Database query tuning & caching'],
      modelAnswer: 'Optimization begins with measurement using Chrome DevTools and Lighthouse to identify bottlenecks. On the client, I implement route-based code splitting, optimize assets, defer non-critical scripts, and memoize expensive renders. On the backend, I optimize DB indexes, prevent N+1 queries, and introduce Redis caching.'
    },
    {
      id: 'sd-4',
      questionNumber: 4,
      category: 'Behavioral',
      question: 'Describe a situation where you had a disagreement with a team member or technical lead over an architectural choice. How did you resolve it?',
      contextOrTips: 'Use the STAR method (Situation, Task, Action, Result). Emphasize empathy, data-driven decisions, and collaboration.',
      expectedKeyPoints: ['Clear description of technical disagreement', 'Objective benchmark or prototype', 'Focus on team goals over ego'],
      modelAnswer: 'While planning a migration to microservices, my lead favored an immediate split while I advocated for modular monolith first to reduce ops overhead. Rather than arguing conceptually, I built a fast POC measuring deployment latency and maintenance complexity. We reviewed the trade-offs together and agreed on a staged modular transition.'
    },
    {
      id: 'sd-5',
      questionNumber: 5,
      category: 'Situational',
      question: 'How do you handle production incidents under tight deadlines when the root cause is unknown?',
      contextOrTips: 'Outline triage, rollback strategy, communication, logging/observability, and post-mortem.',
      expectedKeyPoints: ['Prioritize mitigation/rollback before deep debugging', 'Clear stakeholder communication', 'Observability logs/traces & post-mortem'],
      modelAnswer: 'First, I prioritize service restoration over finding the ultimate root cause—usually rolling back the most recent release or failing over traffic. Concurrently, I communicate incident status to stakeholders. Once stable, we analyze observability logs, traces, and metrics to isolate the regression and schedule a blame-free post-mortem.'
    }
  ],
  'Data Analyst': [
    {
      id: 'da-1',
      questionNumber: 1,
      category: 'HR',
      question: 'Walk me through your background in data analytics and your favorite analytical toolset.',
      contextOrTips: 'Discuss experience translating raw numbers into executive decision-making tools.',
      expectedKeyPoints: ['SQL & Python/R proficiency', 'BI tools (Tableau, PowerBI)', 'Business impact focus'],
      modelAnswer: 'I have spent the past several years transforming disparate data into clear business narratives. My primary tools are advanced SQL for querying, Python for exploratory modeling and data cleaning, and Tableau for executive dashboards that directly inform pricing and retention strategies.'
    },
    {
      id: 'da-2',
      questionNumber: 2,
      category: 'Technical',
      question: 'What is the difference between WHERE and HAVING in SQL, and when would you use window functions?',
      contextOrTips: 'Explain aggregation timing and row-level vs partition-level analysis.',
      expectedKeyPoints: ['WHERE filters rows before aggregation', 'HAVING filters aggregated groups', 'Window functions preserve individual row details'],
      modelAnswer: 'WHERE filters individual records prior to GROUP BY aggregation, whereas HAVING filters aggregated groups after computation. Window functions like ROW_NUMBER() or LAG() compute calculations across a specific partition of rows without collapsing them into a single row, perfect for running totals or cohort analysis.'
    },
    {
      id: 'da-3',
      questionNumber: 3,
      category: 'Technical',
      question: 'How do you ensure data cleanliness and validate assumptions when dealing with noisy, missing datasets?',
      contextOrTips: 'Cover outlier detection, imputation strategies, and business rule sanity checks.',
      expectedKeyPoints: ['Data profiling & distribution checks', 'Handling null values appropriately', 'Validating business logic anomalies'],
      modelAnswer: 'I begin with automated profiling: checking cardinality, null percentages, and statistical distributions for skew and outliers. For missing data, I evaluate whether it is Missing at Random or systematic before deciding on imputation or filtering, and cross-reference with domain experts.'
    },
    {
      id: 'da-4',
      questionNumber: 4,
      category: 'Behavioral',
      question: 'Tell me about a time when your data analysis contradicted a stakeholder’s intuition. How did you present your findings?',
      contextOrTips: 'Demonstrate diplomatic communication, clear visualization, and objective business alignment.',
      expectedKeyPoints: ['Empathy for stakeholder perspective', 'Clear, jargon-free visual proof', 'Collaborative next steps'],
      modelAnswer: 'A product manager was convinced a new onboarding step increased retention, but my cohort analysis revealed a 15% drop-off in week-two active users. Instead of challenging them bluntly, I scheduled a walkthrough, walked them through the user journey metrics, and framed the data as an opportunity to test an alternative tooltip flow.'
    },
    {
      id: 'da-5',
      questionNumber: 5,
      category: 'Situational',
      question: 'How would you measure the success of a newly launched feature with limited initial traffic?',
      contextOrTips: 'Discuss early proxy metrics, qualitative feedback, confidence intervals, and statistical significance.',
      expectedKeyPoints: ['Leading vs lagging indicators', 'Statistical significance awareness', 'Pairing quantitative with qualitative feedback'],
      modelAnswer: 'With low sample sizes, traditional A/B testing takes too long to reach statistical power. I focus on leading behavioral indicators—such as task completion rates and repeat usage within 48 hours—while collecting qualitative customer session replays and surveys to iterate quickly before broad rollout.'
    }
  ],
  'UI/UX Designer': [
    {
      id: 'ui-1',
      questionNumber: 1,
      category: 'HR',
      question: 'Tell me about your design journey and how you approach human-centered design.',
      contextOrTips: 'Explain your design philosophy, research methodology, and cross-functional empathy.',
      expectedKeyPoints: ['Design thinking process', 'Balancing user needs with business KPIs', 'Collaborative design handoff'],
      modelAnswer: 'My design philosophy centers on discovering root user friction before touching Figma. I guide projects from user interviews and workflow mapping through low-fidelity prototypes to polished, accessible design systems that engineer teams can execute without ambiguity.'
    },
    {
      id: 'ui-2',
      questionNumber: 2,
      category: 'Technical',
      question: 'How do you structure and maintain a scalable design system for modern web products?',
      contextOrTips: 'Mention design tokens, atomic design, WCAG contrast standards, and Figma-to-code alignment.',
      expectedKeyPoints: ['Design tokens for color/spacing/type', 'Atomic components & variants', 'Accessibility & documentation'],
      modelAnswer: 'I establish foundational design tokens for color semantics, typography scales, and spacing units. From there, I build atomic components with strict naming conventions matching React component props. Regular syncs with frontend engineering ensure parity, while WCAG AA contrast rules are enforced at the token level.'
    },
    {
      id: 'ui-3',
      questionNumber: 3,
      category: 'Technical',
      question: 'How do you balance aesthetic delight with usability and cognitive load?',
      contextOrTips: 'Discuss visual hierarchy, progressive disclosure, and user mental models.',
      expectedKeyPoints: ['Clear visual hierarchy', 'Progressive disclosure of complex actions', 'Usability testing over personal preference'],
      modelAnswer: 'Delight should never get in the way of efficiency. I use progressive disclosure to hide secondary complexity, anchor eyes with clear visual hierarchy, and use motion purposefully to provide state feedback rather than pure decoration. If an animation delays a task by even 300ms, it is refined.'
    },
    {
      id: 'ui-4',
      questionNumber: 4,
      category: 'Behavioral',
      question: 'Describe a time when user research completely invalidated your initial design direction.',
      contextOrTips: 'Demonstrate humility, user advocacy, and fast iteration.',
      expectedKeyPoints: ['Hypothesis vs usability test reality', 'Openness to being wrong', 'Iterative pivot to user-friendly solution'],
      modelAnswer: 'I designed a sleek gesture-driven navigation for a mobile workflow, expecting users to appreciate the clean canvas. In usability testing, 4 out of 5 users struggled to discover core actions. Rather than defending my design, I pivoted to an explicit bottom navigation bar with clear icon labels, which immediately boosted task completion to 96%.'
    },
    {
      id: 'ui-5',
      questionNumber: 5,
      category: 'Situational',
      question: 'How do you handle pushback from engineers stating a proposed design is technically infeasible within sprint constraints?',
      contextOrTips: 'Highlight trade-off negotiation, phased delivery, and technical curiosity.',
      expectedKeyPoints: ['Seek to understand root constraint', 'Design phased MVP vs ideal state', 'Maintain usability integrity'],
      modelAnswer: 'I treat engineering constraints as creative parameters. I sit with the engineers to understand the specific performance or architectural blockers. We then collaborate on a phased solution: delivering an MVP that achieves 90% of the user value with existing primitives, while scheduling the richer interaction for a later milestone.'
    }
  ],
  'Product Manager': [
    {
      id: 'pm-1',
      questionNumber: 1,
      category: 'HR',
      question: 'Walk me through your experience as a Product Manager and how you align cross-functional teams around a vision.',
      contextOrTips: 'Discuss strategic vision, stakeholder alignment, and data-informed roadmap prioritization.',
      expectedKeyPoints: ['Translating customer pain into product outcomes', 'Prioritization frameworks', 'Cross-functional leadership without authority'],
      modelAnswer: 'I bridge customer empathy, business strategy, and engineering feasibility. By grounding every product initiative in measurable business goals and clear problem statements, I ensure that design, engineering, and sales are aligned on the "why" before committing to the "what".'
    },
    {
      id: 'pm-2',
      questionNumber: 2,
      category: 'Technical',
      question: 'Which prioritization frameworks do you rely on when managing competing stakeholder requests?',
      contextOrTips: 'Mention RICE (Reach, Impact, Confidence, Effort), Kano model, or Value vs Effort matrix.',
      expectedKeyPoints: ['RICE or similar framework', 'Balancing quick wins vs strategic bets', 'Saying no with transparent criteria'],
      modelAnswer: 'I utilize the RICE framework—evaluating Reach, Impact, Confidence, and Effort—to create an objective ranking. However, I balance quantitative scores with strategic themes: ensuring our roadmap has a healthy split between tech debt remediation, conversion optimizations, and moonshot differentiation.'
    },
    {
      id: 'pm-3',
      questionNumber: 3,
      category: 'Behavioral',
      question: 'Tell me about a product or feature you launched that failed to achieve its target metrics. What did you learn?',
      contextOrTips: 'Demonstrate accountability, root cause analysis, and course correction.',
      expectedKeyPoints: ['Clear target KPI & failure gap', 'Honest retrospective on assumptions', 'Constructive iteration or sunsetting decision'],
      modelAnswer: 'We launched a self-serve reporting dashboard expecting a 20% bump in account upgrades, but adoption stalled at 4%. Post-launch interviews revealed users found building queries too intimidating—they wanted pre-packaged email summaries. We simplified the feature into one-click scheduled digests, which reversed adoption and achieved our upgrade targets.'
    },
    {
      id: 'pm-4',
      questionNumber: 4,
      category: 'Situational',
      question: 'How do you decide between shipping an imperfect MVP quickly versus polishing before release?',
      contextOrTips: 'Focus on risk mitigation, learning loops, and defining what "viable" truly means.',
      expectedKeyPoints: ['Risk vs velocity balance', 'Never compromising core security or trust', 'Defining explicit learning goals for the MVP'],
      modelAnswer: 'The goal of an MVP is maximum validated learning with minimal effort. If the imperfection is aesthetic or secondary functionality, we ship quickly to validate the core value proposition. If the imperfection threatens user trust, data security, or core task completion, we fix it prior to release.'
    },
    {
      id: 'pm-5',
      questionNumber: 5,
      category: 'Technical',
      question: 'How do you define the North Star Metric for a B2B SaaS platform?',
      contextOrTips: 'Contrast vanity metrics (signups) with true value exchange metrics (daily active workflows).',
      expectedKeyPoints: ['Captures genuine customer value exchange', 'Predictive of long-term retention', 'Actionable across product teams'],
      modelAnswer: 'A North Star Metric must measure the moment the customer extracts real value from the software. For a workflow SaaS, rather than tracking generic pageviews or logins, I identify metrics like "Completed collaboration workflows per active organization per week", which directly correlates with contract renewal and expansion.'
    }
  ],
  'Digital Marketing Specialist': [
    {
      id: 'dm-1',
      questionNumber: 1,
      category: 'HR',
      question: 'Describe your digital marketing background and the channels where you have driven the strongest ROI.',
      contextOrTips: 'Cover acquisition channels (PPC, SEO, email, paid social) and revenue attribution.',
      expectedKeyPoints: ['Multi-channel acquisition experience', 'CAC vs LTV optimization', 'Data-driven experimentation'],
      modelAnswer: 'I specialize in full-funnel growth, scaling paid acquisition across Google Ads and LinkedIn while building high-intent organic search engines. By tying attribution models directly to customer lifetime value rather than vanity impressions, I ensure marketing spend produces measurable pipeline.'
    },
    {
      id: 'dm-2',
      questionNumber: 2,
      category: 'Technical',
      question: 'How do you structure an A/B test for a high-traffic landing page, and how do you ensure statistical significance?',
      contextOrTips: 'Discuss sample size calculators, single-variable hypotheses, and minimum run times.',
      expectedKeyPoints: ['Clear hypothesis & single variable isolation', 'Pre-calculating sample size for statistical power', 'Guarding against seasonal anomalies'],
      modelAnswer: 'I start with a single, clear hypothesis tied to a primary conversion goal. I calculate sample size and minimum detectable effect in advance to achieve 95% statistical confidence. I ensure tests run for full weekly cycles to normalize weekday versus weekend traffic variations.'
    },
    {
      id: 'dm-3',
      questionNumber: 3,
      category: 'Behavioral',
      question: 'Tell me about a high-budget marketing campaign that performed below expectations. How did you adapt?',
      contextOrTips: 'Discuss campaign monitoring, quick triage, audience refinement, and budget reallocation.',
      expectedKeyPoints: ['Early warning detection', 'Audience and creative diagnostics', 'Swift reallocation to profitable segments'],
      modelAnswer: 'During a Q4 product launch, our paid social campaign saw high click-through rates but abysmal checkout conversion. Digging into analytics revealed high bounce rates on mobile due to slow page load times. I immediately paused mobile ad spend, rerouted budget to high-converting desktop search, and coordinated an emergency landing page speed patch.'
    },
    {
      id: 'dm-4',
      questionNumber: 4,
      category: 'Technical',
      question: 'With third-party cookie deprecation and privacy changes, how do you future-proof attribution and retargeting?',
      contextOrTips: 'Mention first-party data capture, server-side tracking, Conversions API (CAPI), and MMM.',
      expectedKeyPoints: ['First-party data capture strategies', 'Server-side tracking (CAPI, GTM Server)', 'Marketing Mix Modeling (MMM)'],
      modelAnswer: 'I focus on building robust first-party data flywheels through gated value, newsletter engagement, and customer quizzes. Technologically, I implement server-side tracking via Meta Conversions API and Google Enhanced Conversions to eliminate browser-level ad-blocking drop-offs.'
    },
    {
      id: 'dm-5',
      questionNumber: 5,
      category: 'Situational',
      question: 'If your customer acquisition cost (CAC) doubled overnight, what would be your step-by-step diagnostic plan?',
      contextOrTips: 'Audit platform changes, competitor bids, landing page health, tracking pixel integrity, and audience fatigue.',
      expectedKeyPoints: ['Check analytics and tracking integrity first', 'Examine ad frequency & auction competition', 'Inspect conversion funnel friction'],
      modelAnswer: 'First, I verify tracking infrastructure to rule out broken conversion pixels or attribution discrepancies. Next, I inspect auction dynamics: CPM increases, ad fatigue, and competitor bidding spikes. Finally, I audit the conversion funnel for technical friction like checkout gateway outages or checkout form regressions.'
    }
  ],
  'HR Executive': [
    {
      id: 'hr-1',
      questionNumber: 1,
      category: 'HR',
      question: 'Tell me about your HR philosophy and how you foster high employee engagement and talent retention.',
      contextOrTips: 'Discuss modern People Operations: culture, transparency, psychological safety, and growth pathways.',
      expectedKeyPoints: ['People-first organizational strategy', 'Clear career progression matrices', 'Continuous feedback loops'],
      modelAnswer: 'My HR philosophy is built on organizational transparency and empathetic stewardship. Employees stay and thrive when they have psychological safety, clear career progression frameworks, and leadership that actively listens and takes action on feedback.'
    },
    {
      id: 'hr-2',
      questionNumber: 2,
      category: 'Behavioral',
      question: 'How do you handle a sensitive workplace conflict between a senior manager and a direct report?',
      contextOrTips: 'Demonstrate impartiality, thorough fact-finding, confidentiality, and constructive resolution.',
      expectedKeyPoints: ['Active listening with zero preconceptions', 'Separate confidential intake sessions', 'Action plan with agreed accountability'],
      modelAnswer: 'I begin with confidential, 1-on-1 discovery sessions with each party to understand perspectives without passing judgment. I separate factual occurrences from emotional interpretations. Once common ground is identified, I facilitate a structured conversation focused on mutual expectations, followed by 30- and 60-day check-ins.'
    },
    {
      id: 'hr-3',
      questionNumber: 3,
      category: 'Situational',
      question: 'If executive leadership mandates a 15% reduction in workforce, how would you plan and execute the process with empathy and compliance?',
      contextOrTips: 'Cover legal compliance, transparent communication, severance packages, and survivor morale support.',
      expectedKeyPoints: ['Strict legal compliance and objective selection criteria', 'Empathetic, dignified 1-on-1 notifications', 'Outplacement assistance & team transparency'],
      modelAnswer: 'Such initiatives demand the highest standards of dignity and legal rigor. I ensure selection criteria are strictly objective and audited for disparate impact. Communication must be clear, transparent, and direct, paired with generous severance, extended healthcare, and outplacement career support.'
    },
    {
      id: 'hr-4',
      questionNumber: 4,
      category: 'Technical',
      question: 'How do you structure an effective performance review cycle that avoids recency bias and subjective scoring?',
      contextOrTips: 'Mention 360 feedback, continuous check-ins, calibration committees, and objective OKRs/KPIs.',
      expectedKeyPoints: ['Quarterly continuous check-ins to prevent recency bias', 'Cross-departmental calibration committees', 'Behavioral anchors (BARS)'],
      modelAnswer: 'Annual reviews fail because of recency bias. I implement continuous quarterly touchpoints tied to objective milestones. For compensation reviews, we use Behaviorally Anchored Rating Scales (BARS) and cross-departmental calibration panels to normalize manager grading tendencies.'
    },
    {
      id: 'hr-5',
      questionNumber: 5,
      category: 'HR',
      question: 'What strategies have you successfully used to improve Diversity, Equity, and Inclusion (DEI) in hiring pipelines?',
      contextOrTips: 'Cover inclusive job descriptions, blind resume screening, diverse interview panels, and targeted sourcing.',
      expectedKeyPoints: ['De-biased job posting language', 'Structured interview rubrics with scorecards', 'Diverse sourcing partnerships and candidate slates'],
      modelAnswer: 'I analyze job descriptions using inclusive language scanners to remove gendered jargon. In recruitment, we institute structured candidate scorecards and diverse interview panels to prevent unconscious affinity bias, while building proactive sourcing partnerships with non-traditional talent communities.'
    }
  ],
  'Custom Role': [
    {
      id: 'cr-1',
      questionNumber: 1,
      category: 'HR',
      question: 'Tell me about yourself, your core professional competencies, and what makes you uniquely qualified for this role.',
      contextOrTips: 'Highlight your signature strengths, relevant career milestones, and alignment with the position.',
      expectedKeyPoints: ['Clear career narrative', 'Quantifiable impact & achievements', 'Specific role alignment'],
      modelAnswer: 'I bring a proven track record of solving high-stakes challenges by combining deep subject matter expertise with cross-functional execution. Throughout my career, I have consistently driven measurable outcomes and fostered collaboration across diverse teams.'
    },
    {
      id: 'cr-2',
      questionNumber: 2,
      category: 'Technical',
      question: 'What is the most complex problem you have solved in your specialized domain, and what methodology did you employ?',
      contextOrTips: 'Break down problem definition, constraints, step-by-step execution, and final business impact.',
      expectedKeyPoints: ['Clearly defined constraints', 'Methodical execution', 'Quantified results'],
      modelAnswer: 'I faced a systemic bottleneck where output was constrained by outdated processes. I conducted a comprehensive workflow audit, isolated the highest-friction handoffs, and introduced a structured framework that increased delivery throughput by 35% within two quarters.'
    },
    {
      id: 'cr-3',
      questionNumber: 3,
      category: 'Behavioral',
      question: 'Tell me about a time you had to adapt quickly to significant organizational or strategy changes.',
      contextOrTips: 'Demonstrate resilience, growth mindset, and leadership through ambiguity.',
      expectedKeyPoints: ['Positive adaptability', 'Maintaining team focus', 'Fast learning curve'],
      modelAnswer: 'When company priorities shifted mid-year towards an entirely new vertical, I quickly upskilled on the new domain requirements, realigned our project milestones, and coached my peers through the transition, delivering our initial target ahead of schedule.'
    },
    {
      id: 'cr-4',
      questionNumber: 4,
      category: 'Situational',
      question: 'How do you prioritize competing deadlines when multiple high-stakes deliverables are due simultaneously?',
      contextOrTips: 'Explain impact vs urgency matrices, communication with leadership, and delegation.',
      expectedKeyPoints: ['Strategic prioritization', 'Proactive stakeholder alignment', 'Decisive execution'],
      modelAnswer: 'I assess deliverables against strategic impact and business urgency. I immediately reach out to stakeholders with transparent status updates and proposed sequencing, ensuring critical paths are safeguarded before escalating or negotiating auxiliary deadlines.'
    },
    {
      id: 'cr-5',
      questionNumber: 5,
      category: 'Behavioral',
      question: 'Where do you see yourself developing professionally over the next 2 to 3 years in this role?',
      contextOrTips: 'Align personal growth goals with company value and leadership maturity.',
      expectedKeyPoints: ['Commitment to mastering the role', 'Mentorship and leadership aspirations', 'Continuous learning mindset'],
      modelAnswer: 'Over the next few years, I aim to master the core responsibilities of this role, spearhead high-impact initiatives, and mentor emerging talent, expanding my leadership capacity while contributing to long-term organizational success.'
    }
  ]
};

// Generates expanded questions up to 20 by extrapolating themes
export function getExpandedQuestions(
  role: JobRole,
  customTitle?: string,
  level: ExperienceLevel = '3–5 Years',
  type: InterviewType = 'Mixed',
  count: number = 5
): InterviewQuestion[] {
  const baseList = DEFAULT_QUESTIONS_BY_ROLE[role] || DEFAULT_QUESTIONS_BY_ROLE['Custom Role'];
  const title = customTitle || role;

  // Filter or prioritize based on type
  let filtered = [...baseList];
  if (type === 'Technical') {
    filtered = baseList.filter(q => q.category === 'Technical' || q.category === 'Situational');
  } else if (type === 'Behavioral') {
    filtered = baseList.filter(q => q.category === 'Behavioral' || q.category === 'Situational');
  } else if (type === 'HR') {
    filtered = baseList.filter(q => q.category === 'HR' || q.category === 'Behavioral');
  }

  if (filtered.length === 0) {
    filtered = [...baseList];
  }

  const result: InterviewQuestion[] = [];
  let index = 0;

  while (result.length < count) {
    const base = filtered[index % filtered.length];
    const questionNumber = result.length + 1;
    
    if (result.length < filtered.length) {
      result.push({
        ...base,
        id: `${role.toLowerCase().replace(/\s+/g, '-')}-${questionNumber}`,
        questionNumber,
      });
    } else {
      // Create intelligent variations
      const variations: Partial<InterviewQuestion>[] = [
        {
          question: `Regarding ${title}, how do you approach mentorship and sharing knowledge with more junior teammates?`,
          category: 'Behavioral',
          contextOrTips: 'Focus on patience, documentation, pair working, and encouraging autonomy.'
        },
        {
          question: `What industry trends or new developments in ${title} are you following closely right now?`,
          category: 'Technical',
          contextOrTips: 'Demonstrate curiosity, active learning, and discernment about buzzwords vs true utility.'
        },
        {
          question: `Describe a scenario where you had to present complex findings or technical decisions to non-technical stakeholders.`,
          category: 'Behavioral',
          contextOrTips: 'Focus on simplifying analogies, avoiding excessive jargon, and tying decisions to business outcomes.'
        },
        {
          question: `How do you organize your day-to-day workflow to maintain deep work amidst constant communication notifications?`,
          category: 'HR',
          contextOrTips: 'Mention time blocking, asynchronous communication, and prioritization techniques.'
        },
        {
          question: `What is your approach to handling constructive criticism or code/design reviews that require extensive rework?`,
          category: 'Behavioral',
          contextOrTips: 'Emphasize ego separation, objective quality standards, and appreciation for feedback.'
        }
      ];
      const variant = variations[(result.length - filtered.length) % variations.length];
      result.push({
        id: `${role.toLowerCase().replace(/\s+/g, '-')}-${questionNumber}`,
        questionNumber,
        category: (variant.category as any) || 'Behavioral',
        question: variant.question || `How do you see ${title} best practices evolving in the next few years?`,
        contextOrTips: variant.contextOrTips || 'Structure your thoughts around scalability, user impact, and efficiency.',
        expectedKeyPoints: ['Thoughtful structure', 'Practical examples', 'Focus on continuous improvement'],
        modelAnswer: 'In my experience, success hinges on establishing clear standards, welcoming peer feedback, and continually evaluating the real impact on end-users and team velocity.'
      });
    }
    index++;
  }

  return result.slice(0, count);
}
