// Web Speech API interface declarations for TypeScript
interface IWindow extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

export class SpeechHandler {
  private recognition: any = null;
  private isListening = false;
  private onTranscriptUpdate?: (transcript: string, isFinal: boolean) => void;
  private onError?: (error: string) => void;
  private onStatusChange?: (isListening: boolean) => void;

  constructor(
    onTranscriptUpdate?: (transcript: string, isFinal: boolean) => void,
    onError?: (error: string) => void,
    onStatusChange?: (isListening: boolean) => void
  ) {
    this.onTranscriptUpdate = onTranscriptUpdate;
    this.onError = onError;
    this.onStatusChange = onStatusChange;
    this.initRecognition();
  }

  private initRecognition() {
    const win = typeof window !== 'undefined' ? (window as IWindow) : null;
    if (!win) return;

    const SpeechRec = win.SpeechRecognition || win.webkitSpeechRecognition;
    if (!SpeechRec) {
      console.warn('SpeechRecognition is not supported in this browser.');
      return;
    }

    try {
      this.recognition = new SpeechRec();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';

      this.recognition.onstart = () => {
        this.isListening = true;
        this.onStatusChange?.(true);
      };

      this.recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        const currentText = finalTranscript || interimTranscript;
        if (currentText && this.onTranscriptUpdate) {
          this.onTranscriptUpdate(currentText, Boolean(finalTranscript));
        }
      };

      this.recognition.onerror = (event: any) => {
        console.warn('SpeechRecognition error:', event.error);
        if (event.error !== 'no-speech') {
          this.onError?.(`Microphone notice: ${event.error}`);
        }
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          this.isListening = false;
          this.onStatusChange?.(false);
        }
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.onStatusChange?.(false);
      };
    } catch (err) {
      console.error('Failed to initialize speech recognition:', err);
    }
  }

  public isSupported(): boolean {
    if (typeof window === 'undefined') return false;
    const win = window as IWindow;
    return Boolean(win.SpeechRecognition || win.webkitSpeechRecognition);
  }

  public startListening() {
    if (!this.recognition) {
      this.initRecognition();
    }
    if (!this.recognition) {
      this.onError?.('Speech recognition is not supported in this browser. Please use text mode.');
      return;
    }
    if (this.isListening) return;

    try {
      this.recognition.start();
    } catch (err: any) {
      console.warn('Recognition start caught error:', err);
      // Already started or restarting
    }
  }

  public stopListening() {
    if (!this.recognition || !this.isListening) return;
    try {
      this.recognition.stop();
    } catch (err) {
      console.warn('Recognition stop error:', err);
    }
    this.isListening = false;
    this.onStatusChange?.(false);
  }

  public toggleListening(): boolean {
    if (this.isListening) {
      this.stopListening();
      return false;
    } else {
      this.startListening();
      return true;
    }
  }
}

// Text to Speech for the AI Interviewer
export class TextToSpeechPlayer {
  private static currentUtterance: SpeechSynthesisUtterance | null = null;

  public static isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  public static speak(
    text: string,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: () => void
  ) {
    if (!this.isSupported()) return;

    this.stop();

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      // Select natural sounding voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Siri') || v.name.includes('Samantha') || v.name.includes('Daniel'))
      ) || voices.find(v => v.lang.startsWith('en'));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onstart = () => {
        onStart?.();
      };

      utterance.onend = () => {
        this.currentUtterance = null;
        onEnd?.();
      };

      utterance.onerror = (e) => {
        console.warn('TTS error:', e);
        this.currentUtterance = null;
        onError?.();
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Error invoking speech synthesis:', err);
      onError?.();
    }
  }

  public static stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        // ignore
      }
    }
    this.currentUtterance = null;
  }
}
