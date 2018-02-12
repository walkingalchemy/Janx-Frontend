import React, { Fragment } from 'react';
import { ActionCable } from 'react-actioncable-provider';

const Cable = ({ chats, handleReceivedTranscript }) => {
  return (
    <Fragment>
      {chats.map(chat => {
        return (
          <ActionCable
            key={chat.id}
            channel={{ channel: 'TranscriptsChannel', chat: chat.id }}
            onReceived={handleReceivedTranscript}
          />
        );
      })}
    </Fragment>
  );
};

export default Cable;
