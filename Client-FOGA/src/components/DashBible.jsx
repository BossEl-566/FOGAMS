import React, { useState, useEffect } from 'react';

export default function DashBible() {
  // Map for displaying user-friendly names while keeping API-compatible names
  const bookDisplayMap = {
    "FirstSamuel": "1 Samuel",
    "SecondSamuel": "2 Samuel",
    "FirstKings": "1 Kings",
    "SecondKings": "2 Kings",
    "FirstChronicles": "1 Chronicles",
    "SecondChronicles": "2 Chronicles",
    "FirstCorinthians": "1 Corinthians",
    "SecondCorinthians": "2 Corinthians",
    "FirstThessalonians": "1 Thessalonians",
    "SecondThessalonians": "2 Thessalonians",
    "FirstTimothy": "1 Timothy",
    "SecondTimothy": "2 Timothy",
    "FirstPeter": "1 Peter",
    "SecondPeter": "2 Peter",
    "FirstJohn": "1 John",
    "SecondJohn": "2 John",
    "ThirdJohn": "3 John",
    "SongOfSolomon": "Song of Solomon"
  };

  // Reverse map for converting display names back to API names
  const bookApiMap = Object.fromEntries(
    Object.entries(bookDisplayMap).map(([apiName, displayName]) => [displayName, apiName])
  );

  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedBookApiName, setSelectedBookApiName] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedVerse, setSelectedVerse] = useState('');
  const [verseText, setVerseText] = useState('');
  const [chapters, setChapters] = useState([]);
  const [verses, setVerses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const bibleBooks = [
      "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", 
      "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
      "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra",
      "Nehemiah", "Esther", "Job", "Psalms", "Proverbs",
      "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations",
      "Ezekiel", "Daniel", "Hosea", "Joel", "Amos",
      "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk",
      "Zephaniah", "Haggai", "Zechariah", "Malachi", "Matthew",
      "Mark", "Luke", "John", "Acts", "Romans",
      "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians",
      "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy",
      "Titus", "Philemon", "Hebrews", "James", "1 Peter",
      "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation"
    ];
    setBooks(bibleBooks);
  }, []);

  const handleBookChange = (e) => {
    const displayName = e.target.value;
    setSelectedBook(displayName);
    
    // Convert display name to API name
    const apiName = bookApiMap[displayName] || displayName.replace(/\s/g, '');
    setSelectedBookApiName(apiName);
    
    setSelectedChapter('');
    setSelectedVerse('');
    setVerseText('');

    if (displayName) {
      const chapterCount = getChapterCount(displayName);
      const mockChapters = Array.from({ length: chapterCount }, (_, i) => i + 1);
      setChapters(mockChapters);
    } else {
      setChapters([]);
    }
    setVerses([]);
  };

  const handleChapterChange = (e) => {
    const chapter = e.target.value;
    setSelectedChapter(chapter);
    setSelectedVerse('');
    setVerseText('');

    if (chapter) {
      const verseCount = getVerseCount(selectedBook, chapter);
      const mockVerses = Array.from({ length: verseCount }, (_, i) => i + 1);
      setVerses(mockVerses);
    } else {
      setVerses([]);
    }
  };

  const getChapterCount = (book) => {
    const chapterCounts = {
      "Genesis": 50,
      "Exodus": 40,
      "Leviticus": 27,
      "Numbers": 36,
      "Deuteronomy": 34,
      "Joshua": 24,
      "Judges": 21,
      "Ruth": 4,
      "1 Samuel": 31,
      "2 Samuel": 24,
      "1 Kings": 22,
      "2 Kings": 25,
      "1 Chronicles": 29,
      "2 Chronicles": 36,
      "Ezra": 10,
      "Nehemiah": 13,
      "Esther": 10,
      "Job": 42,
      "Psalms": 150,
      "Proverbs": 31,
      "Ecclesiastes": 12,
      "Song of Solomon": 8,
      "Isaiah": 66,
      "Jeremiah": 52,
      "Lamentations": 5,
      "Ezekiel": 48,
      "Daniel": 12,
      "Hosea": 14,
      "Joel": 3,
      "Amos": 9,
      "Obadiah": 1,
      "Jonah": 4,
      "Micah": 7,
      "Nahum": 3,
      "Habakkuk": 3,
      "Zephaniah": 3,
      "Haggai": 2,
      "Zechariah": 14,
      "Malachi": 4,
      "Matthew": 28,
      "Mark": 16,
      "Luke": 24,
      "John": 21,
      "Acts": 28,
      "Romans": 16,
      "1 Corinthians": 16,
      "2 Corinthians": 13,
      "Galatians": 6,
      "Ephesians": 6,
      "Philippians": 4,
      "Colossians": 4,
      "1 Thessalonians": 5,
      "2 Thessalonians": 3,
      "1 Timothy": 6,
      "2 Timothy": 4,
      "Titus": 3,
      "Philemon": 1,
      "Hebrews": 13,
      "James": 5,
      "1 Peter": 5,
      "2 Peter": 3,
      "1 John": 5,
      "2 John": 1,
      "3 John": 1,
      "Jude": 1,
      "Revelation": 22
    };
    return chapterCounts[book] || 5;
  };
  

  const getVerseCount = (book, chapter) => {
    if (book === "Psalms" && chapter === 119) return 176;
    return 30;
  };

  const fetchVerse = async () => {
    if (selectedBookApiName && selectedChapter && selectedVerse) {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/bible?book=${selectedBookApiName}&chapter=${selectedChapter}&verse=${selectedVerse}`
        );
        const data = await res.json();

        if (res.ok && data?.text) {
            const cleanedText = data.text.replace(/<\/?fi>/gi, ''); // Removes <fi> and </fi> (case-insensitive)
            setVerseText(cleanedText);
          } else {
          setVerseText('Verse not found or API error.');
        }
      } catch (err) {
        setVerseText('Error fetching the verse. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      const match = searchQuery.match(/(\d*\s*[a-zA-Z]+)\s*(\d+):(\d+)/i);
      if (match) {
        const [, book, chapter, verse] = match;
        const displayName = books.find(b => b.toLowerCase() === book.toLowerCase().trim()) || '';
        setSelectedBook(displayName);
        
        // Convert display name to API name
        const apiName = bookApiMap[displayName] || displayName.replace(/\s/g, '');
        setSelectedBookApiName(apiName);
        
        setSelectedChapter(chapter);
        setSelectedVerse(verse);
      }
    }
  };

  const navigateVerse = (direction) => {
    if (!selectedBook || !selectedChapter || !selectedVerse) return;

    const currentVerse = parseInt(selectedVerse);
    const currentChapter = parseInt(selectedChapter);
    const verseCount = getVerseCount(selectedBook, currentChapter);
    const chapterCount = getChapterCount(selectedBook);

    if (direction === 'prev') {
      if (currentVerse > 1) {
        setSelectedVerse((currentVerse - 1).toString());
      } else if (currentChapter > 1) {
        const prevChapter = currentChapter - 1;
        const prevVerseCount = getVerseCount(selectedBook, prevChapter);
        setSelectedChapter(prevChapter.toString());
        setSelectedVerse(prevVerseCount.toString());
      }
    } else if (direction === 'next') {
      if (currentVerse < verseCount) {
        setSelectedVerse((currentVerse + 1).toString());
      } else if (currentChapter < chapterCount) {
        setSelectedChapter((currentChapter + 1).toString());
        setSelectedVerse('1');
      }
    }
  };

  useEffect(() => {
    if (selectedBookApiName && selectedChapter && selectedVerse) {
      fetchVerse();
    }
  }, [selectedBookApiName, selectedChapter, selectedVerse]);

  const VerseDisplay = () => (
    <div className="mt-8 p-6 rounded-lg bg-blue-50 dark:bg-gray-700 relative">
      <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
        <button 
          onClick={() => navigateVerse('prev')}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition"
          aria-label="Previous verse"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
        <button 
          onClick={() => navigateVerse('next')}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition"
          aria-label="Next verse"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <div className="px-8">
        <h2 className="text-xl font-semibold mb-2">{selectedBook} {selectedChapter}:{selectedVerse}</h2>
        <p className="text-lg">{verseText}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 w-full">
      <div className="max-w-4xl mx-auto p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800">
        <h1 className="text-3xl font-bold mb-6">Bible Verse Lookup</h1>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search (e.g., John 3:16 or Psalm 23:1)"
              className="w-full p-4 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Search
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label htmlFor="book" className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Book</label>
            <select
              id="book"
              value={selectedBook}
              onChange={handleBookChange}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
            >
              <option value="">Select a book</option>
              {books.map((book, index) => (
                <option key={index} value={book}>{book}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="chapter" className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Chapter</label>
            <select
              id="chapter"
              value={selectedChapter}
              onChange={handleChapterChange}
              disabled={!selectedBook}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
            >
              <option value="">Select chapter</option>
              {chapters.map(ch => (
                <option key={ch} value={ch}>Chapter {ch}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="verse" className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Verse</label>
            <select
              id="verse"
              value={selectedVerse}
              onChange={(e) => setSelectedVerse(e.target.value)}
              disabled={!selectedChapter}
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
            >
              <option value="">Select verse</option>
              {verses.map(verse => (
                <option key={verse} value={verse}>Verse {verse}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={fetchVerse}
            disabled={!selectedVerse || isLoading}
            className={`px-6 py-3 rounded-lg font-medium ${isLoading ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'} text-white transition`}
          >
            {isLoading ? 'Loading...' : 'Get Verse'}
          </button>
        </div>

        {verseText && <VerseDisplay />}

        <div className="mt-8">
          <h3 className="text-lg font-medium mb-3">Popular Verses</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['John 3:16', 'Psalm 23:1', 'Philippians 4:13', 'Romans 8:28'].map((verse) => (
              <button
                key={verse}
                onClick={() => setSearchQuery(verse)}
                className="p-2 rounded text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
              >
                {verse}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}