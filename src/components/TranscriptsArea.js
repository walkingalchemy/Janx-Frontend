import React from 'react';
import NewTranscriptForm from './NewTranscriptForm';

const TranscriptsArea = ({chat: { id, title, transcripts }}) => {
  debugger
  return (
    <div className="transcriptsArea">
      <h2>{title}</h2>
      <div>{transcripts}</div>
      <NewTranscriptForm chat_id={id} />
    </div>
  );
};

export default TranscriptsArea;

// helpers

const orderedTranscripts = transcripts => {
  const sortedTranscripts = transcripts.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );
  return sortedTranscripts.map(transcript => {
    return <div key={transcript.id}>{transcript.text}</div>;
  });
};
