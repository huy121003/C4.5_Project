import React, { useState, useEffect } from 'react';
import { Input, Button, Card } from 'antd';

const App: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [displayedText, setDisplayedText] = useState<string>('');
  const fullText = "Thhis is a fake news checker application using the C4.5 algorithm. Please enter the news information to check.";
  const [showInputs, setShowInputs] = useState<boolean>(false);
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowInputs(true), 300); // Show the input fields after the intro ends
      }
    }, 40); // Change this time to adjust the display speed

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    console.log('Title:', title);
    console.log('Text:', text);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white p-10 ">
      <div className='flex-1 justify-start'>
        <h1 className="text-4xl font-bold mb-6 text-gray-400">
          {displayedText}
        </h1>
      </div>
      <div 
        className={`flex-1 transition-opacity duration-500 ease-in-out ${showInputs ? 'opacity-100' : 'opacity-0'}`}
        style={{ transition: 'opacity 0.5s ease-in-out' }}
      >
        {showInputs && (
          <Card className="w-full p-6 bg-white rounded-lg shadow-lg flex-1">
            <Input
              className="mb-4"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              size="large"
            />
            <Input.TextArea
              className="mb-4"
              placeholder="Enter text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              size="large"
            />
            <Button type="primary" className="w-full" onClick={handleSubmit}>
              Submit
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default App;
