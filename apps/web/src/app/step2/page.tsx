"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DynamicForm from "@/components/DynamicForm";
import ProgressTracker from "@/components/ProgressTracker";
import axios from "axios";

const steps = [
  { number: 1, label: "Aadhaar Verification", completed: true },
  { number: 2, label: "Business Details", completed: false },
];

export default function Step2Page() {
  const router = useRouter();
  const [schema, setSchema] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/schema/2")
      .then((res) => {
        setSchema(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.error || "Failed to load form");
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (data: any) => {
    try {
      await axios.post("http://localhost:4000/submit/2", data);
      // Show success message or navigate to completion page
      router.push("/success");
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to submit form");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <ProgressTracker steps={steps} currentStep={2} />
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">{schema.title}</h1>
        <DynamicForm schema={schema} onSubmit={handleSubmit} />
      </div>
    </div>
  );
