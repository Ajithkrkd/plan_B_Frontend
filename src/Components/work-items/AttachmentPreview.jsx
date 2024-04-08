import React from 'react';
import { Viewer } from '@react-pdf-viewer/core';



const AttachmentPreview = ({attachment}) => {
  const url = `http://localhost:8084${attachment.attachment_url}`; // Replace with your PDF URL

  return (
    <div>
      <Viewer fileUrl={url} />
    </div>
  );
};

export default AttachmentPreview;
