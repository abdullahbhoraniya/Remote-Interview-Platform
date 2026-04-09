function OutputPanel({ output }) {
  return (
    <div className="h-full bg-base-100 flex flex-col">

      {/* Header */}
      <div className="px-4 py-2 bg-base-200 border-b border-base-300 font-semibold text-sm flex justify-between items-center">
        <span>Output</span>

        {output && (
          <span
            className={`text-xs px-2 py-1 rounded ${
              output.success
                ? "bg-success/20 text-success"
                : "bg-error/20 text-error"
            }`}
          >
            {output.success ? "Accepted" : "Error"}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 overflow-auto p-4 space-y-3 text-sm font-mono">

        {/* Initial State */}
        {output === null && (
          <p className="text-base-content/50">
            Click "Run Code" to see the output here...
          </p>
        )}

        {/* Success */}
        {output?.success && (
          <div>
            <p className="text-success mb-1">✔ Execution Result</p>
            <pre className="bg-base-200 p-3 rounded whitespace-pre-wrap">
              {output.output || "No output"}
            </pre>
          </div>
        )}

        {/* Error */}
        {!output?.success && output !== null && (
          <div className="space-y-2">

            {/* Partial Output */}
            {output.output && (
              <div>
                <p className="text-base-content/70 mb-1">Output</p>
                <pre className="bg-base-200 p-3 rounded whitespace-pre-wrap">
                  {output.output}
                </pre>
              </div>
            )}

            {/* Error */}
            <div>
              <p className="text-error mb-1">Error</p>
              <pre className="bg-error/10 p-3 rounded whitespace-pre-wrap text-error">
                {output.error}
              </pre>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default OutputPanel;