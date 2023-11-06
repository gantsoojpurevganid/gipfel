import React from "react";

export function Img({ alt = "", ...props }) {
  return <img alt={alt} {...props} loading="lazy" />;
}
