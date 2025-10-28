import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ReadingAssistance = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [readingMode, setReadingMode] = useState(false);
  const [textToSpeech, setTextToSpeech] = useState(false);
  const [speechRate, setSpeechRate] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Load saved preferences
  useEffect(() => {
    const savedReadingMode = localStorage.getItem('readingMode') === 'true';
    const savedTextToSpeech = localStorage.getItem('textToSpeech') === 'true';
    const savedSpeechRate = localStorage.getItem('speechRate') || '1';
    
    setReadingMode(savedReadingMode);
    setTextToSpeech(savedTextToSpeech);
    setSpeechRate(parseFloat(savedSpeechRate));
    
    // Apply reading mode class
    if (savedReadingMode) {
      document.documentElement.classList.add('reading-mode');
    }
  }, []);

  // Toggle reading mode
  const toggleReadingMode = () => {
    const newReadingMode = !readingMode;
    setReadingMode(newReadingMode);
    localStorage.setItem('readingMode', newReadingMode.toString());
    
    if (newReadingMode) {
      document.documentElement.classList.add('reading-mode');
    } else {
      document.documentElement.classList.remove('reading-mode');
    }
  };

  // Toggle text-to-speech
  const toggleTextToSpeech = () => {
    const newTTS = !textToSpeech;
    setTextToSpeech(newTTS);
    localStorage.setItem('textToSpeech', newTTS.toString());
  };

  // Change speech rate
  const changeSpeechRate = (rate) => {
    setSpeechRate(rate);
    localStorage.setItem('speechRate', rate.toString());
  };

  // Speak text
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = speechRate;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  // Stop speaking
  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Handle text selection for speech
  useEffect(() => {
    if (!textToSpeech) return;
    
    const handleSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim()) {
        const selectedText = selection.toString().trim();
        speakText(selectedText);
      }
    };
    
    document.addEventListener('mouseup', handleSelection);
    return () => document.removeEventListener('mouseup', handleSelection);
  }, [textToSpeech, speechRate]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {t('accessibility.reading_assistance')}
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label={t('navigation.close')}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Reading Mode Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  {t('accessibility.reading_mode')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t('accessibility.reading_mode_desc')}
                </p>
              </div>
              <button
                onClick={toggleReadingMode}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  readingMode ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-pressed={readingMode}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    readingMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            {/* Text-to-Speech Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  {t('accessibility.text_to_speech')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t('accessibility.text_to_speech_desc')}
                </p>
              </div>
              <button
                onClick={toggleTextToSpeech}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  textToSpeech ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-pressed={textToSpeech}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    textToSpeech ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            {/* Speech Rate Control */}
            {textToSpeech && (
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-3">
                  {t('accessibility.speech_rate')}
                </h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => changeSpeechRate(0.75)}
                    className={`px-3 py-1 rounded-lg ${
                      speechRate === 0.75 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    0.75x
                  </button>
                  <button
                    onClick={() => changeSpeechRate(1)}
                    className={`px-3 py-1 rounded-lg ${
                      speechRate === 1 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    1x
                  </button>
                  <button
                    onClick={() => changeSpeechRate(1.25)}
                    className={`px-3 py-1 rounded-lg ${
                      speechRate === 1.25 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    1.25x
                  </button>
                  <button
                    onClick={() => changeSpeechRate(1.5)}
                    className={`px-3 py-1 rounded-lg ${
                      speechRate === 1.5 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    1.5x
                  </button>
                </div>
              </div>
            )}
            
            {/* Speech Controls */}
            {textToSpeech && (
              <div className="flex space-x-3">
                <button
                  onClick={stopSpeaking}
                  disabled={!isSpeaking}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium ${
                    isSpeaking
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {t('accessibility.stop_speaking')}
                </button>
              </div>
            )}
            
            {/* Instructions */}
            <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                {t('accessibility.how_to_use')}
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {t('accessibility.tts_instructions')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingAssistance;