/**
 * Rich Snippets Validation Component
 * This component helps validate and debug structured data implementation
 */

import React from "react";

// Define types for structured data
type StructuredDataSchema = {
  "@context"?: string;
  "@type"?: string | string[];
  name?: string;
  url?: string;
  logo?: string | { "@type": string; url: string };
  jobTitle?: string;
  provider?: { "@type": string; name: string };
  [key: string]: unknown;
};

interface RichSnippetsValidationProps {
  schemas: Record<string, StructuredDataSchema>;
  pageUrl: string;
}

export default function RichSnippetsValidation({
  schemas,
  pageUrl,
}: RichSnippetsValidationProps) {
  if (process.env.NODE_ENV !== "development") {
    return null; // Only show in development
  }

  const validateSchema = (schema: StructuredDataSchema) => {
    const issues = [];

    // Check for required @context
    if (!schema["@context"]) {
      issues.push("Missing @context property");
    }

    // Check for required @type
    if (!schema["@type"]) {
      issues.push("Missing @type property");
    }

    // Organization specific validations
    if (schema["@type"] === "Organization") {
      if (!schema.name) issues.push("Organization missing name");
      if (!schema.url) issues.push("Organization missing url");
      if (!schema.logo) issues.push("Organization missing logo");
    }

    // Person specific validations
    if (schema["@type"] === "Person") {
      if (!schema.name) issues.push("Person missing name");
      if (!schema.jobTitle) issues.push("Person missing jobTitle");
    }

    // Service specific validations
    if (
      schema["@type"] === "Service" ||
      schema["@type"] === "ProfessionalService"
    ) {
      if (!schema.name) issues.push("Service missing name");
      if (!schema.provider) issues.push("Service missing provider");
    }

    return issues;
  };

  return (
    <div
      className="fixed bottom-4 right-4 bg-slate-800 text-white p-4 rounded-lg shadow-lg max-w-md z-50"
      style={{ fontSize: "12px" }}
    >
      <h3 className="font-bold mb-2">🔍 Rich Snippets Debug</h3>
      <p className="mb-2">Page: {pageUrl}</p>

      {Object.entries(schemas).map(([key, schema]) => {
        const issues = validateSchema(schema);
        return (
          <div key={key} className="mb-2 p-2 bg-slate-700 rounded">
            <div className="font-semibold">{key}</div>
            <div className="text-xs text-slate-300">
              Type: {schema["@type"] || "Unknown"}
            </div>
            {issues.length > 0 ? (
              <div className="text-red-300 text-xs">
                Issues: {issues.join(", ")}
              </div>
            ) : (
              <div className="text-green-300 text-xs">✓ Valid</div>
            )}
          </div>
        );
      })}

      <div className="mt-2 pt-2 border-t border-slate-600 text-xs text-slate-300">
        Test with:
        <br />•{" "}
        <a
          href={`https://search.google.com/test/rich-results?url=${encodeURIComponent(
            pageUrl
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-300 hover:underline"
        >
          Google Rich Results Test
        </a>
        <br />•{" "}
        <a
          href={`https://validator.schema.org/#url=${encodeURIComponent(
            pageUrl
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-300 hover:underline"
        >
          Schema.org Validator
        </a>
      </div>
    </div>
  );
}

// Helper function to extract structured data from page
export function extractPageSchemas(): Record<string, StructuredDataSchema> {
  if (typeof window === "undefined") return {};

  const schemas: Record<string, StructuredDataSchema> = {};
  const scripts = document.querySelectorAll(
    'script[type="application/ld+json"]'
  );

  scripts.forEach((script, index) => {
    try {
      const data = JSON.parse(script.textContent || "") as StructuredDataSchema;
      const type = data["@type"] || `schema-${index}`;
      const key = Array.isArray(type) ? type[0] : type;
      schemas[key] = data;
    } catch (error) {
      console.error("Error parsing structured data:", error);
    }
  });

  return schemas;
}

// Hook for using Rich Snippets validation
export function useRichSnippetsValidation(pageUrl: string) {
  const [schemas, setSchemas] = React.useState<
    Record<string, StructuredDataSchema>
  >({});

  React.useEffect(() => {
    // Extract schemas after component mount
    const extractedSchemas = extractPageSchemas();
    setSchemas(extractedSchemas);
  }, []);

  return {
    schemas,
    RichSnippetsValidation: (
      props: Omit<RichSnippetsValidationProps, "schemas" | "pageUrl">
    ) => (
      <RichSnippetsValidation {...props} schemas={schemas} pageUrl={pageUrl} />
    ),
  };
}
