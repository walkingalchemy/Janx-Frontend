import React from 'react';
import NewTranscriptForm from './NewTranscriptForm';

const TranscriptsArea = ({chat: { id, title}, transcripts, handleDeleteChat}) => {


  return (
    <div className="transcriptsArea">
      <h2>{title}</h2>
      <div>{orderedTranscripts(transcripts)}</div>
      <br/>
      <NewTranscriptForm chat_id={id} />
      <button onClick={handleDeleteChat} id='delete-chat'>Delete Chat</button>
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
    return <div key={transcript.id}>{transcript.content}</div>;
  });
};
