export type BlogLocale = 'en' | 'ar';

export type BlogSection = {
  heading: string;
  paragraphs: string[];
};

export type BlogArticleContent = {
  title: string;
  kicker: string;
  description: string;
  sections: BlogSection[];
  takeaways: string[];
  conclusion: string;
};

export type BlogArticle = {
  slug: string;
  category: string;
  date: string;
  readTime: string;
  en: BlogArticleContent;
  ar: BlogArticleContent;
};

const blogArticles: BlogArticle[] = [
  {
    slug: 'ai-guardrails-for-enterprise-llms',
    category: 'AI',
    date: 'October 10, 2025',
    readTime: '8 min read',
    en: {
      title: 'AI Guardrails for Enterprise LLMs',
      kicker: 'Safeguarding generative AI programs from design through deployment',
      description:
        'Large language models are now embedded into customer support, knowledge discovery, and developer workflows. Without structured guardrails, however, these systems can leak sensitive data, amplify bias, or be hijacked by prompt injection. This guide outlines how to govern LLMs across the entire lifecycle.',
      sections: [
        {
          heading: 'Map high-risk use cases before writing a line of code',
          paragraphs: [
            'Start by cataloging every interaction your teams or customers will have with a language model. Identify which prompts could expose regulated data, critical intellectual property, or financial advice. Capture abuse stories for insider misuse, malicious injection, and accidental leakage to build a shared threat model.',
            'From there, classify data inputs, retrieval connectors, and output channels by sensitivity level. This foundation lets you prioritize controls, such as red-teaming high-value prompts monthly while applying automated checks on lower-impact scenarios.'
          ]
        },
        {
          heading: 'Implement policy-as-code guardrails',
          paragraphs: [
            'Translate governance requirements into machine-enforceable policies. Prompt filters can sanitize user input, while content classifiers score outputs against toxicity, bias, or confidentiality criteria. Tie each policy to owner teams and escalation flows so adjustments happen quickly when models drift.',
            'Use a decision engine to orchestrate guardrails in a deterministic order. For example, enforce retrieval access policies before a generation occurs, then evaluate the result for disallowed entities. Document the chain-of-custody for every blocked response to maintain auditability.'
          ]
        },
        {
          heading: 'Operationalize continuous evaluation',
          paragraphs: [
            'Guardrails decay unless you instrument telemetry. Capture every blocked prompt, override request, and policy exception into your SIEM. Pair synthetic prompt suites with human evaluation to measure how controls perform against new jailbreak techniques.',
            'Mature programs run quarterly kill-switch exercises to verify they can halt model outputs across channels. They also align incident response with the SOC so that AI-related detections receive the same triage as traditional security alerts.'
          ]
        }
      ],
      takeaways: [
        'Treat LLM threat modeling as a cross-functional exercise spanning security, legal, and product.',
        'Codify guardrails and map them to automated enforcement points.',
        'Monitor policy effectiveness with shared telemetry and red-team exercises.'
      ],
      conclusion:
        'With proactive guardrails, enterprises can release AI copilots and assistants confidently. The advantage goes to teams that combine structured governance, measurable controls, and a culture of continuous testing.'
    },
    ar: {
      title: 'حوكمة الذكاء الاصطناعي لنماذج اللغة المؤسسية',
      kicker: 'تأمين برامج الذكاء الاصطناعي التوليدي من التصميم إلى الإنتاج',
      description:
        'أصبحت نماذج اللغة الضخمة جزءًا من دعم العملاء، واكتشاف المعرفة، وتدفقات عمل المطورين. لكن من دون حواجز حاكمة منظمة، يمكن لهذه الأنظمة كشف بيانات حساسة أو تضخيم التحيز أو التعرض لهجمات حقن الأوامر. يوضح هذا الدليل كيفية إدارة نماذج اللغة عبر كامل دورة حياتها.',
      sections: [
        {
          heading: 'حدد حالات الاستخدام عالية المخاطر قبل البدء في التطوير',
          paragraphs: [
            'ابدأ بحصر كل تفاعل سيجريه فريقك أو عملاؤك مع نموذج اللغة. حدد الأوامر التي قد تكشف بيانات خاضعة للتنظيم أو ملكية فكرية حرجة أو نصائح مالية. اجمع سيناريوهات إساءة الاستخدام للمستخدمين الداخليين والهجمات الخبيثة والتسريبات العارضة لبناء نموذج تهديد مشترك.',
            'بعد ذلك صنّف مدخلات البيانات ووصلات الاسترجاع وقنوات الإخراج حسب مستوى الحساسية. يسمح لك هذا الأساس بإعطاء الأولوية للضوابط مثل اختبار الاختراق الشهري للأوامر عالية القيمة مع تطبيق فحوصات آلية على السيناريوهات الأقل خطورة.'
          ]
        },
        {
          heading: 'طبّق حواجز الحوكمة بصيغة سياسات برمجية',
          paragraphs: [
            'حوّل متطلبات الحوكمة إلى سياسات قابلة للتنفيذ آليًا. يمكن لمرشحات الأوامر تطهير المدخلات، بينما تقيس مصنفات المحتوى المخرجات وفق معايير السمية أو التحيز أو السرية. اربط كل سياسة بفرق مالكة ومسارات تصعيد بحيث يمكن تعديلها بسرعة عند انحراف النماذج.',
            'استخدم محرك قرارات لتنظيم الحواجز بترتيب حتمي. على سبيل المثال، طبّق سياسات الوصول إلى الاسترجاع قبل عملية التوليد، ثم قيّم النتيجة بحثًا عن الكيانات الممنوعة. وثّق سلسلة الحفظ لكل استجابة تم حظرها للحفاظ على قابلية التدقيق.'
          ]
        },
        {
          heading: 'فعّل التقييم المستمر كعملية تشغيلية',
          paragraphs: [
            'تتراجع فعالية الحواجز ما لم تُجهَّز بمقاييس واضحة. اجمع كل أمر محظور وطلب تجاوز واستثناء سياسة في نظام إدارة أحداث الأمان. اجمع بين مجموعات الأوامر الاصطناعية والتقييم البشري لقياس أداء الضوابط ضد تقنيات الاختراق الجديدة.',
            'تشغّل البرامج الناضجة تمارين فصل ربع سنوية للتحقق من إمكانية إيقاف مخرجات النموذج عبر القنوات. كما تُنسّق الاستجابة للحوادث مع مركز العمليات الأمنية بحيث تحصل تنبيهات الذكاء الاصطناعي على نفس أولوية الانذارات الأمنية التقليدية.'
          ]
        }
      ],
      takeaways: [
        'تعامل مع نمذجة تهديدات نماذج اللغة كمجهود مشترك بين الأمن والقانون والمنتج.',
        'صغ الحواجز كسياسات برمجية واربطها بنقاط تنفيذ آلية.',
        'راقب فعالية السياسات باستخدام المقاييس المشتركة وتمارين الفريق الأحمر.'
      ],
      conclusion:
        'من خلال الحواجز الاستباقية يمكن للمؤسسات إطلاق مساعدين ذكيين بثقة. التفوق سيكون للفرق التي تجمع بين الحوكمة المنظمة والضوابط القابلة للقياس وثقافة الاختبار المستمر.'
    }
  },
  {
    slug: 'operationalizing-zero-trust-hybrid-enterprises',
    category: 'Security',
    date: 'September 28, 2025',
    readTime: '9 min read',
    en: {
      title: 'Operationalizing Zero Trust in Hybrid Enterprises',
      kicker: 'Delivering measurable zero trust outcomes across cloud and on-prem estates',
      description:
        'Zero trust is no longer a slogan. Boards expect compression of attack surfaces, rapid breach containment, and verifiable controls. This playbook translates strategy into pragmatic workstreams for hybrid enterprises with legacy baggage.',
      sections: [
        {
          heading: 'Stabilize identity and device baselines',
          paragraphs: [
            'Identity is the control plane. Begin by consolidating directories, synchronizing entitlements, and eliminating dormant accounts. Pair this with device telemetry that confirms health posture before issuing short-lived session tokens.',
            'Implement conditional access policies that adapt to risk signals. When login velocity spikes or unmanaged devices appear, trigger step-up verification or isolate the session entirely.'
          ]
        },
        {
          heading: 'Segment networks through software-defined perimeters',
          paragraphs: [
            'Legacy VLANs rarely align with modern workflows. Use software-defined perimeters to wrap sensitive applications with identity-aware proxies. Assign least-privilege access based on user persona, device posture, and contextual risk.',
            'Augment segmentation with micro-firewalling and east-west traffic analysis. When workloads span multiple clouds, normalize telemetry into a shared data model so the SOC can spot lateral movement fast.'
          ]
        },
        {
          heading: 'Automate policy verification and evidence gathering',
          paragraphs: [
            'Regulators and auditors expect proof that zero trust policies actually run. Automate evidence collection by logging policy evaluation events, denied connections, and privilege escalations. Map each control to compliance requirements for rapid reporting.',
            'Establish quarterly tabletop exercises where security, networking, and application owners validate response playbooks. Measure success through containment time, user impact, and the volume of manual overrides.'
          ]
        }
      ],
      takeaways: [
        'Identity and device posture must stabilize before advanced segmentation pays off.',
        'Software-defined perimeters deliver least-privilege access without re-architecting every network.',
        'Automated evidence accelerates auditor confidence and highlights policy drift early.'
      ],
      conclusion:
        'Zero trust becomes real when controls are automated, observable, and measured against business outcomes. Hybrid enterprises can evolve incrementally while shrinking exposure every quarter.'
    },
    ar: {
      title: 'تشغيل الثقة الصفرية في البيئات الهجينة',
      kicker: 'تحقيق نتائج ملموسة للثقة الصفرية عبر البيئات السحابية والمحلية',
      description:
        'لم تعد الثقة الصفرية شعارًا دعائيًا. يتوقع مجلس الإدارة تقليص سطح الهجوم، واحتواء الاختراق بسرعة، وضوابط قابلة للتحقق. يحول هذا الدليل الإستراتيجية إلى مسارات عمل عملية للمؤسسات الهجينة ذات الإرث التقني.',
      sections: [
        {
          heading: 'تثبيت الهوية وخط الأساس للأجهزة',
          paragraphs: [
            'الهوية هي طبقة التحكم الأولى. ابدأ بتوحيد أدلة الهوية، ومزامنة صلاحيات الوصول، والقضاء على الحسابات غير النشطة. اربط ذلك ببيانات الأجهزة التي تؤكد وضعها الصحي قبل إصدار رموز جلسات قصيرة المدى.',
            'طبّق سياسات وصول مشروط تتكيف مع إشارات المخاطر. عندما يرتفع معدل تسجيل الدخول بشكل غير طبيعي أو تظهر أجهزة غير مُدارة، فعّل تحققًا متقدمًا أو اعزل الجلسة بالكامل.'
          ]
        },
        {
          heading: 'تجزئة الشبكات عبر أطراف افتراضية معرَّفة بالبرمجيات',
          paragraphs: [
            'نادراً ما تتماشى الشبكات التقليدية مع طريقة العمل الحديثة. استخدم أطرافًا افتراضية معرفّة بالبرمجيات لإحاطة التطبيقات الحساسة بوسيطات واعية بالهوية. امنح أقل قدر من الصلاحيات بناءً على شخصية المستخدم ووضع الجهاز والمخاطر السياقية.',
            'عزّز التجزئة بجدران حماية دقيقة وتحليل حركة المرور الأفقية. وعندما تمتد الأعباء عبر عدة سحب، وحّد البيانات في نموذج مشترك ليتمكن مركز العمليات من اكتشاف الحركة الجانبية بسرعة.'
          ]
        },
        {
          heading: 'أتمت التحقق من السياسات وجمع الأدلة',
          paragraphs: [
            'يتوقع المنظمون والمدققون إثباتًا على تنفيذ سياسات الثقة الصفرية فعليًا. أتمت جمع الأدلة عبر تسجيل أحداث تقييم السياسات والاتصالات المرفوضة وتصعيدات الصلاحيات. اربط كل تحكم بمتطلبات الامتثال لإعداد التقارير السريعة.',
            'نفّذ تمارين محاكاة ربع سنوية تجمع الأمن والشبكات وأصحاب التطبيقات للتحقق من خطط الاستجابة. قس النجاح بوقت الاحتواء وأثر المستخدم وحجم عمليات التجاوز اليدوية.'
          ]
        }
      ],
      takeaways: [
        'يجب تثبيت الهوية ووضع الجهاز قبل أن تؤتي التجزئة المتقدمة ثمارها.',
        'تتيح الأطراف الافتراضية المعتمدة على الهوية وصولًا بأقل الصلاحيات دون إعادة تصميم الشبكة بالكامل.',
        'تُسرّع الأدلة المؤتمتة ثقة المدققين وتكشف انحراف السياسات مبكرًا.'
      ],
      conclusion:
        'تصبح الثقة الصفرية واقعية عندما تُؤتمت الضوابط وتُقاس مقابل النتائج التجارية. يمكن للمؤسسات الهجينة التطور تدريجيًا مع تقليص المخاطر كل ربع سنة.'
    }
  },
  {
    slug: 'gisec-global-2025-threat-highlights',
    category: 'Events',
    date: 'September 15, 2025',
    readTime: '6 min read',
    en: {
      title: 'GISEC Global 2025: Threat Intelligence Highlights',
      kicker: 'Regional adversaries, automation showcases, and executive priorities from Dubai',
      description:
        'GISEC Global reaffirmed that threat actors are evolving faster than defensive playbooks. From deepfake-enabled fraud to sovereign investment in SOC modernization, the conference delivered pragmatic takeaways for security leaders.',
      sections: [
        {
          heading: 'Deepfake and voice cloning surge across the GCC',
          paragraphs: [
            'Incident responders from financial institutions reported a 4x increase in voice clone-enabled fraud attempts since Q1. Attackers weaponize public audio and AI call centers to bypass human verification in treasury operations.',
            'Recommended countermeasures include adopting out-of-band verification for high-value approvals, rotating authentication phrases weekly, and educating executives on identifying audio anomalies.'
          ]
        },
        {
          heading: 'SOCs prioritize automation over headcount growth',
          paragraphs: [
            'Panelists from telecom and energy sectors shared blueprints for augmenting analysts with response automation. Playbooks now ingest threat intel, enrich alerts with asset context, and trigger containment workflows without waiting for manual approval.',
            'Vendors demonstrated AI copilots that summarize incidents in Arabic and English simultaneously, helping bi-lingual teams collaborate in real time.'
          ]
        },
        {
          heading: 'Executive boards demand measurable resilience',
          paragraphs: [
            'CISOs highlighted boardroom questions shifting from “are we compliant?” to “how quickly can we recover from a ransomware blast radius?” Metrics now emphasize dwell time, segmentation efficacy, and dependency mapping clarity.',
            'Several enterprises showcased resilience dashboards that fuse cyber metrics with business impact, ensuring risk conversations resonate beyond technical audiences.'
          ]
        }
      ],
      takeaways: [
        'Voice-based fraud controls must adapt to AI-generated audio at scale.',
        'Automation-first SOC strategies deliver faster containment without burning out analysts.',
        'Resilience metrics that connect to business outcomes win executive sponsorship.'
      ],
      conclusion:
        'Security leaders leaving Dubai are doubling down on AI-savvy defenses, SOC automation, and board-ready storytelling. Those priorities will dictate investment roadmaps over the next 12 months.'
    },
    ar: {
      title: 'أبرز استخبارات التهديد في مؤتمر GISEC Global 2025',
      kicker: 'الخصوم الإقليميون وعروض الأتمتة وأولويات التنفيذيين في دبي',
      description:
        'أكد مؤتمر GISEC Global أن المهاجمين يتطورون أسرع من خطط الدفاع التقليدية. من الاحتيال المدفوع بالتزييف العميق إلى الاستثمارات السيادية في تحديث مراكز العمليات، قدّم الحدث دروسًا عملية لقادة الأمن.',
      sections: [
        {
          heading: 'طفرة في التزييف الصوتي عبر دول الخليج',
          paragraphs: [
            'أبلغ مستجيبون لحوادث من مؤسسات مالية عن زيادة بمقدار أربع مرات في محاولات الاحتيال باستخدام النسخ الصوتي منذ الربع الأول. يستغل المهاجمون المقاطع الصوتية العامة ومراكز الاتصال المعززة بالذكاء الاصطناعي لتجاوز التحقق البشري في العمليات المالية.',
            'تشمل التدابير المقترحة اعتماد تحقق خارج النطاق للموافقات عالية القيمة، وتغيير عبارات المصادقة أسبوعيًا، وتوعية التنفيذيين بكيفية اكتشاف الشذوذات الصوتية.'
          ]
        },
        {
          heading: 'مراكز العمليات تركز على الأتمتة بدل زيادة الأعداد',
          paragraphs: [
            'شارك خبراء من قطاعات الاتصالات والطاقة مخططات لتمكين المحللين بأدوات الاستجابة المؤتمتة. أصبحت الكتب التشغيلية الآن تُغني التنبيهات بسياق الأصول وتطلق إجراءات الاحتواء دون انتظار الموافقة اليدوية.',
            'عرض المزوّدون مساعدين مدعومين بالذكاء الاصطناعي يلخّصون الحوادث باللغتين العربية والإنجليزية، ما يساعد الفرق ثنائية اللغة على التعاون الفوري.'
          ]
        },
        {
          heading: 'مجالس الإدارة تطالب بمرونة قابلة للقياس',
          paragraphs: [
            'أوضح مديرو أمن المعلومات أن الأسئلة في قاعات الاجتماعات تحولت من "هل نحن ملتزمون؟" إلى "ما مدى سرعة تعافينا من هجوم الفدية؟". أصبحت المقاييس تركز على زمن البقاء، وفعالية التجزئة، ووضوح خرائط الاعتماد.',
            'عرضت عدة مؤسسات لوحات مرونة تجمع مقاييس الأمن مع أثر الأعمال، لضمان أن محادثات المخاطر تتجاوز الجمهور التقني.'
          ]
        }
      ],
      takeaways: [
        'يجب أن تتطور ضوابط الاحتيال الصوتي لمواجهة الصوت المُنشأ آليًا على نطاق واسع.',
        'استراتيجيات مراكز العمليات القائمة على الأتمتة تحقق احتواءً أسرع دون إنهاك المحللين.',
        'المقاييس المرتبطة بنتائج الأعمال تكسب دعم التنفيذيين.'
      ],
      conclusion:
        'يغادر قادة الأمن دبي وهم عازمون على تعزيز دفاعات واعية بالذكاء الاصطناعي، وأتمتة مراكز العمليات، وسرد قصص مقنع لمجالس الإدارة. ستحدد هذه الأولويات خطط الاستثمار خلال الأشهر الاثني عشر القادمة.'
    }
  },
  {
    slug: 'blueprinting-ai-incident-response-runbooks',
    category: 'AI',
    date: 'October 5, 2025',
    readTime: '6 min read',
    en: {
      title: 'Blueprinting AI Incident Response Runbooks',
      kicker: 'Marrying red-team insights with SOC automations to contain AI-native attacks',
      description:
        'AI-generated threats do not follow the same playbook as traditional malware. Incident responders need runbooks that recognize prompt injection, model manipulation, and data poisoning. This article shares a repeatable pattern to update response programs.',
      sections: [
        {
          heading: 'Define AI-specific detection signals',
          paragraphs: [
            'Catalog telemetry from model inference gateways, vector databases, and content moderation layers. Look for anomalous prompt patterns, retrieval spikes, and outputs that violate policy labels.',
            'Correlate these signals with user identity and session IDs so responders can trace malicious activity across chat interfaces, APIs, and background automations.'
          ]
        },
        {
          heading: 'Align red-team findings with automated containment',
          paragraphs: [
            'When a red team demonstrates a jailbreak, codify the mitigations into automation. Examples include disabling affected prompts, revoking refresh tokens, or forcing data isolation for impacted knowledge bases.',
            'Create decision trees that differentiate between benign experimentation and true compromise. This keeps the SOC from over-reacting while still escalating high-severity incidents.'
          ]
        },
        {
          heading: 'Instrument after-action learning loops',
          paragraphs: [
            'Every AI incident should feed back into model evaluation and product backlog grooming. Track mean time to detect, contain, and restore trust in the system. Share sanitized lessons with engineering and legal stakeholders.',
            'Mature organizations schedule quarterly workshops where data scientists and responders review near misses, update synthetic test suites, and refine escalation triggers.'
          ]
        }
      ],
      takeaways: [
        'Collect telemetry unique to AI pipelines to spot prompt-level abuse.',
        'Automate mitigations the moment offensive teams prove a bypass.',
        'Feed incident retrospectives into model governance and feature roadmaps.'
      ],
      conclusion:
        'Modern incident response programs treat AI threats as first-class citizens. Runbooks that fuse automation, human judgment, and continuous testing keep copilots trustworthy even under attack.'
    },
    ar: {
      title: 'خارطة استجابة للحوادث المدفوعة بالذكاء الاصطناعي',
      kicker: 'دمج نتائج الفريق الأحمر مع أتمتة مركز العمليات لاحتواء الهجمات الأصلية للذكاء الاصطناعي',
      description:
        'لا تتبع التهديدات التي ينشئها الذكاء الاصطناعي نفس سيناريوهات البرمجيات الخبيثة التقليدية. يحتاج مستجيبوا الحوادث إلى كتب تشغيل تميز حقن الأوامر والتلاعب بالنماذج وتسميم البيانات. يشارك هذا المقال نمطًا متكررًا لتحديث برامج الاستجابة.',
      sections: [
        {
          heading: 'حدد إشارات اكتشاف خاصة بالذكاء الاصطناعي',
          paragraphs: [
            'اجمع بيانات التتبع من بوابات الاستدلال، وقواعد البيانات المتجهة، وطبقات مراقبة المحتوى. ابحث عن أنماط أوامر غير طبيعية، وارتفاعات في الاسترجاع، ومخرجات تنتهك التسميات السياسية.',
            'اربِط هذه الإشارات بهوية المستخدم ومعرّفات الجلسات حتى يتمكن المستجيبون من تتبع النشاط الخبيث عبر واجهات الدردشة وواجهات البرمجة والأتمتة الخلفية.'
          ]
        },
        {
          heading: 'اربط نتائج الفريق الأحمر بالاحتواء المؤتمت',
          paragraphs: [
            'عندما يثبت الفريق الأحمر إمكانية الاختراق، قم بتكويد إجراءات التخفيف في الأتمتة. تشمل الأمثلة تعطيل الأوامر المتأثرة، إلغاء رموز التحديث، أو فرض عزل البيانات لقاعد المعرفة المتضررة.',
            'أنشئ أشجار قرار تفرق بين التجارب البريئة والاختراق الحقيقي. يحافظ ذلك على مركز العمليات من ردود الفعل المبالغ فيها مع تصعيد الحوادث عالية الخطورة.'
          ]
        },
        {
          heading: 'فعّل حلقات التعلم بعد الحوادث',
          paragraphs: [
            'يجب أن تغذي كل حادثة ذكاء اصطناعي تحديثات تقييم النماذج وجدولة مهام المنتج. تتبع متوسط زمن الاكتشاف والاحتواء واستعادة الثقة في النظام. شارك الدروس المنقحة مع فرق الهندسة والشؤون القانونية.',
            'تدعو المؤسسات الناضجة إلى ورشات عمل ربع سنوية يراجع فيها علماء البيانات والمستجيبون الحوادث القريبة، ويحدثون مجموعات الاختبار الاصطناعية، ويصقلون محفزات التصعيد.'
          ]
        }
      ],
      takeaways: [
        'اجمع بيانات تتبع فريدة لمسارات الذكاء الاصطناعي لرصد إساءة استخدام الأوامر.',
        'أتمت إجراءات التخفيف بمجرد أن يثبت الفريق الأحمر حدوث تجاوز.',
        'أدخل تقارير الحوادث في حوكمة النماذج وخطط الميزات.'
      ],
      conclusion:
        'تتعامل برامج الاستجابة الحديثة مع تهديدات الذكاء الاصطناعي كعنصر أساسي. الكتب التشغيلية التي تمزج الأتمتة والحكم البشري والاختبار المستمر تحافظ على موثوقية المساعدين حتى أثناء الهجمات.'
    }
  },
  {
    slug: 'zero-trust-quick-wins-legacy-environments',
    category: 'Compliance',
    date: 'September 20, 2025',
    readTime: '7 min read',
    en: {
      title: 'Zero Trust Quick Wins for Legacy Environments',
      kicker: 'Delivering visible security value within 90 days',
      description:
        'Legacy platforms often feel incompatible with zero trust aspirations. Yet security teams can still deliver high-impact wins without rewriting every application. This playbook outlines a 90-day sprint to build momentum.',
      sections: [
        {
          heading: 'Inventory high-risk access paths',
          paragraphs: [
            'Start with systems that expose privileged credentials or house regulated data. Document how administrators connect, what authentication methods exist, and where logging falls short. Visualize dependencies to highlight single points of failure.',
            'Use that map to prioritize the first set of controls—typically multi-factor authentication, privileged access reviews, and segmentation for remote admins.'
          ]
        },
        {
          heading: 'Wrap legacy apps with modern access layers',
          paragraphs: [
            'Introduce identity-aware proxies or remote browser isolation so users never touch the raw application directly. Enforce device posture checks and session recording for sensitive workflows.',
            'When full integration is impossible, deploy just-in-time access brokers that issue ephemeral credentials and revoke them automatically after task completion.'
          ]
        },
        {
          heading: 'Quantify impact and prepare the next sprint',
          paragraphs: [
            'Measure reductions in standing privilege, unauthorized login attempts, and lateral movement paths discovered during tabletop exercises. Communicate progress to stakeholders using dashboards that tie improvements to business risk.',
            'Identify which legacy constraints—unsupported protocols, vendor lock-in, limited APIs—require executive sponsorship to remove. Feed those blockers into the roadmap for the next zero trust iteration.'
          ]
        }
      ],
      takeaways: [
        'Even partial zero trust controls shrink risk around legacy platforms.',
        'Access brokers and proxies deliver containment without touching application code.',
        'Metrics that resonate with business stakeholders secure funding for longer transformations.'
      ],
      conclusion:
        'Zero trust momentum depends on quick, repeatable wins. By compressing privilege risk and proving measurable gains, teams earn the mandate to modernize deeper layers next.'
    },
    ar: {
      title: 'انتصارات سريعة للثقة الصفرية في الأنظمة القديمة',
      kicker: 'تقديم قيمة أمنية واضحة خلال 90 يومًا',
      description:
        'غالبًا ما تبدو المنصات القديمة غير متوافقة مع طموحات الثقة الصفرية، إلا أن فرق الأمن تستطيع تحقيق مكاسب عالية التأثير دون إعادة كتابة كل تطبيق. تحدد هذه الخطة سباقًا لمدة 90 يومًا لبناء الزخم.',
      sections: [
        {
          heading: 'احصر مسارات الوصول عالية الخطورة',
          paragraphs: [
            'ابدأ بالأنظمة التي تكشف بيانات اعتماد مميزة أو تحتوي على بيانات خاضعة للتنظيم. وثّق طريقة اتصال المسؤولين، وأساليب المصادقة المتاحة، ونقاط الضعف في التسجيل. صوّر الاعتمادات لإبراز نقاط الفشل الفردية.',
            'استخدم هذه الخريطة لتحديد أول مجموعة من الضوابط—عادةً المصادقة متعددة العوامل، ومراجعات الوصول المميز، وتجزئة الوصول للمسؤولين عن بُعد.'
          ]
        },
        {
          heading: 'أحط التطبيقات القديمة بطبقات وصول حديثة',
          paragraphs: [
            'قدّم وسطاء وصول واعية بالهوية أو عزل المتصفح عن بُعد حتى لا يتعامل المستخدمون مع التطبيق الخام مباشرة. فَعّل فحوصات وضع الجهاز وتسجيل الجلسات للعمليات الحساسة.',
            'عندما يكون التكامل الكامل مستحيلًا، انشر وسطاء الوصول الفوري الذين يصدرون بيانات اعتماد مؤقتة ويلغونها آليًا بعد إتمام المهمة.'
          ]
        },
        {
          heading: 'قِس الأثر واستعد للمرحلة التالية',
          paragraphs: [
            'قِس انخفاض الامتيازات الدائمة ومحاولات تسجيل الدخول غير المصرح بها ومسارات الحركة الجانبية المكتشفة أثناء التمارين. انقل التقدم لأصحاب المصلحة عبر لوحات تعرض كيف تقل المخاطر على مستوى الأعمال.',
            'حدد القيود القديمة—مثل البروتوكولات غير المدعومة أو قيود المورّدين أو واجهات البرمجة المحدودة—التي تتطلب دعمًا إداريًا لإزالتها. أدرج هذه العوائق في خارطة الطريق لمرحلة الثقة الصفرية التالية.'
          ]
        }
      ],
      takeaways: [
        'حتى الضوابط الجزئية للثقة الصفرية تقلل المخاطر حول المنصات القديمة.',
        'يوفر الوسطاء والوسائط الوقائية احتواءً دون تعديل كود التطبيق.',
        'المقاييس المرتبطة بمخاطر الأعمال تؤمن تمويلًا لتحولات أعمق.'
      ],
      conclusion:
        'يعتمد زخم الثقة الصفرية على مكاسب سريعة قابلة للتكرار. من خلال تقليص امتيازات الوصول وإثبات التحسن القابل للقياس، تحصد الفرق تفويضًا لتحديث الطبقات الأعمق لاحقًا.'
    }
  }
];

export function listBlogArticles() {
  return blogArticles;
}

export function getBlogArticle(slug: string) {
  return blogArticles.find((article) => article.slug === slug) ?? null;
}
