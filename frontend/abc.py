from elevenlabs.client import ElevenLabs

client = ElevenLabs(api_key="sk_f694c46bf55064fee6067ac922104fceb04e0625b1b1c19a")

audio = client.text_to_speech.convert(
    text="The first move is what sets everything in motion.",
    voice_id="JBFqnCBsd6RMkjVDRZzb",
    model_id="eleven_multilingual_v2",
    output_format="mp3_44100_128",
)

# Save the audio as an MP3 file
with open("output_audio.mp3", "wb") as audio_file:
    audio_file.write(audio)