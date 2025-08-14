"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import axios from "axios";

type Field = {
  key: string;
  label: string;
  type: string;
  value?: string | null;
  required?: boolean;
  pattern?: string | null;
  placeholder?: string | null;
  maxLength?: number | null;
  options?: { value: string; label: string }[];
};

type Schema = {
  title: string;
  fields: Field[];
};

interface DynamicFormProps {
  schema: Schema;
  onSubmit: (data: any) => void;
}

export default function DynamicForm({ schema, onSubmit }: DynamicFormProps) {
  // Create validation schema dynamically from JSON
  const shape: Record<string, any> = {};
  schema.fields.forEach((field: Field) => {
    let validator = z.string();

    // Required field validation
    if (field.required) {
      validator = validator.min(1, `${field.label} is required`);
    }

    // Pattern validation
    if (field.pattern) {
      validator = validator.regex(new RegExp(field.pattern), `${field.label} format is invalid`);
    }

    // Special field validations
    switch (field.key.toLowerCase()) {
      case "pan":
        validator = validator.regex(
          /[A-Z]{5}[0-9]{4}[A-Z]{1}/,
          "Invalid PAN format (e.g., ABCDE1234F)"
        );
        break;
      case "aadhaar":
        validator = validator.regex(/^\d{12}$/, "Invalid Aadhaar format (12 digits)");
        break;
      case "pincode":
        validator = validator.regex(/^\d{6}$/, "Invalid PIN Code (6 digits)");
        break;
      case "mobile":
        validator = validator.regex(
          /^[6-9]\d{9}$/,
          "Invalid mobile number (10 digits starting with 6-9)"
        );
        break;
      case "email":
        validator = validator.email("Invalid email format");
        break;
    }

    // Max length validation
    if (field.maxLength) {
      validator = validator.max(field.maxLength, `Maximum ${field.maxLength} characters allowed`);
    }

    shape[field.key] = validator;
  });

  const formSchema = z.object(shape);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  // PIN code auto-fill
  const pincode = watch("pincode");
  useEffect(() => {
    if (pincode?.length === 6) {
      axios
        .get(`https://api.postalpincode.in/pincode/${pincode}`)
        .then((res) => {
          if (res.data[0].Status === "Success") {
            const location = res.data[0].PostOffice[0];
            setValue("city", location.Block);
            setValue("state", location.State);
          }
        })
        .catch((err) => console.error("Error fetching PIN code data:", err));
    }
  }, [pincode, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {schema.fields.map((field: Field) => (
        <div key={field.key} className="flex flex-col space-y-2">
          <label className="font-medium text-gray-700">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>

          {field.type === "select" && field.options ? (
            <select
              {...register(field.key)}
              className="border rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              defaultValue={field.value || ""}
            >
              <option value="">Select {field.label}</option>
              {field.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : field.type === "radio" ? (
            <div className="flex gap-4">
              {field.options?.map((opt) => (
                <label key={opt.value} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    {...register(field.key)}
                    value={opt.value}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          ) : field.type === "checkbox" ? (
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register(field.key)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>{field.label}</span>
            </label>
          ) : (
            <input
              {...register(field.key)}
              type={field.type || "text"}
              placeholder={field.placeholder || ""}
              className="border rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              defaultValue={field.value || ""}
            />
          )}

          {errors[field.key] && (
            <span className="text-red-500 text-sm">
              {errors[field.key]?.message as string}
            </span>
          )}
        </div>
      ))}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Next
      </button>
    </form>
  );
}