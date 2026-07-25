from faster_whisper import WhisperModel

model = WhisperModel(
    "base",
    device="cpu",      # CPU ho to "cpu"
    compute_type="int8"
)

segments, info = model.transcribe("sound.wav")

print("Language:", info.language)

for segment in segments:
    print(segment.text)
    