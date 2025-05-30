const PromptSuggestion = ({ icon, purpose, question }) => (
  <div className="flex-shrink-0 flex gap-2 p-4 pr-8 bg-[#88888C33;] rounded-lg">
    {icon}
    <div className="text-sm text-gray-200">
      {purpose}
      <div className="text-gray-450">{question}</div>
    </div>
  </div>
);

export default function PromptSuggestions() {
  return (
    <>
      <PromptSuggestion
        icon="💡"
        purpose="Want to understand how Andai’s products can help your business innovate?"
        question="How can Andai’s Builder, Flo, and Sigma support my business goals?"
      />

      <PromptSuggestion
        icon="🏭"
        purpose="Need AI-powered efficiency for your manufacturing operations?"
        question="What Andai tools are best for improving workflows in manufacturing?"
      />

      <PromptSuggestion
        icon="📊"
        purpose="Looking to gain deeper insights from your customer data?"
        question="How can Flo help my business analyze customer behavior?"
      />
    </>
  );
}
