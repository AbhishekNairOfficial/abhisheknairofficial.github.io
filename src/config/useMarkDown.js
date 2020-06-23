import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const useMarkDown = fileContent => {
  const [markDownString, setMarkDownString] = useState('');

  useEffect(() => {
    fetch(fileContent)
      .then(response => {
        return response.text();
      })
      .then(text => {
        setMarkDownString(text);
      });
  }, [fileContent]);

  return <ReactMarkdown source={markDownString} />;
};

export default useMarkDown;
