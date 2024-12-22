"use client";

import React from "react";
import DOMPurify from "dompurify";
const ShowDescription = ({ htmlString, wordLimit }) => {
  const plainText = DOMPurify.sanitize(htmlString, { ALLOWED_TAGS: [] });

  // Split into words and truncate
  const words = plainText.split(" ");
  const truncated =
    words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : plainText;

  return <div dangerouslySetInnerHTML={{ __html: truncated }} />;
};

export default ShowDescription;
