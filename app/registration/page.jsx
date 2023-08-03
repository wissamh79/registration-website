"use client";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
export default function Registration() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { toast } = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/attend", {
        method: "POST",
        body: JSON.stringify({
          fullName: fullName.toLowerCase(),
          email: email.toLowerCase(),
          phoneNumber: phoneNumber.toLowerCase(),
        }),
      });
      if (res.ok && res.status === 200) {
        toast({
          title: "success",
          description: "Thank's for Attending You have been registered ",
        });
        localStorage.setItem("email", email);
        localStorage.setItem("phoneNumber", phoneNumber);
      } else if (res.status === 400) {
        toast({
          title: "Failed",
          description: "The given email already Exist",
        });
        localStorage.setItem("email", email);
        localStorage.setItem("phoneNumber", phoneNumber);
      } else {
        toast({
          title: "Failed",
          description: "You haven't been Accepted",
        });
      }
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "Something Went Wrong",
      });
    }
  };
  return (
    <section className="flex flex-col items-center justify-center w-full h-full py-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start justify-center space-y-4 w-[75%] md:w-[25%] h-full"
      >
        <div className="flex flex-col items-start justify-start w-full space-y-4">
          <Label htmlFor="fullName" className="text-right">
            Full Name
          </Label>
          <Input
            value={fullName}
            id="fullName"
            className="col-span-3"
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start justify-start w-full space-y-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input
            id="email"
            value={email}
            className="col-span-3"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start justify-start w-full space-y-4">
          <Label htmlFor="phoneNumber" className="text-right">
            Phone Number
          </Label>
          <Input
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="col-span-3"
          />
        </div>
        <Button className="w-full" type="submit">
          Save
        </Button>
      </form>
    </section>
  );
}
