// fakeNewsDetection.ts

export const detectFakeNews = (title: string, text: string): boolean => {
    // Keywords commonly associated with fake news
    const fakeKeywords = [
      "fake", "scam", "conspiracy", "shocking", "unbelievable", "miracle",
      "you won't believe", "limited time", "click here", "urgent", "exposed",
      "incredible", "secret", "confidential", "insider", "exclusive"
    ];
  
    // List of suspicious or unreliable sources (can be expanded)
    const unreliableSources = ["fakenews.com", "suspiciousnews.net", "untrustworthynews.org"];
  
    // Check for excessive sensational phrases
    const sensationalPhrases = [
      "breaking news", "viral video", "leaked information", "don’t miss this", "life-changing"
    ];
  
    // Check if title or text contains fake keywords
    const hasFakeKeywords = fakeKeywords.some((keyword) =>
      title.toLowerCase().includes(keyword) || text.toLowerCase().includes(keyword)
    );
  
    // Check for URLs in text and if any are from suspicious sources
    const containsURL = /https?:\/\/[^\s]+/.test(text);
    const suspiciousURL = unreliableSources.some((source) => text.includes(source));
  
    // Check for excessive capitalization in the title (indicates sensationalism)
    const hasExcessiveCaps = title.replace(/[^A-Z]/g, "").length > 10;
  
    // Check if the content is too short, indicating low-quality information
    const wordCount = text.split(" ").length;
    const isSuspiciouslyShort = wordCount < 30;
  
    // Check if the text has excessive punctuation like "!!!", "???" (often used in fake news)
    const excessivePunctuation = /[!?]{3,}/.test(text);
  
    // Check if there is a high repetition of certain words, indicating spam or low-quality content
    const words = text.toLowerCase().split(/\s+/);
    const wordFrequency: { [key: string]: number } = {};
    words.forEach((word) => {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    });
    const hasRepetitiveContent = Object.values(wordFrequency).some((count) => count > words.length * 0.1); // More than 10% repetition of a word
  
    // Check if the text contains sensational phrases
    const hasSensationalPhrases = sensationalPhrases.some((phrase) =>
      text.toLowerCase().includes(phrase)
    );
  
    // Return true if any of the conditions suggest fake news
    return (
      hasFakeKeywords ||
      containsURL ||
      suspiciousURL ||
      hasExcessiveCaps ||
      isSuspiciouslyShort ||
      excessivePunctuation ||
      hasRepetitiveContent ||
      hasSensationalPhrases
    );
  };
  