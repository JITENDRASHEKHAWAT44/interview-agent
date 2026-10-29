export const MOCK_INTERVIEW_QUESTIONS = [
  "Welcome! To begin, could you introduce yourself and walk me through the most technically challenging project highlighted on your resume?",
  "In your resume, you mention building retrieval-augmented generation (RAG) pipelines. What strategy did you employ for chunking documents, and how did you mitigate hallucination during retrieval?",
  "Let's dive into system design. Suppose our interview service experiences a 10x traffic spike with simultaneous audio streaming. How would you design the transcription and queuing architecture to keep latency under 400ms?",
  "When evaluating candidate answers using an LLM, temperature and prompt structure greatly affect grading consistency. How would you design an automated regression test suite for interview evaluation prompts?",
  "Can you describe a scenario where you had to choose between inference speed and model accuracy in a production ML system? How did you justify your choice to stakeholders?",
  "Walk me through how you would implement token-level rate limiting and user session isolation in a multi-tenant FastAPI application.",
  "Tell me about a time when you received ambiguous feedback or requirements from a project lead. How did you resolve the ambiguity and deliver on schedule?",
  "What is your approach to handling out-of-vocabulary technical jargon or heavily accented audio in speech-to-text models like Sarvam Saaras?",
  "How do you monitor and detect prompt drift or model degradation over time when using hosted LLM APIs?",
  "To wrap up our interview: what is one emergent AI architectural pattern or research paper from the past six months that you are most excited about, and how would you apply it here?"
];

export const MOCK_FINAL_REPORT = {
  overallScore: 8.4,
  hiringRecommendation: "Strong Hire",
  recommendationReason: "Candidate demonstrated authoritative domain knowledge in LLM system design, RAG pipelines, and API latency optimization. Communication was succinct and technical explanations were backed by practical architectural experience.",
  atsScore: 92,
  metrics: [
    { label: "Technical Skills", score: 9.0, max: 10, summary: "Solid command of vector indexing, token rate-limiting, and async pipeline orchestration." },
    { label: "Communication", score: 8.5, max: 10, summary: "Articulate, structured responses with clear trade-off rationale." },
    { label: "Problem Solving", score: 8.0, max: 10, summary: "Effective analytical decomposition of scaling bottlenecks and latency constraints." },
    { label: "Confidence", score: 8.5, max: 10, summary: "Composed delivery, maintained professional tone under technical probing." },
    { label: "Resume Strength", score: 8.2, max: 10, summary: "Projects closely match modern GenAI and backend engineering requirements." }
  ],
  strengths: [
    "Deep architectural understanding of RAG retrieval chunking and hallucination mitigation techniques.",
    "Proactive consideration of streaming latency and multi-tenant isolation.",
    "Clear communication when articulating trade-offs between speed and accuracy.",
    "Strong practical grounding with modern LLM tooling (LangChain, Mistral, Sarvam)."
  ],
  weaknesses: [
    "Could provide more concrete quantitative metrics on previous project outcomes (e.g. 'reduced latency by 35%').",
    "Did not delve deeply into distributed tracing and observability tools (e.g., OpenTelemetry, LangSmith)."
  ],
  resumeImprovements: [
    "Quantify project achievements with specific impact metrics (latency reduction, cost savings, QPS handled).",
    "Group technical skills into specialized buckets: GenAI / ML Ops, Backend Architecture, Cloud & Infrastructure.",
    "Highlight specific production deployment environments (Docker, Kubernetes, AWS/GCP services)."
  ],
  topicsToImprove: [
    "Distributed tracing and structured logging for GenAI pipelines.",
    "Advanced vector search quantization techniques (HNSW, PQ, ScaNN).",
    "Resilience patterns: circuit breakers and graceful fallback strategies for 3rd-party LLM outages."
  ],
  roadmap: [
    {
      week: 1,
      title: "Observability & Metrics Quantification",
      focus: "Integrate OpenTelemetry / LangSmith into existing LLM pipelines. Revise resume bullet points with quantified throughput and latency metrics."
    },
    {
      week: 2,
      title: "Advanced Vector Search & Reranking",
      focus: "Implement cross-encoder rerankers (Cohere/BGE) and benchmark recall@k against dense-only retrieval."
    },
    {
      week: 3,
      title: "Streaming Architecture & Backpressure",
      focus: "Build an asynchronous WebSockets microservice handling bidirectional audio streaming with backpressure control."
    },
    {
      week: 4,
      title: "Mock Interview Drills & Behavioral Framing",
      focus: "Practice the STAR method on executive behavioral scenarios and record 3 full mock interviews."
    }
  ]
};
