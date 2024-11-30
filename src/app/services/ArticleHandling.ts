export const sanitizeExcerpt = (
    excerpt: string | undefined,
    maxSentences: number = 1
): string => {
    if (!excerpt) return '';

    // Remove HTML tags and replace special characters
    const cleanExcerpt = excerpt
        .replace(/<\/?[^>]+(>|$)/g, '')
        .replace(/&hellip;/g, '...');

    // Split the excerpt into sentences and slice based on the maxSentences limit
    const sentences = cleanExcerpt.split(/(?<=[.!?])\s+/); // Split by sentence-ending punctuation
    const result = sentences.slice(0, maxSentences).join(' '); // Join the selected sentences

    // Add '...' at the end if the number of sentences exceeds maxSentences
    return sentences.length > maxSentences ? result + ' ...' : result;
};

export const calculateReadingTime = (text: string | undefined): string => {
    if (!text) return '0 min';

    // Remove HTML tags and count the number of words
    const cleanText = text
        .replace(/<\/?[^>]+(>|$)/g, '')
        .replace(/&hellip;/g, '...');
    const wordCount = cleanText.split(/\s+/).length;

    // Average reading speed (words per minute)
    const wordsPerMinute = 200;

    // Calculate reading time
    const minutes = Math.ceil(wordCount / wordsPerMinute);

    return `${minutes} min`;
};