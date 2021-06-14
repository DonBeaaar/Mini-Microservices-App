import React from 'react';

export default ({ comments }) => {
  const renderedComments = comments.map(comment => {
    let content;
    switch (comment.status) {
      case 'approved':
        content = comment.content;
        break;
      case 'rejected':
        content = 'Comment rejected';
        break;
      case 'pending':
        content = 'Awaiting moderation';
        break;
    
      default:
        break;
    }
    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};
