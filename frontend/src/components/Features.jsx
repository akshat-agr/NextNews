import React from "react";
import Card from "./Card";
const Features = () => {
  return (
    <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 pb-20">
      <Card
        icon="📺"
        title="Interactive Experience"
        description="Engage with AI anchors"
      />
      <Card
        icon="🕵️‍♂️"
        title="Trust Analysis"
        description="Detects credibility and potential bias in information."
      />
      <Card
        icon="🎙️"
        title="AI News Anchor"
        description="Listen to news presented by an AI anchor."
      />
    </div>
  );
};

export default Features;
