import { View, ScrollView, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import React from 'react';

const BibleScreen = () => {
  const { theme } = useSelector((state: any) => state.theme);
  const [books, setBooks] = useState<string[]>([]);
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedBookApiName, setSelectedBookApiName] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedVerse, setSelectedVerse] = useState('');
  const [verseText, setVerseText] = useState('');
  const [chapters, setChapters] = useState<number[]>([]);
  const [verses, setVerses] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  const getThemeColors = () => {
    return {
      background: theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50',
      card: theme === 'dark' ? 'bg-gray-800' : 'bg-white',
      text: theme === 'dark' ? 'text-white' : 'text-gray-900',
      secondaryText: theme === 'dark' ? 'text-gray-300' : 'text-gray-600',
      input: theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100',
      button: theme === 'dark' ? 'bg-blue-700' : 'bg-blue-600',
      border: theme === 'dark' ? 'border-gray-600' : 'border-gray-300',
    };
  };

  const colors = getThemeColors();

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

  const handleBookChange = (book: string) => {
    setSelectedBook(book);
    
    // Convert display name to API name
    const apiName = bookApiMap[book] || book.replace(/\s/g, '');
    setSelectedBookApiName(apiName);
    
    setSelectedChapter('');
    setSelectedVerse('');
    setVerseText('');

    if (book) {
      const chapterCount = getChapterCount(book);
      const mockChapters = Array.from({ length: chapterCount }, (_, i) => i + 1);
      setChapters(mockChapters);
    } else {
      setChapters([]);
    }
    setVerses([]);
  };

  const handleChapterChange = (chapter: string) => {
    setSelectedChapter(chapter);
    setSelectedVerse('');
    setVerseText('');

    if (chapter) {
      const verseCount = getVerseCount(selectedBook, parseInt(chapter));
      const mockVerses = Array.from({ length: verseCount }, (_, i) => i + 1);
      setVerses(mockVerses);
    } else {
      setVerses([]);
    }
  };

  const getChapterCount = (book: string) => {
    const chapterCounts: Record<string, number> = {
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

  const getVerseCount = (book: string, chapter: number) => {
    if (book === "Psalms" && chapter === 119) return 176;
    return 30;
  };

  const fetchVerse = async () => {
    if (selectedBookApiName && selectedChapter && selectedVerse) {
      setIsLoading(true);
      try {
       
        const res = await fetch(
          `http://${process.env.EXPO_PUBLIC_IP}/api/bible?book=${selectedBookApiName}&chapter=${selectedChapter}&verse=${selectedVerse}`
        );
        const data = await res.json();
        
        if (!data || !data.verse) {
          setVerseText('Verse not found. Please check your input.');
          return;
        }
        if (res.ok && data?.text) {
            const cleanedText = data.text.replace(/<\/?fi>/gi, ''); // Removes <fi> and </fi> (case-insensitive)
            setVerseText(cleanedText);
        }
      } catch (err) {
        setVerseText('Error fetching the verse. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSearch = () => {
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

  const navigateVerse = (direction: 'prev' | 'next') => {
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
    <View className={`mt-8 p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'} relative`}>
      <TouchableOpacity 
        onPress={() => navigateVerse('prev')}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-200 dark:bg-gray-600"
      >
        <AntDesign name="left" size={20} color={theme === 'dark' ? 'white' : 'black'} />
      </TouchableOpacity>
      
      <View className="px-8">
        <Text className={`text-xl font-semibold mb-2 ${colors.text}`}>
          {selectedBook} {selectedChapter}:{selectedVerse}
        </Text>
        <Text className={`text-lg ${colors.text}`}>{verseText}</Text>
      </View>
      
      <TouchableOpacity 
        onPress={() => navigateVerse('next')}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-200 dark:bg-gray-600"
      >
        <AntDesign name="right" size={20} color={theme === 'dark' ? 'white' : 'black'} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className={`flex-1 ${colors.background} p-4`}>
      <ScrollView>
        <View className={`${colors.card} rounded-xl p-6 mb-4`}>
          <Text className={`text-3xl font-bold mb-6 ${colors.text}`}>Bible Verse Lookup</Text>

          <View className="mb-8">
            <View className="relative">
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search (e.g., John 3:16 or Psalm 23:1)"
                placeholderTextColor={theme === 'dark' ? '#9ca3af' : '#6b7280'}
                className={`w-full p-4 rounded-lg border ${colors.border} ${colors.input} ${colors.text}`}
              />
              <TouchableOpacity
                onPress={handleSearch}
                className={`absolute right-2 top-2 p-2 ${colors.button} rounded-md`}
              >
                <Text className="text-white">Search</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex flex-col space-y-4 mb-6">
            <View>
              <Text className={`block mb-2 font-medium ${colors.text}`}>Book</Text>
              <View className={`${colors.input} rounded-lg overflow-hidden`}>
                <Picker
                  selectedValue={selectedBook}
                  onValueChange={handleBookChange}
                  style={{ color: theme === 'dark' ? 'white' : 'black' }}
                >
                  <Picker.Item label="Select a book" value="" />
                  {books.map((book, index) => (
                    <Picker.Item key={index} label={book} value={book} />
                  ))}
                </Picker>
              </View>
            </View>

            <View>
              <Text className={`block mb-2 font-medium ${colors.text}`}>Chapter</Text>
              <View className={`${colors.input} rounded-lg overflow-hidden`}>
                <Picker
                  selectedValue={selectedChapter}
                  onValueChange={handleChapterChange}
                  enabled={!!selectedBook}
                  style={{ color: theme === 'dark' ? 'white' : 'black' }}
                >
                  <Picker.Item label="Select chapter" value="" />
                  {chapters.map(ch => (
                    <Picker.Item key={ch} label={`Chapter ${ch}`} value={ch.toString()} />
                  ))}
                </Picker>
              </View>
            </View>

            <View>
              <Text className={`block mb-2 font-medium ${colors.text}`}>Verse</Text>
              <View className={`${colors.input} rounded-lg overflow-hidden`}>
                <Picker
                  selectedValue={selectedVerse}
                  onValueChange={(verse) => setSelectedVerse(verse)}
                  enabled={!!selectedChapter}
                  style={{ color: theme === 'dark' ? 'white' : 'black' }}
                >
                  <Picker.Item label="Select verse" value="" />
                  {verses.map(verse => (
                    <Picker.Item key={verse} label={`Verse ${verse}`} value={verse.toString()} />
                  ))}
                </Picker>
              </View>
            </View>
          </View>

          <View className="items-center mb-6">
            <TouchableOpacity
              onPress={fetchVerse}
              disabled={!selectedVerse || isLoading}
              className={`px-6 py-3 rounded-lg font-medium ${isLoading ? 'bg-blue-400' : colors.button} items-center justify-center`}
            >
              <Text className="text-white">
                {isLoading ? 'Loading...' : 'Get Verse'}
              </Text>
            </TouchableOpacity>
          </View>

          {verseText ? <VerseDisplay /> : null}

          <View className="mt-8">
            <Text className={`text-lg font-medium mb-3 ${colors.text}`}>Popular Verses</Text>
            <View className="flex flex-row flex-wrap gap-3">
              {['John 3:16', 'Psalm 23:1', 'Philippians 4:13', 'Romans 8:28'].map((verse) => (
                <TouchableOpacity
                  key={verse}
                  onPress={() => setSearchQuery(verse)}
                  className={`p-2 rounded text-sm ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
                >
                  <Text className={colors.text}>{verse}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default BibleScreen;