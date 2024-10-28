import { useState } from "react";
import { Button } from "./button";
import { Toaster } from "./sonner";
import { toast } from "sonner";

export const StayUpdated = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter a valid email.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        toast.success("Successfully subscribed!");
        setEmail(""); // Clear input field on success
      } else {
        const data = await res.json();
        throw new Error(data.message || "Failed to subscribe");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-28">
      <form
        onSubmit={handleSubmit}
        className="flex items-center flex-col sm:flex-row"
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-2 mb-4 border border-gray-300 rounded-lg sm:mb-0 sm:mr-2 focus:border-green-500 focus:outline-none"
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-white text-black   font-semibold rounded-lg transition-all duration-300 hover:bg-green-700 hover:scale-105 shadow-md"
        >
          {isLoading ? "Submitting..." : "Stay Updated"}
        </Button>
      </form>
    </div>
  );
};
