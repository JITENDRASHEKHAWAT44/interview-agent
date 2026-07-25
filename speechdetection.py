# to capture voice
import sounddevice as sd # import the mics
from scipy.io.wavfile import write # used to convert the voice fine to .wav

fs = 16000
duration = 5

print("Speak...")

recording = sd.rec(
    int(duration * fs),
    samplerate=fs,
    channels=1,
    dtype="int16"
)

sd.wait()

write("voice.wav", fs, recording)

print("Saved!")

# stt

from faster_whisper import WhisperModel

model = WhisperModel(
    "base",
    device="cpu",      # CPU ho to "cpu"
    compute_type="int8"
)

segments, info = model.transcribe("voice.wav")

print("Language:", info.language)

for segment in segments:
    print(segment.text)
    

while True:

    record_voice()

    user_input = Speech_SarvamAi()

    print("\nYou:", user_input)

    if user_input.lower() == "exit":
        break

    chat_history.append(
        HumanMessage(content=user_input)
    )

    response = llm.invoke(chat_history)

    print("\nAI:", response.content)

    chat_history.append(
        AIMessage(content=response.content)
    )