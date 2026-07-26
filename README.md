# 🎤 AI Interview Coach

An AI-powered interview preparation platform that simulates a real technical interview based on your **Resume**, **Job Role**, and **Job Description**.

The application conducts a personalized interview, asks adaptive questions, evaluates your responses, and generates a detailed performance report with actionable feedback to help you improve before your real interview.

---

## 🚀 Features

- 📄 Upload Resume (PDF)
- 💼 Enter Job Role
- 📝 Paste Job Description
- 🤖 AI-generated personalized interview questions
- 🎯 Adaptive questioning based on previous answers
- 🎙️ Voice-based interview support
- ⌨️ Text answer support
- 🔊 AI Text-to-Speech for interview questions
- 🎤 Speech-to-Text for candidate responses
- 📊 Detailed Interview Performance Report
- 📈 ATS Resume Score
- 💡 Resume Improvement Suggestions
- 📚 Personalized Learning Roadmap
- 📥 Download Interview Report

---

## 🛠️ Tech Stack

### Frontend
- Streamlit

### Backend
- Python

### AI Models
- Mistral AI (Interview Generation & Evaluation)
- Sarvam AI (Speech-to-Text & Text-to-Speech)

### Libraries
- LangChain
- PyMuPDF (fitz)
- python-dotenv
- Streamlit
- io
- uuid

---

## ⚙️ How It Works

### Step 1
Upload your Resume (PDF).

### Step 2
Enter the Job Role you are applying for.

Example:
- AI Engineer
- Backend Developer
- Data Scientist
- Software Engineer

### Step 3
Paste the Job Description.

### Step 4
The AI analyzes:
- Resume
- Job Role
- Job Description

and prepares a personalized interview.

### Step 5
The AI asks **10 interview questions** one at a time.

Question categories include:

- Resume-based Questions
- Technical Questions
- Coding Questions
- Scenario-based Questions
- Behavioral Questions

The difficulty automatically adjusts based on your previous answers.

### Step 6
Answer using either:

- 🎙️ Voice
- ⌨️ Text

### Step 7
After the tenth question, the AI generates a complete interview report.

---

# 📊 Performance Report Includes

- Overall Rating
- Technical Skills
- Communication Skills
- Confidence
- Problem Solving
- Resume Strength
- ATS Score
- Strengths
- Weaknesses
- Resume Improvement Suggestions
- Topics to Improve
- 4-Week Learning Roadmap
- Final Hiring Recommendation

---

## 📂 Project Structure

```
AI-Interview-Coach/
│
├── app.py
├── requirements.txt
├── .env
├── README.md
└── assets/
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory.

```env
MISTRAL_API_KEY=your_mistral_api_key
SARVAM_API_KEY=your_sarvam_api_key
```

---

## 📦 Installation

Clone the repository

```bash
git clone https://github.com/yourusername/AI-Interview-Coach.git
```

Move into the project

```bash
cd AI-Interview-Coach
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run the application

```bash
streamlit run app.py
```

---

## 🎯 Future Improvements

- Camera-based mock interview
- Facial expression analysis
- Eye contact tracking
- Real-time confidence detection
- Coding editor with live execution
- Multi-language interview support
- Company-specific interview preparation
- Interview history dashboard
- PDF report generation
- Authentication and user profiles

---

## 📸 Screenshots

Add screenshots of:

- Resume Upload Page
- Interview Screen
- Voice Interview
- Final Report

---

## 🤝 Contributing

Contributions are welcome!

Feel free to fork the repository, create a feature branch, and submit a pull request.

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Jitendra**

AI & Data Science Student

Built with ❤️ using Python, Streamlit, LangChain, Mistral AI, and Sarvam AI.


## URL
url = https://interview-voice-agent.streamlit.app/